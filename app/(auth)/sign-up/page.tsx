'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalState } from '@/context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!

export default function SignUpPage() {

    const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email)

    const router = useRouter()
    const { auth, authChecking, setAuth } = useGlobalState()

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (!authChecking && auth.token) {
            router.replace('/inbox')
        }
    }, [authChecking, auth.token, router])

    if (authChecking || auth.token) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // validation
    const emailValid = /^\S+@\S+\.\S+$/.test(form.email)
    const canSubmit =
        emailValid &&
        form.username.trim() !== '' &&
        form.password.trim().length >= 6

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!emailValid) {
            return toast.error('Please enter a valid email address.')
        }
        if (form.username.trim() === '') {
            return toast.error('Username is required.')
        }
        if (form.password.trim().length < 6) {
            return toast.error('Password must be at least 6 characters.')
        }

        try {
            const { data } = await axios.post(`${API_BASE}/auth/signup`, form)
            setAuth(data)
            toast.success('Account created successfully!')
            router.push('/inbox')
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message
            toast.error(msg)
        }
    }

    return (
        <div className="bg-[url('/chat-bg.jpg')] w-full min-h-screen flex justify-center items-center bg-contain bg-left bg-no-repeat bg-[#f3f3f3]">
            <div className="w-[800px] min-h-[650px] bg-white rounded-[20px] shadow-xl flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 mx-auto">
                    <h2 className="text-2xl font-medium text-center mb-2">
                        Register Account
                    </h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Get your free Konvo account now.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                onBlur={() => {
                                    if (form.email && !isValidEmail(form.email)) {
                                        toast.error('Please enter a valid email address.')
                                    }
                                }}
                                className="mt-1 w-full px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text">Username</label>
                            <input
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="mt-1 w-full px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text">Password</label>
                            <div className="relative mt-1">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full pr-10 px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className={`w-full bg-primary hover:bg-secondary text-white py-2 rounded-md transition cursor-pointer ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <a href="/sign-in" className="text-primary underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
