import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack
} from '@mui/material';

const courses = [
  {
    id: 1,
    title: 'Data Structures Fundamentals',
    description: 'Learn the essential data structures used in programming',
    image: 'https://source.unsplash.com/random/800x400?data',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Algorithm Design',
    description: 'Master the art of designing efficient algorithms',
    image: 'https://source.unsplash.com/random/800x400?algorithm',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Advanced Problem Solving',
    description: 'Tackle complex programming challenges with confidence',
    image: 'https://source.unsplash.com/random/800x400?programming',
    level: 'Advanced'
  }
];

const Learn: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Learning Path
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Start your journey to becoming a better programmer with our structured learning paths
      </Typography>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr'
        },
        gap: 3,
        mt: 4
      }}>
        {courses.map((course) => (
          <Card
            key={course.id}
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
              height="140"
              image={course.image}
              alt={course.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {course.description}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="caption" color="primary">
                  {course.level}
                </Typography>
                <Button size="small" variant="contained">
                  Start Learning
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Learn; 