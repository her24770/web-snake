import { useState } from 'react'

function ModalNuevoRecord({ score, onSave }) {
  const [name, setName] = useState('')

  function handleSave() {
    if (name.trim().length === 0) return
    onSave(name.trim())
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSave()
  }

  return (
    <div className="game-modal">
      <div className="game-modal-card">
        <p className="game-modal-label">¡Nuevo récord!</p>
        <h2 className="game-modal-title">TOP 10</h2>
        <p className="game-modal-subtitle">Tu puntaje entró al ranking</p>
        <p className="game-modal-score">{score}</p>
        <p className="game-modal-score-label">Puntaje final</p>
        <input
          className="record-input"
          type="text"
          maxLength={3}
          placeholder="AAA"
          value={name}
          onChange={e => setName(e.target.value.toUpperCase())}
          onKeyDown={handleKey}
          autoFocus
        />
        <p className="record-input-label">Tus iniciales (máx. 3)</p>
        <button
          className="game-modal-btn"
          onClick={handleSave}
          disabled={name.trim().length === 0}
        >
          GUARDAR
        </button>
      </div>
    </div>
  )
}

export default ModalNuevoRecord
