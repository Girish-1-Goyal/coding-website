import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import authService from '../services/authService';
import { setUser, setToken, logout } from '../store/slices/authSlice';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'github' | 'facebook') => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored token and validate it
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Validate token and get user data
          const userData = await authService.refreshToken();
          dispatch(setUser(userData));
          dispatch(setToken(storedToken));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        dispatch(logout());
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userData = await authService.login(email, password);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      const userData = await authService.signUp(email, password, name);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      throw error;
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const userData = await authService.socialLogin(provider);
      localStorage.setItem('token', userData.token);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      await authService.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };

  const handleResetPassword = async (token: string, newPassword: string) => {
    try {
      await authService.resetPassword(token, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const handleEmailVerification = async () => {
    try {
      await authService.sendEmailVerification();
    } catch (error) {
      throw error;
    }
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading: isLoading,
        error,
        login: handleLogin,
        signUp: handleSignUp,
        socialLogin: handleSocialLogin,
        logout: handleLogout,
        sendPasswordResetEmail: handlePasswordReset,
        resetPassword: handleResetPassword,
        sendEmailVerification: handleEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 