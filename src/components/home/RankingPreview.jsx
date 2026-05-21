import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTop3 } from '../../utils/ranking'

function RankingPreview() {
  const [top3, setTop3] = useState([])

  useEffect(() => {
    getTop3().then(setTop3)
  }, [])

  if (top3.length === 0) return null

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
              <p className="rank-first-name">{top3[0].name}</p>
            </div>
          </div>
          <div className="rank-first-right">
            <p className="rank-first-score-label">SCORE</p>
            <p className="rank-first-score">{top3[0].score.toLocaleString()}</p>
          </div>
        </div>

        {top3.length > 1 && (
          <div className="rank-others">
            {top3.slice(1).map(entry => (
              <div key={entry.rank} className="rank-card">
                <div className="rank-card-left">
                  <span className="rank-card-number">{entry.rank}</span>
                  <p className="rank-card-name">{entry.name}</p>
                </div>
                <p className="rank-card-score">{entry.score.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RankingPreview
