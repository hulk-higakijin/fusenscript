import { useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { supabase } from 'utils/supabase'

const Fusen = ({ fusen, users }: { fusen: Fusen; users: User[] }) => {
  const [userName, setUserName] = useState<string>(
    users.filter((user: User) => user.id == fusen.user_id)[0].firstName,
  )
  const [color, setColor] = useState<string>('bg-blue-500') // ランダムカラーを設定したい
  const [location, setLocation] = useState<Coordinate>({
    xcoordinate: fusen.xcoordinate,
    ycoordinate: fusen.ycoordinate,
  })

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setLocation({ xcoordinate: data.x, ycoordinate: data.y })
  }

  const handleStop = () => {
    const updateFusen = async () => {
      await supabase.from('fusen').update(location).match({ id: fusen.id })
    }
    updateFusen()
  }

  return (
    <Draggable
      defaultPosition={{ x: fusen.xcoordinate, y: fusen.ycoordinate }}
      onDrag={(e, data) => handleDrag(e, data)}
      onStop={() => handleStop()}
    >
      <div
        className={`${color} h-28 w-40 text-white p-2 rounded-sm flex flex-col border border-black cursor-grab absolute`}
      >
        <p className='m-auto'>{fusen.content}</p>
        <p className='text-sm ml-auto'>{userName}</p>
      </div>
    </Draggable>
  )
}

export default Fusen
