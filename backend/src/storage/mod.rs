use crate::models::{
    AccessRule, AttendanceSummary, AuthMethod, AuthPermission, AuthRecord, AuthResult,
    BlacklistEntry, CampusScene, CampusTerminal, Device, DeviceTrustLevel, DeviceType,
    PassageRecord, RealtimeAuthEvent, RiskAssessment, RiskLevel, RiskLog, StudentCertification,
    User, UserRole,
};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

pub type SharedState = Arc<Mutex<AppStore>>;

#[derive(Debug)]
pub struct AppStore {
    pub users: Vec<User>,
    pub passwords: HashMap<String, String>,
    pub devices: Vec<Device>,
    pub records: Vec<AuthRecord>,
    pub risk_logs: Vec<RiskLog>,
    pub student_certifications: Vec<StudentCertification>,
    pub auth_permissions: Vec<AuthPermission>,
    pub passage_records: Vec<PassageRecord>,
    pub terminals: Vec<CampusTerminal>,
    pub realtime_events: Vec<RealtimeAuthEvent>,
    pub attendance_summaries: Vec<AttendanceSummary>,
    pub blacklist: Vec<BlacklistEntry>,
    pub access_rules: Vec<AccessRule>,
}

pub fn new_shared_state() -> SharedState {
    Arc::new(Mutex::new(seed_store()))
}

fn seed_store() -> AppStore {
    let users = vec![
        User {
            id: "u-student-001".to_string(),
            account: "student001".to_string(),
            name: "李明".to_string(),
            role: UserRole::Student,
            college: "计算机与信息工程学院".to_string(),
            department: "软件工程 2301 班".to_string(),
        },
        User {
            id: "u-teacher-001".to_string(),
            account: "teacher001".to_string(),
            name: "王老师".to_string(),
            role: UserRole::Teacher,
            college: "计算机与信息工程学院".to_string(),
            department: "智能软件实验室".to_string(),
        },
        User {
            id: "u-admin-001".to_string(),
            account: "admin001".to_string(),
            name: "系统管理员".to_string(),
            role: UserRole::Admin,
            college: "河南大学".to_string(),
            department: "智慧校园管理中心".to_string(),
        },
    ];

    let passwords = HashMap::from([
        ("student001".to_string(), "123456".to_string()),
        ("teacher001".to_string(), "123456".to_string()),
        ("admin001".to_string(), "123456".to_string()),
    ]);

    let devices = vec![
        Device {
            id: "phone-001".to_string(),
            user_id: "u-student-001".to_string(),
            name: "OpenHarmony Phone".to_string(),
            device_type: DeviceType::Phone,
            trusted: true,
            trust_score: 92,
            trust_level: DeviceTrustLevel::High,
            online: true,
            last_seen: "刚刚".to_string(),
        },
        Device {
            id: "tablet-001".to_string(),
            user_id: "u-student-001".to_string(),
            name: "OpenHarmony Tablet".to_string(),
            device_type: DeviceType::Tablet,
            trusted: true,
            trust_score: 86,
            trust_level: DeviceTrustLevel::High,
            online: true,
            last_seen: "2 分钟前".to_string(),
        },
    ];

    let low_risk = RiskAssessment {
        risk_score: 18,
        risk_level: RiskLevel::Low,
        risk_reason: "可信设备、常用教学楼、正常上课时间".to_string(),
        suggestion: "允许认证通过，持续记录行为画像。".to_string(),
        abnormal_types: vec![],
    };
    let high_risk = RiskAssessment {
        risk_score: 82,
        risk_level: RiskLevel::High,
        risk_reason: "夜间访问敏感区域，设备未标记为可信".to_string(),
        suggestion: "建议拦截认证并通知管理员复核。".to_string(),
        abnormal_types: vec!["night_access".to_string(), "unknown_device".to_string()],
    };

    let records = vec![
        AuthRecord {
            id: "rec-001".to_string(),
            user_id: "u-student-001".to_string(),
            user_name: "李明".to_string(),
            time: "2026-05-09 08:10".to_string(),
            location: "综合教学楼 A203".to_string(),
            scene: CampusScene::ClassroomCheckin,
            method: AuthMethod::TrustedDevice,
            device_name: "OpenHarmony Phone".to_string(),
            result: AuthResult::Success,
            risk: low_risk.clone(),
        },
        AuthRecord {
            id: "rec-002".to_string(),
            user_id: "u-teacher-001".to_string(),
            user_name: "王老师".to_string(),
            time: "2026-05-09 22:35".to_string(),
            location: "重点实验室 B102".to_string(),
            scene: CampusScene::LabAccess,
            method: AuthMethod::NearbyBluetooth,
            device_name: "Campus Watch".to_string(),
            result: AuthResult::Failed,
            risk: high_risk.clone(),
        },
    ];

    let student_certifications = vec![
        StudentCertification {
            student_id: "student001".to_string(),
            user_id: "u-student-001".to_string(),
            name: "李明".to_string(),
            college: "计算机与信息工程学院".to_string(),
            major: "软件工程 2301 班".to_string(),
            grade: "2023".to_string(),
            certification_status: "verified".to_string(),
            identity_source: "校园统一身份认证 / 教务系统同步".to_string(),
            updated_at: "2026-05-09 08:00".to_string(),
        },
        StudentCertification {
            student_id: "student002".to_string(),
            user_id: "u-student-002".to_string(),
            name: "赵同学".to_string(),
            college: "计算机与信息工程学院".to_string(),
            major: "网络工程 2302 班".to_string(),
            grade: "2023".to_string(),
            certification_status: "pending_review".to_string(),
            identity_source: "人工审核".to_string(),
            updated_at: "2026-05-09 09:20".to_string(),
        },
    ];

    let auth_permissions = vec![
        AuthPermission {
            id: "perm-001".to_string(),
            user_id: "u-student-001".to_string(),
            scene: CampusScene::ClassroomCheckin,
            scene_name: "教学楼无感签到".to_string(),
            enabled: true,
            risk_level: RiskLevel::Low,
            updated_at: "2026-05-09 08:00".to_string(),
        },
        AuthPermission {
            id: "perm-002".to_string(),
            user_id: "u-student-001".to_string(),
            scene: CampusScene::LibraryEntry,
            scene_name: "图书馆入馆认证".to_string(),
            enabled: true,
            risk_level: RiskLevel::Low,
            updated_at: "2026-05-09 08:00".to_string(),
        },
        AuthPermission {
            id: "perm-003".to_string(),
            user_id: "u-student-001".to_string(),
            scene: CampusScene::LabAccess,
            scene_name: "实验室夜间门禁".to_string(),
            enabled: false,
            risk_level: RiskLevel::High,
            updated_at: "2026-05-09 08:00".to_string(),
        },
    ];

    let passage_records = vec![
        PassageRecord {
            id: "pass-001".to_string(),
            student_id: "student001".to_string(),
            user_name: "李明".to_string(),
            device_id: "phone-001".to_string(),
            terminal_id: "term-002".to_string(),
            terminal_name: "教学楼 A203 签到屏".to_string(),
            location: "综合教学楼 A203".to_string(),
            result: AuthResult::Success,
            risk_level: RiskLevel::Low,
            time: "2026-05-09 08:10".to_string(),
        },
        PassageRecord {
            id: "pass-002".to_string(),
            student_id: "visitor009".to_string(),
            user_name: "临时访客".to_string(),
            device_id: "watch-017".to_string(),
            terminal_id: "term-003".to_string(),
            terminal_name: "实验室 B102 门禁".to_string(),
            location: "重点实验室 B102".to_string(),
            result: AuthResult::Failed,
            risk_level: RiskLevel::High,
            time: "2026-05-09 22:35".to_string(),
        },
    ];

    let terminals = vec![
        CampusTerminal {
            id: "term-001".to_string(),
            name: "图书馆北门闸机".to_string(),
            location: "图书馆北门".to_string(),
            terminal_type: "access_gate".to_string(),
            status: "online".to_string(),
            last_heartbeat: "3 秒前".to_string(),
            registered_at: "2026-05-01 09:00".to_string(),
        },
        CampusTerminal {
            id: "term-002".to_string(),
            name: "教学楼 A203 签到屏".to_string(),
            location: "综合教学楼 A203".to_string(),
            terminal_type: "attendance_screen".to_string(),
            status: "online".to_string(),
            last_heartbeat: "8 秒前".to_string(),
            registered_at: "2026-05-01 09:10".to_string(),
        },
        CampusTerminal {
            id: "term-003".to_string(),
            name: "实验室 B102 门禁".to_string(),
            location: "重点实验室 B102".to_string(),
            terminal_type: "lab_access".to_string(),
            status: "maintenance".to_string(),
            last_heartbeat: "12 分钟前".to_string(),
            registered_at: "2026-05-01 09:20".to_string(),
        },
    ];

    let realtime_events = vec![
        RealtimeAuthEvent {
            id: "rt-001".to_string(),
            terminal_id: "term-002".to_string(),
            terminal_name: "A203 签到屏".to_string(),
            student_id: "student001".to_string(),
            result: AuthResult::Success,
            latency_ms: 46,
            risk_level: RiskLevel::Low,
            time: "08:10:06".to_string(),
        },
        RealtimeAuthEvent {
            id: "rt-002".to_string(),
            terminal_id: "term-003".to_string(),
            terminal_name: "实验室门禁".to_string(),
            student_id: "visitor009".to_string(),
            result: AuthResult::Failed,
            latency_ms: 73,
            risk_level: RiskLevel::High,
            time: "22:35:02".to_string(),
        },
    ];

    let attendance_summaries = vec![
        AttendanceSummary {
            id: "att-001".to_string(),
            college: "计算机与信息工程学院".to_string(),
            course: "移动应用开发".to_string(),
            class_name: "软件工程 2301 班".to_string(),
            present_count: 45,
            total_count: 48,
            attendance_rate: 93.75,
            abnormal_count: 2,
            updated_at: "2026-05-09 08:30".to_string(),
        },
        AttendanceSummary {
            id: "att-002".to_string(),
            college: "计算机与信息工程学院".to_string(),
            course: "操作系统".to_string(),
            class_name: "网络工程 2302 班".to_string(),
            present_count: 40,
            total_count: 47,
            attendance_rate: 85.11,
            abnormal_count: 5,
            updated_at: "2026-05-09 10:30".to_string(),
        },
    ];

    let blacklist = vec![
        BlacklistEntry {
            id: "bl-001".to_string(),
            student_id: "visitor009".to_string(),
            name: "临时访客".to_string(),
            reason: "实验室高风险访问".to_string(),
            risk_level: RiskLevel::High,
            active: true,
            created_at: "2026-05-09 08:12".to_string(),
        },
        BlacklistEntry {
            id: "bl-002".to_string(),
            student_id: "student088".to_string(),
            name: "陈某".to_string(),
            reason: "连续认证失败".to_string(),
            risk_level: RiskLevel::Medium,
            active: true,
            created_at: "2026-05-08 21:30".to_string(),
        },
    ];

    let access_rules = vec![
        AccessRule {
            id: "rule-001".to_string(),
            name: "教学楼上课时段通行".to_string(),
            location: "教学楼".to_string(),
            time_range: "07:00-22:00".to_string(),
            risk_policy: "低风险自动通过".to_string(),
            enabled: true,
            updated_at: "2026-05-09 08:00".to_string(),
        },
        AccessRule {
            id: "rule-002".to_string(),
            name: "实验室夜间二次认证".to_string(),
            location: "重点实验室".to_string(),
            time_range: "22:00-06:00".to_string(),
            risk_policy: "中高风险拦截".to_string(),
            enabled: true,
            updated_at: "2026-05-09 08:00".to_string(),
        },
    ];

    AppStore {
        users,
        passwords,
        devices,
        records,
        risk_logs: vec![],
        student_certifications,
        auth_permissions,
        passage_records,
        terminals,
        realtime_events,
        attendance_summaries,
        blacklist,
        access_rules,
    }
}
