import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { createContext, useState } from 'react'
import FusenCreateButton from 'components/Layouts/fusen/Fusen/CreateButton'
import Fusens from 'components/Layouts/fusen/Fusen/Fusens'
import KanbanCreateButton from 'components/Layouts/fusen/Kanban/CreateButton'
import Kanbans from 'components/Layouts/fusen/Kanban/Kanbans'
import RoomName from 'components/Layouts/fusen/Room/Name'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const FusenRoomsContext = createContext<FusenContextType>({
  room: { id: '', name: '', created_at: '', uid: '' },
  fusens: [],
  setFusens: () => {},
  kanbans: [],
  setKanbans: () => {},
  users: [],
})

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query
  const { data: room } = await supabase
    .from('room')
    .select('*')
    .eq('uid', uid)
    .single()
  const { data: fusenList } = await supabase
    .from('fusen')
    .select('*')
    .eq('room_id', uid)
  const { data: kanbanList } = await supabase
    .from('kanban')
    .select('*')
    .eq('room_id', uid)
  const users = await fetch(`${process.env.DOMAIN}/api/users`).then((res) =>
    res.json(),
  )

  return {
    props: { room, fusenList, kanbanList, users },
  }
}

const RoomsUidPage: NextPage<Props> = ({
  room,
  fusenList,
  kanbanList,
  users,
}) => {
  const [fusens, setFusens] = useState(fusenList)
  const [kanbans, setKanbans] = useState(kanbanList)

  const value = {
    room,
    fusens,
    setFusens,
    kanbans,
    setKanbans,
    users,
  }

  return (
    <>
      <FusenRoomsContext.Provider value={value}>
        <RoomName />
        <div className='position'>
          <Fusens />
          <Kanbans />
        </div>
        <div className='mt-auto ml-auto p-8 flex gap-10'>
          <FusenCreateButton />
          <KanbanCreateButton />
        </div>
      </FusenRoomsContext.Provider>
    </>
  )
}

export default RoomsUidPage
