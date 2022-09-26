import { useContext } from 'react'
import Kanban from './Kanban'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'

const Kanbans = () => {
  const { kanbans } = useContext(FusenRoomsContext)
  return (
    <>
      {kanbans.map((kanban: Kanban) => (
        <Kanban kanban={kanban} key={kanban.id} />
      ))}
    </>
  )
}

export default Kanbans
