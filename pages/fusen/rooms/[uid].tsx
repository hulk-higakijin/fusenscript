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
  const users = await fetch(`${process.env.DOMAIN}/api/users`).then((res) =>
    res.json(),
  )
  return {
    props: { rooms, fusens, kanbans, users },
  }
}

const RoomsUidPage: NextPage<Props> = ({ rooms, fusens, kanbans, users }) => {
  const [room, setRoom] = useState<Room>(rooms[0])

  return (
    <>
      <p>{room.name}</p>
      <p>--------------------</p>
      <ul>
        {fusens.map((fusen: Fusen) => (
          <li key={fusen.id}>
            {fusen.content}：{fusen.xcoordinate},{fusen.ycoordinate},
            {users.filter((user: any) => user.id == fusen.user_id)[0].firstName}
          </li>
        ))}
      </ul>
      <p>--------------------</p>
      <ul>
        {kanbans.map((kanban: Kanban) => (
          <li key={kanban.id}>
            {kanban.title}：{kanban.xcoordinate},{kanban.ycoordinate}
          </li>
        ))}
      </ul>
    </>
  )
}

export default RoomsUidPage
