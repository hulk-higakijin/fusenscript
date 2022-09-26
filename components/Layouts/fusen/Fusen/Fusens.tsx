import { useContext } from 'react'
import Fusen from './Fusen'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'

const Fusens = () => {
  const { fusens, users } = useContext(FusenRoomsContext)
  return (
    <>
      <div className='position'>
        {fusens.map((fusen: Fusen) => (
          <Fusen fusen={fusen} users={users} key={fusen.id} />
        ))}
      </div>
    </>
  )
}

export default Fusens
