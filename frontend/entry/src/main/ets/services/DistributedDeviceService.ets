import { CampusDevice, DeviceLayoutMode, DistributedDeviceEndpoint } from '../models/Device';
import { DeviceService } from './DeviceService';

export class DistributedDeviceService {
  static discoverDevices(userId: string): CampusDevice[] {
    return DeviceService.listDevices(userId)
      .filter(item => item.online)
      .sort((left, right) => DistributedDeviceService.priority(left) - DistributedDeviceService.priority(right));
  }

  static createEndpoint(userId: string): DistributedDeviceEndpoint {
    const devices = DistributedDeviceService.discoverDevices(userId);
    const fallbackDevice = DistributedDeviceService.fallbackDevice(userId);
    const localDevice = devices.find(item => item.type === 'phone') || devices[0] || fallbackDevice;
    const remoteDevice = devices.find(item => item.type === 'tablet') || devices.find(item => item.id !== localDevice.id) || localDevice;
    return {
      localDevice,
      remoteDevice,
      channel: 'soft_bus_mock',
      layoutMode: DistributedDeviceService.layoutMode(remoteDevice),
      capability: 'OpenHarmony 分布式软总线认证通道预留接口'
    };
  }

  static layoutMode(device: CampusDevice): DeviceLayoutMode {
    return device.type === 'tablet' ? 'tablet' : 'phone';
  }

  private static priority(device: CampusDevice): number {
    if (device.type === 'phone') {
      return 1;
    }
    if (device.type === 'tablet') {
      return 2;
    }
    return 3;
  }

  private static fallbackDevice(userId: string): CampusDevice {
    return {
      id: 'mock-phone-fallback',
      userId,
      name: 'OpenHarmony Phone',
      type: 'phone',
      deviceOs: 'OpenHarmony 6.0',
      distributedRole: 'auth_initiator',
      trusted: true,
      online: true,
      lastSeen: '刚刚',
      trust: {
        score: 80,
        level: 'high',
        hardwareAttestation: true,
        localCredential: true,
        proximityStable: true,
        lastVerified: '刚刚',
        factors: ['默认演示设备']
      }
    };
  }
}
