use crate::models::{
    AuthMethod, AuthRecord, AuthResult, CampusScene, Device, DeviceTrustLevel, DeviceType,
    RiskAssessment, RiskLevel, RiskLog, User, UserRole,
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

    let records = vec![AuthRecord {
        id: "rec-001".to_string(),
        user_id: "u-student-001".to_string(),
        user_name: "李明".to_string(),
        time: "2026-05-09 08:10".to_string(),
        location: "综合教学楼 A203".to_string(),
        scene: CampusScene::ClassroomCheckin,
        method: AuthMethod::TrustedDevice,
        device_name: "OpenHarmony Phone".to_string(),
        result: AuthResult::Success,
        risk: RiskAssessment {
            risk_score: 18,
            risk_level: RiskLevel::Low,
            risk_reason: "可信设备、常用教学楼、正常上课时间".to_string(),
            suggestion: "允许认证通过，持续记录行为画像。".to_string(),
            abnormal_types: vec![],
        },
    }];

    AppStore {
        users,
        passwords,
        devices,
        records,
        risk_logs: vec![],
    }
}
