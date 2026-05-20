import { useNavigate } from 'react-router-dom'

function Ranking() {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button>
      <p>Ranking</p>
    </div>
  )
}

export default Ranking
