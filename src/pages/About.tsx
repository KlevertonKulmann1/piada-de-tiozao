import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BottomNav from '../components/BottomNavigation';

const About: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between" bgcolor="#FFD36E">
      <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <InfoIcon fontSize="large" sx={{ mr: 1, color: '#6B4F1D' }} />
          <Typography variant="h5" fontWeight="bold">
            Sobre nós
          </Typography>
        </Box>
        <Paper elevation={3} sx={{ p: 2, maxWidth: 320, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare nisl odio, sed ullamcorper massa hendrerit ut. Duis metus quam, vestibulum sit amet scelerisque commodo, laoreet ac orci. Pellentesque commodo, tortor et convallis gravida, ex risus bibendum arcu, sit amet gravida nibh ante nec quam. Interdum et malesuada fames ac.
          </Typography>
        </Paper>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default About;