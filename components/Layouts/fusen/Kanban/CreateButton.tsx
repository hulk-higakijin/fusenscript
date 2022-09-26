import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import Modal from 'react-modal'
import { FusenRoomsContext } from 'pages/fusen/rooms/[uid]'
import { customStyles } from 'styles/moda'
import { supabase } from 'utils/supabase'

const KanbanCreateButton = () => {
  const router = useRouter()
  const { uid: room_id } = router.query
  const { user } = useUser()
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const { kanbans, setKanbans } = useContext(FusenRoomsContext)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      const user_id = user.id
      const body = { title, room_id }
      const { data } = await supabase.from('kanban').insert([body]).single()
      setKanbans([...kanbans, data])
      setIsOpenedModal(false)
    }
  }

  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => setIsOpenedModal(true)}
      >
        Kanban
      </button>

      <Modal isOpen={isOpenedModal} style={customStyles} ariaHideApp={false}>
        <form
          className='m-8 flex flex-col gap-4'
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className='text-lg'>Kanbanを作成</h2>
          <textarea
            className='textarea textarea-bordered'
            rows={4}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className='flex'>
            <button
              className='btn btn-sm'
              onClick={() => setIsOpenedModal(false)}
              type='submit'
            >
              キャンセル
            </button>
            <button className='btn btn-sm btn-primary ml-auto'>作成</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default KanbanCreateButton
