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

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct StudentCertification {
    pub student_id: String,
    pub user_id: String,
    pub name: String,
    pub college: String,
    pub major: String,
    pub grade: String,
    pub certification_status: String,
    pub identity_source: String,
    pub updated_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct StudentQuery {
    pub student_id: Option<String>,
    pub user_id: Option<String>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct StudentVerifyRequest {
    pub student_id: String,
    pub name: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AuthPermission {
    pub id: String,
    pub user_id: String,
    pub scene: CampusScene,
    pub scene_name: String,
    pub enabled: bool,
    pub risk_level: RiskLevel,
    pub updated_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct AuthPermissionQuery {
    pub user_id: Option<String>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct AuthPermissionUpdateRequest {
    pub id: String,
    pub enabled: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PassageRecord {
    pub id: String,
    pub student_id: String,
    pub user_name: String,
    pub device_id: String,
    pub terminal_id: String,
    pub terminal_name: String,
    pub location: String,
    pub result: AuthResult,
    pub risk_level: RiskLevel,
    pub time: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PassageRecordQuery {
    pub student_id: Option<String>,
    pub result: Option<AuthResult>,
    pub risk: Option<RiskLevel>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CampusTerminal {
    pub id: String,
    pub name: String,
    pub location: String,
    pub terminal_type: String,
    pub status: String,
    pub last_heartbeat: String,
    pub registered_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct TerminalRegisterRequest {
    pub name: String,
    pub location: String,
    pub terminal_type: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct RealtimeAuthEvent {
    pub id: String,
    pub terminal_id: String,
    pub terminal_name: String,
    pub student_id: String,
    pub result: AuthResult,
    pub latency_ms: u16,
    pub risk_level: RiskLevel,
    pub time: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AttendanceSummary {
    pub id: String,
    pub college: String,
    pub course: String,
    pub class_name: String,
    pub present_count: u16,
    pub total_count: u16,
    pub attendance_rate: f32,
    pub abnormal_count: u16,
    pub updated_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct AttendanceQuery {
    pub college: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct BlacklistEntry {
    pub id: String,
    pub student_id: String,
    pub name: String,
    pub reason: String,
    pub risk_level: RiskLevel,
    pub active: bool,
    pub created_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct BlacklistAddRequest {
    pub student_id: String,
    pub name: String,
    pub reason: String,
    pub risk_level: RiskLevel,
}

#[derive(Clone, Debug, Deserialize)]
pub struct BlacklistRemoveRequest {
    pub id: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AccessRule {
    pub id: String,
    pub name: String,
    pub location: String,
    pub time_range: String,
    pub risk_policy: String,
    pub enabled: bool,
    pub updated_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct AccessRuleUpdateRequest {
    pub id: String,
    pub enabled: bool,
}
