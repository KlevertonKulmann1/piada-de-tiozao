import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import Mascara from '../assets/mascara.svg';
import Coracao from '../assets/coracao.svg';
import Cracha from '../assets/cracha.svg';


const navItems = [
  { label: 'Piada', icon: <img src={Mascara} />, path: '/' },
  { label: 'Favoritas', icon: <img src={Coracao} />, path: '/favorites' },
  { label: 'Sobre Nós', icon: <img src={Cracha} />, path: '/about' },
];



const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = navItems.findIndex(item => item.path === location.pathname);
  const [value, setValue] = React.useState(currentIndex === -1 ? 0 : currentIndex);

  React.useEffect(() => {
    setValue(currentIndex === -1 ? 0 : currentIndex);
  }, [currentIndex]);


  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#6B4F1D' }} elevation={6}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            navigate(navItems[newValue].path);
          }}
          sx={{ flex: 1, bgcolor: 'transparent', '&focus':{outline:'none'} }}
        >
            {navItems.map((item) => (
            <BottomNavigationAction 
              key={item.label} 
              label={item.label} 
              icon={item.icon} 
              sx={{ 
              color: '#fff', 
              gap: .8,
              filter: 'grayscale(100%) brightness(200%)',
              '&.Mui-selected': { 
                color: '#F2BF59',
                filter: 'grayscale(0) brightness(1)',
              },
              '&:focus':{outline:'none'},
              '&:hover':{backgroundColor:'transparent', tranform:'translate(0,0)', boxShadow:'none'},
              }}
            />
            ))}
        </BottomNavigation>
        
      </Box>
    </Paper>
  );
};

export default BottomNav; 