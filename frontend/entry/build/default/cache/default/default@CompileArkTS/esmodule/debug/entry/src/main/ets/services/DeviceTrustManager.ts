import type { AuthStatus } from '../models/Auth';
import type { CampusDevice, DeviceTrustLevel, DeviceTrustProfile } from '../models/Device';
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
export class DeviceTrustManager {
    static evaluate(device: CampusDevice): DeviceTrustProfile {
        let score = 20;
        const factors: string[] = [];
        if (device.trusted) {
            score += 30;
            factors.push('用户已标记为可信设备');
        }
        if (device.online) {
            score += 18;
            factors.push('设备在线');
        }
        if (device.type === 'phone' || device.type === 'tablet') {
            score += 12;
            factors.push(`${FormatUtil.deviceTypeLabel(device.type)}支持分布式协同`);
        }
        if (device.distributedRole === 'auth_initiator' || device.distributedRole === 'result_display') {
            score += 12;
            factors.push('已分配分布式认证角色');
        }
        if (device.deviceOs.includes('OpenHarmony')) {
            score += 8;
            factors.push('OpenHarmony 设备环境');
        }
        const normalizedScore = Math.min(score, 100);
        return {
            score: normalizedScore,
            level: DeviceTrustManager.levelOf(normalizedScore),
            hardwareAttestation: normalizedScore >= 70,
            localCredential: device.trusted,
            proximityStable: device.online && normalizedScore >= 60,
            lastVerified: '刚刚',
            factors
        };
    }
    static refreshTrust(device: CampusDevice): CampusDevice {
        device.trust = DeviceTrustManager.evaluate(device);
        device.trusted = device.trust.level === 'high';
        return device;
    }
    static levelOf(score: number): DeviceTrustLevel {
        if (score >= 75) {
            return 'high';
        }
        if (score >= 45) {
            return 'medium';
        }
        return 'low';
    }
    static label(level: DeviceTrustLevel): string {
        if (level === 'high') {
            return '高可信';
        }
        if (level === 'medium') {
            return '中可信';
        }
        return '低可信';
    }
    static badgeStatus(level: DeviceTrustLevel): AuthStatus {
        if (level === 'high') {
            return 'success';
        }
        if (level === 'medium') {
            return 'authenticating';
        }
        return 'failed';
    }
}
