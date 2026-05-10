export class AppColors {
  static readonly background: string = '#EEF4F8';
  static readonly surface: string = '#FFFFFF';
  static readonly surfaceSoft: string = '#F8FBFD';
  static readonly hero: string = '#123C52';
  static readonly primary: string = '#176B87';
  static readonly primaryDark: string = '#0F5068';
  static readonly accent: string = '#2D9CDB';
  static readonly cyanSoft: string = '#E8F7FC';
  static readonly success: string = '#1B8A5A';
  static readonly successSoft: string = '#EAF7F0';
  static readonly warning: string = '#B7791F';
  static readonly warningSoft: string = '#FFF7E8';
  static readonly danger: string = '#C53030';
  static readonly dangerSoft: string = '#FFF0F0';
  static readonly text: string = '#17202A';
  static readonly muted: string = '#687386';
  static readonly border: string = '#D9E2EC';
  static readonly borderStrong: string = '#B9C8D6';
}

export class AppLayout {
  static readonly pageMaxWidth: number = 1040;
  static readonly cardRadius: number = 8;
  static readonly pagePadding: number = 16;
}

export class AppRoutes {
  static readonly login: string = 'pages/LoginPage';
  static readonly register: string = 'pages/RegisterPage';
  static readonly dashboard: string = 'pages/DashboardPage';
  static readonly overview: string = 'pages/OverviewPage';
  static readonly defenseDemo: string = 'pages/DefenseDemoPage';
  static readonly auth: string = 'pages/AuthPage';
  static readonly records: string = 'pages/RecordsPage';
  static readonly devices: string = 'pages/DevicePage';
  static readonly admin: string = 'pages/AdminPage';
  static readonly studentRealName: string = 'pages/StudentRealNamePage';
  static readonly deviceBind: string = 'pages/DeviceBindPage';
  static readonly authPermission: string = 'pages/AuthPermissionPage';
  static readonly passageRecords: string = 'pages/PassageRecordsPage';
  static readonly attendanceStats: string = 'pages/AttendanceStatsPage';
  static readonly watchTodayAttendance: string = 'pages/WatchTodayAttendancePage';
  static readonly watchPassageRecords: string = 'pages/WatchPassageRecordsPage';
  static readonly terminalFiling: string = 'pages/TerminalFilingPage';
  static readonly terminalRealtimeScreen: string = 'pages/TerminalRealtimeScreenPage';
  static readonly adminAttendanceStats: string = 'pages/AdminAttendanceStatsPage';
  static readonly adminPermission: string = 'pages/AdminPermissionPage';
  static readonly accessRuleConfig: string = 'pages/AccessRuleConfigPage';
  static readonly blacklist: string = 'pages/BlacklistPage';
}
