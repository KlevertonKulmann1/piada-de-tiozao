import { Link } from 'react-router-dom'
import Navigation from './pages/components/navigation'

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Jokes', path: '/jokes' },
  { name: 'About', path: '/about' }
];

function App() {
  return (
    <div style={{ display: 'flex', width:'100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Navigation pages={PAGES}/>
      </div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        {PAGES.map(page => (
          <Link key={page.name} to={page.path}>{page.name}</Link>
        ))}
      </nav>

    </div>
  )
}

export default App
