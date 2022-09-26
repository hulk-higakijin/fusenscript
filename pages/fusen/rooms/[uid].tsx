import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { createContext } from 'react'
import FusenCreateButton from 'components/Layouts/fusen/Fusen/CreateButton'
import Fusens from 'components/Layouts/fusen/Fusen/Fusens'
import KanbanCreateButton from 'components/Layouts/fusen/Kanban/CreateButton'
import Kanbans from 'components/Layouts/fusen/Kanban/Kanbans'
import RoomName from 'components/Layouts/fusen/Room/Name'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const FusenRoomsContext = createContext({
  room: { name: '' },
  fusens: [],
  users: [],
  kanbans: [],
})

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query
  const { data: room } = await supabase
    .from('room')
    .select('*')
    .eq('uid', uid)
    .single()
  const { data: fusens } = await supabase
    .from('fusen')
    .select('*')
    .eq('room_id', uid)
  const { data: kanbans } = await supabase
    .from('kanban')
    .select('*')
    .eq('room_id', uid)
  const users = await fetch(`${process.env.DOMAIN}/api/users`).then((res) =>
    res.json(),
  )

  return {
    props: { room, fusens, kanbans, users },
  }
}

const RoomsUidPage: NextPage<Props> = ({ room, fusens, kanbans, users }) => {
  const value = {
    room,
    fusens,
    kanbans,
    users,
  }

  return (
    <>
      <FusenRoomsContext.Provider value={value}>
        <RoomName />
        <Fusens />
        <Kanbans />
        <div className='mt-auto ml-auto p-8 flex gap-10'>
          <FusenCreateButton />
          <KanbanCreateButton />
        </div>
      </FusenRoomsContext.Provider>
    </>
  )
}

export default RoomsUidPage
