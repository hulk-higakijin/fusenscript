import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Fusens from 'components/Layouts/fusen/Fusen/Fusens'
import Kanbans from 'components/Layouts/fusen/Kanban/Kanbans'
import RoomName from 'components/Layouts/fusen/Room/Name'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

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
  return (
    <>
      <RoomName room={room} />
      <Fusens fusens={fusens} users={users} />
      <Kanbans kanbans={kanbans} />
    </>
  )
}

export default RoomsUidPage
