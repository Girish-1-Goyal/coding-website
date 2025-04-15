import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

interface CodingStats {
  problemsSolved: number;
  totalSubmissions: number;
  averageTimePerProblem: number;
  languages: {
    [key: string]: number;
  };
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

interface LearningPathProgress {
  pathId: string;
  name: string;
  progress: number;
  completedLessons: string[];
  currentLesson: string;
  lastAccessed: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    achievements: boolean;
    newContent: boolean;
  };
  codeEditor: {
    fontSize: number;
    theme: string;
    lineNumbers: boolean;
    autoComplete: boolean;
  };
}

interface ProfileState {
  badges: Badge[];
  codingStats: CodingStats;
  learningPaths: LearningPathProgress[];
  favoriteProblems: string[];
  preferences: UserPreferences;
  submissionHistory: {
    id: string;
    problemId: string;
    status: 'success' | 'failed' | 'pending';
    language: string;
    submittedAt: Date;
    executionTime: number;
    memoryUsed: number;
  }[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  badges: [],
  codingStats: {
    problemsSolved: 0,
    totalSubmissions: 0,
    averageTimePerProblem: 0,
    languages: {},
    difficultyBreakdown: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
  },
  learningPaths: [],
  favoriteProblems: [],
  preferences: {
    theme: 'system',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      achievements: true,
      newContent: true,
    },
    codeEditor: {
      fontSize: 14,
      theme: 'default',
      lineNumbers: true,
      autoComplete: true,
    },
  },
  submissionHistory: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setBadges: (state, action: PayloadAction<Badge[]>) => {
      state.badges = action.payload;
    },
    addBadge: (state, action: PayloadAction<Badge>) => {
      state.badges.push(action.payload);
    },
    updateCodingStats: (state, action: PayloadAction<Partial<CodingStats>>) => {
      state.codingStats = { ...state.codingStats, ...action.payload };
    },
    setLearningPaths: (state, action: PayloadAction<LearningPathProgress[]>) => {
      state.learningPaths = action.payload;
    },
    updateLearningPathProgress: (state, action: PayloadAction<{ pathId: string; progress: number }>) => {
      const path = state.learningPaths.find(p => p.pathId === action.payload.pathId);
      if (path) {
        path.progress = action.payload.progress;
      }
    },
    addFavoriteProblem: (state, action: PayloadAction<string>) => {
      if (!state.favoriteProblems.includes(action.payload)) {
        state.favoriteProblems.push(action.payload);
      }
    },
    removeFavoriteProblem: (state, action: PayloadAction<string>) => {
      state.favoriteProblems = state.favoriteProblems.filter(id => id !== action.payload);
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addSubmission: (state, action: PayloadAction<ProfileState['submissionHistory'][0]>) => {
      state.submissionHistory.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setBadges,
  addBadge,
  updateCodingStats,
  setLearningPaths,
  updateLearningPathProgress,
  addFavoriteProblem,
  removeFavoriteProblem,
  updatePreferences,
  addSubmission,
  setLoading,
  setError,
} = profileSlice.actions;

export default profileSlice.reducer; 