export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  account: string;
  name: string;
  role: UserRole;
  college: string;
  department: string;
  avatarText: string;
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
