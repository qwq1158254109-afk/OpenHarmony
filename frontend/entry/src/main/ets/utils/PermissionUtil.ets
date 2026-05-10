import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { PortalAction } from '../models/CampusPortal';
import { UserProfile, UserRole } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { AppRoutes } from './Constants';

export class PermissionUtil {
  static isStudent(role: UserRole): boolean {
    return role === 'student';
  }

  static isTeacher(role: UserRole): boolean {
    return role === 'teacher';
  }

  static isAdmin(role: UserRole): boolean {
    return role === 'admin';
  }

  static canViewFeature(role: UserRole, featureKey: string): boolean {
    const roles = PermissionUtil.rolesForFeature(featureKey);
    return roles.includes(role);
  }

  static filterFeaturesByRole(role: UserRole, features: PortalAction[]): PortalAction[] {
    return features.filter((item: PortalAction) => item.roles.includes(role));
  }

  static filterMenuByRole(role: UserRole, menuItems: PortalAction[]): PortalAction[] {
    return PermissionUtil.filterFeaturesByRole(role, menuItems);
  }

  static ensurePageAccess(route: string): boolean {
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    if (!AuthSessionService.isLoggedIn() || !currentUser) {
      router.replaceUrl({ url: AppRoutes.login });
      return false;
    }
    if (!PermissionUtil.canViewFeature(currentUser.role, route)) {
      promptAction.showToast({ message: '当前角色无权访问该功能' });
      router.replaceUrl({ url: AppRoutes.overview });
      return false;
    }
    return true;
  }

  private static rolesForFeature(featureKey: string): UserRole[] {
    if (featureKey === AppRoutes.login || featureKey === AppRoutes.register || featureKey === AppRoutes.overview) {
      return ['student', 'teacher', 'admin'];
    }
    if (featureKey === AppRoutes.studentRealName ||
      featureKey === AppRoutes.deviceBind ||
      featureKey === AppRoutes.authPermission ||
      featureKey === AppRoutes.watchTodayAttendance ||
      featureKey === AppRoutes.watchPassageRecords) {
      return ['student'];
    }
    if (featureKey === AppRoutes.auth ||
      featureKey === AppRoutes.records ||
      featureKey === AppRoutes.passageRecords ||
      featureKey === AppRoutes.attendanceStats) {
      return ['student', 'teacher', 'admin'];
    }
    if (featureKey === AppRoutes.dashboard ||
      featureKey === AppRoutes.devices) {
      return ['student', 'teacher', 'admin'];
    }
    if (featureKey === AppRoutes.admin ||
      featureKey === AppRoutes.adminAttendanceStats ||
      featureKey === AppRoutes.adminPermission ||
      featureKey === AppRoutes.accessRuleConfig ||
      featureKey === AppRoutes.blacklist ||
      featureKey === AppRoutes.terminalFiling ||
      featureKey === AppRoutes.terminalRealtimeScreen ||
      featureKey === AppRoutes.defenseDemo) {
      return ['admin'];
    }
    return ['admin'];
  }
}
