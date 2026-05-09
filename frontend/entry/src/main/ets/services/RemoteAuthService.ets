import { AuthRecord, AuthStatus, AuthVerifyRequest } from '../models/Auth';
import { DistributedDeviceEndpoint } from '../models/Device';
import { AuthService } from './AuthService';
import { DistributedDeviceService } from './DistributedDeviceService';

export interface RemoteAuthSession {
  sessionId: string;
  endpoint: DistributedDeviceEndpoint;
  status: AuthStatus;
  message: string;
}

export class RemoteAuthService {
  static createSession(userId: string): RemoteAuthSession {
    const endpoint = DistributedDeviceService.createEndpoint(userId);
    return {
      sessionId: `remote-auth-${Date.now()}`,
      endpoint,
      status: 'authenticating',
      message: `${endpoint.localDevice.name} 发起认证，${endpoint.remoteDevice.name} 等待同步结果`
    };
  }

  static verifyFromRemote(request: AuthVerifyRequest): AuthRecord {
    return AuthService.verify(request);
  }

  static buildResultMessage(record: AuthRecord, session: RemoteAuthSession): string {
    const resultText = record.result === 'success' ? '通过' : '未通过';
    return `${session.endpoint.remoteDevice.name} 已接收远端认证结果：${resultText}`;
  }
}
