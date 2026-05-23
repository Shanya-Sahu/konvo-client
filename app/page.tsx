'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageLoader from './_components/page-loader'
import { useGlobalState } from '@/context'

export default function Page() {
  const { auth, authChecking } = useGlobalState()
  const router = useRouter()

  // 1) Once we know auth state, redirect accordingly
  useEffect(() => {
    if (!authChecking) {
      if (auth.token) {
        router.replace('/inbox')
      } else {
        router.replace('/sign-in')
      }
    }
  }, [authChecking, auth.token, router])

  // 2) Always show loader while checking or redirecting
  return <PageLoader />
}
