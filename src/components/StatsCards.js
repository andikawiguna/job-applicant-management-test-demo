import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { 
  People, 
  CheckCircle, 
  Cancel, 
  Schedule 
} from '@mui/icons-material';

/**
 * Stats cards component for displaying candidate statistics
 * @param {Object} props - Component props
 * @param {Array} props.candidates - Array of candidate data
 */
const StatsCards = ({ candidates = [] }) => {
  const totalApplicants = candidates.length;
  const hired = candidates.filter(c => c.status === 'hired').length;
  const rejected = candidates.filter(c => c.status === 'rejected').length;
  
  // Calculate applications from this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const appliedThisWeek = candidates.filter(c => 
    new Date(c.date) >= oneWeekAgo
  ).length;

  const stats = [
    {
      title: 'Total Applicants',
      value: totalApplicants,
      icon: <People />,
      color: 'primary',
      bgColor: 'primary.light',
    },
    {
      title: 'Hired',
      value: hired,
      icon: <CheckCircle />,
      color: 'success',
      bgColor: 'success.light',
    },
    {
      title: 'Rejected',
      value: rejected,
      icon: <Cancel />,
      color: 'error',
      bgColor: 'error.light',
    },
    {
      title: 'Applied This Week',
      value: appliedThisWeek,
      icon: <Schedule />,
      color: 'info',
      bgColor: 'info.light',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: stat.bgColor,
                    color: stat.color + '.main',
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="700" color={stat.color + '.main'}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;