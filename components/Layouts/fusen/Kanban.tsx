import { useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { supabase } from 'utils/supabase'

const Kanban = ({ kanban }: { kanban: Kanban }) => {
  const [color, setColor] = useState('bg-green-500')
  const [location, setLocation] = useState<Coordinate>({
    xcoordinate: kanban.xcoordinate,
    ycoordinate: kanban.ycoordinate,
  })

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setLocation({ xcoordinate: data.x, ycoordinate: data.y })
  }

  const handleStop = () => {
    const updateKanban = async () => {
      await supabase.from('kanban').update(location).match({ id: kanban.id })
    }
    updateKanban()
  }

  return (
    <Draggable
      defaultPosition={{ x: kanban.xcoordinate, y: kanban.ycoordinate }}
      onDrag={(e, data) => handleDrag(e, data)}
      onStop={() => handleStop()}
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
