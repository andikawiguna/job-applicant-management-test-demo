import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useStore } from '../../store/useStore';

/**
 * Application header with sidebar toggle
 */
const Header = () => {
  const { toggleSidebar } = useStore();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Job Applicant Management System
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;