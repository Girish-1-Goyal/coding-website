import { User } from '../store/slices/authSlice';
import { store } from '../store';
import { setUser, setToken, setError, setLoading, setEmailVerificationSent, setPasswordResetSent } from '../store/slices/authSlice';

class AuthService {
  private static instance: AuthService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    return response.json();
  }

  public async signUp(email: string, password: string, name: string): Promise<User> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await this.handleResponse<{ user: User; token: string }>(response);
      store.dispatch(setUser(data.user));
      store.dispatch(setToken(data.token));
      return data.user;
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Signup failed'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async login(email: string, password: string): Promise<User> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await this.handleResponse<{ user: User; token: string }>(response);
      store.dispatch(setUser(data.user));
      store.dispatch(setToken(data.token));
      return data.user;
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Login failed'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async socialLogin(provider: 'google' | 'github' | 'facebook'): Promise<User> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/auth/${provider}`, {
        method: 'POST',
      });

      const data = await this.handleResponse<{ user: User; token: string }>(response);
      store.dispatch(setUser(data.user));
      store.dispatch(setToken(data.token));
      return data.user;
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Social login failed'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async sendEmailVerification(): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/auth/verify-email`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      });

      await this.handleResponse(response);
      store.dispatch(setEmailVerificationSent(true));
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to send verification email'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      await this.handleResponse(response);
      store.dispatch(setPasswordResetSent(true));
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to send password reset email'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const response = await fetch(`${this.baseUrl}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      await this.handleResponse(response);
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to reset password'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async logout(): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  public async refreshToken(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      });

      const data = await this.handleResponse<{ token: string }>(response);
      store.dispatch(setToken(data.token));
      return data.token;
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Failed to refresh token'));
      throw error;
    }
  }
}

export default AuthService.getInstance(); 