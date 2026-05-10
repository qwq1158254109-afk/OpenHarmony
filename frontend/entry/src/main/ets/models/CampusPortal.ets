import { RiskLevel } from './Risk';
import { UserRole } from './User';

export type PageLoadState = 'loading' | 'ready' | 'empty' | 'error';
export type PortalStatus = 'success' | 'warning' | 'danger' | 'info';

export interface PortalStat {
  title: string;
  value: string;
  hint: string;
  status: PortalStatus;
}

export interface PortalAction {
  id: string;
  title: string;
  subtitle: string;
  marker: string;
  route: string;
  status: PortalStatus;
  roles: UserRole[];
}

export interface RealNameProfile {
  studentId: string;
  name: string;
  college: string;
  major: string;
  status: string;
  credential: string;
}

export interface BoundDeviceInfo {
  id: string;
  name: string;
  owner: string;
  type: string;
  trustLevel: string;
  online: boolean;
}

export interface AuthPermissionOption {
  id: string;
  name: string;
  scene: string;
  enabled: boolean;
  riskLevel: RiskLevel;
}

export interface PassageRecordItem {
  id: string;
  studentId: string;
  deviceId: string;
  place: string;
  result: string;
  time: string;
  riskLevel: RiskLevel;
}

export interface AttendanceMetric {
  id: string;
  course: string;
  attended: number;
  total: number;
  latestTime: string;
}

export interface WatchAttendanceItem {
  id: string;
  title: string;
  time: string;
  place: string;
  status: string;
}

export interface TerminalDeviceRecord {
  id: string;
  name: string;
  place: string;
  status: string;
  lastHeartbeat: string;
}

export interface RealtimeAuthEvent {
  id: string;
  terminal: string;
  studentId: string;
  result: string;
  latency: string;
  time: string;
  riskLevel: RiskLevel;
}

export interface AdminPermissionItem {
  id: string;
  role: string;
  scope: string;
  owner: string;
  enabled: boolean;
}

export interface AccessRuleItem {
  id: string;
  name: string;
  place: string;
  timeRange: string;
  riskPolicy: string;
  enabled: boolean;
}

export interface BlacklistItem {
  id: string;
  studentId: string;
  name: string;
  reason: string;
  level: RiskLevel;
  createdAt: string;
}

export type DemoScenarioType = 'student_gate_success' | 'blacklist_block' | 'late_return_alert' | 'teacher_export' | 'watch_permission_sync';

export interface DefenseDemoScenario {
  id: DemoScenarioType;
  title: string;
  subtitle: string;
  buttonText: string;
  marker: string;
  status: PortalStatus;
}

export interface DefenseDemoResult {
  title: string;
  summary: string;
  detail: string;
  status: PortalStatus;
  timestamp: string;
}

export interface DefenseDemoLog {
  id: string;
  scenarioTitle: string;
  message: string;
  result: string;
  timestamp: string;
  status: PortalStatus;
}
