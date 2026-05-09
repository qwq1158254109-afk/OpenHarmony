use crate::models::{
    AccessRule, AccessRuleUpdateRequest, ApiResponse, AttendanceQuery, AttendanceSummary,
    AuthPermission, AuthPermissionQuery, AuthPermissionUpdateRequest, BlacklistAddRequest,
    BlacklistEntry, BlacklistRemoveRequest, CampusTerminal, Device, PassageRecord,
    PassageRecordQuery, RealtimeAuthEvent, StudentCertification, StudentQuery,
    StudentVerifyRequest, TerminalRegisterRequest,
};
use crate::services::campus_service;
use crate::storage::SharedState;
use axum::extract::{Query, State};
use axum::Json;

pub async fn student_certifications(
    State(state): State<SharedState>,
    Query(query): Query<StudentQuery>,
) -> Json<ApiResponse<Vec<StudentCertification>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "student certifications fetched",
        campus_service::get_student_certifications(&store, query),
    ))
}

pub async fn verify_student(
    State(state): State<SharedState>,
    Json(request): Json<StudentVerifyRequest>,
) -> Json<ApiResponse<StudentCertification>> {
    let Ok(mut store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    match campus_service::verify_student(&mut store, request) {
        Some(profile) => Json(ApiResponse::ok("student verified", profile)),
        None => Json(ApiResponse::error(
            "STUDENT_NOT_FOUND",
            "学生身份信息不存在或姓名不匹配",
        )),
    }
}

pub async fn list_devices(
    State(state): State<SharedState>,
    Query(query): Query<AuthPermissionQuery>,
) -> Json<ApiResponse<Vec<Device>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "devices fetched",
        campus_service::list_devices(&store, query.user_id),
    ))
}

pub async fn auth_permissions(
    State(state): State<SharedState>,
    Query(query): Query<AuthPermissionQuery>,
) -> Json<ApiResponse<Vec<AuthPermission>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "auth permissions fetched",
        campus_service::list_auth_permissions(&store, query.user_id),
    ))
}

pub async fn update_auth_permission(
    State(state): State<SharedState>,
    Json(request): Json<AuthPermissionUpdateRequest>,
) -> Json<ApiResponse<AuthPermission>> {
    let Ok(mut store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    match campus_service::update_auth_permission(&mut store, request) {
        Some(permission) => Json(ApiResponse::ok("auth permission updated", permission)),
        None => Json(ApiResponse::error(
            "AUTH_PERMISSION_NOT_FOUND",
            "无感认证权限不存在",
        )),
    }
}

pub async fn passage_records(
    State(state): State<SharedState>,
    Query(query): Query<PassageRecordQuery>,
) -> Json<ApiResponse<Vec<PassageRecord>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "passage records fetched",
        campus_service::list_passage_records(&store, query),
    ))
}

pub async fn terminals(State(state): State<SharedState>) -> Json<ApiResponse<Vec<CampusTerminal>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "terminals fetched",
        campus_service::list_terminals(&store),
    ))
}

pub async fn register_terminal(
    State(state): State<SharedState>,
    Json(request): Json<TerminalRegisterRequest>,
) -> Json<ApiResponse<CampusTerminal>> {
    let Ok(mut store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "terminal registered",
        campus_service::register_terminal(&mut store, request),
    ))
}

pub async fn terminal_realtime_events(
    State(state): State<SharedState>,
) -> Json<ApiResponse<Vec<RealtimeAuthEvent>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "realtime auth events fetched",
        campus_service::list_realtime_events(&store),
    ))
}

pub async fn admin_attendance(
    State(state): State<SharedState>,
    Query(query): Query<AttendanceQuery>,
) -> Json<ApiResponse<Vec<AttendanceSummary>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "attendance summaries fetched",
        campus_service::list_attendance(&store, query),
    ))
}

pub async fn blacklist(State(state): State<SharedState>) -> Json<ApiResponse<Vec<BlacklistEntry>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "blacklist fetched",
        campus_service::list_blacklist(&store),
    ))
}

pub async fn add_blacklist(
    State(state): State<SharedState>,
    Json(request): Json<BlacklistAddRequest>,
) -> Json<ApiResponse<BlacklistEntry>> {
    let Ok(mut store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "blacklist entry added",
        campus_service::add_blacklist(&mut store, request),
    ))
}

pub async fn remove_blacklist(
    State(state): State<SharedState>,
    Json(request): Json<BlacklistRemoveRequest>,
) -> Json<ApiResponse<BlacklistEntry>> {
    let Ok(mut store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    match campus_service::remove_blacklist(&mut store, request) {
        Some(entry) => Json(ApiResponse::ok("blacklist entry removed", entry)),
        None => Json(ApiResponse::error(
            "BLACKLIST_NOT_FOUND",
            "黑名单记录不存在",
        )),
    }
}

pub async fn access_rules(State(state): State<SharedState>) -> Json<ApiResponse<Vec<AccessRule>>> {
    let Ok(store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    Json(ApiResponse::ok(
        "access rules fetched",
        campus_service::list_access_rules(&store),
    ))
}

pub async fn update_access_rule(
    State(state): State<SharedState>,
    Json(request): Json<AccessRuleUpdateRequest>,
) -> Json<ApiResponse<AccessRule>> {
    let Ok(mut store) = state.lock() else {
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    match campus_service::update_access_rule(&mut store, request) {
        Some(rule) => Json(ApiResponse::ok("access rule updated", rule)),
        None => Json(ApiResponse::error(
            "ACCESS_RULE_NOT_FOUND",
            "门禁规则不存在",
        )),
    }
}
