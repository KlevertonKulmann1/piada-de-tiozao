import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BottomNav from '../components/BottomNavigation';
import Cracha from '../assets/cracha.svg';
import Antonio from '../assets/antonio.jpg';
import Bianca from '../assets/bianca.jpg';
import Diego from '../assets/diego.jpg';
import Kleverton from '../assets/kleverton.jpg';
import Leilane from '../assets/leilane.jpg';
import Manoela from '../assets/manoela.jpg';
import '../App.css';

const About: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between" bgcolor="#FFD36E">
      <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Box display="flex" alignItems="center" mb={8}>
            <img src={Cracha} style={{ marginRight:10, width:45, filter:'brightness(0)' }}/>
            <Typography variant="h4" color="#000">
                Sobre Nós
            </Typography>
          </Box>
        <Paper elevation={3} className='card' sx={{ p: 2, maxWidth: 320, textAlign: 'justify', borderRadius: 2, marginBottom: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Este projeto foi desenvolvido com carinho pelos estudantes do último semestre da graduação em Sistemas para Internet do Centro Universitário SENAC, como parte do projeto integrador do semestre. 
            A ideia é trazer um pouco de humor e nostalgia com as famosas piadas de tiozão, que sempre arrancam risadas e sorrisos. Esperamos que você se divirta tanto quanto nós nos divertimos criando este projeto!
          </Typography>
        </Paper>

        <Paper elevation={3} className='card' style={{padding: 30}} sx={{ maxWidth: 320, textAlign: 'center', borderRadius: 2, marginBottom: 2 }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <img src={Bianca} style={{ width: 80, marginRight: 16, borderRadius: 16, boxShadow: '8px 8px 16px rgba(0,0,0,0.18)' }} />
    <Box>
      <Typography variant="subtitle1" color="text.primary">
        Bianca Barcelos
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a 
          href="https://github.com/BiancaBarcelos" target="_blank" rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
        >
          https://github.com/BiancaBarcelos
        </a>
      </Typography>
    </Box>
  </Box>
</Paper>

        <Paper elevation={3} className='card' style={{padding: 30}} sx={{ maxWidth: 320, textAlign: 'center', borderRadius: 2, marginBottom: 2 }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <img src={Diego} style={{ width: 80, marginRight: 16, borderRadius: 16, boxShadow: '8px 8px 16px rgba(0,0,0,0.18)' }} />
    <Box>
      <Typography variant="subtitle1" color="text.primary">
        Diego Fogaça
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a  href="https://github.com/DiFogaca" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}>
          https://github.com/DiFogaca
        </a>
      </Typography>
    </Box>
  </Box>
</Paper>

        <Paper elevation={3} className='card' style={{padding: 30}} sx={{ maxWidth: 320, textAlign: 'center', borderRadius: 2, marginBottom: 2 }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <img src={Manoela} style={{ width: 80, marginRight: 16, borderRadius: 16, boxShadow: '8px 8px 16px rgba(0,0,0,0.18)' }} />
    <Box>
      <Typography variant="subtitle1" color="text.primary">
      Manoela Harrison
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a 
          href="https://github.com/Manoelah20" target="_blank" rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
        >
          https://github.com/Manoelah20
        </a>
      </Typography>
    </Box>
  </Box>
</Paper>
      
<Paper elevation={3} className='card' style={{padding: 30}} sx={{ maxWidth: 320, textAlign: 'center', borderRadius: 2, marginBottom: 2 }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <img src={Kleverton} style={{ width: 80, marginRight: 16, borderRadius: 16, boxShadow: '8px 8px 16px rgba(0,0,0,0.18)' }} />
    <Box>
      <Typography variant="subtitle1" color="text.primary">
        Kleverton Kulmann
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a 
          href="https://github.com/KlevertonKulmann1" target="_blank" rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
        >
https://github.com/KlevertonKulmann1
        </a>
      </Typography>
    </Box>
  </Box>
</Paper>
      
 <Paper elevation={3} className='card' style={{padding: 30}} sx={{ maxWidth: 320, textAlign: 'center', borderRadius: 2, marginBottom: 2 }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <img src={Antonio} style={{ width: 80, marginRight: 16, borderRadius: 16, boxShadow: '8px 8px 16px rgba(0,0,0,0.18)' }} />
    <Box>
      <Typography variant="subtitle1" color="text.primary">
        Antonio Gabriel
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a 
          href="https://github.com/Arcane6" target="_blank" rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
        >
https://github.com/Arcane6
        </a>
      </Typography>
    </Box>
  </Box> 
</Paper>

        <Paper elevation={3} className='card' style={{padding: 30}} sx={{ maxWidth: 320, textAlign: 'center', borderRadius: 2, marginBottom: 6 }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <img src={Leilane} style={{ width: 80, marginRight: 16, borderRadius: 16, boxShadow: '8px 8px 16px rgba(0,0,0,0.18)' }} />
    <Box>
      <Typography variant="subtitle1" color="text.primary">
        Leilane Hirt
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <a 
          href="https://github.com/leilanehirt" target="_blank" rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
        >
https://github.com/leilanehirt
        </a>
      </Typography>
    </Box>
  </Box>
</Paper>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default About;