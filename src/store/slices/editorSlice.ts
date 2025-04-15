import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestCase {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  testCases: TestCase[];
  timeLimit: number;
  memoryLimit: number;
  languages: string[];
  starterCode: {
    [key: string]: string;
  };
  solution: string;
  explanation: string;
}

interface Submission {
  id: string;
  problemId: string;
  userId: string;
  language: string;
  code: string;
  status: 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error' | 'compilation_error';
  testCases: {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    time: number;
    memory: number;
  }[];
  submittedAt: Date;
  executionTime: number;
  memoryUsed: number;
}

interface EditorState {
  currentProblem: Problem | null;
  currentLanguage: string;
  code: string;
  testCases: TestCase[];
  submissions: Submission[];
  isRunning: boolean;
  isSubmitting: boolean;
  output: string;
  error: string | null;
  loading: boolean;
}

const initialState: EditorState = {
  currentProblem: null,
  currentLanguage: 'javascript',
  code: '',
  testCases: [],
  submissions: [],
  isRunning: false,
  isSubmitting: false,
  output: '',
  error: null,
  loading: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentProblem: (state, action: PayloadAction<Problem>) => {
      state.currentProblem = action.payload;
      state.code = action.payload.starterCode[state.currentLanguage] || '';
      state.testCases = action.payload.testCases;
    },
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      if (state.currentProblem) {
        state.code = state.currentProblem.starterCode[action.payload] || '';
      }
    },
    updateCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    addTestCase: (state, action: PayloadAction<TestCase>) => {
      state.testCases.push(action.payload);
    },
    removeTestCase: (state, action: PayloadAction<number>) => {
      state.testCases.splice(action.payload, 1);
    },
    updateTestCase: (state, action: PayloadAction<{ index: number; testCase: TestCase }>) => {
      state.testCases[action.payload.index] = action.payload.testCase;
    },
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.submissions.unshift(action.payload);
    },
    setRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setOutput: (state, action: PayloadAction<string>) => {
      state.output = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetEditor: (state) => {
      state.code = state.currentProblem?.starterCode[state.currentLanguage] || '';
      state.testCases = state.currentProblem?.testCases || [];
      state.output = '';
      state.error = null;
    },
  },
});

export const {
  setCurrentProblem,
  setCurrentLanguage,
  updateCode,
  addTestCase,
  removeTestCase,
  updateTestCase,
  addSubmission,
  setRunning,
  setSubmitting,
  setOutput,
  setError,
  setLoading,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer; 