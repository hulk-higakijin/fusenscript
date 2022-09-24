const Kanban = ({ kanban }: { kanban: Kanban }) => {
  return (
    <>
      <li key={kanban.id}>
        {kanban.title}：{kanban.xcoordinate},{kanban.ycoordinate}
      </li>
    </>
  )
}

export default Kanban
