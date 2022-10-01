import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import FusenCreateButton from 'components/Layouts/fusen/Fusen/CreateButton'
import Fusens from 'components/Layouts/fusen/Fusen/Fusens'
import KanbanCreateButton from 'components/Layouts/fusen/Kanban/CreateButton'
import Kanbans from 'components/Layouts/fusen/Kanban/Kanbans'
import RoomName from 'components/Layouts/fusen/Room/Name'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const server_url = 'http://localhost:8000'
const socket: Socket = io(server_url)

export const FusenRoomsContext = createContext<FusenContextType>({
  room: { id: '', name: '', created_at: '', uid: '' },
  fusens: [],
  setFusens: () => {},
  kanbans: [],
  setKanbans: () => {},
  users: [],
})

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query
  const { data: room } = await supabase
    .from('room')
    .select(`*, fusen(*), kanban(*)`)
    .eq('uid', uid)
    .single()
  const users = await fetch(`${process.env.DOMAIN}/api/users`).then((res) =>
    res.json(),
  )

  return {
    props: { room, users, uid },
  }
}

const RoomsUidPage: NextPage<Props> = ({ room, users, uid }) => {
  const [fusens, setFusens] = useState<Fusen[]>(room.fusen)
  const [kanbans, setKanbans] = useState<Kanban[]>(room.kanban)

  const value = {
    room,
    fusens,
    setFusens,
    kanbans,
    setKanbans,
    users,
  }

  useEffect(() => {
    socket.on('shareFusen', (res) => {
      if (res.room_id == uid) {
        let array  = fusens.filter((fusen: Fusen) => {
          return fusen.id != res.id
        })
        array.push(res)
        setFusens(array)
      }
    })

    socket.on('deleteFusen', (res) => {
      if (res.room_id == uid) {
        let array = fusens.filter((fusen: Fusen) => {
          return fusen.id != res.id
        })
        setFusens(array)
      }
    })
  }, [fusens, uid])

  return (
    <>
      <FusenRoomsContext.Provider value={value}>
        <RoomName />
        <div className='position'>
          <Fusens />
          <Kanbans />
        </div>
        <div className='mt-auto ml-auto p-8 flex gap-10'>
          <FusenCreateButton />
          <KanbanCreateButton />
        </div>
      </FusenRoomsContext.Provider>
    </>
  )
}

export default RoomsUidPage
