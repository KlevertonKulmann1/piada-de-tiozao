import React from 'react';
import { Box, Typography, Paper, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Fade } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNav from '../components/BottomNavigation';
import { useJokes } from '../JokesContext';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useJokes();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedJokeId, setSelectedJokeId] = React.useState<string | null>(null);

  const handleRemoveClick = (jokeId: string) => {
    setSelectedJokeId(jokeId);
    setOpenDialog(true);
  };

  const handleConfirmRemove = () => {
    if (selectedJokeId) {
      const joke = favorites.find(j => j.id === selectedJokeId);
      if (joke) toggleFavorite(joke);
    }
    setOpenDialog(false);
    setSelectedJokeId(null);
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between" bgcolor="#FFD36E">
      <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <FavoriteIcon fontSize="large" sx={{ mr: 1, color: '#6B4F1D' }} />
          <Typography variant="h5" fontWeight="bold">
            Favoritas
          </Typography>
        </Box>
        <Stack spacing={2} width="100%" maxWidth={340}>
          {favorites.length === 0 ? (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma piada favorita ainda. Adicione suas favoritas!
              </Typography>
            </Paper>
          ) : (
            favorites.map((joke) => (
              <Fade in key={joke.id}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {joke.question}
                    </Typography>
                    {joke.answer && (
                      <Typography variant="body2" color="text.secondary">
                        {joke.answer}
                      </Typography>
                    )}
                  </Box>
                  <IconButton color="error" onClick={() => handleRemoveClick(joke.id)} aria-label="Remover dos favoritos">
                    <FavoriteIcon />
                  </IconButton>
                </Paper>
              </Fade>
            ))
          )}
        </Stack>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Remover dos favoritos?</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja remover esta piada dos favoritos?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancelar</Button>
          <Button onClick={handleConfirmRemove} color="error" autoFocus>Remover</Button>
        </DialogActions>
      </Dialog>
      <BottomNav />
    </Box>
  );
};

export default Favorites;