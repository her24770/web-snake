function InstruccionesDosJugadores() {
  return (
    <div className="game-controls">
      <div className="controls-keys" style={{ gap: 32 }}>
        <div>
          <p className="controls-label" style={{ marginBottom: 6 }}>JUGADOR 1</p>
          <div style={{ display: 'flex', gap: 4 }}>
            <div className="controls-keys-group"><kbd>W</kbd></div>
            <div className="controls-keys-group"><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div>
          </div>
        </div>
        <div>
          <p className="controls-label" style={{ marginBottom: 6 }}>JUGADOR 2</p>
          <div className="controls-keys-group">
            <kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstruccionesDosJugadores
