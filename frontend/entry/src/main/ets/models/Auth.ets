import { RiskAssessment } from './Risk';

export type AuthStatus = 'unauthenticated' | 'authenticating' | 'success' | 'failed';
export type AuthMethod = 'qrcode' | 'trusted_device' | 'nearby_bluetooth';
export type CampusScene = 'attendance' | 'lab_access' | 'library_entry' | 'classroom_checkin';

export interface AuthVerifyRequest {
  userId: string;
  method: AuthMethod;
  scene: CampusScene;
  location: string;
  deviceId: string;
}

export interface AuthRecord {
  id: string;
  userId: string;
  userName: string;
  time: string;
  location: string;
  scene: CampusScene;
  method: AuthMethod;
  deviceName: string;
  result: 'success' | 'failed';
  status: AuthStatus;
  risk: RiskAssessment;
}

export interface AuthFlowStep {
  title: string;
  description: string;
  completed: boolean;
}
