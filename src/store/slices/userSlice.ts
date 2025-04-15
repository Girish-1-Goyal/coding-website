import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedDate: Date;
}

interface UserStats {
  problemsSolved: number;
  totalSubmissions: number;
  successRate: number;
  streak: number;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  preferredLanguage: string;
  notifications: boolean;
}

interface UserState {
  currentUser: {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    role: 'student' | 'mentor' | 'admin';
    joinedDate: Date;
    stats: UserStats;
    badges: Badge[];
    preferences: UserPreferences;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['currentUser']>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStats: (state, action: PayloadAction<Partial<UserStats>>) => {
      if (state.currentUser) {
        state.currentUser.stats = {
          ...state.currentUser.stats,
          ...action.payload,
        };
      }
    },
    addBadge: (state, action: PayloadAction<Badge>) => {
      if (state.currentUser) {
        state.currentUser.badges.push(action.payload);
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.currentUser) {
        state.currentUser.preferences = {
          ...state.currentUser.preferences,
          ...action.payload,
        };
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  updateStats,
  addBadge,
  updatePreferences,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer; 