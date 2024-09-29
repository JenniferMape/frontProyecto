import type { User } from './user.interface';

export interface AuthResponse {
  result: {
    user: User;
    token: string;
  };
  message?: string;
}
