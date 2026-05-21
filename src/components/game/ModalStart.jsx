function ModalStart({ onStart, onConfig }) {
  return (
    <div className="game-modal">
      <div className="game-modal-card">
        <p className="game-modal-label">¿Listo?</p>
        <h2 className="game-modal-title">SNAKE</h2>
        <p className="game-modal-subtitle">Usa WASD para moverte</p>
        <button className="game-modal-btn" onClick={onStart}>INICIAR JUEGO</button>
        <button className="game-modal-btn-secondary" onClick={onConfig}>ELEGIR MODO</button>
      </div>
    </div>
  )
}

export default ModalStart
