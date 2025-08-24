import React from 'react';
import { Box, Typography, Paper, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Fade } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNav from '../components/BottomNavigation';
import { useJokes } from '../JokesContext';
import brFlag from '../assets/br.svg';
import usFlag from '../assets/us.svg';
import Coracao from '../assets/coracao.svg';
import '../App.css';

const Favorites: React.FC = () => {

  const flagImg = {
    pt: brFlag,
    en: usFlag,
  };
  const { favorites, toggleFavorite } = useJokes();
  const [language, setLanguage] = React.useState<'pt' | 'en'>('en');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedJokeId, setSelectedJokeId] = React.useState<string | null>(null);

  const toggleJokeLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

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
      <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
        <Box p={3} display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Box display="flex" alignItems="center" mb={8}>
            <img src={Coracao} style={{ marginRight:10, width:45, filter:'brightness(0)' }}/>
            <Typography variant="h4" color="#000">
                Favoritas
            </Typography>
          </Box>
          <Stack spacing={2} width="100%" maxWidth={340}>
            {favorites.length === 0 ? (
              <Paper elevation={2} className='card' sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Nenhuma piada favorita ainda. Adicione suas favoritas!
                </Typography>
              </Paper>
            ) : (
              favorites.map((joke) => (
                <Fade in key={joke.id}>
                  <Paper elevation={2}  className='card2' sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position:'relative' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" textAlign='left'>
                        {language === 'pt' ? joke.pergunta : joke.question}
                      </Typography>
                      {joke.answer && (
                        <Typography variant="body2" color="text.secondary" textAlign='left'>
                          {language === 'pt' ? joke.resposta : joke.answer}
                        </Typography>
                      )}
                    </Box>
                    <IconButton sx={{position:'absolute', right:4, top:2}} color="error" onClick={() => handleRemoveClick(joke.id)} aria-label="Remover dos favoritos">
                      <FavoriteIcon />
                    </IconButton>
                  </Paper>
                </Fade>
              ))
            )}
          </Stack>
        </Box>
        <IconButton sx={{ width: 40, height: 40, mr: 2, mb: 10, position:'fixed', bottom:0, right:2, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)', p:0, '&:focus': { outline: 'none' } }} onClick={toggleJokeLanguage} aria-label="Trocar idioma">
          <img src={flagImg[language]} alt={language === 'pt' ? 'Bandeira do Brasil' : 'Bandeira dos EUA'} style={{ width: 40, height: 40, borderRadius: 2,}} />
        </IconButton>
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