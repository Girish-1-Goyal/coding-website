import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Fab,
  Dialog,
  useTheme,
  useMediaQuery,
  Container,
  Stack
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import BlogPost from './BlogPost';

interface BlogEntry {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

const sampleBlogs: BlogEntry[] = [
  {
    id: '1',
    title: 'Getting Started with Algorithms',
    excerpt: 'Learn the basics of algorithmic problem solving...',
    category: 'Algorithms',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x400?algorithm'
  },
  {
    id: '2',
    title: 'Understanding Data Structures',
    excerpt: 'Deep dive into fundamental data structures...',
    category: 'Data Structures',
    date: '2024-03-14',
    imageUrl: 'https://source.unsplash.com/random/800x400?programming'
  },
  {
    id: '3',
    title: 'Mastering Dynamic Programming',
    excerpt: 'Advanced techniques in dynamic programming...',
    category: 'Algorithms',
    date: '2024-03-13',
    imageUrl: 'https://source.unsplash.com/random/800x400?coding'
  }
];

const Blog: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isPostDialogOpen, setPostDialogOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogEntry[]>(sampleBlogs);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h4" component="h1">
          Blog
        </Typography>
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setPostDialogOpen(true)}
          >
            New Post
          </Button>
        )}
      </Box>

      {/* Blog List */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr'
        },
        gap: 3
      }}>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={blog.imageUrl}
              alt={blog.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blog.excerpt}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {blog.category} • {new Date(blog.date).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Read More</Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Mobile FAB */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setPostDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}

      {/* New Post Dialog */}
      <Dialog
        fullScreen
        open={isPostDialogOpen}
        onClose={() => setPostDialogOpen(false)}
      >
        <BlogPost />
      </Dialog>
    </Container>
  );
};

export default Blog; 