import '../styles/globals.css'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import Navbar from 'components/Layouts/Navbar'

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ['/']

function MyApp({ Component, pageProps }: AppProps) {
  // Get the pathname
  const { pathname } = useRouter()

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)
  // console.log(isPublicPage)

  useEffect(() => {})

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ClerkProvider>
      <NextNProgress />
      <div className='h-screen w-screen'>
        <div className='flex flex-col container mx-auto h-full'>
          {isPublicPage ? (
            <>
              <Navbar />
              <Component {...pageProps} />
            </>
          ) : (
            <>
              <SignedIn>
                <Navbar />
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </div>
      </div>
    </ClerkProvider>
  )
}

export default MyApp
