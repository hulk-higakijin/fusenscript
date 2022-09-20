import { Session } from '@supabase/gotrue-js/src/lib/types'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useContext } from 'react'
import { Auth } from './_app'

const Home: NextPage = () => {
  const { session } = useContext<AuthContextType>(Auth)
  console.log(session)

  return (
    <>
      <h1 className='text-3xl font-bold underline text-primary'></h1>
      <Link href={'/fusen/rooms'}>Play start</Link>
    </>
  )
}

export default Home
