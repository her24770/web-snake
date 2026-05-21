function Snake({ isHead, player = 1 }) {
  const cls = `snake-segment${isHead ? ' head' : ''}${player === 2 ? ' player2' : ''}`
  return <div className={cls} />
}

export default Snake
