import Snake from './Snake'
import Food from './Food'

function Cell({ isSnake, isHead, isFood }) {
  return (
    <div className="board-cell">
      {isSnake && <Snake isHead={isHead} />}
      {isFood && <Food />}
    </div>
  )
}

export default Cell
