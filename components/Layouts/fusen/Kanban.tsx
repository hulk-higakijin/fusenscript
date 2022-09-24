import { useState } from 'react'

const Kanban = ({ kanban }: { kanban: Kanban }) => {
  const [color, setColor] = useState('bg-green-500')

  return (
    <div className={`${color} w-fit px-4 py-1 rounded-sm text-white`}>
      {kanban.title}
    </div>
  )
}

export default Kanban
