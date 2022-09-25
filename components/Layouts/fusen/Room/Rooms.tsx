import Room from './Room'

const Rooms = ({ rooms }: { rooms: Room[] }) => {
  return (
    <>
      <div className='col-span-2'>
        {rooms.map((room: Room) => (
          <Room room={room} key={room.id} />
        ))}
      </div>
    </>
  )
}

export default Rooms
