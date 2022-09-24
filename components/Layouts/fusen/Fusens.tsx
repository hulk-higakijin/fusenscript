import Fusen from './Fusen'

const Fusens = ({ fusens, users }: { fusens: Fusen[]; users: User[] }) => {
  return (
    <>
      <div className='position'>
        {fusens.map((fusen: Fusen) => (
          <Fusen fusen={fusen} users={users} key={fusen.id} />
        ))}
      </div>
    </>
  )
}

export default Fusens
