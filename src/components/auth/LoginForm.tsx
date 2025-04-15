import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      await socialLogin(provider);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Social login failed');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Login
      </Button>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <IconButton
          onClick={() => handleSocialLogin('google')}
          color="primary"
          sx={{ border: 1, borderColor: 'divider' }}
        >
          <GoogleIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSocialLogin('github')}
          color="primary"
          sx={{ border: 1, borderColor: 'divider' }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSocialLogin('facebook')}
          color="primary"
          sx={{ border: 1, borderColor: 'divider' }}
        >
          <FacebookIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Button
            component="a"
            href="/signup"
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Sign up
          </Button>
        </Typography>
        <Typography variant="body2">
          <Button
            component="a"
            href="/forgot-password"
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Forgot password?
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm; 