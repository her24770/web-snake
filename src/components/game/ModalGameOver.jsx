function ModalGameOver({ score, onRestart }) {
  return (
    <div className="game-modal">
      <div className="game-modal-card">
        <p className="game-modal-label">Game Over</p>
        <h2 className="game-modal-title">DEAD</h2>
        <p className="game-modal-subtitle">Better luck next time</p>
        <p className="game-modal-score">{score}</p>
        <p className="game-modal-score-label">Final Score</p>
        <button className="game-modal-btn" onClick={onRestart}>TRY AGAIN</button>
      </div>
    </div>
  )
}

export default ModalGameOver
