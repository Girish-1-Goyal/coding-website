import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography,
  useTheme,
  useMediaQuery,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

// Dummy credentials for testing
const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "Demo@123";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));
  const { loading, error: authError, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/contests');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // For demo purposes, check against dummy credentials
      if (formData.email === DEMO_EMAIL && formData.password === DEMO_PASSWORD) {
        const result = await dispatch(login({
          email: formData.email,
          password: formData.password
        } as LoginCredentials)).unwrap() as AuthResponse;
        
        if (result.token) {
          // Set session data
          const sessionData = {
            token: result.token,
            expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours from now
          };
          localStorage.setItem('session', JSON.stringify(sessionData));
          navigate('/contests');
        }
      } else {
        setError('Invalid credentials. Use demo@example.com / Demo@123');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD
    });
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey[50],
        py: 3
      }}
    >
      <Paper 
        elevation={4}
        sx={{
          width: isLaptop ? '400px' : '90%',
          maxWidth: '400px',
          padding: theme.spacing(4),
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to your account
            </Typography>
          </Box>

          {(error || authError) && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error || authError}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white'
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white'
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            sx={{
              height: '48px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={handleDemoLogin}
            sx={{
              height: '48px',
              textTransform: 'none',
              borderRadius: '8px'
            }}
          >
            Use Demo Account
          </Button>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%',
            mt: 2 
          }}>
            <Link 
              component={RouterLink} 
              to="/forgot-password"
              sx={{ 
                textDecoration: 'none',
                color: theme.palette.primary.main,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot Password?
            </Link>
            <Link 
              component={RouterLink} 
              to="/signup"
              sx={{ 
                textDecoration: 'none',
                color: theme.palette.primary.main,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Create Account
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 