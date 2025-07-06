export interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  loaded: boolean;
}