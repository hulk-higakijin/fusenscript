import { UserButton, SignedIn } from '@clerk/nextjs'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <>
      <nav className='flex container mx-auto px-2 h-16'>
        <Link href={'/'}>
          <p className='font-bold text-xl my-auto cursor-pointer'>
            FusenScript
          </p>
        </Link>
        <ul className='ml-auto flex my-auto gap-4'>
          <Link href={'/fusen/rooms'}>
            <li className='text-sm cursor-pointer my-auto'>Rooms</li>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
