import Fusen from './Fusen'

const Fusens = ({ fusens, users }: { fusens: Fusen[]; users: User[] }) => {
  return (
    <>
      {fusens.map((fusen: Fusen) => (
        <Fusen fusen={fusen} users={users} key={fusen.id} />
      ))}
    </>
  )
}

export default Fusens
