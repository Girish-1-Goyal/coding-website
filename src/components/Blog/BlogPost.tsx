import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import { Editor } from '@monaco-editor/react';
import { Send as SendIcon } from '@mui/icons-material';

interface BlogPost {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

const BlogPost: React.FC = () => {
  const theme = useTheme();
  const [post, setPost] = useState<BlogPost>({
    title: '',
    content: '',
    category: '',
    tags: []
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save blog post
      console.log('Submitting post:', post);
      setSuccess(true);
      // Reset form after successful submission
      setPost({
        title: '',
        content: '',
        category: '',
        tags: []
      });
    } catch (err) {
      setError('Failed to post blog. Please try again.');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      p: 3,
      overflow: 'hidden'
    }}>
      <Paper 
        elevation={3} 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          height: '100%',
          overflow: 'auto'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create New Blog Post
        </Typography>

        <TextField
          label="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
          fullWidth
          variant="outlined"
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={post.category}
            label="Category"
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            required
          >
            <MenuItem value="programming">Programming</MenuItem>
            <MenuItem value="algorithms">Algorithms</MenuItem>
            <MenuItem value="web-development">Web Development</MenuItem>
            <MenuItem value="machine-learning">Machine Learning</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ flex: 1, minHeight: '400px' }}>
          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={post.content}
            onChange={(value) => setPost({ ...post, content: value || '' })}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setPost({ title: '', content: '', category: '', tags: [] })}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Publish
          </Button>
        </Box>
      </Paper>

      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Blog post published successfully!</Alert>
      </Snackbar>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogPost; 