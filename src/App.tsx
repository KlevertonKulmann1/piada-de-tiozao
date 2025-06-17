import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Jokes from './pages/Jokes'
import About from './pages/About'
import Favorites from './pages/Favorites'

const PAGES = [
  { name: 'Home', label: 'Home', path: '/' },
  { name: 'Jokes', label: 'Piadas', path: '/jokes' },
  { name: 'Favorites', label: 'Favoritas', path: '/favorites' },
  { name: 'About', label: 'Sobre', path: '/about' }
];

const pageComponents: { [key: string]: React.ComponentType } = {
  Home,
  Jokes,
  Favorites,
  About
};

function App() {
  return (
    <div style={{ display: 'flex', width:'100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Routes>
            {PAGES.map(page => {
                const Component = pageComponents[page.name];
                return (
                    <Route key={page.name} path={page.path} element={Component ? <Component /> : null} />
                );
            })}
        </Routes>
      </div>
      <Navigation pages={PAGES} />

    </div>
  )
}

export default App
