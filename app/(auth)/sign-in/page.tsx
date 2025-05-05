'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalState } from '@/context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!

export default function Signin() {

    const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email)

    const router = useRouter()
    const { auth, authChecking, setAuth } = useGlobalState()

    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    // redirect logged-in users
    useEffect(() => {
        if (!authChecking && auth.token) {
            router.replace('/inbox')
        }
    }, [authChecking, auth.token, router])

    if (authChecking || auth.token) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // front-end validation
    const emailValid = /^\S+@\S+\.\S+$/.test(form.email)
    const canSubmit = emailValid && form.password.trim() !== ''

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!emailValid) {
            return toast.error('Please enter a valid email address.')
        }
        if (form.password.trim() === '') {
            return toast.error('Password is required.')
        }

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (!res.ok) {
                const err = await res.json().catch(() => null)
                throw new Error(err?.message || res.statusText)
            }
            const data = await res.json()
            setAuth(data)
            toast.success('Logged in successfully!')
            router.push('/inbox')
        } catch (err: any) {
            const msg =
                err.name === 'TypeError'
                    ? 'Network error – check your connection.'
                    : err.message
            toast.error(msg)
        }
    }

    return (
        <div className="bg-[url('/chat-bg.jpg')] w-full min-h-screen flex justify-center items-center bg-contain bg-left bg-no-repeat bg-[#f3f3f3]">
            <div className="w-[800px] min-h-[650px] bg-white rounded-[20px] shadow-xl flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 mx-auto">
                    <h2 className="text-2xl font-medium text-center mb-2">Welcome Back!</h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Sign in to continue to Konvo.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={() => {
                                    if (form.email && !isValidEmail(form.email)) {
                                        toast.error('Please enter a valid email address.')
                                    }
                                }}
                                className="mt-1 w-full px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                            />
                        </div>

                        <div>
                            <div className="w-full flex justify-between">
                                <label className="block text-sm font-medium text-text">Password</label>
                            </div>
                            <div className="relative mt-1">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
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
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <a href="/sign-up" className="text-primary underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
