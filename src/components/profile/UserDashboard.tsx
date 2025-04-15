import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import profileService from '../../services/profileService';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  Code as CodeIcon,
  School as SchoolIcon,
  EmojiEvents as BadgeIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await profileService.fetchProfileData();
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              src={user?.avatar}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h4">{user?.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user?.email}
              </Typography>
              <Chip
                label={user?.role}
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Coding Statistics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Coding Statistics
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Problems Solved"
                  secondary="150"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Success Rate"
                  secondary="85%"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Current Streak"
                  secondary="7 days"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Learning Progress */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Learning Progress
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Data Structures & Algorithms"
                  secondary={
                    <Box sx={{ width: '100%', mt: 1 }}>
                      <LinearProgress variant="determinate" value={75} />
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Web Development"
                  secondary={
                    <Box sx={{ width: '100%', mt: 1 }}>
                      <LinearProgress variant="determinate" value={60} />
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Badges */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <BadgeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Achievements
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<BadgeIcon />}
                label="First Problem Solved"
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<BadgeIcon />}
                label="7 Day Streak"
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<BadgeIcon />}
                label="Perfect Score"
                color="primary"
                variant="outlined"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CodeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Solved Two Sum Problem"
                  secondary="2 hours ago"
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Completed Binary Search Lesson"
                  secondary="1 day ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Favorite Problems */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <FavoriteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Favorite Problems
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Two Sum"
                  secondary="Easy - Arrays"
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Binary Search"
                  secondary="Medium - Search"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard; 