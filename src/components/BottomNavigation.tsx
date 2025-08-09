import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Box, IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { useJokes } from '../JokesContext';
import brFlag from '../assets/br.svg';
import usFlag from '../assets/us.svg';

const navItems = [
  { label: 'Piada', icon: <EmojiEmotionsIcon />, path: '/' },
  { label: 'Favoritos', icon: <FavoriteIcon />, path: '/favorites' },
  { label: 'Sobre nós', icon: <InfoIcon />, path: '/about' },
];

const flagImg = {
  pt: brFlag,
  en: usFlag,
};

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useJokes();
  const currentIndex = navItems.findIndex(item => item.path === location.pathname);
  const [value, setValue] = React.useState(currentIndex === -1 ? 0 : currentIndex);

  React.useEffect(() => {
    setValue(currentIndex === -1 ? 0 : currentIndex);
  }, [currentIndex]);

  const handleToggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

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
          sx={{ flex: 1, bgcolor: 'transparent' }}
        >
          {navItems.map((item, idx) => (
            <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} sx={{ color: '#fff' }} />
          ))}
        </BottomNavigation>
        <IconButton sx={{ ml: 1 }} onClick={handleToggleLanguage} aria-label="Trocar idioma">
          <img src={flagImg[language]} alt={language === 'pt' ? 'Bandeira do Brasil' : 'Bandeira dos EUA'} style={{ width: 28, height: 20, borderRadius: 2, boxShadow: '0 1px 4px #0002' }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default BottomNav; 