import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  AccessTime,
  People,
  EmojiEvents,
  Leaderboard,
  Notifications,
  Group,
  Analytics,
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Contest {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
  participants: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  type: 'LIVE' | 'VIRTUAL' | 'TEAM';
  prizePool: number;
  progress?: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  problemsSolved: number;
  timeTaken: string;
}

const contests: Contest[] = [
  {
    id: 1,
    title: 'Weekly Challenge #45',
    description: 'Solve algorithmic problems in a time-constrained environment',
    startTime: '2024-03-20T15:00:00Z',
    endTime: '2024-03-20T17:00:00Z',
    duration: '2 hours',
    participants: 234,
    difficulty: 'Medium',
    status: 'Upcoming',
    type: 'LIVE',
    prizePool: 1000,
  },
  {
    id: 2,
    title: 'Data Structures Special',
    description: 'Test your knowledge of advanced data structures',
    startTime: '2024-03-22T18:00:00Z',
    endTime: '2024-03-22T21:00:00Z',
    duration: '3 hours',
    participants: 156,
    difficulty: 'Hard',
    status: 'Upcoming',
    type: 'VIRTUAL',
    prizePool: 2000,
  },
  {
    id: 3,
    title: 'Team Programming Contest',
    description: 'Collaborate with your team to solve complex problems',
    startTime: '2024-03-19T10:00:00Z',
    endTime: '2024-03-19T13:00:00Z',
    duration: '3 hours',
    participants: 567,
    difficulty: 'Easy',
    status: 'Ongoing',
    type: 'TEAM',
    prizePool: 3000,
    progress: 65,
  },
];

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: 'coder123', score: 850, problemsSolved: 5, timeTaken: '1:45:30' },
  { rank: 2, username: 'algo_master', score: 800, problemsSolved: 5, timeTaken: '2:10:15' },
  { rank: 3, username: 'python_pro', score: 750, problemsSolved: 4, timeTaken: '2:30:00' },
];

const Contest: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newContest, setNewContest] = useState<Partial<Contest>>({
    title: '',
    description: '',
    type: 'LIVE',
    difficulty: 'Medium',
    duration: '2 hours',
    prizePool: 0,
  });
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCreateContest = () => {
    // Here you would typically make an API call to create the contest
    console.log('Creating contest:', newContest);
    setOpenCreateDialog(false);
    setNewContest({
      title: '',
      description: '',
      type: 'LIVE',
      difficulty: 'Medium',
      duration: '2 hours',
      prizePool: 0,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewContest(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setNewContest(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Coding Contests
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Contest
        </Button>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Contests" />
        <Tab label="Live Contests" />
        <Tab label="Virtual Contests" />
        <Tab label="Team Contests" />
        <Tab label="Leaderboard" />
        <Tab label="Analytics" />
      </Tabs>

      {activeTab === 4 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Problems Solved</TableCell>
                <TableCell>Time Taken</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell>{entry.rank}</TableCell>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell>{entry.score}</TableCell>
                  <TableCell>{entry.problemsSolved}</TableCell>
                  <TableCell>{entry.timeTaken}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {activeTab !== 4 && (
        <Grid container spacing={3}>
          {contests
            .filter(contest => {
              if (activeTab === 0) return true;
              if (activeTab === 1) return contest.type === 'LIVE';
              if (activeTab === 2) return contest.type === 'VIRTUAL';
              if (activeTab === 3) return contest.type === 'TEAM';
              return true;
            })
            .map((contest) => (
              <Grid item xs={12} key={contest.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {contest.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {contest.description}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={contest.status}
                          color={contest.status === 'Ongoing' ? 'success' : 'primary'}
                          variant="outlined"
                        />
                        <Chip
                          label={contest.type}
                          color="secondary"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime color="action" />
                        <Typography variant="body2">
                          {contest.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People color="action" />
                        <Typography variant="body2">
                          {contest.participants} participants
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEvents color="action" />
                        <Typography variant="body2">
                          Prize Pool: ${contest.prizePool}
                        </Typography>
                      </Box>
                    </Stack>

                    {contest.status === 'Ongoing' && contest.progress && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Contest Progress
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={contest.progress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button 
                        variant="outlined"
                        onClick={() => navigate(`/contests/${contest.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="contained"
                        disabled={contest.status !== 'Ongoing'}
                        onClick={() => navigate(`/contests/${contest.id}/join`)}
                      >
                        {contest.status === 'Ongoing' ? 'Join Now' : 'Register'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Contest</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={newContest.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={newContest.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Contest Type</InputLabel>
              <Select
                name="type"
                value={newContest.type}
                label="Contest Type"
                onChange={handleSelectChange}
              >
                <MenuItem value="LIVE">Live Contest</MenuItem>
                <MenuItem value="VIRTUAL">Virtual Contest</MenuItem>
                <MenuItem value="TEAM">Team Contest</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                name="difficulty"
                value={newContest.difficulty}
                label="Difficulty"
                onChange={handleSelectChange}
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Duration (hours)"
              name="duration"
              value={newContest.duration}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Prize Pool ($)"
              name="prizePool"
              type="number"
              value={newContest.prizePool}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateContest} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contest; 