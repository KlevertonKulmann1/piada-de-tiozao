import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Jokes from './pages/Jokes'
import About from './pages/About'

function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/jokes">Piadas</Link>
        <Link to="/about">Sobre</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
