import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1 className='text-3xl font-bold underline text-primary'>
        Hello world!
      </h1>
      <Link href={'/fusen/rooms'}>Play start</Link>
    </>
  )
}

export default Home
