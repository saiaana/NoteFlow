export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  photo: string;
}

export interface AuthSuccess {
  success: true;
  user: User;
  error?: undefined;
}

export interface AuthFailure {
  success: false;
  error: string;
  user?: undefined;
}

export type AuthResponse = AuthSuccess | AuthFailure;

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  isInitialized: boolean; // Track if initial auth check completed

  setUser: (user: User | null) => void;
  getDisplayName: () => string;
  isDemoUser: () => boolean;

  login: (email: string, password: string) => Promise<AuthResponse>;

  demoLogin: () => Promise<AuthResponse>;

  signup: (
    name: string,
    email: string,
    photo: string,
    password: string | undefined,
    confirmPassword: string
  ) => Promise<AuthResponse>;

  logout: () => Promise<void>;

  checkAuth: () => Promise<void>;
}
