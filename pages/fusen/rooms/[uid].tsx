import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useState } from 'react'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid: string = context.query.uid as string
  const { data: rooms } = await supabase.from('room').select('*').eq('uid', uid)
  const { data: fusens } = await supabase
    .from('fusen')
    .select('*')
    .eq('room_id', uid)
  const { data: kanbans } = await supabase
    .from('kanban')
    .select('*')
    .eq('room_id', uid)
  return {
    props: { rooms, fusens, kanbans },
  }
}

const RoomsUidPage: NextPage<Props> = ({ rooms, fusens, kanbans }) => {
  const [room, setRoom] = useState<Room>(rooms[0])
  console.log(kanbans)

  return (
    <>
      <p>{room.name}</p>
      <p>--------------------</p>
      <ul>
        {fusens.map((fusen: Fusen) => (
          <li key={fusen.id}>{fusen.content}</li>
        ))}
      </ul>
      <p>--------------------</p>
      <ul>
        {kanbans.map((kanban: Kanban) => (
          <li key={kanban.id}>{kanban.title}</li>
        ))}
      </ul>
    </>
  )
}

export default RoomsUidPage
