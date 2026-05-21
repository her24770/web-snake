function ModalGameOver({ score, onRestart, onConfig }) {
  return (
    <div className="game-modal">
      <div className="game-modal-card">
        <p className="game-modal-label">Juego terminado</p>
        <h2 className="game-modal-title">MUERTO</h2>
        <p className="game-modal-subtitle">Más suerte la próxima vez</p>
        <p className="game-modal-score">{score}</p>
        <p className="game-modal-score-label">Puntaje final</p>
        <button className="game-modal-btn" onClick={onRestart}>INTENTAR DE NUEVO</button>
        <button className="game-modal-btn-secondary" onClick={onConfig}>ELEGIR MODO</button>
      </div>
    </div>
  )
}

export default ModalGameOver
