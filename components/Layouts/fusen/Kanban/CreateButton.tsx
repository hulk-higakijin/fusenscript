const KanbanCreateButton = () => {
  const createKanban = () => {
    console.log('create kanban')
  }

  return (
    <>
      <button className='btn btn-primary' onClick={createKanban}>
        Kanban
      </button>
    </>
  )
}

export default KanbanCreateButton
