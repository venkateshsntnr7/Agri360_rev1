export interface User {
  id: string;
  email: string;
  name: string;
  farmName?: string;
  location?: string;
  role: 'farmer' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}