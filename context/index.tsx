'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import axios from 'axios'
import { useRouter, usePathname } from 'next/navigation'
import verifyToken from './functions/verifyToken'

// 1) Your Auth shape now matches the login response
export interface Auth {
  user: {
    id: string
    username: string
    email: string
  }
  token: string
}

// 2) Context value interface
interface GlobalContextType {
  auth: Auth
  setAuth: React.Dispatch<React.SetStateAction<Auth>>
  authChecking: boolean
  logout: () => void
  verifyToken: (token: string) => Promise<boolean>
}

// 3) Default auth state
const initialAuth: Auth = {
  user: {
    id: '',
    username: '',
    email: '',
  },
  token: '',
}

// 4) Create context
const GlobalContext = createContext<GlobalContextType>({
  auth: initialAuth,
  setAuth: () => { },
  authChecking: true,
  logout: () => { },
  verifyToken: async () => false,
})

// 5) Provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [auth, setAuth] = useState<Auth>(initialAuth)
  const [initialized, setInitialized] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)

  // Hydrate auth from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      try {
        setAuth(JSON.parse(saved))
      } catch { }
    }
    setInitialized(true)
  }, [])

  // Persist auth on change
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth))
  }, [auth])

  // Auto‐attach token to axios headers
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [auth.token])

  // Verify token & handle redirects
  useEffect(() => {
    if (!initialized) return

    const publicPaths = ['/sign-up', '/sign-in']
    if (publicPaths.some((p) => pathname.startsWith(p))) {
      setAuthChecking(false)
      return
    }

    const check = async () => {
      if (!auth.token) {
        setAuthChecking(false)
        router.replace('/sign-in')
        return
      }

      const valid = await verifyToken(auth.token)
      setAuthChecking(false)
      if (!valid) {
        localStorage.removeItem('auth')
        setAuth(initialAuth)
        router.replace('/sign-in')
      }
    }
    check()
  }, [initialized, auth.token, pathname, router])

  // Logout helper
  const logout = () => {
    setAuth(initialAuth)
    localStorage.removeItem('auth')
    router.push('/sign-in')
  }

  return (
    <GlobalContext.Provider
      value={{ auth, setAuth, authChecking, logout, verifyToken }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

// 6) Hook for consuming context
export function useGlobalState() {
  return useContext(GlobalContext)
}
