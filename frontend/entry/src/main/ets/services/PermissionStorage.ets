import { AuthPermissionOption } from '../models/CampusPortal';

export class PermissionStorage {
  private static readonly prefix: string = 'campus_auth_permissions_';

  private static keyOf(username: string): string {
    const normalized = username.length > 0 ? username : 'default_student';
    return `${PermissionStorage.prefix}${normalized}`;
  }

  static getPermissionList(username: string): AuthPermissionOption[] | null {
    const key = PermissionStorage.keyOf(username);
    PersistentStorage.persistProp<string>(key, '');
    const value = AppStorage.get<string>(key) || '';
    if (value.length === 0) {
      return null;
    }
    try {
      const list = JSON.parse(value) as AuthPermissionOption[];
      if (Array.isArray(list)) {
        return list;
      }
    } catch (error) {
      console.error(`parse permission storage failed: ${JSON.stringify(error)}`);
    }
    return null;
  }

  static savePermissionList(username: string, list: AuthPermissionOption[]): void {
    const key = PermissionStorage.keyOf(username);
    PersistentStorage.persistProp<string>(key, '');
    AppStorage.setOrCreate<string>(key, JSON.stringify(list));
  }

  static clearPermissionList(username: string): void {
    const key = PermissionStorage.keyOf(username);
    AppStorage.setOrCreate<string>(key, '');
    PersistentStorage.deleteProp(key);
  }
}
