function Score({ score, highScore }) {
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
