import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import BottomNav from '../components/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { useJokes } from '../JokesContext';
import crown from '../assets/crown.svg';
import smile from '../assets/smile.png';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { nextJoke } = useJokes();

    const handleHoraDaPiada = async () => {
        await nextJoke();
        navigate('/jokes');
    };

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between" bgcolor="#FFD36E">
            <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
                <Box display="flex" alignItems="center" mb={2}>
                    <img src={crown} style={{ marginRight:10, width:45 }}/>
                    <Typography variant="h4" color="#000">
                        Piadas de Tiozão
                    </Typography>
                </Box>
                <Paper elevation={3} sx={{ p: 2, mb: 3, maxWidth: 320, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="body1" color="text.secondary" fontWeight='bold'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare nisl odio, sed ullamcorper massa hendrerit ut.
                    </Typography>
                </Paper>
                <Button variant="contained" style={{backgroundColor: '#DE8514'}} size="large" sx={{ borderRadius: 8, fontWeight: 'bold', px: 4 }} onClick={handleHoraDaPiada}>
                <img src={smile} style={{ marginRight:10 }}/>                Hora da Piada
                </Button>
            </Box>
            <BottomNav />
        </Box>
    );
};

export default Home;