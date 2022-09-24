const Fusen = ({ fusen, users }: { fusen: Fusen; users: User[] }) => {
  return (
    <>
      <li key={fusen.id}>
        {fusen.content}：{fusen.xcoordinate},{fusen.ycoordinate},
        {users.filter((user: User) => user.id == fusen.user_id)[0].firstName}
      </li>
    </>
  )
}

export default Fusen
