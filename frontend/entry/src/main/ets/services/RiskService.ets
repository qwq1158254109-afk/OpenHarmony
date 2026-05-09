import { AiRiskModel, RiskAbnormalType, RiskAssessment, RiskContext } from '../models/Risk';

class RuleBasedRiskModel implements AiRiskModel {
  predict(context: RiskContext): RiskAssessment {
    let score = 10;
    const reasons: string[] = [];
    const abnormalTypes: RiskAbnormalType[] = [];

    if (context.hour < 6 || context.hour >= 22) {
      score += 30;
      reasons.push('非正常校园活动时间');
      abnormalTypes.push('night_access');
    }
    if (!context.trustedDevice) {
      score += 25;
      reasons.push('陌生设备或设备可信度不足');
      abnormalTypes.push('unknown_device');
    } else if (context.deviceTrustScore < 70) {
      score += 12;
      reasons.push('设备可信评分偏低');
      abnormalTypes.push('unknown_device');
    }
    if (context.location.includes('实验室') || context.location.includes('机房')) {
      score += 18;
      reasons.push('访问敏感场所');
    }
    if (context.failedCount > 0) {
      score += Math.min(25, context.failedCount * 10);
      reasons.push(`近期失败 ${context.failedCount} 次`);
      if (context.failedCount >= 2) {
        abnormalTypes.push('continuous_failure');
      }
    }
    if (context.authMethod === 'nearby_bluetooth') {
      score += 8;
      reasons.push('蓝牙/近场认证需二次确认');
      abnormalTypes.push('weak_auth_method');
    }
    if (context.authMethod === 'qrcode' && !context.trustedDevice) {
      score += 10;
      reasons.push('二维码认证来自非可信设备');
      abnormalTypes.push('weak_auth_method');
    }
    if (context.recentLocations.length >= 2 && context.recentLocations.indexOf(context.location) < 0) {
      score += 20;
      reasons.push('短时间出现多地认证行为');
      abnormalTypes.push('multi_location_short_time');
    }

    score = Math.min(score, 100);

    if (score < 40) {
      return {
        riskScore: score,
        riskLevel: 'low',
        riskReason: reasons.length === 0 ? '认证环境稳定，风险较低' : reasons.join('、'),
        suggestion: '允许认证通过，记录本次认证行为用于后续画像。',
        abnormalTypes
      };
    }
    if (score < 70) {
      return {
        riskScore: score,
        riskLevel: 'medium',
        riskReason: reasons.join('、'),
        suggestion: '建议要求二次确认，并同步给平板端或管理员看板。',
        abnormalTypes
      };
    }
    return {
      riskScore: score,
      riskLevel: 'high',
      riskReason: reasons.join('、'),
      suggestion: '建议拦截认证请求，触发管理员复核和异常日志留存。',
      abnormalTypes
    };
  }
}

export class RiskService {
  private static model: AiRiskModel = new RuleBasedRiskModel();

  static evaluate(context: RiskContext): RiskAssessment {
    return RiskService.model.predict(context);
  }
}
