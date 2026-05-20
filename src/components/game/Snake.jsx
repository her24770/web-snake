function Snake({ isHead }) {
  return <div className={`snake-segment${isHead ? ' head' : ''}`} />
}

export default Snake
