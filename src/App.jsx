import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/home/Home'
import Play from './pages/Play'
import Ranking from './pages/Ranking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/ranking" element={<Ranking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
