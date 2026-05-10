use crate::models::{
    ApiResponse, AuthRecord, AuthResult, AuthVerifyRequest, AuthVerifyResponse, LoginRequest,
    LoginResponse, RecordQuery, RegisterRequest, RegisterResponse, RiskLevel,
};
use crate::services::auth_service;
use crate::storage::SharedState;
use axum::extract::{Query, State};
use axum::Json;

pub async fn login(
    State(state): State<SharedState>,
    Json(request): Json<LoginRequest>,
) -> Json<ApiResponse<LoginResponse>> {
    let Ok(store) = state.lock() else {
        eprintln!("[api.login] state lock failed");
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    let response = auth_service::login(&store, request);
    if response.success {
        Json(ApiResponse::ok("login success", response))
    } else {
        Json(ApiResponse::error("LOGIN_FAILED", response.message))
    }
}

pub async fn register(
    State(state): State<SharedState>,
    Json(request): Json<RegisterRequest>,
) -> Json<RegisterResponse> {
    let Ok(mut store) = state.lock() else {
        eprintln!("[api.auth.register] state lock failed");
        return Json(RegisterResponse::error("服务状态暂不可用"));
    };
    Json(auth_service::register(&mut store, request))
}

pub async fn verify_auth(
    State(state): State<SharedState>,
    Json(request): Json<AuthVerifyRequest>,
) -> Json<ApiResponse<AuthVerifyResponse>> {
    let Ok(mut store) = state.lock() else {
        eprintln!("[api.auth.verify] state lock failed");
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    let response = auth_service::verify(&mut store, request);
    Json(ApiResponse::ok("auth verified", response))
}

pub async fn get_records(
    State(state): State<SharedState>,
    Query(query): Query<RecordQuery>,
) -> Json<ApiResponse<Vec<AuthRecord>>> {
    let Ok(store) = state.lock() else {
        eprintln!("[api.auth.records] state lock failed");
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    let records = store
        .records
        .iter()
        .filter(|item| match &query.result {
            Some(AuthResult::Success) => matches!(item.result, AuthResult::Success),
            Some(AuthResult::Failed) => matches!(item.result, AuthResult::Failed),
            None => true,
        })
        .filter(|item| match &query.risk {
            Some(RiskLevel::Low) => matches!(item.risk.risk_level, RiskLevel::Low),
            Some(RiskLevel::Medium) => matches!(item.risk.risk_level, RiskLevel::Medium),
            Some(RiskLevel::High) => matches!(item.risk.risk_level, RiskLevel::High),
            None => true,
        })
        .cloned()
        .collect();
    Json(ApiResponse::ok("records fetched", records))
}
