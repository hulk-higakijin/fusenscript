import { useUser } from '@clerk/nextjs'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'
import { supabase } from 'utils/supabase'

const Kanban = ({ kanban }: { kanban: Kanban }) => {
  const [color, setColor] = useState<string>('bg-green-500')
  const [location, setLocation] = useState<Coordinate>({
    xcoordinate: kanban.xcoordinate,
    ycoordinate: kanban.ycoordinate,
  })
  const { user } = useUser()
  let { kanbans, setKanbans } = useContext(FusenRoomsContext)

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setLocation({ xcoordinate: data.x, ycoordinate: data.y })
  }

  const handleStop = () => {
    const updateKanban = async () => {
      await supabase.from('kanban').update(location).match({ id: kanban.id })
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
      }
    }
    deleteKanban()
  }

  return (
    <Draggable
      defaultPosition={{ x: kanban.xcoordinate, y: kanban.ycoordinate }}
      onDrag={(e, data) => handleDrag(e, data)}
      onStop={() => handleStop()}
    >
      <div
        className={`${color} w-fit px-4 py-1 rounded-sm text-white cursor-grab absolute flex`}
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
