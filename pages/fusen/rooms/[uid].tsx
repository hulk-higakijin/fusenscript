import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { createContext, useEffect, useState } from 'react'
import FusenCreateButton from 'components/Layouts/fusen/Fusen/CreateButton'
import Fusens from 'components/Layouts/fusen/Fusen/Fusens'
import KanbanCreateButton from 'components/Layouts/fusen/Kanban/CreateButton'
import Kanbans from 'components/Layouts/fusen/Kanban/Kanbans'
import RoomName from 'components/Layouts/fusen/Room/Name'
import { socket } from 'utils/socket'
import { supabase } from 'utils/supabase'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

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
        let array = fusens.filter((fusen: Fusen) => {
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

    socket.on('shareKanban', (res) => {
      if (res.room_id == uid) {
        let array = kanbans.filter((kanban: Kanban) => {
          return kanban.id != res.id
        })
        array.push(res)
        setKanbans(array)
      }
    })

    socket.on('deleteKanban', (res) => {
      if (res.room_id == uid) {
        let array = kanbans.filter((kanban: Kanban) => {
          return kanban.id != res.id
        })
        setKanbans(array)
      }
    })
  }, [fusens, kanbans, uid])

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
