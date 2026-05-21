import { memo } from 'react'
import Snake from './Snake'
import Food from './Food'

function Cell({ isSnake, isHead, isSnake2, isHead2, isFood }) {
  return (
    <div className="board-cell">
      {isSnake  && <Snake isHead={isHead}  player={1} />}
      {isSnake2 && <Snake isHead={isHead2} player={2} />}
      {isFood   && <Food />}
    </div>
  )
}

export default memo(Cell)
