import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const navItems = [
  { text: 'Learn', path: '/learn' },
  { text: 'Blog', path: '/blog' },
  { text: 'Contest', path: '/contest' }
];

const NavBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <CodeIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'primary.main', textDecoration: 'none' }}>
          Coding Platform
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path}
            sx={{ 
              textAlign: 'center',
              bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                sx: { 
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <Divider />
            <ListItem 
              component={Link} 
              to="/login"
              sx={{ 
                textAlign: 'center',
                bgcolor: location.pathname === '/login' ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText 
                primary="Login" 
                primaryTypographyProps={{
                  sx: { 
                    color: location.pathname === '/login' ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === '/login' ? 600 : 400
                  }
                }}
              />
            </ListItem>
            <ListItem 
              component={Link} 
              to="/signup"
              sx={{ 
                textAlign: 'center',
                bgcolor: location.pathname === '/signup' ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText 
                primary="Sign Up" 
                primaryTypographyProps={{
                  sx: { 
                    color: location.pathname === '/signup' ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === '/signup' ? 600 : 400
                  }
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={1}
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.paper'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <CodeIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Coding Platform
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
              {!isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'primary.light'
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0 }}
                >
                  {user?.avatar ? (
                    <Avatar alt={user.username} src={user.avatar} />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                  )}
                </IconButton>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: 'background.paper'
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default NavBar; 