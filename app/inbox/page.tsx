'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalState } from '@/context'
import ChatWindow from './_components/chat-window'
import Sidebar from './_components/sidebar'
import PageLoader from '../_components/page-loader'

export default function Inbox() {
    const { auth, authChecking } = useGlobalState()
    const router = useRouter()

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authChecking && !auth.token) {
            router.replace('/sign-in')
        }
    }, [authChecking, auth.token, router])

    // While we’re verifying or redirecting, don’t show inbox
    if (authChecking || !auth.token) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PageLoader />
            </div>
        )
    }

    return (
        <div className="h-screen flex">
            <Sidebar />
            <ChatWindow />
        </div>
    )
}
