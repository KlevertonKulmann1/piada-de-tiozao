import { Route, Routes } from 'react-router-dom';
import { JokesProvider } from './JokesContext'; // Importe o Provider
import Home from './pages/Home';
import Jokes from './pages/Jokes';
import About from './pages/About';
import Favorites from './pages/Favorites';

function App() {
  return (
    <JokesProvider> {/* Envolve todas as rotas */}
      <div className="app-container">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jokes" element={<Jokes />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </JokesProvider>
  );
}

export default App;
