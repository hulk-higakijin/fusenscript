import { useUser } from '@clerk/nextjs'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import Draggable, {
  ControlPosition,
  DraggableData,
  DraggableEvent,
} from 'react-draggable'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'
import { socket } from 'utils/socket'
import { supabase } from 'utils/supabase'

const Kanban = ({ kanban }: { kanban: Kanban }) => {
  const [color, setColor] = useState<string>('bg-success')
  const [location, setLocation] = useState<Coordinate>({
    xcoordinate: kanban.xcoordinate,
    ycoordinate: kanban.ycoordinate,
  })
  const [newPosition, setNewPosition] = useState<ControlPosition | undefined>(
    undefined,
  )
  const { user } = useUser()
  let { kanbans, setKanbans } = useContext(FusenRoomsContext)

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setLocation({ xcoordinate: data.x, ycoordinate: data.y })
    setNewPosition({ x: data.x, y: data.y })
  }

  const handleStop = () => {
    const updateKanban = async () => {
      const { data } = await supabase
        .from('kanban')
        .update(location)
        .match({ id: kanban.id })
        .single()
      socket.emit('shareKanbanRequest', { data })
    }
    updateKanban()
  }

  const handleDelete = () => {
    const deleteKanban = async () => {
      if (user) {
        const { data } = await supabase
          .from('kanban')
          .delete()
          .match({ id: kanban.id })
          .single()
        setKanbans(kanbans.filter((kanban: Kanban) => kanban.id !== data.id))
        socket.emit('deleteKanbanRequest', { data })
      }
    }
    deleteKanban()
  }

  useEffect(() => {
    setNewPosition({ x: kanban.xcoordinate, y: kanban.ycoordinate })
  }, [kanban])

  return (
    <Draggable
      defaultPosition={{ x: kanban.xcoordinate, y: kanban.ycoordinate }}
      onDrag={(e, data) => handleDrag(e, data)}
      onStop={() => handleStop()}
      position={newPosition}
    >
      <div
        className={`${color} w-fit px-4 py-1 rounded-sm text-success-content cursor-grab absolute flex`}
      >
        <p>{kanban.title}</p>
        <div className='ml-4 flex'>
          <FontAwesomeIcon
            icon={faXmark}
            className='hover:text-red-500 cursor-pointer text-2xl m-auto'
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </Draggable>
  )
}

export default Kanban
