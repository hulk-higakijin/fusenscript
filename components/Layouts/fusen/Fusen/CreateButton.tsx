const FusenCreateButton = () => {
  const createFusen = () => {
    console.log('create fusen')
  }

  return (
    <>
      <button className='btn btn-primary' onClick={createFusen}>
        Fusen
      </button>
    </>
  )
}

export default FusenCreateButton
