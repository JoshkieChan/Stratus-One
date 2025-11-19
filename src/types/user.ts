export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  user: User | null;
  session: any;
  loading: boolean;
}
