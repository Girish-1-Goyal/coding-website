import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  role: 'student' | 'mentor' | 'admin';
  isEmailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  provider: 'email' | 'google' | 'github' | 'facebook';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isEmailVerificationSent: boolean;
  isPasswordResetSent: boolean;
  sessionExpiry: number | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isEmailVerificationSent: false,
  isPasswordResetSent: false,
  sessionExpiry: null,
};

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);

      const response = await api.post<AuthResponse>('/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.detail || 'Login failed');
      }
      return rejectWithValue('An error occurred during login');
    }
  }
);

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/api/auth/register', credentials);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.detail || 'Registration failed');
      }
      return rejectWithValue('An error occurred during registration');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setSessionExpiry: (state, action: PayloadAction<number>) => {
      state.sessionExpiry = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setEmailVerificationSent: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerificationSent = action.payload;
    },
    setPasswordResetSent: (state, action: PayloadAction<boolean>) => {
      state.isPasswordResetSent = action.payload;
    },
    verifyEmail: (state) => {
      if (state.user) {
        state.user.isEmailVerified = true;
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateRole: (state, action: PayloadAction<'student' | 'mentor' | 'admin'>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.sessionExpiry = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setUser,
  setToken,
  setSessionExpiry,
  setLoading,
  setError,
  setEmailVerificationSent,
  setPasswordResetSent,
  verifyEmail,
  updateProfile,
  updateRole,
  logout,
} = authSlice.actions;

export default authSlice.reducer; 