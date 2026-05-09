use crate::models::{
    AuthMethod, AuthRecord, AuthResult, AuthVerifyRequest, AuthVerifyResponse, LoginRequest,
    LoginResponse, RiskLevel, RiskLog,
};
use crate::services::risk_service::{evaluate, RiskInput};
use crate::storage::AppStore;
use chrono::{Local, Timelike};
use uuid::Uuid;

pub fn login(store: &AppStore, request: LoginRequest) -> LoginResponse {
    println!(
        "[login] account={}, role={:?}",
        request.account, request.role
    );
    let Some(user) = store
        .users
        .iter()
        .find(|item| item.account == request.account && item.role == request.role)
    else {
        return LoginResponse {
            success: false,
            message: "账号或角色不匹配".to_string(),
            user: None,
        };
    };

    if store.passwords.get(&request.account) != Some(&request.password) {
        return LoginResponse {
            success: false,
            message: "密码错误".to_string(),
            user: None,
        };
    }

    LoginResponse {
        success: true,
        message: "login success".to_string(),
        user: Some(user.clone()),
    }
}

pub fn verify(store: &mut AppStore, request: AuthVerifyRequest) -> AuthVerifyResponse {
    let request_method = request.method.clone();
    let request_scene = request.scene.clone();
    let request_location = request.location.clone();
    let request_device_id = request.device_id.clone();
    println!(
        "[auth.verify] user_id={}, device_id={}, location={}",
        request.user_id, request_device_id, request_location
    );
    let user = store
        .users
        .iter()
        .find(|item| item.id == request.user_id)
        .cloned()
        .unwrap_or_else(|| store.users[0].clone());
    let device = store
        .devices
        .iter()
        .find(|item| item.id == request_device_id.as_str())
        .cloned();
    let failed_count = store
        .records
        .iter()
        .filter(|item| item.user_id == user.id && matches!(item.result, AuthResult::Failed))
        .count() as u8;
    let recent_locations = store
        .records
        .iter()
        .filter(|item| item.user_id == user.id)
        .take(3)
        .map(|item| item.location.clone())
        .collect::<Vec<_>>();
    let trusted_device = device.as_ref().map(|item| item.trusted).unwrap_or(false)
        || matches!(request_method, AuthMethod::Qrcode);
    let risk = evaluate(RiskInput {
        hour: Local::now().hour(),
        trusted_device,
        device_trust_score: device.as_ref().map(|item| item.trust_score).unwrap_or(0),
        location: request_location.clone(),
        failed_count,
        auth_method: request_method.clone(),
        recent_locations,
    });
    let result = if matches!(risk.risk_level, RiskLevel::High)
        && !matches!(request_method, AuthMethod::TrustedDevice)
    {
        AuthResult::Failed
    } else {
        AuthResult::Success
    };
    let success = matches!(result, AuthResult::Success);
    let record_id = Uuid::new_v4().to_string();
    let now = Local::now().format("%Y-%m-%d %H:%M").to_string();
    let record = AuthRecord {
        id: record_id.clone(),
        user_id: user.id,
        user_name: user.name,
        time: now.clone(),
        location: request_location,
        scene: request_scene,
        method: request_method,
        device_name: device
            .map(|item| item.name)
            .unwrap_or_else(|| "Unknown Device".to_string()),
        result,
        risk,
    };

    store.risk_logs.insert(
        0,
        RiskLog {
            id: Uuid::new_v4().to_string(),
            user_id: record.user_id.clone(),
            device_id: request_device_id,
            auth_record_id: record_id,
            time: now,
            risk: record.risk.clone(),
        },
    );
    store.records.insert(0, record.clone());
    println!(
        "[auth.verify] result={:?}, risk_score={}, risk_level={:?}",
        record.result, record.risk.risk_score, record.risk.risk_level
    );

    AuthVerifyResponse {
        success,
        message: if success {
            "auth success".to_string()
        } else {
            "auth failed by risk policy".to_string()
        },
        record,
    }
}
