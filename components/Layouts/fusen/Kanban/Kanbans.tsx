import { useContext } from 'react'
import Kanban from './Kanban'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'

const Kanbans = () => {
  const { kanbans } = useContext(FusenRoomsContext)
  return (
    <>
      <div className='position'>
        {kanbans.map((kanban: Kanban) => (
          <Kanban kanban={kanban} key={kanban.id} />
        ))}
      </div>
    </>
  )
}

export default Kanbans
