import Kanban from './Kanban'

const Kanbans = ({ kanbans }: { kanbans: Kanban[] }) => {
  return (
    <>
      <ul>
        {kanbans.map((kanban: Kanban) => (
          <Kanban kanban={kanban} key={kanban.id} />
        ))}
      </ul>
    </>
  )
}

export default Kanbans
