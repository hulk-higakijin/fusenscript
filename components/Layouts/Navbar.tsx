import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useContext } from 'react'
import { Auth } from 'pages/_app'

const Navbar: NextPage = () => {
  const { session, isSignedIn } = useContext<AuthContextType>(Auth)

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
          {isSignedIn ? (
            <Link href={'/mypage'}>
              <li className='text-2xl cursor-pointer'>
                <FontAwesomeIcon icon={faCircleUser} />
              </li>
            </Link>
          ) : (
            <Link href={'/login'}>
              <li className='text-sm cursor-pointer my-auto'>Login</li>
            </Link>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
