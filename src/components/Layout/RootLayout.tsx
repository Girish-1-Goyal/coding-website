import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import NavBar from './NavBar';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'background.default'
        }}
      >
        <NavBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            pt: 8, // Add padding top to account for navbar height
            height: 'calc(100vh - 64px)', // Subtract navbar height
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px'
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default RootLayout; 