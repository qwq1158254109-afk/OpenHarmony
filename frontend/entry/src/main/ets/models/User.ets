export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  account: string;
  name: string;
  role: UserRole;
  college: string;
  department: string;
  avatarText: string;
  userCode?: string;
  distributedId?: string;
}

export interface LoginRequest {
  account: string;
  password: string;
  role: UserRole;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: UserProfile;
}

export type RegisterRole = 'student' | 'teacher';

export interface RegisterRequest {
  username: string;
  password: string;
  realName: string;
  userCode: string;
  role: RegisterRole;
  phone?: string;
  email?: string;
}

export interface RegisteredUser {
  id: string;
  username: string;
  realName: string;
  role: RegisterRole;
  userCode: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: RegisteredUser;
}

export interface RegisterApiResponse {
  code: number;
  message: string;
  data?: RegisteredUser;
}
