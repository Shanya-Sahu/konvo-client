// 'use client'

// import { useEffect } from 'react'
// import { FaUser } from 'react-icons/fa'
// import Link from 'next/link'
// import { useGlobalState } from '@/context'
// import { useRouter } from 'next/navigation'

// export default function LogoutPage() {
//     const { logout } = useGlobalState()
//     const router = useRouter()

//     // clear auth immediately
//     useEffect(() => {
//         logout()
//     }, [logout])

//     return (
//         <div className="bg-[url('/chat-bg.jpg')] w-full min-h-screen flex justify-center items-center bg-contain bg-left bg-no-repeat bg-[#f3f3f3]">
//             <div className="w-[550px] min-h-[400px] bg-white rounded-[20px] shadow-xl flex justify-center items-center">
//                 <div className="w-full max-w-md bg-white p-8 flex justify-center items-center flex-col">
//                     <div className="flex justify-center items-center mb-6 rounded-full bg-light-purple w-[96px] h-[96px]">
//                         <FaUser className="text-primary text-4xl" />
//                     </div>
//                     <h2 className="text-xl font-medium text-center mb-2">You are Logged Out
//                     </h2>
//                     <p className="text-center text-text">Thank you for using <br />
//                         <b>Konvo</b>
//                     </p>

//                     <Link href="/sign-in" className="w-1/2 bg-primary hover:bg-secondary text-white py-2 rounded-md transition cursor-pointer mt-6 text-center">
//                         Sign In
//                     </Link>

//                 </div>
//             </div>
//         </div>
//     )
// }

