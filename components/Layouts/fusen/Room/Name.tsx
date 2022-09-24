import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { supabase } from 'utils/supabase'

const RoomName = ({ room }: { room: Room }) => {
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
        <form onSubmit={(e) => handleUpdate(e)}>
          <input
            type='text'
            value={inputRoomName}
            className='input input-bordered'
            onChange={(e) => setInputRoomName(e.target.value)}
            required
            pattern='.*[^\s]+.*'
          />
          <button type='submit' className='btn'>
            登録
          </button>
          <button
            onClick={() => setShowForm(false)}
            className='btn btn-primary'
          >
            キャンセル
          </button>
        </form>
      ) : (
        <>
          <p>{defaultRoomName}</p>
          <button className='btn' onClick={() => setShowForm(true)}>
            編集
          </button>
          <button className='btn btn-primary' onClick={() => handleDelete()}>
            削除
          </button>
        </>
      )}
    </>
  )
}

export default RoomName
