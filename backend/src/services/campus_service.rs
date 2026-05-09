use crate::models::{
    AccessRule, AccessRuleUpdateRequest, AttendanceQuery, AttendanceSummary, AuthPermission,
    AuthPermissionUpdateRequest, BlacklistAddRequest, BlacklistEntry, BlacklistRemoveRequest,
    CampusTerminal, PassageRecord, PassageRecordQuery, RealtimeAuthEvent, StudentCertification,
    StudentQuery, StudentVerifyRequest, TerminalRegisterRequest,
};
use crate::storage::AppStore;
use chrono::Local;
use uuid::Uuid;

pub fn get_student_certifications(
    store: &AppStore,
    query: StudentQuery,
) -> Vec<StudentCertification> {
    store
        .student_certifications
        .iter()
        .filter(|item| {
            query
                .student_id
                .as_ref()
                .map(|student_id| item.student_id == *student_id)
                .unwrap_or(true)
        })
        .filter(|item| {
            query
                .user_id
                .as_ref()
                .map(|user_id| item.user_id == *user_id)
                .unwrap_or(true)
        })
        .cloned()
        .collect()
}

pub fn verify_student(
    store: &mut AppStore,
    request: StudentVerifyRequest,
) -> Option<StudentCertification> {
    let item = store
        .student_certifications
        .iter_mut()
        .find(|item| item.student_id == request.student_id && item.name == request.name)?;
    item.certification_status = "verified".to_string();
    item.updated_at = Local::now().format("%Y-%m-%d %H:%M").to_string();
    Some(item.clone())
}

pub fn list_devices(store: &AppStore, user_id: Option<String>) -> Vec<crate::models::Device> {
    store
        .devices
        .iter()
        .filter(|item| {
            user_id
                .as_ref()
                .map(|value| item.user_id == *value)
                .unwrap_or(true)
        })
        .cloned()
        .collect()
}

pub fn list_auth_permissions(store: &AppStore, user_id: Option<String>) -> Vec<AuthPermission> {
    store
        .auth_permissions
        .iter()
        .filter(|item| {
            user_id
                .as_ref()
                .map(|value| item.user_id == *value)
                .unwrap_or(true)
        })
        .cloned()
        .collect()
}

pub fn update_auth_permission(
    store: &mut AppStore,
    request: AuthPermissionUpdateRequest,
) -> Option<AuthPermission> {
    let item = store
        .auth_permissions
        .iter_mut()
        .find(|item| item.id == request.id)?;
    item.enabled = request.enabled;
    item.updated_at = Local::now().format("%Y-%m-%d %H:%M").to_string();
    Some(item.clone())
}

pub fn list_passage_records(store: &AppStore, query: PassageRecordQuery) -> Vec<PassageRecord> {
    store
        .passage_records
        .iter()
        .filter(|item| {
            query
                .student_id
                .as_ref()
                .map(|student_id| item.student_id == *student_id)
                .unwrap_or(true)
        })
        .filter(|item| {
            query
                .result
                .as_ref()
                .map(|result| {
                    std::mem::discriminant(&item.result) == std::mem::discriminant(result)
                })
                .unwrap_or(true)
        })
        .filter(|item| {
            query
                .risk
                .as_ref()
                .map(|risk| {
                    std::mem::discriminant(&item.risk_level) == std::mem::discriminant(risk)
                })
                .unwrap_or(true)
        })
        .cloned()
        .collect()
}

pub fn list_terminals(store: &AppStore) -> Vec<CampusTerminal> {
    store.terminals.clone()
}

pub fn register_terminal(store: &mut AppStore, request: TerminalRegisterRequest) -> CampusTerminal {
    let terminal = CampusTerminal {
        id: format!("term-{}", Uuid::new_v4().simple()),
        name: request.name,
        location: request.location,
        terminal_type: request.terminal_type,
        status: "online".to_string(),
        last_heartbeat: "刚刚".to_string(),
        registered_at: Local::now().format("%Y-%m-%d %H:%M").to_string(),
    };
    store.terminals.insert(0, terminal.clone());
    terminal
}

pub fn list_realtime_events(store: &AppStore) -> Vec<RealtimeAuthEvent> {
    store.realtime_events.clone()
}

pub fn list_attendance(store: &AppStore, query: AttendanceQuery) -> Vec<AttendanceSummary> {
    store
        .attendance_summaries
        .iter()
        .filter(|item| {
            query
                .college
                .as_ref()
                .map(|college| item.college.contains(college))
                .unwrap_or(true)
        })
        .cloned()
        .collect()
}

pub fn list_blacklist(store: &AppStore) -> Vec<BlacklistEntry> {
    store.blacklist.clone()
}

pub fn add_blacklist(store: &mut AppStore, request: BlacklistAddRequest) -> BlacklistEntry {
    let entry = BlacklistEntry {
        id: format!("bl-{}", Uuid::new_v4().simple()),
        student_id: request.student_id,
        name: request.name,
        reason: request.reason,
        risk_level: request.risk_level,
        active: true,
        created_at: Local::now().format("%Y-%m-%d %H:%M").to_string(),
    };
    store.blacklist.insert(0, entry.clone());
    entry
}

pub fn remove_blacklist(
    store: &mut AppStore,
    request: BlacklistRemoveRequest,
) -> Option<BlacklistEntry> {
    let index = store
        .blacklist
        .iter()
        .position(|item| item.id == request.id)?;
    Some(store.blacklist.remove(index))
}

pub fn list_access_rules(store: &AppStore) -> Vec<AccessRule> {
    store.access_rules.clone()
}

pub fn update_access_rule(
    store: &mut AppStore,
    request: AccessRuleUpdateRequest,
) -> Option<AccessRule> {
    let item = store
        .access_rules
        .iter_mut()
        .find(|item| item.id == request.id)?;
    item.enabled = request.enabled;
    item.updated_at = Local::now().format("%Y-%m-%d %H:%M").to_string();
    Some(item.clone())
}
