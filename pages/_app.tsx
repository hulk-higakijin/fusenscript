import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from 'react'
import Navbar from 'components/Layouts/Navbar'
import { supabase } from 'utils/supabase'

const initialValue = { session: {}, isSignedIn: false }
export const Auth = createContext<AuthContextType>(initialValue)

function MyApp({ Component, pageProps }: AppProps) {
  const [session] = useState(supabase.auth.session())
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (session) setIsSignedIn(true)
  }, [session])

  const value = {
    session,
    isSignedIn,
  }

  return (
    <Auth.Provider value={value}>
      <Navbar />
      <Component {...pageProps} />
    </Auth.Provider>
  )
}

export default MyApp
