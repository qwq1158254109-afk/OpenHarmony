import { CampusDevice, DeviceBindRequest, DeviceType } from '../models/Device';
import { DeviceTrustManager } from './DeviceTrustManager';
import { MockData } from './MockData';

export class DeviceService {
  static listDevices(userId: string): CampusDevice[] {
    return MockData.devices
      .filter(item => item.userId === userId)
      .map(item => DeviceTrustManager.refreshTrust(item));
  }

  static bindDevice(request: DeviceBindRequest): CampusDevice {
    const device: CampusDevice = {
      id: `${request.deviceType}-${Date.now()}`,
      userId: request.userId,
      name: request.deviceName,
      type: request.deviceType,
      deviceOs: request.deviceType === 'wearable' ? 'OpenHarmony Wearable' : 'OpenHarmony 6.0',
      distributedRole: request.deviceType === 'phone' ? 'auth_initiator' : 'result_display',
      trusted: request.trusted,
      online: true,
      lastSeen: '刚刚',
      trust: {
        score: 0,
        level: 'low',
        hardwareAttestation: false,
        localCredential: false,
        proximityStable: false,
        lastVerified: '刚刚',
        factors: []
      }
    };
    const trustedDevice = DeviceTrustManager.refreshTrust(device);
    MockData.devices.unshift(trustedDevice);
    return trustedDevice;
  }

  static removeDevice(deviceId: string): void {
    MockData.devices = MockData.devices.filter(item => item.id !== deviceId);
  }

  static toggleTrusted(deviceId: string): void {
    const device = MockData.devices.find(item => item.id === deviceId);
    if (device) {
      device.trusted = !device.trusted;
      DeviceTrustManager.refreshTrust(device);
    }
  }

  static nextDeviceName(type: DeviceType): string {
    if (type === 'tablet') {
      return 'OpenHarmony Tablet Pro';
    }
    if (type === 'wearable') {
      return 'Campus Watch';
    }
    return 'OpenHarmony Phone';
  }
}
