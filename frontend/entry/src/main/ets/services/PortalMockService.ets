import {
  AccessRuleItem,
  AdminPermissionItem,
  AttendanceMetric,
  AuthPermissionOption,
  BlacklistItem,
  BoundDeviceInfo,
  ClassAuthDetail,
  DefenseDemoResult,
  DefenseDemoScenario,
  DemoScenarioType,
  PassageRecordItem,
  PortalAction,
  PortalStat,
  RealNameProfile,
  RealtimeAuthEvent,
  StudentAuthRecord,
  TerminalDeviceRecord,
  WatchAttendanceItem
} from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

export class PortalMockService {
  static overviewStats(user?: UserProfile): PortalStat[] {
    if (user?.role === 'student') {
      return [
        { title: '认证状态', value: '已认证', hint: '校园统一身份认证已同步', status: 'success' },
        { title: '我的设备', value: `${PortalMockService.boundDevices(user).length}`, hint: '仅展示本人绑定设备', status: 'info' },
        { title: '异常提醒', value: '0', hint: '本人账号暂无高风险异常', status: 'success' },
        { title: '通行状态', value: '可通行', hint: '教学楼、图书馆授权有效', status: 'success' }
      ];
    }
    if (user?.role === 'teacher') {
      return [
        { title: '班级认证', value: '48', hint: '移动应用开发课程学生', status: 'info' },
        { title: '课堂签到', value: '45/48', hint: '今日 08:10 签到概况', status: 'success' },
        { title: '学生异常', value: '2', hint: '仅课程范围内提醒', status: 'warning' },
        { title: '教学场景', value: '4', hint: '课堂、实验、考勤、请假', status: 'info' }
      ];
    }
    return [
      { title: '今日认证', value: '286', hint: '无感认证成功率 98.6%', status: 'success' },
      { title: '在线设备', value: '42', hint: '手表、门禁、教学终端', status: 'info' },
      { title: '风险事件', value: '7', hint: '高风险 1 条，中风险 6 条', status: 'warning' },
      { title: '黑名单', value: '3', hint: '门禁策略实时生效', status: 'danger' }
    ];
  }

  static studentActions(): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole('student', [
      { id: 'my-auth-status', title: '身份认证状态', subtitle: '查看本人实名身份和认证状态', marker: 'ID', route: AppRoutes.studentRealName, status: 'success', roles: ['student'] },
      { id: 'my-devices', title: '我的设备', subtitle: '绑定手机、手表和平板', marker: 'DV', route: AppRoutes.deviceBind, status: 'info', roles: ['student'] },
      { id: 'my-auth-settings', title: '我的授权设置', subtitle: '管理本人校园身份认证授权场景', marker: 'AU', route: AppRoutes.authPermission, status: 'warning', roles: ['student'] },
      { id: 'my-auth-records', title: '我的认证记录', subtitle: '查看本人近期认证、通行和设备登录记录', marker: 'RE', route: AppRoutes.passageRecords, status: 'info', roles: ['student'] },
      { id: 'my-risk-alerts', title: '个人风险提醒', subtitle: '查看本人账号、设备、登录环境异常', marker: 'RA', route: AppRoutes.records, status: 'warning', roles: ['student'] },
      { id: 'campus-passage-status', title: '校园通行状态', subtitle: '查看本人门禁、图书馆和教学楼通行状态', marker: 'PS', route: AppRoutes.auth, status: 'success', roles: ['student'] }
    ]);
  }

  static teacherActions(): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole('teacher', [
      { id: 'class-auth-overview', title: '班级认证概况', subtitle: '查看课程范围内认证完成情况', marker: 'CL', route: AppRoutes.attendanceStats, status: 'success', roles: ['teacher'] },
      { id: 'student-alerts', title: '学生异常提醒', subtitle: '仅展示任课班级认证异常', marker: 'AL', route: AppRoutes.records, status: 'warning', roles: ['teacher'] },
      { id: 'class-checkin-records', title: '课堂签到记录', subtitle: '查看教学场景签到与认证记录', marker: 'CK', route: AppRoutes.passageRecords, status: 'info', roles: ['teacher'] },
      { id: 'teaching-auth', title: '教学场景认证', subtitle: '课堂、实验室、课程考勤认证', marker: 'TA', route: AppRoutes.auth, status: 'success', roles: ['teacher'] }
    ]);
  }

  static watchActions(): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole('student', [
      { id: 'watch-attendance', title: '手表端今日考勤', subtitle: '轻量化考勤提醒', marker: 'WA', route: AppRoutes.watchTodayAttendance, status: 'success', roles: ['student'] },
      { id: 'watch-passage', title: '手表端通行记录', subtitle: '查看本人近场通行反馈', marker: 'WR', route: AppRoutes.watchPassageRecords, status: 'info', roles: ['student'] }
    ]);
  }

  static terminalActions(): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole('admin', [
      { id: 'terminal-filing', title: '设备接入管理', subtitle: '登记门禁、签到屏和认证终端', marker: 'TF', route: AppRoutes.terminalFiling, status: 'info', roles: ['admin'] },
      { id: 'terminal-realtime', title: '全局认证大屏', subtitle: '实时显示全校认证态势', marker: 'RT', route: AppRoutes.terminalRealtimeScreen, status: 'success', roles: ['admin'] }
    ]);
  }

  static adminActions(): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole('admin', [
      { id: 'global-risk', title: '全局风险评估', subtitle: '查看全校认证风险和异常行为', marker: 'RS', route: AppRoutes.admin, status: 'warning', roles: ['admin'] },
      { id: 'user-permission', title: '用户权限管理', subtitle: '配置角色与操作范围', marker: 'PM', route: AppRoutes.adminPermission, status: 'warning', roles: ['admin'] },
      { id: 'device-management', title: '设备管理', subtitle: '管理终端接入和设备备案', marker: 'DV', route: AppRoutes.terminalFiling, status: 'info', roles: ['admin'] },
      { id: 'system-audit', title: '系统审计记录', subtitle: '审计认证、门禁和风险处置记录', marker: 'LG', route: AppRoutes.records, status: 'danger', roles: ['admin'] },
      { id: 'data-statistics', title: '数据统计', subtitle: '按学院和课程汇总出勤', marker: 'AS', route: AppRoutes.adminAttendanceStats, status: 'success', roles: ['admin'] },
      { id: 'risk-policy', title: '风险策略配置', subtitle: '管理通行时间和风控策略', marker: 'AR', route: AppRoutes.accessRuleConfig, status: 'info', roles: ['admin'] },
      { id: 'blacklist', title: '黑名单管理', subtitle: '高风险账号限制通行', marker: 'BL', route: AppRoutes.blacklist, status: 'danger', roles: ['admin'] }
    ]);
  }

  static demoActions(): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole('admin', [
      { id: 'defense-demo', title: '答辩演示模式', subtitle: '一键模拟校门认证、黑名单拦截、晚归提醒、考勤导出和手表同步', marker: 'DE', route: AppRoutes.defenseDemo, status: 'success', roles: ['admin'] }
    ]);
  }

  static defenseDemoScenarios(): DefenseDemoScenario[] {
    return [
      {
        id: 'student_gate_success',
        title: '学生靠近校门',
        subtitle: '模拟学生携带可信手机靠近校门，终端完成无感认证并放行。',
        buttonText: '模拟认证成功',
        marker: '01',
        status: 'success'
      },
      {
        id: 'blacklist_block',
        title: '黑名单设备靠近',
        subtitle: '模拟黑名单设备触发门禁风控，终端拦截并写入风险日志。',
        buttonText: '模拟拦截',
        marker: '02',
        status: 'danger'
      },
      {
        id: 'late_return_alert',
        title: '学生晚归提醒',
        subtitle: '模拟学生夜间回宿舍，系统通知辅导员并生成晚归提醒。',
        buttonText: '模拟晚归提醒',
        marker: '03',
        status: 'warning'
      },
      {
        id: 'teacher_export',
        title: '教师导出考勤表',
        subtitle: '模拟教师按课程导出考勤汇总表，不依赖真实文件系统。',
        buttonText: '模拟导出',
        marker: '04',
        status: 'info'
      },
      {
        id: 'watch_permission_sync',
        title: '手机权限同步到手表',
        subtitle: '模拟手机端认证权限通过分布式通道同步到鸿蒙手表。',
        buttonText: '模拟同步',
        marker: '05',
        status: 'success'
      }
    ];
  }

  static defenseDemoResult(type: DemoScenarioType): DefenseDemoResult {
    const timestamp = PortalMockService.nowText();
    if (type === 'student_gate_success') {
      return {
        title: '校门认证成功',
        summary: 'student001 已通过南门终端无感认证',
        detail: '可信手机 phone-001 被识别，风险评分 18，门禁终端返回放行结果。',
        status: 'success',
        timestamp
      };
    }
    if (type === 'blacklist_block') {
      return {
        title: '黑名单拦截',
        summary: 'visitor009 设备被南门终端拦截',
        detail: '设备 watch-017 命中黑名单，风险等级高，已写入风险日志并提示管理员。',
        status: 'danger',
        timestamp
      };
    }
    if (type === 'late_return_alert') {
      return {
        title: '晚归提醒已触发',
        summary: 'student001 23:42 返回宿舍',
        detail: '系统识别为晚归场景，已通知辅导员端并保留学生通行记录。',
        status: 'warning',
        timestamp
      };
    }
    if (type === 'teacher_export') {
      return {
        title: '考勤表导出完成',
        summary: '王老师导出移动应用开发课程考勤表',
        detail: '导出 48 人考勤记录，出勤率 93.75%，异常 2 条，生成模拟文件 attendance_20260509.xlsx。',
        status: 'info',
        timestamp
      };
    }
    return {
      title: '权限同步完成',
      summary: '手机端权限已同步到鸿蒙手表',
      detail: '手机 phone-001 将教学楼签到和图书馆入馆权限同步到 watch-008，手表端可离线展示权限摘要。',
      status: 'success',
      timestamp
    };
  }

  private static nowText(): string {
    const date = new Date();
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    const second = `${date.getSeconds()}`.padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  }

  static realNameProfile(user?: UserProfile): RealNameProfile {
    return {
      studentId: user?.account || 'student001',
      name: user?.name || '李明',
      college: '软件学院',
      major: user?.department || '软件工程 2301 班',
      status: '已完成实名认证',
      credential: '校园统一身份认证 / 教务系统同步'
    };
  }

  static boundDevices(user?: UserProfile): BoundDeviceInfo[] {
    const owner = user?.name || '李明';
    const devices: BoundDeviceInfo[] = [
      { id: 'phone-001', name: 'OpenHarmony Phone', owner: '李明', type: '手机', trustLevel: '高可信', online: true },
      { id: 'watch-008', name: 'Campus Watch', owner: '李明', type: '手表', trustLevel: '中可信', online: true },
      { id: 'pad-102', name: 'OpenHarmony Tablet', owner: '李明', type: '平板', trustLevel: '高可信', online: false }
    ];
    return devices.map((item: BoundDeviceInfo) => {
      return {
        id: item.id,
        name: item.name,
        owner: owner,
        type: item.type,
        trustLevel: item.trustLevel,
        online: item.online
      } as BoundDeviceInfo;
    });
  }

  static authPermissions(user?: UserProfile): AuthPermissionOption[] {
    if (user && user.role !== 'student') {
      return [];
    }
    return [
      { id: 'p1', name: '教学楼无感签到', scene: '综合教学楼 / 信息楼', enabled: true, riskLevel: 'low' },
      { id: 'p2', name: '图书馆入馆认证', scene: '图书馆闸机', enabled: true, riskLevel: 'low' },
      { id: 'p3', name: '实验室夜间门禁', scene: '重点实验室', enabled: false, riskLevel: 'high' }
    ];
  }

  static passageRecords(user?: UserProfile): PassageRecordItem[] {
    const records: PassageRecordItem[] = [
      { id: 'pr-001', studentId: 'student001', deviceId: 'phone-001', place: '综合教学楼 A203', result: '成功', time: '2026-05-09 08:10', riskLevel: 'low' },
      { id: 'pr-002', studentId: 'student001', deviceId: 'watch-008', place: '图书馆北门', result: '成功', time: '2026-05-09 09:02', riskLevel: 'low' },
      { id: 'pr-003', studentId: 'student018', deviceId: 'phone-018', place: '综合教学楼 A203', result: '异常提醒', time: '2026-05-09 08:16', riskLevel: 'medium' }
    ];
    if (!user) {
      return records;
    }
    if (PermissionUtil.isStudent(user.role)) {
      return records.filter((item: PassageRecordItem) => item.studentId === user.account);
    }
    if (PermissionUtil.isTeacher(user.role)) {
      return records.filter((item: PassageRecordItem) => item.place.includes('教学楼'));
    }
    return records;
  }

  static attendanceMetrics(user?: UserProfile): AttendanceMetric[] {
    if (user?.role === 'teacher') {
      return [
        { id: 'tc1', course: '移动应用开发 2301 班', attended: 45, total: 48, latestTime: '今天 08:10' },
        { id: 'tc2', course: '软件工程实践 2302 班', attended: 43, total: 46, latestTime: '昨天 14:00' },
        { id: 'tc3', course: '实验室安全认证', attended: 28, total: 30, latestTime: '今天 16:00' }
      ];
    }
    return [
      { id: 'c1', course: '移动应用开发', attended: 15, total: 16, latestTime: '今天 08:10' },
      { id: 'c2', course: '操作系统', attended: 13, total: 16, latestTime: '昨天 10:00' },
      { id: 'c3', course: '人工智能导论', attended: 16, total: 16, latestTime: '今天 14:00' }
    ];
  }

  static classAuthDetail(classId: string): ClassAuthDetail {
    const metrics: AttendanceMetric[] = [
      { id: 'tc1', course: '移动应用开发 2301 班', attended: 45, total: 48, latestTime: '今天 08:10' },
      { id: 'tc2', course: '软件工程实践 2302 班', attended: 43, total: 46, latestTime: '昨天 14:00' },
      { id: 'tc3', course: '实验室安全认证', attended: 28, total: 30, latestTime: '今天 16:00' }
    ];
    const metric = metrics.find((item: AttendanceMetric) => item.id === classId) || metrics[0];
    const abnormalCount = classId === 'tc1' ? 1 : classId === 'tc2' ? 2 : 1;
    const signedCount = metric.attended;
    const totalCount = metric.total;
    return {
      id: metric.id,
      className: metric.course,
      totalCount: totalCount,
      signedCount: signedCount,
      unsignedCount: Math.max(0, totalCount - signedCount),
      abnormalCount: abnormalCount,
      rate: totalCount === 0 ? 0 : Math.round(signedCount * 100 / totalCount),
      latestTime: metric.latestTime,
      students: PortalMockService.classStudentAuthRecords(metric.id)
    };
  }

  static classStudentAuthRecords(classId: string): StudentAuthRecord[] {
    if (classId === 'tc2') {
      return [
        { id: 'tc2-s1', name: '陈悦', studentNo: '20230201', status: '已认证', authTime: '昨天 13:50', device: '手机', riskLevel: '低风险' } as StudentAuthRecord,
        { id: 'tc2-s2', name: '刘洋', studentNo: '20230202', status: '已认证', authTime: '昨天 13:55', device: '平板', riskLevel: '低风险' } as StudentAuthRecord,
        { id: 'tc2-s3', name: '马宁', studentNo: '20230203', status: '异常', authTime: '昨天 14:00', device: '未知设备', riskLevel: '高风险' } as StudentAuthRecord,
        { id: 'tc2-s4', name: '何雨', studentNo: '20230204', status: '未认证', authTime: '--', device: '--', riskLevel: '待确认' } as StudentAuthRecord
      ];
    }
    if (classId === 'tc3') {
      return [
        { id: 'tc3-s1', name: '孙哲', studentNo: '20230301', status: '已认证', authTime: '今天 15:51', device: '手机', riskLevel: '低风险' } as StudentAuthRecord,
        { id: 'tc3-s2', name: '周琪', studentNo: '20230302', status: '已认证', authTime: '今天 15:56', device: '手表', riskLevel: '低风险' } as StudentAuthRecord,
        { id: 'tc3-s3', name: '吴昊', studentNo: '20230303', status: '异常', authTime: '今天 16:00', device: '未知设备', riskLevel: '高风险' } as StudentAuthRecord,
        { id: 'tc3-s4', name: '郑楠', studentNo: '20230304', status: '未认证', authTime: '--', device: '--', riskLevel: '待确认' } as StudentAuthRecord
      ];
    }
    return [
      { id: 'tc1-s1', name: '李明', studentNo: '20230101', status: '已认证', authTime: '今天 08:01', device: '手机', riskLevel: '低风险' } as StudentAuthRecord,
      { id: 'tc1-s2', name: '王芳', studentNo: '20230102', status: '已认证', authTime: '今天 08:03', device: '平板', riskLevel: '低风险' } as StudentAuthRecord,
      { id: 'tc1-s3', name: '张强', studentNo: '20230103', status: '未认证', authTime: '--', device: '--', riskLevel: '待确认' } as StudentAuthRecord,
      { id: 'tc1-s4', name: '赵敏', studentNo: '20230104', status: '异常', authTime: '今天 08:10', device: '未知设备', riskLevel: '高风险' } as StudentAuthRecord
    ];
  }

  static watchAttendance(): WatchAttendanceItem[] {
    return [
      { id: 'wa-001', title: '移动应用开发', time: '08:10', place: '综合教学楼 A203', status: '已签到' },
      { id: 'wa-002', title: '实验课提醒', time: '14:00', place: '软件实验室 C401', status: '待签到' }
    ];
  }

  static terminalDevices(): TerminalDeviceRecord[] {
    return [
      { id: 'term-001', name: '图书馆北门闸机', place: '图书馆北门', status: '在线', lastHeartbeat: '3 秒前' },
      { id: 'term-002', name: '教学楼 A203 签到屏', place: '综合教学楼', status: '在线', lastHeartbeat: '8 秒前' },
      { id: 'term-003', name: '实验室 B102 门禁', place: '重点实验室', status: '维护中', lastHeartbeat: '12 分钟前' }
    ];
  }

  static realtimeEvents(): RealtimeAuthEvent[] {
    return [
      { id: 'rt-001', terminal: 'A203 签到屏', studentId: 'student001', result: '通过', latency: '46ms', time: '08:10:06', riskLevel: 'low' },
      { id: 'rt-002', terminal: '图书馆闸机', studentId: 'student018', result: '通过', latency: '52ms', time: '08:11:18', riskLevel: 'low' },
      { id: 'rt-003', terminal: '实验室门禁', studentId: 'visitor009', result: '拦截', latency: '73ms', time: '08:12:02', riskLevel: 'high' }
    ];
  }

  static adminPermissions(): AdminPermissionItem[] {
    return [
      { id: 'ap-001', role: '辅导员', scope: '查看本学院考勤', owner: '张老师', enabled: true },
      { id: 'ap-002', role: '门禁管理员', scope: '配置门禁规则', owner: '安保处', enabled: true },
      { id: 'ap-003', role: '临时访客审批', scope: '临时账号审核', owner: '信息中心', enabled: false }
    ];
  }

  static accessRules(): AccessRuleItem[] {
    return [
      { id: 'rule-001', name: '教学楼上课时段通行', place: '教学楼', timeRange: '07:00-22:00', riskPolicy: '低风险自动通过', enabled: true },
      { id: 'rule-002', name: '实验室夜间二次认证', place: '重点实验室', timeRange: '22:00-06:00', riskPolicy: '中高风险拦截', enabled: true },
      { id: 'rule-003', name: '图书馆访客限制', place: '图书馆', timeRange: '08:00-21:30', riskPolicy: '访客需人工审批', enabled: false }
    ];
  }

  static blacklist(): BlacklistItem[] {
    return [
      { id: 'bl-001', studentId: 'visitor009', name: '临时访客', reason: '实验室高风险访问', level: 'high', createdAt: '2026-05-09 08:12' },
      { id: 'bl-002', studentId: 'student088', name: '陈某', reason: '连续认证失败', level: 'medium', createdAt: '2026-05-08 21:30' }
    ];
  }
}
