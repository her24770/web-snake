function Score({ score, score2, highScore, players }) {
  if (players === 2) {
    return (
      <div className="score-bar">
        <div>
          <p className="score-label">Jugador 1</p>
          <p className="score-value">{score}</p>
        </div>
        <div className="score-bar-right">
          <div className="score-secondary">
            <p className="score-secondary-label">Jugador 2</p>
            <p className="score-secondary-value score-secondary-value--p2">{score2}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="score-bar">
      <div>
        <p className="score-label">Score</p>
        <p className="score-value">{score}</p>
      </div>
      <div className="score-bar-right">
        <div className="score-secondary">
          <p className="score-secondary-label">High Score</p>
          <p className="score-secondary-value">{highScore}</p>
        </div>
      </div>
    </div>
  )
}

export default Score
