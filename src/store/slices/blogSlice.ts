import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies: Comment[];
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  likes: number;
  views: number;
  comments: Comment[];
  isPublished: boolean;
  featuredImage?: string;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedTags: string[];
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedTags: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost>) => {
      state.currentPost = action.payload;
    },
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
      if (state.currentPost?.id === action.payload.postId) {
        state.currentPost.comments.push(action.payload.comment);
      }
    },
    updateComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        const index = post.comments.findIndex(c => c.id === action.payload.comment.id);
        if (index !== -1) {
          post.comments[index] = action.payload.comment;
        }
      }
      if (state.currentPost?.id === action.payload.postId) {
        const index = state.currentPost.comments.findIndex(c => c.id === action.payload.comment.id);
        if (index !== -1) {
          state.currentPost.comments[index] = action.payload.comment;
        }
      }
    },
    deleteComment: (state, action: PayloadAction<{ postId: string; commentId: string }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== action.payload.commentId);
      }
      if (state.currentPost?.id === action.payload.postId) {
        state.currentPost.comments = state.currentPost.comments.filter(c => c.id !== action.payload.commentId);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
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
  setPosts,
  setCurrentPost,
  addPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  setSearchQuery,
  setSelectedTags,
  setLoading,
  setError,
} = blogSlice.actions;

export default blogSlice.reducer; 