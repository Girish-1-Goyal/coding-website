import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorSettings {
  theme: 'light' | 'dark' | 'monokai' | 'solarized';
  fontSize: number;
  tabSize: number;
  lineNumbers: boolean;
  minimap: boolean;
  wordWrap: boolean;
  autoComplete: boolean;
  autoSave: boolean;
}

interface NotificationSettings {
  email: {
    announcements: boolean;
    contestReminders: boolean;
    newMessages: boolean;
    progressUpdates: boolean;
  };
  push: {
    contestAlerts: boolean;
    submissionResults: boolean;
    friendRequests: boolean;
    achievements: boolean;
  };
}

interface LearningSettings {
  preferredLanguage: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  showHints: boolean;
  autoRunTests: boolean;
  showSolutionAfterAttempt: boolean;
  timezone: string;
}

interface SettingsState {
  editor: EditorSettings;
  notifications: NotificationSettings;
  learning: LearningSettings;
  theme: 'light' | 'dark';
  language: string;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  editor: {
    theme: 'monokai',
    fontSize: 14,
    tabSize: 2,
    lineNumbers: true,
    minimap: true,
    wordWrap: true,
    autoComplete: true,
    autoSave: true,
  },
  notifications: {
    email: {
      announcements: true,
      contestReminders: true,
      newMessages: true,
      progressUpdates: true,
    },
    push: {
      contestAlerts: true,
      submissionResults: true,
      friendRequests: true,
      achievements: true,
    },
  },
  learning: {
    preferredLanguage: 'javascript',
    difficultyLevel: 'beginner',
    showHints: true,
    autoRunTests: true,
    showSolutionAfterAttempt: false,
    timezone: 'UTC',
  },
  theme: 'light',
  language: 'en',
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateEditorSettings: (state, action: PayloadAction<Partial<EditorSettings>>) => {
      state.editor = { ...state.editor, ...action.payload };
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateLearningSettings: (state, action: PayloadAction<Partial<LearningSettings>>) => {
      state.learning = { ...state.learning, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetSettings: (state) => {
      state.editor = initialState.editor;
      state.notifications = initialState.notifications;
      state.learning = initialState.learning;
      state.theme = initialState.theme;
      state.language = initialState.language;
    },
  },
});

export const {
  updateEditorSettings,
  updateNotificationSettings,
  updateLearningSettings,
  setTheme,
  setLanguage,
  setLoading,
  setError,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 