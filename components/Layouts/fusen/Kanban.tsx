import { useState } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable'

const Kanban = ({ kanban }: { kanban: Kanban }) => {
  const [color, setColor] = useState('bg-green-500')
  const handleStop = (e: DraggableEvent) => {
    console.log(e)
  }

  return (
    <Draggable
      defaultPosition={{ x: kanban.xcoordinate, y: kanban.ycoordinate }}
      onStop={(e) => handleStop(e)}
    >
      <div
        className={`${color} w-fit px-4 py-1 rounded-sm text-white cursor-grab absolute`}
      >
        {kanban.title}
      </div>
    </Draggable>
  )
}

export default Kanban
