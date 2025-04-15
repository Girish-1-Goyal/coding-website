import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  replies: number;
  isPinned: boolean;
  isLocked: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  isSolution: boolean;
}

interface CommunityState {
  discussions: Discussion[];
  currentDiscussion: Discussion | null;
  replies: Reply[];
  categories: string[];
  tags: string[];
  searchQuery: string;
  selectedCategory: string | null;
  selectedTags: string[];
  sortBy: 'latest' | 'popular' | 'trending';
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  discussions: [],
  currentDiscussion: null,
  replies: [],
  categories: [],
  tags: [],
  searchQuery: '',
  selectedCategory: null,
  selectedTags: [],
  sortBy: 'latest',
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setDiscussions: (state, action: PayloadAction<Discussion[]>) => {
      state.discussions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentDiscussion: (state, action: PayloadAction<Discussion>) => {
      state.currentDiscussion = action.payload;
      state.loading = false;
      state.error = null;
    },
    setReplies: (state, action: PayloadAction<Reply[]>) => {
      state.replies = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'latest' | 'popular' | 'trending'>) => {
      state.sortBy = action.payload;
    },
    addDiscussion: (state, action: PayloadAction<Discussion>) => {
      state.discussions.unshift(action.payload);
    },
    updateDiscussion: (state, action: PayloadAction<Discussion>) => {
      const index = state.discussions.findIndex(discussion => discussion.id === action.payload.id);
      if (index !== -1) {
        state.discussions[index] = action.payload;
      }
      if (state.currentDiscussion?.id === action.payload.id) {
        state.currentDiscussion = action.payload;
      }
    },
    deleteDiscussion: (state, action: PayloadAction<string>) => {
      state.discussions = state.discussions.filter(discussion => discussion.id !== action.payload);
      if (state.currentDiscussion?.id === action.payload) {
        state.currentDiscussion = null;
      }
    },
    addReply: (state, action: PayloadAction<Reply>) => {
      state.replies.push(action.payload);
      if (state.currentDiscussion) {
        state.currentDiscussion.replies += 1;
      }
    },
    updateReply: (state, action: PayloadAction<Reply>) => {
      const index = state.replies.findIndex(reply => reply.id === action.payload.id);
      if (index !== -1) {
        state.replies[index] = action.payload;
      }
    },
    deleteReply: (state, action: PayloadAction<string>) => {
      state.replies = state.replies.filter(reply => reply.id !== action.payload);
      if (state.currentDiscussion) {
        state.currentDiscussion.replies -= 1;
      }
    },
    markAsSolution: (state, action: PayloadAction<string>) => {
      const reply = state.replies.find(r => r.id === action.payload);
      if (reply) {
        reply.isSolution = true;
      }
    },
    pinDiscussion: (state, action: PayloadAction<string>) => {
      const discussion = state.discussions.find(d => d.id === action.payload);
      if (discussion) {
        discussion.isPinned = true;
      }
      if (state.currentDiscussion?.id === action.payload) {
        state.currentDiscussion.isPinned = true;
      }
    },
    unpinDiscussion: (state, action: PayloadAction<string>) => {
      const discussion = state.discussions.find(d => d.id === action.payload);
      if (discussion) {
        discussion.isPinned = false;
      }
      if (state.currentDiscussion?.id === action.payload) {
        state.currentDiscussion.isPinned = false;
      }
    },
    lockDiscussion: (state, action: PayloadAction<string>) => {
      const discussion = state.discussions.find(d => d.id === action.payload);
      if (discussion) {
        discussion.isLocked = true;
      }
      if (state.currentDiscussion?.id === action.payload) {
        state.currentDiscussion.isLocked = true;
      }
    },
    unlockDiscussion: (state, action: PayloadAction<string>) => {
      const discussion = state.discussions.find(d => d.id === action.payload);
      if (discussion) {
        discussion.isLocked = false;
      }
      if (state.currentDiscussion?.id === action.payload) {
        state.currentDiscussion.isLocked = false;
      }
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
  setDiscussions,
  setCurrentDiscussion,
  setReplies,
  setCategories,
  setTags,
  setSearchQuery,
  setSelectedCategory,
  setSelectedTags,
  setSortBy,
  addDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addReply,
  updateReply,
  deleteReply,
  markAsSolution,
  pinDiscussion,
  unpinDiscussion,
  lockDiscussion,
  unlockDiscussion,
  setLoading,
  setError,
} = communitySlice.actions;

export default communitySlice.reducer; 