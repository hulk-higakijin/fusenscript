import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useState } from 'react'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid: string = context.query.uid as string
  const { data: rooms } = await supabase.from('room').select('*').eq('uid', uid)
  return {
    props: { rooms },
  }
}

const RoomsUidPage: NextPage<Props> = ({ rooms }) => {
  const [room, setRoom] = useState<Room>(rooms[0])

  return (
    <>
      <p>{room.name}</p>
    </>
  )
}

export default RoomsUidPage
