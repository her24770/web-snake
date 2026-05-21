function ModalGameOver({ score, score2, winner, players, onRestart, onConfig }) {
  const titulo   = players === 2 ? (winner === 0 ? 'EMPATE' : `GANA J${winner}`) : 'MUERTO'
  const subtitulo = players === 2
    ? (winner === 0 ? 'Ambos cayeron al mismo tiempo' : `Jugador ${winner} gana la partida`)
    : 'Más suerte la próxima vez'

  return (
    <div className="game-modal">
      <div className="game-modal-card">
        <p className="game-modal-label">Juego terminado</p>
        <h2 className="game-modal-title">{titulo}</h2>
        <p className="game-modal-subtitle">{subtitulo}</p>

        {players === 2 ? (
          <div className="gameover-scores">
            <div>
              <p className="game-modal-score">{score}</p>
              <p className="game-modal-score-label">Jugador 1</p>
            </div>
            <div>
              <p className="game-modal-score game-modal-score--p2">{score2}</p>
              <p className="game-modal-score-label">Jugador 2</p>
            </div>
          </div>
        ) : (
          <>
            <p className="game-modal-score">{score}</p>
            <p className="game-modal-score-label">Puntaje final</p>
          </>
        )}

        <button className="game-modal-btn" onClick={onRestart}>INTENTAR DE NUEVO</button>
        <button className="game-modal-btn-secondary" onClick={onConfig}>ELEGIR MODO</button>
      </div>
    </div>
  )
}

export default ModalGameOver
