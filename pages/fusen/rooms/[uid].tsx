import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Fusens from 'components/Layouts/fusen/Fusens'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid: string = context.query.uid as string
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
    props: { room, fusens, kanbans, users, uid },
  }
}

const RoomsUidPage: NextPage<Props> = ({
  room,
  fusens,
  kanbans,
  users,
  uid,
}) => {
  const [defaultRoomName, setDefaultRoomName] = useState<string>(room.name)
  const [inputRoomName, setInputRoomName] = useState<string>(room.name)
  const [showForm, setShowForm] = useState<boolean>(false)
  const router = useRouter()

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
    await supabase.from('room').delete().match({ uid: uid })
    alert('部屋を削除します。')
    router.push('/fusen/rooms')
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

      <p>--------------------</p>
      <Fusens fusens={fusens} users={users} />
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
