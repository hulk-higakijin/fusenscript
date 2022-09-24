import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { FormEvent, useState } from 'react'
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
  const router = useRouter()
  const [roomName, setRoomName] = useState('')

  const createRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await supabase
      .from('room')
      .insert([{ name: roomName }])
      .single()
    router.push(`/fusen/rooms/${data.uid}`)
  }

  return (
    <>
      {rooms.map((room: Room) => (
        <div key={room.uid}>
          <Link href={`/fusen/rooms/${room.uid}`}>{room.name}</Link>
        </div>
      ))}

      <p>-------------------------</p>
      <form onSubmit={(e) => createRoom(e)}>
        <input
          type='roomName'
          onChange={(e) => setRoomName(e.target.value)}
          className='input input-bordered'
          required pattern=".*[^\s]+.*"
        />
        <button className='btn' type='submit'>
          作成
        </button>
      </form>
    </>
  )
}

export default RoomsPage
