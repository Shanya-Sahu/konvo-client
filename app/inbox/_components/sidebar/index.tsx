'use client'

import Image from 'next/image'
import { IoMdLogOut } from 'react-icons/io'
import { useGlobalState } from '@/context'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Sidebar() {
    const { logout } = useGlobalState()
    const router = useRouter()

    const handleLogout = () => {
        toast.success('Logged out successfully!')
        logout()
        router.push('/logout')
    }

    return (
        <div className="w-full max-w-[90px] bg-primary h-screen fixed top-0 left-0 flex justify-between items-center flex-col py-[20px]">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <div className="flex justify-center items-center flex-col text-white mb-20">
                <button onClick={handleLogout}>
                    <IoMdLogOut className="text-3xl cursor-pointer" />
                </button>
            </div>
        </div>
    )
}
