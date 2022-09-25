import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { supabase } from 'utils/supabase'

const RoomCreateForm = () => {
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
      <div className='mx-auto flex flex-col gap-4'>
        <h2 className='font-semibold text-lg'>ルーム作成</h2>
        <form onSubmit={(e) => createRoom(e)} className='flex gap-4'>
          <input
            type='roomName'
            onChange={(e) => setRoomName(e.target.value)}
            className='input input-bordered'
            required
            pattern='.*[^\s]+.*'
          />
          <button className='btn' type='submit'>
            作成
          </button>
        </form>
      </div>
    </>
  )
}

export default RoomCreateForm
