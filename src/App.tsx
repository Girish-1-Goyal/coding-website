import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import RootLayout from './components/Layout/RootLayout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import Learn from './components/Learn/Learn';
import Contest from './components/Contest/Contest';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootState } from './store';
import { Alert, Box } from '@mui/material';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            Something went wrong. Please try refreshing the page.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <RootLayout>
                  <Routes>
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/contest" element={<Contest />} />
                    <Route path="/" element={<Navigate to="/learn" replace />} />
                  </Routes>
                </RootLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
