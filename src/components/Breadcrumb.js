import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const breadcrumbMap = {
  '/': 'Home',
  '/list': 'Candidate List',
  '/table': 'Dashboard Table',
};

/**
 * Reusable breadcrumb component for navigation
 */
const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(path);
  };

  const pathSegments = location.pathname === '/' ? ['/'] : ['/', location.pathname];

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {pathSegments.map((path, index) => {
          const isLast = index === pathSegments.length - 1;
          const label = breadcrumbMap[path] || path;

          if (isLast) {
            return (
              <Typography key={path} color="text.primary" fontWeight="600">
                {path === '/' && <Home sx={{ mr: 0.5, fontSize: 16 }} />}
                {label}
              </Typography>
            );
          }

          return (
            <Link
              key={path}
              color="inherit"
              onClick={() => handleClick(path)}
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {path === '/' && <Home sx={{ mr: 0.5, fontSize: 16 }} />}
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;