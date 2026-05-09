import type { AuthMethod, CampusScene } from '../models/Auth';
import type { DeviceLayoutMode, DeviceType, DistributedDeviceRole } from '../models/Device';
import type { RiskLevel } from '../models/Risk';
import type { UserRole } from '../models/User';
export class FormatUtil {
    static roleLabel(role: UserRole): string {
        if (role === 'student') {
            return '学生';
        }
        if (role === 'teacher') {
            return '教师';
        }
        return '管理员';
    }
    static methodLabel(method: AuthMethod): string {
        if (method === 'qrcode') {
            return '二维码认证';
        }
        if (method === 'trusted_device') {
            return '可信设备认证';
        }
        return '蓝牙/近场认证';
    }
    static sceneLabel(scene: CampusScene): string {
        if (scene === 'attendance') {
            return '智能考勤';
        }
        if (scene === 'lab_access') {
            return '实验室门禁';
        }
        if (scene === 'library_entry') {
            return '图书馆入馆';
        }
        return '教室签到';
    }
    static deviceTypeLabel(type: DeviceType): string {
        if (type === 'phone') {
            return '手机';
        }
        if (type === 'tablet') {
            return '平板';
        }
        return '智能穿戴';
    }
    static distributedRoleLabel(role: DistributedDeviceRole): string {
        if (role === 'auth_initiator') {
            return '认证发起端';
        }
        if (role === 'auth_reviewer') {
            return '认证复核端';
        }
        return '结果展示端';
    }
    static layoutModeLabel(mode: DeviceLayoutMode): string {
        if (mode === 'tablet') {
            return '平板双栏布局';
        }
        return '手机单栏布局';
    }
    static riskLabel(level: RiskLevel): string {
        if (level === 'low') {
            return '低风险';
        }
        if (level === 'medium') {
            return '中风险';
        }
        return '高风险';
    }
    static nowText(): string {
        const date = new Date();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`;
    }
}
