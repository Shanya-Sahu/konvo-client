'use client'

import React, { useState, useRef, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import axios from 'axios'
import { useGlobalState } from '@/context'

type Message = {
    id: string
    text: string
    sender: 'user' | 'other'
    username: string
    time: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!
const SOCKET_BASE = API_BASE.replace(/\/api\/v1\/?$/, '')

function formatDate(date: Date) {
    return date.toLocaleDateString('en-GB').replace(/\//g, '-') // like this format 15-05-2025
}

export default function ChatWindow() {
    const { auth } = useGlobalState()
    const currentUser = auth.user.username

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement | null>(null)
    const socketRef = useRef<Socket | null>(null)

    // 1) Load history once
    useEffect(() => {
        axios
            .get<
                Array<{
                    _id: string
                    content: string
                    sender: string
                    timestamp: string
                }>
            >(`${API_BASE}/group/messages`)
            .then(({ data }) => {
                const hist: Message[] = data.map((m) => {
                    const dateObj = new Date(m.timestamp)
                    return {
                        id: m._id,
                        text: m.content,
                        sender: m.sender === currentUser ? 'user' : 'other',
                        username: m.sender,
                        time: `${formatDate(dateObj)} ${dateObj.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`,
                    }
                })
                setMessages(hist)
            })
            .catch((err) => console.error('❌ History fetch error', err))
    }, [currentUser])

    // 2) Real-time via Socket.IO
    useEffect(() => {
        socketRef.current = io(SOCKET_BASE, { path: '/socket.io' })

        socketRef.current.on(
            'newMessage',
            (m: { _id: string; content: string; sender: string; timestamp: string }) => {
                // IGNORE your own echo
                if (m.sender === currentUser) return

                const dateObj = new Date(m.timestamp)
                const incoming: Message = {
                    id: m._id,
                    text: m.content,
                    sender: 'other',
                    username: m.sender,
                    time: `${formatDate(dateObj)} ${dateObj.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}`,
                }
                setMessages((prev) => [...prev, incoming])
            }
        )

        return () => {
            socketRef.current?.disconnect()
        }
    }, [currentUser])

    // 3) Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // 4) Send with optimistic UI + socket echo
    const handleSend = async () => {
        const text = input.trim()
        if (!text) return

        const now = new Date()
        const tempId = `temp-${now.getTime()}`
        const time = `${formatDate(now)} ${now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}`

        // show immediately
        const tempMsg: Message = {
            id: tempId,
            text,
            sender: 'user',
            username: currentUser,
            time,
        }
        setMessages((prev) => [...prev, tempMsg])
        setInput('')

        try {
            await axios.post(`${API_BASE}/group/messages`, {
                sender: currentUser,
                content: text,
            })
            // real echo is ignored, so no dupes
        } catch (err) {
            console.error('❌ Send failed:', err)
            setMessages((prev) => prev.filter((m) => m.id !== tempId))
        }
    }

    return (
        <div className="w-full pl-[90px] flex flex-col bg-white rounded-lg shadow">
            <div className="w-full py-5 bg-primary">
                <h1 className="text-white text-center text-2xl">Konvo Group Chat</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div className="flex flex-col">
                            <span
                                className={`text-xs font-semibold capitalize ${msg.sender === 'user' ? 'text-primary' : 'text-gray-700'
                                    }`}
                            >
                                {msg.username}
                            </span>
                            <div
                                className={`mt-1 max-w-xl px-4 py-2 rounded-lg break-words ${msg.sender === 'user'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-text'
                                    }`}
                            >
                                <p>{msg.text}</p>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 self-end">
                                {msg.time}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="border-t p-4 flex items-center">
                <input
                    type="text"
                    className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-primary text-white rounded-full px-4 py-2 hover:bg-secondary"
                >
                    Send
                </button>
            </div>
        </div>
    )
}
