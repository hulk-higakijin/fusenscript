import { useContext } from 'react'
import Fusen from './Fusen'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'

const Fusens = () => {
  const { fusens, users } = useContext(FusenRoomsContext)
  return (
    <>
      {fusens.map((fusen: Fusen) => (
        <Fusen fusen={fusen} users={users} key={fusen.id} />
      ))}
    </>
  )
}

export default Fusens
