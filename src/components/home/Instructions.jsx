function Instructions() {
  return (
    <section className="home-section home-section--base">
      <div className="home-section-inner">
        <div className="home-section-header">
          <div>
            <h2 className="home-section-title">Instrucciones</h2>
            <p className="home-section-subtitle">Cómo jugar</p>
          </div>
        </div>

        <div className="instructions-grid">
          <div className="instruction-card">
            <p className="instruction-card-number">01</p>
            <h3 className="instruction-card-title">Muévete</h3>
            <p className="instruction-card-desc">Controla la serpiente con WASD o las flechas del teclado</p>
            <div className="instruction-keys">
              <div className="instruction-keys-row">
                <kbd>W</kbd>
              </div>
              <div className="instruction-keys-row">
                <kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
              </div>
            </div>
          </div>

          <div className="instruction-card">
            <p className="instruction-card-number">02</p>
            <h3 className="instruction-card-title">Come</h3>
            <p className="instruction-card-desc">Pasa sobre la comida para crecer. Cada alimento suma <strong>+10 pts</strong></p>
          </div>

          <div className="instruction-card">
            <p className="instruction-card-number">03</p>
            <h3 className="instruction-card-title">Sobrevive</h3>
            <p className="instruction-card-desc">Evita chocar con las paredes o con tu propio cuerpo o el juego termina</p>
          </div>

          <div className="instruction-card">
            <p className="instruction-card-number">04</p>
            <h3 className="instruction-card-title">2 Jugadores</h3>
            <p className="instruction-card-desc">Activa el modo dos jugadores. J1 usa WASD, J2 usa las flechas</p>
            <div className="instruction-keys" style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
              <div>
                <p className="instruction-keys-label">J1</p>
                <div className="instruction-keys-row"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div>
              </div>
              <div>
                <p className="instruction-keys-label">J2</p>
                <div className="instruction-keys-row"><kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Instructions
