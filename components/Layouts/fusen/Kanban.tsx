import { useState } from 'react'
import Draggable from 'react-draggable'

const Kanban = ({ kanban }: { kanban: Kanban }) => {
  const [color, setColor] = useState('bg-green-500')

  return (
    <Draggable>
      <div
        className={`${color} w-fit px-4 py-1 rounded-sm text-white cursor-grab`}
      >
        {kanban.title}
      </div>
    </Draggable>
  )
}

export default Kanban
