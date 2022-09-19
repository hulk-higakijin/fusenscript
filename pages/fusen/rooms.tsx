import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { supabase } from 'utils/supabase'

type Props = InferGetStaticPropsType<typeof getStaticProps>

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
        <div key={room.uid}>
          <Link href={`/fusen/rooms/${room.uid}`}>{room.name}</Link>
        </div>
      ))}
    </>
  )
}

export default RoomsPage
