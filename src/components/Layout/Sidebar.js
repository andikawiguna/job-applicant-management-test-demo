import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import {
  Home,
  ViewList,
  TableChart,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Card List', icon: <ViewList />, path: '/list' },
  { text: 'Dashboard Table', icon: <TableChart />, path: '/table' },
];

/**
 * Collapsible sidebar navigation component
 * Highlights active page and provides navigation
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useStore();

  // Handle navigation and active page tracking
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" noWrap component="div" color="primary">
            Job Manager
          </Typography>
        </Box>
      </Toolbar>
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;