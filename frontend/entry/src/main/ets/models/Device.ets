export type DeviceType = 'phone' | 'tablet' | 'wearable';
export type DeviceTrustLevel = 'low' | 'medium' | 'high';
export type DistributedDeviceRole = 'auth_initiator' | 'auth_reviewer' | 'result_display';
export type DeviceLayoutMode = 'phone' | 'tablet';

export interface DeviceTrustProfile {
  score: number;
  level: DeviceTrustLevel;
  hardwareAttestation: boolean;
  localCredential: boolean;
  proximityStable: boolean;
  lastVerified: string;
  factors: string[];
}

export interface CampusDevice {
  id: string;
  userId: string;
  name: string;
  type: DeviceType;
  deviceOs: string;
  distributedRole: DistributedDeviceRole;
  trusted: boolean;
  online: boolean;
  lastSeen: string;
  trust: DeviceTrustProfile;
}

export interface DeviceBindRequest {
  userId: string;
  deviceName: string;
  deviceType: DeviceType;
  trusted: boolean;
}

export interface DistributedDeviceEndpoint {
  localDevice: CampusDevice;
  remoteDevice: CampusDevice;
  channel: 'soft_bus_mock' | 'nearby_mock' | 'cloud_relay_mock';
  layoutMode: DeviceLayoutMode;
  capability: string;
}
