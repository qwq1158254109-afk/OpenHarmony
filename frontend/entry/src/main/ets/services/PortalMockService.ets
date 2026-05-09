import {
  AccessRuleItem,
  AdminPermissionItem,
  AttendanceMetric,
  AuthPermissionOption,
  BlacklistItem,
  BoundDeviceInfo,
  DefenseDemoResult,
  DefenseDemoScenario,
  DemoScenarioType,
  PassageRecordItem,
  PortalAction,
  PortalStat,
  RealNameProfile,
  RealtimeAuthEvent,
  TerminalDeviceRecord,
  WatchAttendanceItem
} from '../models/CampusPortal';
import { AppRoutes } from '../utils/Constants';

export class PortalMockService {
  static overviewStats(): PortalStat[] {
    return [
      { title: '今日认证', value: '286', hint: '无感认证成功率 98.6%', status: 'success' },
      { title: '在线设备', value: '42', hint: '手表、门禁、教学终端', status: 'info' },
      { title: '风险事件', value: '7', hint: '高风险 1 条，中风险 6 条', status: 'warning' },
      { title: '黑名单', value: '3', hint: '门禁策略实时生效', status: 'danger' }
    ];
  }

  static studentActions(): PortalAction[] {
    return [
      { title: '学生实名认证', subtitle: '核验学号、姓名、学院信息', marker: 'ID', route: AppRoutes.studentRealName, status: 'success' },
      { title: '设备绑定', subtitle: '绑定手机、手表和平板', marker: 'DV', route: AppRoutes.deviceBind, status: 'info' },
      { title: '无感认证权限设置', subtitle: '按场景启停无感认证', marker: 'AU', route: AppRoutes.authPermission, status: 'warning' },
      { title: '通行记录', subtitle: '门禁、图书馆、教学楼记录', marker: 'RE', route: AppRoutes.passageRecords, status: 'info' },
      { title: '考勤统计', subtitle: '课程签到与缺勤趋势', marker: 'AT', route: AppRoutes.attendanceStats, status: 'success' }
    ];
  }

  static watchActions(): PortalAction[] {
    return [
      { title: '手表端今日考勤', subtitle: '轻量化考勤提醒', marker: 'WA', route: AppRoutes.watchTodayAttendance, status: 'success' },
      { title: '手表端通行记录', subtitle: '查看近场通行反馈', marker: 'WR', route: AppRoutes.watchPassageRecords, status: 'info' }
    ];
  }

  static terminalActions(): PortalAction[] {
    return [
      { title: '校园终端设备备案', subtitle: '登记门禁与签到终端', marker: 'TF', route: AppRoutes.terminalFiling, status: 'info' },
      { title: '终端实时认证大屏', subtitle: '实时显示认证态势', marker: 'RT', route: AppRoutes.terminalRealtimeScreen, status: 'success' }
    ];
  }

  static adminActions(): PortalAction[] {
    return [
      { title: '管理员出勤统计', subtitle: '按学院和课程汇总出勤', marker: 'AS', route: AppRoutes.adminAttendanceStats, status: 'success' },
      { title: '管理员权限管理', subtitle: '配置角色与操作范围', marker: 'PM', route: AppRoutes.adminPermission, status: 'warning' },
      { title: '门禁规则配置', subtitle: '管理通行时间和风控策略', marker: 'AR', route: AppRoutes.accessRuleConfig, status: 'info' },
      { title: '黑名单管理', subtitle: '高风险账号限制通行', marker: 'BL', route: AppRoutes.blacklist, status: 'danger' }
    ];
  }

  static demoActions(): PortalAction[] {
    return [
      { title: '答辩演示模式', subtitle: '一键模拟校门认证、黑名单拦截、晚归提醒、考勤导出和手表同步', marker: 'DE', route: AppRoutes.defenseDemo, status: 'success' }
    ];
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

  static realNameProfile(): RealNameProfile {
    return {
      studentId: 'student001',
      name: '李明',
      college: '计算机与信息工程学院',
      major: '软件工程 2301 班',
      status: '已完成实名认证',
      credential: '校园统一身份认证 / 教务系统同步'
    };
  }

  static boundDevices(): BoundDeviceInfo[] {
    return [
      { id: 'phone-001', name: 'OpenHarmony Phone', owner: '李明', type: '手机', trustLevel: '高可信', online: true },
      { id: 'watch-008', name: 'Campus Watch', owner: '李明', type: '手表', trustLevel: '中可信', online: true },
      { id: 'pad-102', name: 'OpenHarmony Tablet', owner: '李明', type: '平板', trustLevel: '高可信', online: false }
    ];
  }

  static authPermissions(): AuthPermissionOption[] {
    return [
      { id: 'p1', name: '教学楼无感签到', scene: '综合教学楼 / 信息楼', enabled: true, riskLevel: 'low' },
      { id: 'p2', name: '图书馆入馆认证', scene: '图书馆闸机', enabled: true, riskLevel: 'low' },
      { id: 'p3', name: '实验室夜间门禁', scene: '重点实验室', enabled: false, riskLevel: 'high' }
    ];
  }

  static passageRecords(): PassageRecordItem[] {
    return [
      { id: 'pr-001', studentId: 'student001', deviceId: 'phone-001', place: '综合教学楼 A203', result: '成功', time: '2026-05-09 08:10', riskLevel: 'low' },
      { id: 'pr-002', studentId: 'student001', deviceId: 'watch-008', place: '图书馆北门', result: '成功', time: '2026-05-09 09:02', riskLevel: 'low' },
      { id: 'pr-003', studentId: 'teacher001', deviceId: 'watch-017', place: '重点实验室 B102', result: '拦截', time: '2026-05-09 22:35', riskLevel: 'high' }
    ];
  }

  static attendanceMetrics(): AttendanceMetric[] {
    return [
      { id: 'c1', course: '移动应用开发', attended: 15, total: 16, latestTime: '今天 08:10' },
      { id: 'c2', course: '操作系统', attended: 13, total: 16, latestTime: '昨天 10:00' },
      { id: 'c3', course: '人工智能导论', attended: 16, total: 16, latestTime: '今天 14:00' }
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
