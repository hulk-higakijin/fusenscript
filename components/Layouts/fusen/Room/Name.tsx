import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'
import { supabase } from 'utils/supabase'

const RoomName = () => {
  const { room } = useContext(FusenRoomsContext)
  const [defaultRoomName, setDefaultRoomName] = useState<string>(room.name)
  const [inputRoomName, setInputRoomName] = useState<string>(room.name)
  const [showForm, setShowForm] = useState<boolean>(false)
  const router = useRouter()
  const { uid } = router.query

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await supabase
      .from('room')
      .update([{ name: inputRoomName }])
      .match({ uid: uid })
      .single()
    setDefaultRoomName(data.name)
    setShowForm(false)
  }

  const handleDelete = async () => {
    const confirmation = confirm('部屋を削除します。')
    if (confirmation) {
      await supabase.from('room').delete().match({ uid: uid })
      router.push('/fusen/rooms')
    }
  }

  return (
    <>
      {showForm ? (
        <form onSubmit={(e) => handleUpdate(e)} className='flex'>
          <input
            type='text'
            value={inputRoomName}
            className='input input-bordered input-sm mx-auto'
            onChange={(e) => setInputRoomName(e.target.value)}
            required
            pattern='.*[^\s]+.*'
          />
          <div className='flex gap-4'>
            <button type='submit' className='btn btn-sm'>
              登録
            </button>
            <button
              onClick={() => setShowForm(false)}
              className='btn btn-sm btn-primary'
            >
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <div className='flex'>
          <h1 className='text-2xl font-bold mx-auto w-fit'>
            {defaultRoomName}
          </h1>
          <div className='flex gap-4'>
            <button className='btn btn-sm' onClick={() => setShowForm(true)}>
              編集
            </button>
            <button
              className='btn btn-sm btn-error'
              onClick={() => handleDelete()}
            >
              削除
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default RoomName
