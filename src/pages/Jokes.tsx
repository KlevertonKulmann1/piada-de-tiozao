import React from 'react';
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
  const [error, setError] = React.useState<string | null>(null);

  const isFavorite = currentJoke && favorites.some(fav => fav.id === currentJoke.id);

  const handleButtonClick = async () => {
    if (showAnswer) {
      setLoading(true);
      setError(null);
      try {
        await nextJoke();
      } catch (e) {
        setError('Erro ao buscar nova piada. Tente novamente.');
      }
      setLoading(false);
    } else {
      setShowAnswer(true);
    }
  };

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
        {language === 'pt' && loadingTranslation && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Traduzindo piada...
            <CircularProgress size={18} color="inherit" sx={{ ml: 1 }} />
          </Alert>
        )}
        {language === 'pt' && !loadingTranslation && !translatedJoke && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Não foi possível traduzir a piada. Exibindo original em inglês.
          </Alert>
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
          onClick={handleButtonClick}
          disabled={loading || loadingTranslation}
        >
          {loading || loadingTranslation ? <CircularProgress size={24} color="inherit" /> : showAnswer ? 'Nova Piada' : 'Ver resposta'}
        </Button>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default Jokes;