import { UserProfile } from '../models/User';
import { MockData } from './MockData';

export class AuthSessionKeys {
  static readonly token: string = 'token';
  static readonly studentId: string = 'studentId';
  static readonly userInfo: string = 'userInfo';
  static readonly deviceInfo: string = 'deviceInfo';
  static readonly loginStatus: string = 'loginStatus';
  static readonly currentUser: string = 'currentUser';
}

export class AuthSessionService {
  static initialize(): void {
    PersistentStorage.persistProp<boolean>(AuthSessionKeys.loginStatus, false);
    PersistentStorage.persistProp<string>(AuthSessionKeys.token, '');
    PersistentStorage.persistProp<string>(AuthSessionKeys.studentId, '');
    PersistentStorage.persistProp<string>(AuthSessionKeys.userInfo, '');
    PersistentStorage.persistProp<string>(AuthSessionKeys.deviceInfo, '');
  }

  static saveLogin(user: UserProfile): void {
    AuthSessionService.initialize();
    AppStorage.setOrCreate<boolean>(AuthSessionKeys.loginStatus, true);
    AppStorage.setOrCreate<string>(AuthSessionKeys.token, `mock-token-${user.account}-${Date.now()}`);
    AppStorage.setOrCreate<string>(AuthSessionKeys.studentId, user.account);
    AppStorage.setOrCreate<string>(AuthSessionKeys.userInfo, `${user.id}|${user.account}|${user.name}|${user.role}`);
    AppStorage.setOrCreate<string>(AuthSessionKeys.deviceInfo, 'OpenHarmony Phone / OpenHarmony Tablet');
    AppStorage.setOrCreate<UserProfile>(AuthSessionKeys.currentUser, user);
  }

  static isLoggedIn(): boolean {
    AuthSessionService.initialize();
    const loginStatus = AppStorage.get<boolean>(AuthSessionKeys.loginStatus) || false;
    const token = AppStorage.get<string>(AuthSessionKeys.token) || '';
    return loginStatus && token.length > 0;
  }

  static currentUser(): UserProfile | undefined {
    AuthSessionService.initialize();
    const currentUser = AppStorage.get<UserProfile>(AuthSessionKeys.currentUser);
    if (currentUser) {
      return currentUser;
    }
    if (!AuthSessionService.isLoggedIn()) {
      return undefined;
    }
    const studentId = AppStorage.get<string>(AuthSessionKeys.studentId) || '';
    const user = MockData.users.find((item: UserProfile) => item.account === studentId || item.id === studentId);
    if (user) {
      AppStorage.setOrCreate<UserProfile>(AuthSessionKeys.currentUser, user);
    }
    return user;
  }

  static clearLogin(): void {
    AppStorage.setOrCreate<boolean>(AuthSessionKeys.loginStatus, false);
    AppStorage.setOrCreate<string>(AuthSessionKeys.token, '');
    AppStorage.setOrCreate<string>(AuthSessionKeys.studentId, '');
    AppStorage.setOrCreate<string>(AuthSessionKeys.userInfo, '');
    AppStorage.setOrCreate<string>(AuthSessionKeys.deviceInfo, '');
    AppStorage.delete(AuthSessionKeys.currentUser);
    PersistentStorage.deleteProp(AuthSessionKeys.loginStatus);
    PersistentStorage.deleteProp(AuthSessionKeys.token);
    PersistentStorage.deleteProp(AuthSessionKeys.studentId);
    PersistentStorage.deleteProp(AuthSessionKeys.userInfo);
    PersistentStorage.deleteProp(AuthSessionKeys.deviceInfo);
  }

  static studentId(): string {
    return AppStorage.get<string>(AuthSessionKeys.studentId) || '';
  }
}
