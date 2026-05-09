import type { AuthMethod, AuthRecord, AuthVerifyRequest } from '../models/Auth';
import type { LoginResult, UserRole } from '../models/User';
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { DeviceTrustManager } from "@bundle:com.example.campusauth/entry/ets/services/DeviceTrustManager";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { RiskService } from "@bundle:com.example.campusauth/entry/ets/services/RiskService";
export class AuthService {
    static login(account: string, password: string, role: UserRole): LoginResult {
        const user = MockData.users.find(item => item.account === account && item.role === role);
        if (!user) {
            return {
                success: false,
                message: '账号或角色不匹配'
            };
        }
        if (MockData.passwords.get(account) !== password) {
            return {
                success: false,
                message: '密码错误'
            };
        }
        return {
            success: true,
            message: '登录成功',
            user
        };
    }
    static verify(request: AuthVerifyRequest): AuthRecord {
        const user = MockData.users.find(item => item.id === request.userId) || MockData.users[0];
        const device = MockData.devices.find(item => item.id === request.deviceId);
        if (device) {
            DeviceTrustManager.refreshTrust(device);
        }
        const failedCount = MockData.records.filter(item => item.userId === request.userId && item.result === 'failed').length;
        const recentLocations = MockData.records
            .filter(item => item.userId === request.userId)
            .slice(0, 3)
            .map(item => item.location);
        const risk = RiskService.evaluate({
            hour: new Date().getHours(),
            trustedDevice: device?.trust.level === 'high' || request.method === 'qrcode',
            deviceTrustScore: device?.trust.score || 0,
            location: request.location,
            failedCount,
            authMethod: request.method,
            recentLocations
        });
        const result = risk.riskLevel === 'high' && request.method !== 'trusted_device' ? 'failed' : 'success';
        const record: AuthRecord = {
            id: `rec-${Date.now()}`,
            userId: user.id,
            userName: user.name,
            time: FormatUtil.nowText(),
            location: request.location,
            scene: request.scene,
            method: request.method,
            deviceName: device?.name || 'Unknown Device',
            result,
            status: result === 'success' ? 'success' : 'failed',
            risk
        };
        MockData.records.unshift(record);
        return record;
    }
    static recentRecords(userId?: string): AuthRecord[] {
        if (!userId) {
            return MockData.records;
        }
        return MockData.records.filter(item => item.userId === userId);
    }
    static methodOptions(): AuthMethod[] {
        return ['trusted_device', 'qrcode', 'nearby_bluetooth'];
    }
}
