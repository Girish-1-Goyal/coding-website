import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  type: 'streak' | 'problem' | 'contest' | 'learning' | 'community';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface LearningProgress {
  moduleId: string;
  lessonId: string;
  completedAt: Date;
  score: number;
  timeSpent: number;
}

interface ProblemStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  successRate: number;
  averageTime: number;
  favoriteLanguages: string[];
}

interface ContestStats {
  totalParticipated: number;
  totalWon: number;
  averageRank: number;
  bestRank: number;
  rating: number;
}

interface ProgressState {
  achievements: Achievement[];
  learningProgress: LearningProgress[];
  problemStats: ProblemStats;
  contestStats: ContestStats;
  currentStreak: number;
  longestStreak: number;
  totalLearningTime: number;
  lastActiveDate: Date | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  achievements: [],
  learningProgress: [],
  problemStats: {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    successRate: 0,
    averageTime: 0,
    favoriteLanguages: [],
  },
  contestStats: {
    totalParticipated: 0,
    totalWon: 0,
    averageRank: 0,
    bestRank: 0,
    rating: 0,
  },
  currentStreak: 0,
  longestStreak: 0,
  totalLearningTime: 0,
  lastActiveDate: null,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      state.achievements.push(action.payload);
    },
    updateLearningProgress: (state, action: PayloadAction<LearningProgress>) => {
      const existingProgress = state.learningProgress.find(
        p => p.moduleId === action.payload.moduleId && p.lessonId === action.payload.lessonId
      );
      if (existingProgress) {
        existingProgress.completedAt = action.payload.completedAt;
        existingProgress.score = action.payload.score;
        existingProgress.timeSpent = action.payload.timeSpent;
      } else {
        state.learningProgress.push(action.payload);
      }
    },
    updateProblemStats: (state, action: PayloadAction<Partial<ProblemStats>>) => {
      state.problemStats = { ...state.problemStats, ...action.payload };
    },
    updateContestStats: (state, action: PayloadAction<Partial<ContestStats>>) => {
      state.contestStats = { ...state.contestStats, ...action.payload };
    },
    updateStreak: (state, action: PayloadAction<{ current: number; longest: number }>) => {
      state.currentStreak = action.payload.current;
      state.longestStreak = Math.max(state.longestStreak, action.payload.longest);
    },
    updateTotalLearningTime: (state, action: PayloadAction<number>) => {
      state.totalLearningTime += action.payload;
    },
    setLastActiveDate: (state, action: PayloadAction<Date>) => {
      state.lastActiveDate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addAchievement,
  updateLearningProgress,
  updateProblemStats,
  updateContestStats,
  updateStreak,
  updateTotalLearningTime,
  setLastActiveDate,
  setLoading,
  setError,
} = progressSlice.actions;

export default progressSlice.reducer; 