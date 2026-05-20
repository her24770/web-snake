import { useNavigate } from 'react-router-dom'

function Play() {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button>
      <p>Play</p>
    </div>
  )
}

export default Play
