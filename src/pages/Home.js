import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ViewList,
  TableChart,
  Info,
} from '@mui/icons-material';

/**
 * Home page component with welcome message and navigation instructions
 */
const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Welcome to Job Applicant Management System
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage and track job applicants efficiently.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Info sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="600">
                    How to Navigate
                  </Typography>
                </Box>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ViewList color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Card List"
                      secondary="View candidates in a card-based list format with pagination. Perfect for quick overview and actions."
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <TableChart color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard Table"
                      secondary="View candidates in a sortable table format. Ideal for detailed data analysis and comparison."
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Quick Tips
                </Typography>
                <Typography variant="body2">
                  Use the sidebar to navigate between different views of candidate data.
                  Each view offers unique features for managing applicants effectively.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;