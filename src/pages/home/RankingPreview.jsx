import { Link } from 'react-router-dom'

const mockTop3 = [
  { rank: 1, name: 'ACE', score: 4820 },
  { rank: 2, name: 'ZER', score: 3210 },
  { rank: 3, name: 'NXS', score: 2780 },
]

function RankingPreview() {
  return (
    <section className="home-section home-section--dark">
      <div className="home-section-inner">
        <div className="home-section-header">
          <div>
            <h2 className="home-section-title">Top 3</h2>
            <p className="home-section-subtitle">Mejores puntajes registrados</p>
          </div>
          <Link to="/ranking" className="home-btn-ver-todo">VER TODO →</Link>
        </div>

        <div className="rank-first">
          <div className="rank-first-left">
            <span className="rank-first-number">1</span>
            <div>
              <p className="rank-first-label">PRIMER LUGAR</p>
              <p className="rank-first-name">{mockTop3[0].name}</p>
            </div>
          </div>
          <div className="rank-first-right">
            <p className="rank-first-score-label">SCORE</p>
            <p className="rank-first-score">{mockTop3[0].score.toLocaleString()}</p>
          </div>
        </div>

        <div className="rank-others">
          {mockTop3.slice(1).map(entry => (
            <div key={entry.rank} className="rank-card">
              <div className="rank-card-left">
                <span className="rank-card-number">{entry.rank}</span>
                <p className="rank-card-name">{entry.name}</p>
              </div>
              <p className="rank-card-score">{entry.score.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RankingPreview
