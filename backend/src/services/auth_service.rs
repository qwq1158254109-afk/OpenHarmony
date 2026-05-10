use crate::models::{
    AuthMethod, AuthRecord, AuthResult, AuthVerifyRequest, AuthVerifyResponse, LoginRequest,
    LoginResponse, RegisterRequest, RegisterResponse, RegisteredUser, RiskLevel, RiskLog,
    User, UserRole,
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

pub fn register(store: &mut AppStore, request: RegisterRequest) -> RegisterResponse {
    let username = request.username.trim().to_string();
    let password = request.password.trim().to_string();
    let real_name = request.real_name.trim().to_string();
    let user_code = request.user_code.trim().to_string();
    let phone = normalize_optional(request.phone);
    let email = normalize_optional(request.email);

    if username.is_empty() {
        return RegisterResponse::error("用户名不能为空");
    }
    if username.len() < 4 || username.len() > 20 {
        return RegisterResponse::error("用户名长度应为 4 到 20 位");
    }
    if store.users.iter().any(|item| item.account == username) {
        return RegisterResponse::error("用户名已存在");
    }
    if password.is_empty() {
        return RegisterResponse::error("密码不能为空");
    }
    if password.len() < 6 {
        return RegisterResponse::error("密码长度不能少于 6 位");
    }
    if real_name.is_empty() {
        return RegisterResponse::error("姓名不能为空");
    }
    if user_code.is_empty() {
        return RegisterResponse::error("学号/工号不能为空");
    }
    if store.users.iter().any(|item| item.user_code == user_code) {
        return RegisterResponse::error("学号/工号已存在");
    }
    if matches!(request.role, UserRole::Admin) {
        return RegisterResponse::error("注册接口不允许创建管理员账号");
    }

    let now = Local::now().format("%Y-%m-%d %H:%M").to_string();
    let role = request.role;
    let id = format!(
        "u-{}-{}",
        if matches!(role, UserRole::Student) {
            "student"
        } else {
            "teacher"
        },
        Uuid::new_v4()
    );
    let (college, department) = if matches!(role, UserRole::Student) {
        ("计算机与信息工程学院".to_string(), "注册学生".to_string())
    } else {
        ("计算机与信息工程学院".to_string(), "注册教师".to_string())
    };

    let user = User {
        id: id.clone(),
        account: username.clone(),
        name: real_name.clone(),
        role: role.clone(),
        college,
        department,
        user_code: user_code.clone(),
        phone,
        email,
        created_at: now.clone(),
    };

    if matches!(role, UserRole::Student) {
        seed_student_defaults(store, &id, &user_code, &real_name, &now);
    }

    store.passwords.insert(username.clone(), password);
    store.users.push(user);

    RegisterResponse::ok(
        "注册成功",
        RegisteredUser {
            id,
            username,
            real_name,
            role,
            user_code,
        },
    )
}

fn normalize_optional(value: Option<String>) -> Option<String> {
    value
        .map(|item| item.trim().to_string())
        .filter(|item| !item.is_empty())
}

fn seed_student_defaults(store: &mut AppStore, user_id: &str, user_code: &str, real_name: &str, now: &str) {
    store.student_certifications.push(crate::models::StudentCertification {
        student_id: user_code.to_string(),
        user_id: user_id.to_string(),
        name: real_name.to_string(),
        college: "计算机与信息工程学院".to_string(),
        major: "注册学生".to_string(),
        grade: "2026".to_string(),
        certification_status: "verified".to_string(),
        identity_source: "用户注册 / 校园统一身份认证待同步".to_string(),
        updated_at: now.to_string(),
    });
    store.auth_permissions.extend([
        crate::models::AuthPermission {
            id: format!("perm-{}-classroom", Uuid::new_v4()),
            user_id: user_id.to_string(),
            scene: crate::models::CampusScene::ClassroomCheckin,
            scene_name: "教学楼无感签到".to_string(),
            enabled: true,
            risk_level: RiskLevel::Low,
            updated_at: now.to_string(),
        },
        crate::models::AuthPermission {
            id: format!("perm-{}-library", Uuid::new_v4()),
            user_id: user_id.to_string(),
            scene: crate::models::CampusScene::LibraryEntry,
            scene_name: "图书馆入馆认证".to_string(),
            enabled: true,
            risk_level: RiskLevel::Low,
            updated_at: now.to_string(),
        },
    ]);
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
