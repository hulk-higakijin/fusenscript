import Fusen from './Fusen'

const Fusens = ({ fusens, users }: { fusens: Fusen[]; users: User[] }) => {
  return (
    <>
      <ul>
        {fusens.map((fusen: Fusen) => (
          <Fusen fusen={fusen} users={users} key={fusen.id} />
        ))}
      </ul>
    </>
  )
}

export default Fusens
