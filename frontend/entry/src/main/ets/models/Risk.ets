export type RiskLevel = 'low' | 'medium' | 'high';
export type RiskAbnormalType = 'unknown_device' | 'night_access' | 'continuous_failure' | 'multi_location_short_time' | 'weak_auth_method';

export interface RiskAssessment {
  riskScore: number;
  riskLevel: RiskLevel;
  riskReason: string;
  suggestion: string;
  abnormalTypes: RiskAbnormalType[];
}

export interface RiskContext {
  hour: number;
  trustedDevice: boolean;
  deviceTrustScore: number;
  location: string;
  failedCount: number;
  authMethod: string;
  recentLocations: string[];
}

export interface AiRiskModel {
  predict(context: RiskContext): RiskAssessment;
}
