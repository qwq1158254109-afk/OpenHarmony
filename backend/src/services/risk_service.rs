use crate::models::{AuthMethod, RiskAssessment, RiskLevel};

pub struct RiskInput {
    pub hour: u32,
    pub trusted_device: bool,
    pub device_trust_score: u8,
    pub location: String,
    pub failed_count: u8,
    pub auth_method: AuthMethod,
    pub recent_locations: Vec<String>,
}

pub trait MlRiskModel {
    fn predict(&self, input: &RiskInput) -> Option<RiskAssessment>;
}

pub struct PlaceholderMlRiskModel;

impl MlRiskModel for PlaceholderMlRiskModel {
    fn predict(&self, _input: &RiskInput) -> Option<RiskAssessment> {
        None
    }
}

pub fn evaluate(input: RiskInput) -> RiskAssessment {
    let ml_model = PlaceholderMlRiskModel;
    if let Some(result) = ml_model.predict(&input) {
        return result;
    }

    let mut score: u8 = 10;
    let mut reasons: Vec<String> = Vec::new();
    let mut abnormal_types: Vec<String> = Vec::new();

    if input.hour < 6 || input.hour >= 22 {
        score = score.saturating_add(30);
        reasons.push("非正常校园活动时间".to_string());
        abnormal_types.push("night_access".to_string());
    }
    if !input.trusted_device {
        score = score.saturating_add(25);
        reasons.push("陌生设备或设备可信度不足".to_string());
        abnormal_types.push("unknown_device".to_string());
    } else if input.device_trust_score < 70 {
        score = score.saturating_add(12);
        reasons.push("设备可信评分偏低".to_string());
        abnormal_types.push("unknown_device".to_string());
    }
    if input.location.contains("实验室") || input.location.contains("机房") {
        score = score.saturating_add(18);
        reasons.push("访问敏感场所".to_string());
    }
    if input.failed_count > 0 {
        score = score.saturating_add((input.failed_count * 10).min(25));
        reasons.push(format!("近期失败 {} 次", input.failed_count));
        if input.failed_count >= 2 {
            abnormal_types.push("continuous_failure".to_string());
        }
    }
    if matches!(input.auth_method, AuthMethod::NearbyBluetooth) {
        score = score.saturating_add(8);
        reasons.push("蓝牙/近场认证需二次确认".to_string());
        abnormal_types.push("weak_auth_method".to_string());
    }
    if matches!(input.auth_method, AuthMethod::Qrcode) && !input.trusted_device {
        score = score.saturating_add(10);
        reasons.push("二维码认证来自非可信设备".to_string());
        abnormal_types.push("weak_auth_method".to_string());
    }
    if input.recent_locations.len() >= 2 && !input.recent_locations.contains(&input.location) {
        score = score.saturating_add(20);
        reasons.push("短时间出现多地认证行为".to_string());
        abnormal_types.push("multi_location_short_time".to_string());
    }

    let level = if score < 40 {
        RiskLevel::Low
    } else if score < 70 {
        RiskLevel::Medium
    } else {
        RiskLevel::High
    };
    let suggestion = match &level {
        RiskLevel::Low => "允许认证通过，记录本次认证行为用于后续画像。",
        RiskLevel::Medium => "建议要求二次确认，并同步给管理员看板。",
        RiskLevel::High => "建议拦截认证请求，触发管理员复核和异常日志留存。",
    };

    RiskAssessment {
        risk_score: score.min(100),
        risk_level: level,
        risk_reason: if reasons.is_empty() {
            "认证环境稳定，风险较低".to_string()
        } else {
            reasons.join("、")
        },
        suggestion: suggestion.to_string(),
        abnormal_types,
    }
}
