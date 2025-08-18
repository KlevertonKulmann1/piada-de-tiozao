import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import BottomNav from '../components/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { useJokes } from '../JokesContext';
import crown from '../assets/crown.svg';
import smile from '../assets/smile.png';
import '../App.css';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const { nextJoke } = useJokes();
    const [loadingPiada, setLoadingPiada] = useState(false);

    const handleHoraDaPiada = async () => {
        setLoadingPiada(true)
        await nextJoke();
        navigate('/jokes');
    };

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between" bgcolor="#FFD36E">
            <Box display="flex" flexDirection="column" alignItems="center" maxWidth={320} margin={'40px auto'}>
                <Box display="flex" alignItems="center" mb={8}>
                    <img src={crown} style={{ marginRight:10, width:45 }}/>
                    <Typography variant="h4" color="#000">
                        Piadas de Tiozão
                    </Typography>
                </Box>
                <Paper elevation={3} className='card' sx={{ p: 2, mb: 3 }}>
                    <Typography variant="body1" color="text.secondary" fontWeight='500'>
                    "Seja bem vindo ao Tiozão, aqui você pode encontrar piadas de qualquer lugar do mundo. 
                    Vale rir quando a tradução não condiz com a piada original".
                    </Typography>
                </Paper>
                <Button variant="contained" size="large" loading={loadingPiada} sx={{ backgroundColor:'#DE8514', width:'100%', borderRadius: 8, fontSize:20, fontWeight: '500', px: 4, '&:focus':{outline:'none'}, '&:hover':{backgroundColor:'#CD7303'} }} onClick={handleHoraDaPiada}>
                    <img src={smile} style={{ marginRight:10 }}/> Hora da Piada
                </Button>
            </Box>
            <BottomNav />
        </Box>
    );
};

export default Home;