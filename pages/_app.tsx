import '../styles/globals.css'
import { Session } from '@supabase/gotrue-js/src/lib/types'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Navbar from 'components/Layouts/Navbar'
import { supabase } from 'utils/supabase'

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
  }, [])


  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
