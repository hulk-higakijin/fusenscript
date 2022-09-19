import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { supabase } from 'utils/supabase'

type Props = InferGetStaticPropsType<typeof getStaticProps>

type Room = {
  id: string
  uid: string
  name: string
  created_at: string
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: rooms } = await supabase.from('room').select('*')
  return {
    props: { rooms },
    revalidate: 10,
  }
}

const RoomsPage: NextPage<Props> = ({ rooms }) => {
  return (
    <>
      {rooms.map((room: Room) => (
        <p key={room.id}>{room.name}</p>
      ))}
    </>
  )
}

export default RoomsPage
