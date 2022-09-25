import { format, formatDistance, subDays } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

const Room = ({ room }: { room: Room }) => {
  const [dateDistance, setDateDistance] = useState(
    formatDistance(subDays(new Date(room.created_at), 0), new Date(), {
      addSuffix: true,
    }),
  )

  return (
    <>
      <Link href={`/fusen/rooms/${room.uid}`}>
        <div className='border-b p-2 cursor-pointer flex rounded-md hover:bg-gray-50'>
          <p className='my-auto p-2'>{room.name}</p>
          <p className='text-xs pl-auto mt-auto ml-auto w-fit h-fit'>
            {dateDistance}
          </p>
        </div>
      </Link>
    </>
  )
}

export default Room
