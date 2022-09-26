import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import RoomCreateForm from 'components/Layouts/fusen/Room/CreateForm'
import Rooms from 'components/Layouts/fusen/Room/Rooms'
import { supabase } from 'utils/supabase'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps: GetStaticProps = async () => {
  const { data: rooms } = await supabase
    .from('room')
    .select()
    .order('created_at', { ascending: false })
  return {
    props: { rooms },
    revalidate: 10,
  }
}

const RoomsPage: NextPage<Props> = ({ rooms }) => {
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        <Rooms rooms={rooms} />
        <RoomCreateForm />
      </div>
    </>
  )
}

export default RoomsPage
