use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize)]
pub struct ApiResponse<T>
where
    T: Serialize,
{
    pub success: bool,
    pub code: String,
    pub message: String,
    pub data: Option<T>,
}

impl<T> ApiResponse<T>
where
    T: Serialize,
{
    pub fn ok(message: impl Into<String>, data: T) -> Self {
        Self {
            success: true,
            code: "OK".to_string(),
            message: message.into(),
            data: Some(data),
        }
    }

    pub fn error(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            success: false,
            code: code.into(),
            message: message.into(),
            data: None,
        }
    }
}

#[derive(Clone, Debug, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum UserRole {
    Student,
    Teacher,
    Admin,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct User {
    pub id: String,
    pub account: String,
    pub name: String,
    pub role: UserRole,
    pub college: String,
    pub department: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct LoginRequest {
    pub account: String,
    pub password: String,
    pub role: UserRole,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct LoginResponse {
    pub success: bool,
    pub message: String,
    pub user: Option<User>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum DeviceType {
    Phone,
    Tablet,
    Wearable,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum DeviceTrustLevel {
    Low,
    Medium,
    High,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Device {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub device_type: DeviceType,
    pub trusted: bool,
    pub trust_score: u8,
    pub trust_level: DeviceTrustLevel,
    pub online: bool,
    pub last_seen: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct DeviceBindRequest {
    pub user_id: String,
    pub device_name: String,
    pub device_type: DeviceType,
    pub trusted: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct DeviceBindResponse {
    pub success: bool,
    pub message: String,
    pub device: Device,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum AuthMethod {
    Qrcode,
    TrustedDevice,
    NearbyBluetooth,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum CampusScene {
    Attendance,
    LabAccess,
    LibraryEntry,
    ClassroomCheckin,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum AuthResult {
    Success,
    Failed,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum RiskLevel {
    Low,
    Medium,
    High,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct RiskAssessment {
    pub risk_score: u8,
    pub risk_level: RiskLevel,
    pub risk_reason: String,
    pub suggestion: String,
    pub abnormal_types: Vec<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AuthVerifyRequest {
    pub user_id: String,
    pub method: AuthMethod,
    pub scene: CampusScene,
    pub location: String,
    pub device_id: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AuthRecord {
    pub id: String,
    pub user_id: String,
    pub user_name: String,
    pub time: String,
    pub location: String,
    pub scene: CampusScene,
    pub method: AuthMethod,
    pub device_name: String,
    pub result: AuthResult,
    pub risk: RiskAssessment,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct RiskLog {
    pub id: String,
    pub user_id: String,
    pub device_id: String,
    pub auth_record_id: String,
    pub time: String,
    pub risk: RiskAssessment,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AuthVerifyResponse {
    pub success: bool,
    pub message: String,
    pub record: AuthRecord,
}

#[derive(Clone, Debug, Deserialize)]
pub struct RecordQuery {
    pub result: Option<AuthResult>,
    pub risk: Option<RiskLevel>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct RiskScoreQuery {
    pub user_id: Option<String>,
    pub device_id: Option<String>,
    pub location: Option<String>,
    pub failed_count: Option<u8>,
    pub method: Option<AuthMethod>,
}
