import { useState } from 'react'

const Fusen = ({ fusen, users }: { fusen: Fusen; users: User[] }) => {
  const [userName, setUserName] = useState<string>(
    users.filter((user: User) => user.id == fusen.user_id)[0].firstName,
  )
  const [color, setColor] = useState('bg-blue-500') // ランダムカラーを設定したい

  return (
    <div
      className={`${color} h-28 w-40 text-white p-2 rounded-sm flex flex-col border border-black`}
    >
      <p className='m-auto'>{fusen.content}</p>
      <p className='text-sm ml-auto'>{userName}</p>
    </div>
  )
}

export default Fusen
