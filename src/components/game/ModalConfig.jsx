import { useState } from 'react'
import { SIZES, SPEEDS } from '../../game/gameLogic'

function ModalConfig({ config, onApply }) {
  const [local, setLocal] = useState(config)

  return (
    <div className="game-modal">
      <div className="game-modal-card game-modal-card--wide">
        <p className="game-modal-label">Configuración</p>
        <h2 className="game-modal-title" style={{ fontSize: 32, marginBottom: 28 }}>MODO</h2>

        <p className="config-section-label">Jugadores</p>
        <div className="config-options">
          {[1, 2].map(n => (
            <button
              key={n}
              className={`config-option${local.players === n ? ' selected' : ''}`}
              onClick={() => setLocal(l => ({ ...l, players: n }))}
            >
              <span className="config-option-name">{n === 1 ? '1 Jugador' : '2 Jugadores'}</span>
            </button>
          ))}
        </div>

        <p className="config-section-label">Tamaño</p>
        <div className="config-options">
          {Object.entries(SIZES).map(([key, val]) => (
            <button
              key={key}
              className={`config-option${local.size === key ? ' selected' : ''}`}
              onClick={() => setLocal(l => ({ ...l, size: key }))}
            >
              <span className="config-option-name">{val.label}</span>
              <span className="config-option-desc">{val.desc}</span>
            </button>
          ))}
        </div>

        <p className="config-section-label">Velocidad</p>
        <div className="config-options">
          {Object.entries(SPEEDS).map(([key, val]) => (
            <button
              key={key}
              className={`config-option${local.speed === key ? ' selected' : ''}`}
              onClick={() => setLocal(l => ({ ...l, speed: key }))}
            >
              <span className="config-option-name">{val.label}</span>
            </button>
          ))}
        </div>

        <button className="game-modal-btn" onClick={() => onApply(local)}>CONFIRMAR</button>
      </div>
    </div>
  )
}

export default ModalConfig
