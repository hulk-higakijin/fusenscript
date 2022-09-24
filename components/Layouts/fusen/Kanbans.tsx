import Kanban from './Kanban'

const Kanbans = ({ kanbans }: { kanbans: Kanban[] }) => {
  return (
    <>
      {kanbans.map((kanban: Kanban) => (
        <Kanban kanban={kanban} key={kanban.id} />
      ))}
    </>
  )
}

export default Kanbans
