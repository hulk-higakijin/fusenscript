import Room from './Room'

const Rooms = ({ rooms }: { rooms: Room[] }) => {
  return (
    <>
      <div className='w-1/3 mx-auto'>
        {rooms.map((room: Room) => (
          <Room room={room} key={room.id} />
        ))}
      </div>
    </>
  )
}

export default Rooms
