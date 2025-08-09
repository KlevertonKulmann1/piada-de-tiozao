import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import BottomNav from '../components/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { useJokes } from '../JokesContext';

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
                    <EmojiEmotionsIcon fontSize="large" sx={{ mr: 1 }} />
                    <Typography variant="h5" fontWeight="bold">
                        Piadas de Tiozão
                    </Typography>
                </Box>
                <Paper elevation={3} sx={{ p: 2, mb: 3, maxWidth: 320, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare nisl odio, sed ullamcorper massa hendrerit ut.
                    </Typography>
                </Paper>
                <Button variant="contained" color="warning" size="large" sx={{ borderRadius: 8, fontWeight: 'bold', px: 4 }} onClick={handleHoraDaPiada}>
                    <span role="img" aria-label="piada">🤣</span> Hora da Piada
                </Button>
            </Box>
            {/* Navegação inferior será implementada depois */}
            <BottomNav />
        </Box>
    );
};

export default Home;