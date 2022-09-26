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
    .select(`*, fusen(*), kanban(*)`)
    .eq('uid', uid)
    .single()
  const users = await fetch(`${process.env.DOMAIN}/api/users`).then((res) =>
    res.json(),
  )

  return {
    props: { room, users },
  }
}

const RoomsUidPage: NextPage<Props> = ({ room, users }) => {
  const [fusens, setFusens] = useState(room.fusen)
  const [kanbans, setKanbans] = useState(room.kanban)

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
