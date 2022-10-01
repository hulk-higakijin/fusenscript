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

const Fusen = ({ fusen, users }: { fusen: Fusen; users: User[] }) => {
  const [userName, setUserName] = useState<string>(
    users.filter((user: User) => user.id == fusen.user_id)[0].firstName,
  )
  const [color, setColor] = useState<string>('bg-primary') // ランダムカラーを設定したい
  // ドラドロでかなりへんかするためstateで持つ
  const [location, setLocation] = useState<Coordinate>({
    xcoordinate: fusen.xcoordinate,
    ycoordinate: fusen.ycoordinate,
  })
  const [newPosition, setNewPosition] = useState<ControlPosition | undefined>(
    undefined,
  )
  const { user } = useUser()
  let { fusens, setFusens } = useContext(FusenRoomsContext)

  const isMyFusen = () => {
    return fusen.user_id == user?.id
  }

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setLocation({ xcoordinate: data.x, ycoordinate: data.y })
    setNewPosition({ x: data.x, y: data.y })
  }

  const handleStop = () => {
    const updateFusen = async () => {
      const { data } = await supabase
        .from('fusen')
        .update(location)
        .match({ id: fusen.id })
        .single()
      socket.emit('shareFusenRequest', { data })
    }
    updateFusen()
  }

  const handleDelete = () => {
    const deleteFusen = async () => {
      if (user) {
        const { data } = await supabase
          .from('fusen')
          .delete()
          .match({ id: fusen.id, user_id: user.id })
          .single()
        setFusens(fusens.filter((fusen: Fusen) => fusen.id !== data.id))
        socket.emit('deleteFusenRequest', { data })
      }
    }
    deleteFusen()
  }

  useEffect(() => {
    setNewPosition({ x: fusen.xcoordinate, y: fusen.ycoordinate })
  }, [fusen])

  return (
    <Draggable
      defaultPosition={{ x: fusen.xcoordinate, y: fusen.ycoordinate }}
      onDrag={(e, data) => handleDrag(e, data)}
      onStop={() => handleStop()}
      position={newPosition}
    >
      <div
        className={`${color} h-28 w-40 text-white px-2 pb-2 rounded-sm flex flex-col border border-black cursor-grab absolute`}
      >
        {isMyFusen() && (
          <div className='ml-auto'>
            <FontAwesomeIcon
              icon={faXmark}
              className='hover:text-red-500 cursor-pointer text-2xl'
              onClick={() => handleDelete()}
            />
          </div>
        )}
        <p className='m-auto'>{fusen.content}</p>
        <p className='text-sm ml-auto'>{userName}</p>
      </div>
    </Draggable>
  )
}

export default Fusen
