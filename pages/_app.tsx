import '../styles/globals.css'
import { Session } from '@supabase/gotrue-js/src/lib/types'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from 'react'
import Navbar from 'components/Layouts/Navbar'
import { supabase } from 'utils/supabase'

export const Auth = createContext<AuthContextType>({ session: {} })

function MyApp({ Component, pageProps }: AppProps) {
  const [session] = useState(supabase.auth.session())

  return (
    <Auth.Provider value={{ session }}>
      <Navbar />
      <Component {...pageProps} />
    </Auth.Provider>
  )
}

export default MyApp
