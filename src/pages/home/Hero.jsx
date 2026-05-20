import { Link } from 'react-router-dom'

const mockTop3 = [
  { rank: 1, name: 'ACE', score: 4820 },
  { rank: 2, name: 'ZER', score: 3210 },
  { rank: 3, name: 'NXS', score: 2780 },
]

function Hero() {
  const topPlayer = mockTop3[0]

  return (
    <main className="hero">
      <div className="hero-title-wrapper">
        <h1 className="hero-title">SNAKE</h1>
        <div className="hero-tag">NANDEZ</div>
      </div>

      <div className="hero-actions">
        <Link to="/play" className="hero-btn-start">START GAME</Link>

        <div className="hero-stats">
          <div className="hero-stat">
            <p className="hero-stat-label">High Score</p>
            <p className="hero-stat-value">{topPlayer.score.toLocaleString()}</p>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <p className="hero-stat-label">Top Player</p>
            <p className="hero-stat-value">{topPlayer.name}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
