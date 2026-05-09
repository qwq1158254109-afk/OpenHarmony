use crate::models::{ApiResponse, AuthMethod, RiskAssessment, RiskLog, RiskScoreQuery};
use crate::services::risk_service::{evaluate, RiskInput};
use crate::storage::SharedState;
use axum::extract::{Query, State};
use axum::Json;
use chrono::{Local, Timelike};

pub async fn score_risk(
    State(state): State<SharedState>,
    Query(query): Query<RiskScoreQuery>,
) -> Json<ApiResponse<RiskAssessment>> {
    let Ok(store) = state.lock() else {
        eprintln!("[api.risk.score] state lock failed");
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    let trusted_device = query
        .device_id
        .as_ref()
        .and_then(|device_id| store.devices.iter().find(|item| item.id == *device_id))
        .map(|item| item.trusted)
        .unwrap_or(false);
    let device_trust_score = query
        .device_id
        .as_ref()
        .and_then(|device_id| store.devices.iter().find(|item| item.id == *device_id))
        .map(|item| item.trust_score)
        .unwrap_or(0);
    let user_id = query.user_id.clone().unwrap_or_default();
    let recent_locations = store
        .records
        .iter()
        .filter(|item| user_id.is_empty() || item.user_id == user_id)
        .take(3)
        .map(|item| item.location.clone())
        .collect();
    let risk = evaluate(RiskInput {
        hour: Local::now().hour(),
        trusted_device,
        device_trust_score,
        location: query.location.unwrap_or_else(|| "校园公共区域".to_string()),
        failed_count: query.failed_count.unwrap_or(0),
        auth_method: query.method.unwrap_or(AuthMethod::TrustedDevice),
        recent_locations,
    });
    println!(
        "[risk.score] score={}, level={:?}",
        risk.risk_score, risk.risk_level
    );
    Json(ApiResponse::ok("risk score evaluated", risk))
}

pub async fn risk_logs(State(state): State<SharedState>) -> Json<ApiResponse<Vec<RiskLog>>> {
    let Ok(store) = state.lock() else {
        eprintln!("[api.risk.logs] state lock failed");
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "risk logs fetched",
        store.risk_logs.clone(),
    ))
}
