import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  prerequisites: string[];
  isCompleted: boolean;
  progress: number;
}

interface CodePlayground {
  id: string;
  title: string;
  description: string;
  starterCode: {
    [key: string]: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  solution: string;
  explanation: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: Date;
  isPrivate: boolean;
  maxMembers: number;
  currentTopic: string;
  schedule: {
    day: string;
    time: string;
    duration: number;
  }[];
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  language: string;
}

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  description: string;
  language: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LearningState {
  tutorials: Tutorial[];
  codePlaygrounds: CodePlayground[];
  studyGroups: StudyGroup[];
  notes: Note[];
  codeSnippets: CodeSnippet[];
  bookmarks: string[];
  currentTutorial: string | null;
  currentPlayground: string | null;
  currentStudyGroup: string | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedTags: string[];
  difficultyFilter: 'all' | 'beginner' | 'intermediate' | 'advanced';
}

const initialState: LearningState = {
  tutorials: [],
  codePlaygrounds: [],
  studyGroups: [],
  notes: [],
  codeSnippets: [],
  bookmarks: [],
  currentTutorial: null,
  currentPlayground: null,
  currentStudyGroup: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedTags: [],
  difficultyFilter: 'all',
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setTutorials: (state, action: PayloadAction<Tutorial[]>) => {
      state.tutorials = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCodePlaygrounds: (state, action: PayloadAction<CodePlayground[]>) => {
      state.codePlaygrounds = action.payload;
      state.loading = false;
      state.error = null;
    },
    setStudyGroups: (state, action: PayloadAction<StudyGroup[]>) => {
      state.studyGroups = action.payload;
      state.loading = false;
      state.error = null;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCodeSnippets: (state, action: PayloadAction<CodeSnippet[]>) => {
      state.codeSnippets = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentTutorial: (state, action: PayloadAction<string>) => {
      state.currentTutorial = action.payload;
    },
    setCurrentPlayground: (state, action: PayloadAction<string>) => {
      state.currentPlayground = action.payload;
    },
    setCurrentStudyGroup: (state, action: PayloadAction<string>) => {
      state.currentStudyGroup = action.payload;
    },
    addBookmark: (state, action: PayloadAction<string>) => {
      if (!state.bookmarks.includes(action.payload)) {
        state.bookmarks.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(id => id !== action.payload);
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    addCodeSnippet: (state, action: PayloadAction<CodeSnippet>) => {
      state.codeSnippets.unshift(action.payload);
    },
    updateCodeSnippet: (state, action: PayloadAction<CodeSnippet>) => {
      const index = state.codeSnippets.findIndex(snippet => snippet.id === action.payload.id);
      if (index !== -1) {
        state.codeSnippets[index] = action.payload;
      }
    },
    deleteCodeSnippet: (state, action: PayloadAction<string>) => {
      state.codeSnippets = state.codeSnippets.filter(snippet => snippet.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setDifficultyFilter: (state, action: PayloadAction<'all' | 'beginner' | 'intermediate' | 'advanced'>) => {
      state.difficultyFilter = action.payload;
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
  setTutorials,
  setCodePlaygrounds,
  setStudyGroups,
  setNotes,
  setCodeSnippets,
  setCurrentTutorial,
  setCurrentPlayground,
  setCurrentStudyGroup,
  addBookmark,
  removeBookmark,
  addNote,
  updateNote,
  deleteNote,
  addCodeSnippet,
  updateCodeSnippet,
  deleteCodeSnippet,
  setSearchQuery,
  setSelectedTags,
  setDifficultyFilter,
  setLoading,
  setError,
} = learningSlice.actions;

export default learningSlice.reducer; 