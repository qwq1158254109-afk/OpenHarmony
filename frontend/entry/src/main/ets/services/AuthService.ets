import { AuthMethod, AuthRecord, AuthVerifyRequest } from '../models/Auth';
import {
  LoginResult,
  RegisterApiResponse,
  RegisteredUser,
  RegisterRequest,
  RegisterResponse,
  UserProfile,
  UserRole
} from '../models/User';
import { FormatUtil } from '../utils/FormatUtil';
import { ApiClient } from './ApiClient';
import { DeviceTrustManager } from './DeviceTrustManager';
import { MockData } from './MockData';
import { RiskService } from './RiskService';

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

  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    const rawResponse = await ApiClient.postJson(ApiClient.registerPath(), JSON.stringify(request));
    const apiResponse = JSON.parse(rawResponse) as RegisterApiResponse;
    if (apiResponse.code !== 200 || !apiResponse.data) {
      return {
        success: false,
        message: apiResponse.message || '注册失败'
      };
    }
    AuthService.saveRegisteredUser(apiResponse.data, request.password);
    return {
      success: true,
      message: apiResponse.message || '注册成功',
      user: apiResponse.data
    };
  }

  private static saveRegisteredUser(user: RegisteredUser, password: string): void {
    const exists = MockData.users.some((item: UserProfile) => item.account === user.username || item.id === user.id);
    if (!exists) {
      MockData.users.push({
        id: user.id,
        account: user.username,
        name: user.realName,
        role: user.role,
        college: '计算机与信息工程学院',
        department: user.role === 'student' ? `${user.userCode} · 注册学生` : `${user.userCode} · 注册教师`,
        avatarText: user.role === 'student' ? '学' : '师',
        userCode: user.userCode,
        distributedId: user.role === 'student' ? `DID-${user.userCode}` : undefined
      });
    }
    MockData.passwords.set(user.username, password);
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

  static recentRecordsByRole(user: UserProfile): AuthRecord[] {
    if (user.role === 'admin') {
      return MockData.records;
    }
    if (user.role === 'teacher') {
      return MockData.records.filter((item: AuthRecord) => {
        const recordUser = MockData.users.find((mockUser: UserProfile) => mockUser.id === item.userId);
        return recordUser?.role === 'student' && (item.scene === 'classroom_checkin' || item.scene === 'lab_access');
      });
    }
    return MockData.records.filter((item: AuthRecord) => item.userId === user.id);
  }

  static methodOptions(): AuthMethod[] {
    return ['trusted_device', 'qrcode', 'nearby_bluetooth'];
  }
}
