import Fusen from './Fusen'

const Fusens = ({ fusens, users }: any) => {
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
