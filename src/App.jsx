import { useState } from 'react'
import Home from './pages/Home'
import Play from './pages/Play'
import Ranking from './pages/Ranking'

function App() {
  const [view, setView] = useState('home')

  if (view === 'play') return <Play onNavigate={setView} />
  if (view === 'ranking') return <Ranking onNavigate={setView} />
  return <Home onNavigate={setView} />
}

export default App
