import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { useStore } from '../../store/useStore';

/**
 * Main layout component that wraps the entire application
 * Provides responsive layout with header and sidebar
 */
const Layout = ({ children }) => {
  const { sidebarOpen } = useStore();

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: sidebarOpen ? 0 : '-240px',
          width: '100%',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;