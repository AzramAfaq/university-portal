"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Send, Phone, Video, MoreHorizontal, Paperclip, 
  Check, CheckCheck, Clock, Loader2 
} from 'lucide-react'

// Types
interface Participant {
  id: number
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  role: string
  department?: string
}

interface Message {
  id: number
  senderId: number
  text: string
  timestamp: string
  status: "sent" | "delivered" | "read"
}

interface Conversation {
  id: number
  type: "individual" | "group"
  name?: string
  avatar: string
  participants: Participant[]
  messages: Message[]
  unreadCount: number
  lastActive: string
}

// Sample data
const conversations: Conversation[] = [
  {
    id: 1,
    type: "individual",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: [
      {
        id: 2,
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        role: "Professor",
        department: "Computer Science",
      },
    ],
    messages: [
      {
        id: 1,
        senderId: 2,
        text: "Hello! I wanted to discuss your recent assignment submission.",
        timestamp: "2023-05-01T10:30:00",
        status: "read",
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi Dr. Johnson! Sure, what would you like to discuss?",
        timestamp: "2023-05-01T10:32:00",
        status: "read",
      },
    ],
    unreadCount: 0,
    lastActive: "2023-05-01T10:32:00",
  },
  {
    id: 2,
    type: "group",
    name: "CS301 Project Group",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: [
      {
        id: 3,
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        role: "Student",
      },
      {
        id: 4,
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        role: "Student",
      },
    ],
    messages: [
      {
        id: 1,
        senderId: 3,
        text: "Hey team, how's everyone doing with their assigned modules?",
        timestamp: "2023-05-01T14:20:00",
        status: "read",
      },
      {
        id: 2,
        senderId: 1,
        text: "I've completed the database schema design. Will push to our repository tonight.",
        timestamp: "2023-05-01T14:22:00",
        status: "read",
      },
    ],
    unreadCount: 2,
    lastActive: "2023-05-01T14:22:00",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isLoading) return

    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      const newMessage: Message = {
        id: selectedConversation.messages.length + 1,
        senderId: 1,
        text: messageInput.trim(),
        timestamp: new Date().toISOString(),
        status: "sent",
      }

      // Update the conversation with the new message
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage],
        lastActive: newMessage.timestamp,
      }

      // Update the conversations list
      const updatedConversations = conversations.map((conv) =>
        conv.id === selectedConversation.id ? updatedConversation : conv
      )

      // Update state
      setSelectedConversation(updatedConversation)
      setMessageInput("")

      // Simulate message delivery and read status
      setTimeout(() => {
        const deliveredMessage = {
          ...newMessage,
          status: "delivered" as const,
        }
        const readMessage = {
          ...newMessage,
          status: "read" as const,
        }

        const deliveredConversation = {
          ...updatedConversation,
          messages: updatedConversation.messages.map((msg) =>
            msg.id === newMessage.id ? deliveredMessage : msg
          ),
        }

        const readConversation = {
          ...deliveredConversation,
          messages: deliveredConversation.messages.map((msg) =>
            msg.id === newMessage.id ? readMessage : msg
          ),
        }

        setSelectedConversation(readConversation)
      }, 1000)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-accent ${
                selectedConversation.id === conversation.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>
                    {conversation.type === "individual"
                      ? conversation.participants[0].name.split(" ").map(n => n[0]).join("")
                      : conversation.name?.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">
                      {conversation.type === "individual"
                        ? conversation.participants[0].name
                        : conversation.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(conversation.lastActive).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.messages[conversation.messages.length - 1]?.text}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={
                  selectedConversation.type === "individual"
                    ? selectedConversation.participants[0].avatar
                    : selectedConversation.avatar
                }
              />
              <AvatarFallback>
                {selectedConversation.type === "individual"
                  ? selectedConversation.participants[0].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : selectedConversation.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">
                {selectedConversation.type === "individual"
                  ? selectedConversation.participants[0].name
                  : selectedConversation.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedConversation.type === "individual"
                  ? selectedConversation.participants[0].role
                  : `${selectedConversation.participants.length} participants`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === 1 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <span>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.senderId === 1 && (
                      <span>
                        {message.status === "read" ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : message.status === "delivered" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              size="icon"
              disabled={!messageInput.trim() || isLoading}
              onClick={handleSendMessage}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
