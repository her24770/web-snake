function InstruccionesUnJugador() {
  return (
    <div className="game-controls">
      <div className="controls-keys">
        <div className="controls-keys-group">
          <kbd>W</kbd>
        </div>
        <div className="controls-keys-group">
          <kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
        </div>
        <span className="controls-label" style={{ margin: '0 4px' }}>or</span>
        <div className="controls-keys-group">
          <kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd>
        </div>
      </div>
      <p className="controls-label">MOVE</p>
    </div>
  )
}

export default InstruccionesUnJugador
