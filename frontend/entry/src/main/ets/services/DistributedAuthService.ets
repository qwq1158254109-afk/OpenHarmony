import { AuthRecord, AuthStatus } from '../models/Auth';
import { CampusDevice, DeviceLayoutMode } from '../models/Device';
import { DistributedDeviceService } from './DistributedDeviceService';

export interface CollaborationState {
  sourceDevice: string;
  targetDevice: string;
  status: AuthStatus;
  message: string;
  channel: string;
  layoutMode: DeviceLayoutMode;
}

export class DistributedAuthService {
  static discoverNearbyDevices(userId: string): CampusDevice[] {
    return DistributedDeviceService.discoverDevices(userId);
  }

  static publishAuthResult(record: AuthRecord, devices: CampusDevice[]): CollaborationState {
    const source = devices.length > 0 ? devices[0].name : 'OpenHarmony Phone';
    const target = devices.length > 1 ? devices[1].name : 'OpenHarmony Tablet';
    const targetDevice = devices.length > 1 ? devices[1] : devices[0];
    return {
      sourceDevice: source,
      targetDevice: target,
      status: record.status,
      message: `${target} 已同步 ${record.userName} 的认证结果：${record.result === 'success' ? '通过' : '未通过'}`,
      channel: 'soft_bus_mock',
      layoutMode: targetDevice ? DistributedDeviceService.layoutMode(targetDevice) : 'tablet'
    };
  }

  static syncAuthState(status: AuthStatus): CollaborationState {
    return {
      sourceDevice: 'OpenHarmony Phone',
      targetDevice: 'OpenHarmony Tablet',
      status,
      message: '正在通过分布式协同通道同步认证状态',
      channel: 'soft_bus_mock',
      layoutMode: 'tablet'
    };
  }
}
