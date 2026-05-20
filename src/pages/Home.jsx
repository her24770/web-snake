import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Snake</h1>
      <button onClick={() => navigate('/play')}>Jugar</button>
      <button onClick={() => navigate('/ranking')}>Ranking</button>
    </div>
  )
}

export default Home
