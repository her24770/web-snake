import { getRanking } from '../utils/ranking'
import './Ranking.css'

function Ranking() {
  const ranking = getRanking()
  const top1 = ranking[0]
  const rest  = ranking.slice(1)
  const maxScore = top1?.score ?? 1

  return (
    <main style={{ flex: 1, position: 'relative' }}>
      <div className="ranking-bg">
        <div className="grid-bg grid-perspective" style={{ opacity: 0.4 }}></div>
      </div>

      <div className="ranking-page">
        <div className="ranking-inner">

          <div className="ranking-header">
            <p className="ranking-label">Top 10</p>
            <h1 className="ranking-title">RANKING</h1>
          </div>

          {top1 && (
            <div className="rk-first">
              <div className="rk-first-left">
                <span className="rk-first-number">1</span>
                <div>
                  <p className="rk-first-tag">LÍDER</p>
                  <p className="rk-first-name">{top1.name}</p>
                </div>
              </div>
              <div className="rk-first-right">
                <p className="rk-first-score-label">Puntaje</p>
                <p className="rk-first-score">{top1.score.toLocaleString()}</p>
              </div>
            </div>
          )}

          <div className="rk-list">
            {rest.map(entry => (
              <div key={entry.rank} className="rk-row">
                <span className="rk-row-rank">#{entry.rank}</span>
                <span className="rk-row-name">{entry.name}</span>
                <div className="rk-row-bar-wrap">
                  <div
                    className="rk-row-bar"
                    style={{ width: `${(entry.score / maxScore) * 100}%` }}
                  />
                </div>
                <span className="rk-row-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  )
}

export default Ranking
