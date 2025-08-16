import React, { useEffect } from 'react';
import { Box, Button, Typography, Paper, IconButton, CircularProgress, Alert } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BottomNav from '../components/BottomNavigation';
import { useJokes } from '../JokesContext';

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
    loadingTranslation,
    currentApiSource
  } = useJokes();

  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);

  const isFavorite = currentJoke && favorites.some(fav => fav.id === currentJoke.id);


  const handleShowAnswer = () => {
    setShowAnswer(true);
    setStep(2)
  };

  const askJoke = async () => {
      setLoading(true);
      setError(null);
      try {
          await nextJoke();
        setShowAnswer(false);
        setStep(1)
      } catch (e) {
        setError('Erro ao buscar nova piada. Tente novamente.');
      }
      setLoading(false);
  };

  useEffect(()=>{
    
    if(currentJoke?.answer === '') {
      setStep(2)
    }
  },[currentJoke, setStep, step])

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

  // Decide qual piada mostrar
  const jokeToShow = language === 'pt' && translatedJoke ? translatedJoke : currentJoke;
  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      flexDirection="column" 
      justifyContent="space-between" 
      sx={{ backgroundColor: 'var(--color-primary)' }}
    >
      <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <EmojiEmotionsIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
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
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 3, 
            width: 320,
            minHeight: 120,
            maxWidth: 320, 
            textAlign: 'center', 
            borderRadius: 2, 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-white)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <Typography 
            variant="h6" 
            color="text.primary"
            sx={{
              pr: 6, // Espaço para o ícone de favoritos
              pl: 1,
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
              top: 8, 
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)'
              }
            }}
            aria-label="Favoritar piada"
            disabled={loading}
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
            fontWeight: 'var(--font-weight-bold)', 
            px: 4,
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            '&:hover': {
              backgroundColor: 'var(--color-secondary-dark)',
              transform: 'translateY(-1px)',
              boxShadow: 'var(--shadow-md)'
            },
            transition: 'var(--transition-fast)'
          }}
          onClick={() => handleShowAnswer()}>Ver resposta</Button>
        ) : (
        <Button
          variant="contained"
          color="warning"
          size="large"
          sx={{ 
            borderRadius: 'var(--border-radius-2xl)', 
            fontWeight: 'var(--font-weight-bold)', 
            px: 4,
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-white)',
            '&:hover': {
              backgroundColor: 'var(--color-secondary-dark)',
              transform: 'translateY(-1px)',
              boxShadow: 'var(--shadow-md)'
            },
            transition: 'var(--transition-fast)'
          }}
          onClick={askJoke}
          disabled={loading}
        >
          {loading && (
            <CircularProgress size={24} color="inherit" />
          )}
          {!loading && (
            <Typography variant="button">
              Nova Piada
            </Typography>
          )}
        </Button>
        )}
      </Box>
      <BottomNav />
    </Box>
  );
};

export default Jokes;