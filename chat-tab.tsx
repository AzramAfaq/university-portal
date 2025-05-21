import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import { io, Socket } from "socket.io-client"

const SOCKET_URL = "ws://localhost:4000"

export default function ChatTab() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [username, setUsername] = useState("")
  const [joined, setJoined] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!joined) return
    socketRef.current = io(SOCKET_URL)
    socketRef.current.on("chat history", (history) => {
      setMessages(history)
    })
    socketRef.current.on("chat message", (msg) => {
      console.log("Received message from server:", msg)
      setMessages((prev) => [...prev, msg])
    })
    return () => {
      socketRef.current?.disconnect()
    }
  }, [joined])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !username) return
    const msg = { user: username, text: input }
    socketRef.current?.emit("chat message", msg)
    setInput("")
  }

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) setJoined(true)
  }

  if (!joined) {
    return (
      <div className="flex flex-col h-full max-h-[70vh] items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 flex flex-col items-center">
            <User className="mb-2 h-8 w-8 text-navy-800 dark:text-blue-400" />
            <h1 className="text-xl font-bold mb-2 text-navy-900 dark:text-white">Join the Chat</h1>
            <form onSubmit={handleJoin} className="w-full flex flex-col gap-2">
              <Input
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="bg-blue-600 text-white mt-2">Join</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <User className="mr-2 h-6 w-6 text-navy-800 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Student Chat</h1>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">Chat with your classmates</span>
      </div>
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.user === username ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.user === username ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}>
                <span className="block text-xs font-semibold mb-1">{msg.user}</span>
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <form onSubmit={handleSend} className="flex gap-2 p-3 border-t bg-white dark:bg-gray-800">
          <Input
            className="flex-1"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <Button type="submit" className="bg-blue-600 text-white">Send</Button>
        </form>
      </Card>
    </div>
  )
} 