import { AuthRecord } from '../models/Auth';
import { CampusDevice } from '../models/Device';
import { UserProfile } from '../models/User';

export class MockData {
  static readonly passwords: Map<string, string> = new Map([
    ['student001', '123456'],
    ['teacher001', '123456'],
    ['admin001', '123456']
  ]);

  static users: UserProfile[] = [
    {
      id: 'u-student-001',
      account: 'student001',
      name: '李明',
      role: 'student',
      college: '计算机与信息工程学院',
      department: '软件工程 2301 班',
      avatarText: '学',
      userCode: '20230101',
      distributedId: 'DID-202301-001'
    },
    {
      id: 'u-student-018',
      account: 'student018',
      name: '赵同学',
      role: 'student',
      college: '计算机与信息工程学院',
      department: '软件工程 2301 班',
      avatarText: '学',
      userCode: '20230118',
      distributedId: 'DID-202301-018'
    },
    {
      id: 'u-teacher-001',
      account: 'teacher001',
      name: '王老师',
      role: 'teacher',
      college: '计算机与信息工程学院',
      department: '智能软件实验室',
      avatarText: '师'
    },
    {
      id: 'u-admin-001',
      account: 'admin001',
      name: '系统管理员',
      role: 'admin',
      college: '河南大学',
      department: '智慧校园管理中心',
      avatarText: '管'
    }
  ];

  static devices: CampusDevice[] = [
    {
      id: 'phone-001',
      userId: 'u-student-001',
      name: 'OpenHarmony Phone',
      type: 'phone',
      deviceOs: 'OpenHarmony 6.0',
      distributedRole: 'auth_initiator',
      trusted: true,
      online: true,
      lastSeen: '刚刚',
      trust: {
        score: 92,
        level: 'high',
        hardwareAttestation: true,
        localCredential: true,
        proximityStable: true,
        lastVerified: '2026-05-09 08:00',
        factors: ['本机凭据已校验', '设备长期在线', '近场信号稳定']
      }
    },
    {
      id: 'tablet-001',
      userId: 'u-student-001',
      name: 'OpenHarmony Tablet',
      type: 'tablet',
      deviceOs: 'OpenHarmony 6.0',
      distributedRole: 'result_display',
      trusted: true,
      online: true,
      lastSeen: '2 分钟前',
      trust: {
        score: 86,
        level: 'high',
        hardwareAttestation: true,
        localCredential: true,
        proximityStable: true,
        lastVerified: '2026-05-09 08:02',
        factors: ['同账号绑定', '分布式通道可用', '平板展示端可信']
      }
    },
    {
      id: 'wearable-001',
      userId: 'u-teacher-001',
      name: 'Campus Watch',
      type: 'wearable',
      deviceOs: 'OpenHarmony Wearable',
      distributedRole: 'auth_reviewer',
      trusted: false,
      online: false,
      lastSeen: '1 小时前',
      trust: {
        score: 48,
        level: 'medium',
        hardwareAttestation: false,
        localCredential: true,
        proximityStable: false,
        lastVerified: '2026-05-09 07:30',
        factors: ['设备离线', '近场信号未稳定']
      }
    }
  ];

  static records: AuthRecord[] = [
    {
      id: 'rec-001',
      userId: 'u-student-001',
      userName: '李明',
      time: '2026-05-09 08:10',
      location: '综合教学楼 A203',
      scene: 'classroom_checkin',
      method: 'trusted_device',
      deviceName: 'OpenHarmony Phone',
      result: 'success',
      status: 'success',
      risk: {
        riskScore: 18,
        riskLevel: 'low',
        riskReason: '可信设备、常用教学楼、正常上课时间',
        suggestion: '允许认证通过，持续记录行为画像。',
        abnormalTypes: []
      }
    },
    {
      id: 'rec-002',
      userId: 'u-student-001',
      userName: '李明',
      time: '2026-05-09 09:00',
      location: '图书馆北门',
      scene: 'library_entry',
      method: 'qrcode',
      deviceName: 'OpenHarmony Tablet',
      result: 'success',
      status: 'success',
      risk: {
        riskScore: 28,
        riskLevel: 'low',
        riskReason: '二维码认证通过，位置风险较低',
        suggestion: '允许认证通过，可在记录页留存二维码认证来源。',
        abnormalTypes: []
      }
    },
    {
      id: 'rec-004',
      userId: 'u-student-018',
      userName: '赵同学',
      time: '2026-05-09 08:16',
      location: '综合教学楼 A203',
      scene: 'classroom_checkin',
      method: 'nearby_bluetooth',
      deviceName: 'OpenHarmony Phone',
      result: 'failed',
      status: 'failed',
      risk: {
        riskScore: 64,
        riskLevel: 'medium',
        riskReason: '课堂签到设备近场信号不稳定，需学生重新确认。',
        suggestion: '提醒任课教师人工复核该学生签到状态。',
        abnormalTypes: ['unknown_device']
      }
    },
    {
      id: 'rec-003',
      userId: 'u-teacher-001',
      userName: '王老师',
      time: '2026-05-09 22:35',
      location: '重点实验室 B102',
      scene: 'lab_access',
      method: 'nearby_bluetooth',
      deviceName: 'Campus Watch',
      result: 'failed',
      status: 'failed',
      risk: {
        riskScore: 82,
        riskLevel: 'high',
        riskReason: '夜间访问敏感区域，设备未标记为可信',
        suggestion: '建议拦截认证并通知管理员复核。',
        abnormalTypes: ['night_access', 'unknown_device']
      }
    }
  ];
}
