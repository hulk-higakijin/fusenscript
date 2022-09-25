import Kanban from './Kanban'

const Kanbans = ({ kanbans }: { kanbans: Kanban[] }) => {
  return (
    <>
      <div className='position'>
        {kanbans.map((kanban: Kanban) => (
          <Kanban kanban={kanban} key={kanban.id} />
        ))}
      </div>
    </>
  )
}

export default Kanbans
