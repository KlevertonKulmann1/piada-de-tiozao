import React, { useEffect } from 'react';
import { Box, Button, Typography, Paper, IconButton, CircularProgress, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BottomNav from '../components/BottomNavigation';
import { useJokes } from '../JokesContext';
import crown from '../assets/crown.svg';
import brFlag from '../assets/br.svg';
import usFlag from '../assets/us.svg';
import '../App.css';

const Jokes: React.FC = () => {
  const {
    currentJoke,
    translatedJoke,
    showAnswer,
    setShowAnswer,
    nextJoke,
    favorites,
    toggleFavorite,
    language,
    setLanguage,
    loadingTranslation,
    currentApiSource
  } = useJokes();

  const flagImg = {
    pt: brFlag,
    en: usFlag,
  };

  const [step, setStep] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingJoke, setIsLoadingJoke] = React.useState(false); // Novo estado para loading

  const isFavorite = currentJoke && favorites.some(fav => fav.id === currentJoke.id);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setStep(2);
  };

  const handleToggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const askJoke = async () => {
    setIsLoadingJoke(true); // Ativa loading
    setError(null);
    try {
      await nextJoke();
      setShowAnswer(false);
      setStep(1);
    } catch {
      setError('Erro ao buscar nova piada. Tente novamente.');
    } finally {
      setIsLoadingJoke(false); // Desativa loading
    }
  };

  useEffect(() => {
    if (currentJoke?.answer === '') {
      setStep(2);
    }
  }, [currentJoke, setStep, step]);

  if (!currentJoke) {
    return (
      <Box 
        minHeight="100vh" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ backgroundColor: 'var(--color-primary)' }}
      >
        <CircularProgress color="warning" />
        <Typography mt={2}>Carregando piada...</Typography>
      </Box>
    );
  }

  // Overlay de loading para busca de piadas
  if (isLoadingJoke) {
    return (
      <Box 
        minHeight="100vh" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ backgroundColor: 'var(--color-primary)' }}
      >
        <CircularProgress color="warning" />
        <Typography mt={2}>Buscando nova piada...</Typography>
      </Box>
    );
  }

  // Decide qual piada mostrar
  const jokeToShow = language === 'pt' && translatedJoke ? translatedJoke : currentJoke;

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="space-between" 
      sx={{ backgroundColor: 'var(--color-primary)' }}
    >
      <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
        <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Box display="flex" alignItems="center" mb={8}>
            <img src={crown} style={{ marginRight:10, width:45 }}/>
            <Typography variant="h4" color="#000">
              Piadas de Tiozão
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {loadingTranslation && (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100vh',
                top: '50%',
                left: '50%',
                zIndex: 22,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                transform: 'translate(-50%, -50%)',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                Traduzindo...
                <CircularProgress size={18} color="inherit" sx={{ ml: 1 }} />
              </Box>
            </Box>
          )}

          {currentApiSource && (
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, fontStyle: 'italic' }}>
              Fonte: {currentApiSource}
            </Typography>
          )}

          <Paper 
            className='card'
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 3, 
              width: 320,
              minHeight: 120,
              maxWidth: 320, 
              textAlign: 'center', 
              position: 'relative',
              alignItems: 'center',
              display: 'block',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <Typography 
              variant="h6" 
              color="text.primary"
              sx={{
                pl: 1,
                pr: 1,
                wordWrap: 'break-word',
                hyphens: 'auto',
                lineHeight: 1.4
              }}
            >
              {showAnswer ? jokeToShow.answer : jokeToShow.question}
            </Typography>

            <IconButton
              onClick={() => toggleFavorite(currentJoke)}
              color={isFavorite ? 'error' : 'default'}
              sx={{ 
                position: 'absolute', 
                top: 4, 
                right: 4,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  boxShadow: '0 0 0  rgba(0, 0, 0, 0)',
                },
                '&:focus': {
                  outline:'none',
                },
              }}
              aria-label="Favoritar piada"
              disabled={isLoadingJoke || loadingTranslation}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Paper>

          {step < 2 ? (
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{ 
                borderRadius: 'var(--border-radius-2xl)',
                px: 4,
                width: '100%',
                backgroundColor:'#DE8514',
                color: 'var(--color-white)',
                '&:hover': {
                  backgroundColor:'#CD7303',
                  transform: 'translateY(-1px)',
                  boxShadow: 'var(--shadow-md)'
                },
                '&:focus':{
                  outline: 'none',
                },
                transition: 'var(--transition-fast)'
              }}
              onClick={handleShowAnswer}
              disabled={isLoadingJoke || loadingTranslation}
            >
              Ver resposta
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{ 
                borderRadius: 'var(--border-radius-2xl)', 
                px: 4,
                width: '100%',
                backgroundColor:'#DE8514',
                color: 'var(--color-white)',
                '&:hover': {
                  backgroundColor:'#CD7303',
                  transform: 'translateY(-1px)',
                  boxShadow: 'var(--shadow-md)'
                },
                '&:focus':{
                  outline: 'none',
                },
                transition: 'var(--transition-fast)'
              }}
              onClick={askJoke}
              disabled={isLoadingJoke || loadingTranslation}
            >
              {isLoadingJoke ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Typography variant="button">
                  Nova Piada
                </Typography>
              )}
            </Button>
          )}
        </Box>
      </Box>

      <IconButton 
        sx={{ 
          width: 40, 
          height: 40, 
          mr: 2, 
          position:'absolute', 
          bottom:10, 
          right:0, 
          mb:8, 
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)', 
          p:0, 
          '&:focus': { outline: 'none' } 
        }} 
        onClick={handleToggleLanguage} 
        aria-label="Trocar idioma"
        disabled={isLoadingJoke || loadingTranslation}
      >
        <img 
          src={flagImg[language]} 
          alt={language === 'pt' ? 'Bandeira do Brasil' : 'Bandeira dos EUA'} 
          style={{ width: 40, height: 40, borderRadius: 2 }} 
        />
      </IconButton>
      
      <BottomNav />
    </Box>
  );
};

export default Jokes;