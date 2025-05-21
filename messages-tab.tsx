"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Pin,
  Archive,
  Trash2,
  Bell,
  Users,
  Check,
  ImageIcon,
  FileText,
  Mic,
  MapPin,
  Download,
} from "lucide-react"
import { format } from "date-fns"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Add types for messages and contacts
interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  read: boolean
  senderAvatar: string
  isMe: boolean
  attachments?: Array<{
    name: string
    size: string
    type: string
  }>
  isLink?: boolean
  isVoiceMessage?: boolean
  duration?: number
}

interface Contact {
  id: number
  name: string
  role: string
  avatar: string
  status: 'online' | 'away' | 'offline'
  lastSeen: string
  unread: number
  pinned: boolean
  members?: number
}

type MessageHistory = {
  [key: number]: Message[]
}

// Add emoji picker component at the top
const EmojiPicker = ({ onSelect }: { onSelect: (emoji: string) => void }) => {
  const emojis = ["😊", "👍", "❤️", "🎉", "👏", "🙏", "🤔", "😅", "😢", "😡", "👋", "💪", "🎓", "📚", "✍️", "📝", "📅", "⏰", "🎯", "💡"]

  return (
    <div className="grid grid-cols-5 gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

// Mock data for contacts and messages
const contacts: Contact[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Professor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 3,
    pinned: true,
  },
  {
    id: 2,
    name: "Academic Advisor",
    role: "Staff",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "5m ago",
    unread: 0,
    pinned: true,
  },
  {
    id: 3,
    name: "Library Services",
    role: "Department",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: "1h ago",
    unread: 1,
    pinned: false,
  },
  {
    id: 4,
    name: "Study Group - CS401",
    role: "Group",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 12,
    pinned: false,
    members: 8,
  },
  {
    id: 5,
    name: "Financial Aid Office",
    role: "Department",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2d ago",
    unread: 0,
    pinned: false,
  },
  {
    id: 6,
    name: "Career Services",
    role: "Department",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "3h ago",
    unread: 0,
    pinned: false,
  },
  {
    id: 7,
    name: "IT Support",
    role: "Department",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 0,
    pinned: false,
  },
  {
    id: 8,
    name: "Student Union",
    role: "Organization",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: "4h ago",
    unread: 5,
    pinned: false,
  },
]

// Update attachment type
type AttachmentType = 'image' | 'file' | 'location' | 'document'

// Update message history type
const messageHistory: MessageHistory = {
  1: [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hello! I wanted to discuss your recent project submission.",
      timestamp: "2023-05-15T10:30:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Hi Dr. Johnson! I'd be happy to discuss it. What aspects would you like to focus on?",
      timestamp: "2023-05-15T10:32:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: true,
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content:
        "I was particularly impressed with your analysis section, but I think the methodology could use some refinement. Would you be available for a meeting tomorrow at 2 PM?",
      timestamp: "2023-05-15T10:35:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      content:
        "Thank you for the feedback! Yes, I'm available tomorrow at 2 PM. Should I prepare anything specific for the meeting?",
      timestamp: "2023-05-15T10:38:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: true,
    },
    {
      id: 5,
      sender: "Dr. Sarah Johnson",
      content:
        "Please bring your notes on the methodology section and any questions you have. I've also attached some resources that might help you improve that section.",
      timestamp: "2023-05-15T10:42:00",
      read: false,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
      attachments: [
        { name: "Research_Methods_Guide.pdf", size: "2.4 MB", type: "pdf" },
        { name: "Sample_Methodology.docx", size: "1.1 MB", type: "docx" },
      ],
    },
    {
      id: 6,
      sender: "Dr. Sarah Johnson",
      content: "Also, don't forget we have a class presentation next week. Your group is scheduled for Wednesday.",
      timestamp: "2023-05-15T10:43:00",
      read: false,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    },
    {
      id: 7,
      sender: "Dr. Sarah Johnson",
      content: "Let me know if you need any clarification on the presentation requirements.",
      timestamp: "2023-05-15T10:44:00",
      read: false,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "Academic Advisor",
      content: "Hello! I noticed you haven't registered for next semester's classes yet. Would you like to schedule an advising appointment?",
      timestamp: "2023-05-15T09:30:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Hi! Yes, I would like to schedule an appointment. What times are available this week?",
      timestamp: "2023-05-15T09:35:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: true,
    }
  ],
  3: [
    {
      id: 1,
      sender: "Library Services",
      content: "Your requested book 'Advanced Algorithms' is now available for pickup at the main library.",
      timestamp: "2023-05-14T14:20:00",
      read: false,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    }
  ],
  4: [
    {
      id: 1,
      sender: "Alex Chen",
      content: "Hey everyone! I've created a study group for the upcoming CS401 exam. Who's interested in joining?",
      timestamp: "2023-05-15T11:00:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "I'm interested! When are you planning to meet?",
      timestamp: "2023-05-15T11:05:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: true,
    }
  ],
  5: [
    {
      id: 1,
      sender: "Financial Aid Office",
      content: "Your financial aid application for the upcoming semester has been processed. Please check your student portal for details.",
      timestamp: "2023-05-13T10:00:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    }
  ],
  6: [
    {
      id: 1,
      sender: "Career Services",
      content: "The resume workshop you registered for is tomorrow at 2 PM in Room 302. Don't forget to bring your current resume!",
      timestamp: "2023-05-15T08:30:00",
      read: false,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    }
  ],
  7: [
    {
      id: 1,
      sender: "IT Support",
      content: "Your password reset request has been processed. You can now log in with your new password.",
      timestamp: "2023-05-15T10:15:00",
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    }
  ],
  8: [
    {
      id: 1,
      sender: "Student Union",
      content: "Join us for the Spring Festival this weekend! Food, games, and live music. Free entry for all students.",
      timestamp: "2023-05-14T16:45:00",
      read: false,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: false,
    }
  ]
}

export default function MessagesTab() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [currentMessages, setCurrentMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>([])
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Filter contacts based on search query and active tab
  useEffect(() => {
    let filtered = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "pinned") {
      filtered = filtered.filter((contact) => contact.pinned)
    } else if (activeTab === "unread") {
      filtered = filtered.filter((contact) => contact.unread > 0)
    } else if (activeTab === "groups") {
      filtered = filtered.filter((contact) => contact.role === "Group")
    }

    setFilteredContacts(filtered)
  }, [searchQuery, activeTab])

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom()

    // Simulate typing indicator
    if (selectedContact?.id === 1) {
      const timer = setTimeout(() => {
        setIsTyping(true)

        setTimeout(() => {
          setIsTyping(false)

          // Add new message after typing
          if (Math.random() > 0.5) {
            const newMessage = {
              id: currentMessages.length + 1,
              sender: selectedContact.name,
              content:
                "By the way, I've updated the course materials for next week. Make sure to review them before our meeting.",
              timestamp: new Date().toISOString(),
              read: false,
              senderAvatar: selectedContact.avatar,
              isMe: false,
            }

            setCurrentMessages((prev) => [...prev, newMessage])
          }
        }, 3000)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentMessages, selectedContact])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setCurrentMessages(messageHistory[contact.id] || [])
    setIsTyping(false)

    // Mark messages as read
    if (messageHistory[contact.id]) {
      messageHistory[contact.id].forEach((msg: Message) => {
        if (!msg.isMe) msg.read = true
      })
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return

    const newMessage: Message = {
      id: currentMessages.length + 1,
      sender: "Me",
      content: messageInput,
      timestamp: new Date().toISOString(),
      read: true,
      senderAvatar: "/placeholder.svg?height=40&width=40",
      isMe: true,
    }

    setCurrentMessages(prev => [...prev, newMessage])
    setMessageInput("")
    setShowEmojiPicker(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current)
      recordingTimerRef.current = null
    }
    // Here you would handle the recorded audio
    setRecordingTime(0)
  }

  const formatTime = (seconds: number | undefined) => {
    if (seconds === undefined) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAttachment = (type: AttachmentType) => {
    // Handle different types of attachments
    switch (type) {
      case 'image':
        // Handle image upload
        break
      case 'file':
      case 'document':
        // Handle file upload
        break
      case 'location':
        // Handle location sharing
        break
    }
  }

  const togglePin = () => {
    // In a real app, you would update the contact's pinned status in the database
    const updatedContacts = contacts.map((c) => (c.id === selectedContact?.id ? { ...c, pinned: !c.pinned } : c))
    // Update contacts state
  }

  const createNewGroup = () => {
    setIsComposing(false)

    if (newGroupMembers.length < 2) return

    // In a real app, you would create a new group in the database
    const newGroup = {
      id: contacts.length + 1,
      name: `New Group (${newGroupMembers.length + 1} members)`,
      role: "Group",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastSeen: "Just now",
      unread: 0,
      pinned: false,
      members: newGroupMembers.length + 1,
    }

    // Update contacts state
    setNewGroupMembers([])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setIsComposing(true)}>
                  <Users className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Create Group Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog open={isComposing} onOpenChange={setIsComposing}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Group Name</label>
                  <Input placeholder="Enter group name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Add Members</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newGroupMembers.map((member, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {member}
                        <button onClick={() => setNewGroupMembers((prev) => prev.filter((_, i) => i !== index))}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Input
                      placeholder="Type a name"
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (e.key === "Enter" && target.value) {
                          setNewGroupMembers((prev: string[]) => [...prev, target.value]);
                          target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
                <Button onClick={createNewGroup} disabled={newGroupMembers.length < 2}>
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex h-[calc(100%-4rem)]">
        {/* Contacts sidebar */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="px-3 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="pinned" className="flex-1">
                  Pinned
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                <div className="space-y-1 p-2">
                  <AnimatePresence>
                    {filteredContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          variant={selectedContact?.id === contact.id ? "secondary" : "ghost"}
                          className={`w-full justify-start px-2 ${selectedContact?.id === contact.id ? "bg-secondary" : ""}`}
                          onClick={() => handleContactSelect(contact)}
                        >
                          <div className="flex items-center w-full">
                            <div className="relative">
                              <Avatar className="h-9 w-9 mr-2">
                                <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              </Avatar>
                              <span
                                className={`absolute bottom-0 right-1 h-2 w-2 rounded-full ${
                                  contact.status === "online"
                                    ? "bg-green-500"
                                    : contact.status === "away"
                                      ? "bg-yellow-500"
                                      : "bg-gray-400"
                                }`}
                              />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex justify-between items-center">
                                <span className="font-medium truncate">{contact.name}</span>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {contact.lastSeen}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground truncate">
                                  {contact.role}
                                  {contact.members && ` • ${contact.members} members`}
                                </span>
                                {contact.unread > 0 && (
                                  <Badge variant="destructive" className="ml-auto">
                                    {contact.unread}
                                  </Badge>
                                )}
                                {contact.pinned && <Pin className="h-3 w-3 text-muted-foreground ml-1" />}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                <div className="space-y-1 p-2">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <Button
                        key={contact.id}
                        variant={selectedContact?.id === contact.id ? "secondary" : "ghost"}
                        className="w-full justify-start px-2"
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="flex items-center w-full">
                          <Avatar className="h-9 w-9 mr-2">
                            <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                              <span className="font-medium truncate">{contact.name}</span>
                              <Badge variant="destructive">{contact.unread}</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground truncate">{contact.role}</span>
                          </div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No unread messages</div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pinned" className="m-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                <div className="space-y-1 p-2">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <Button
                        key={contact.id}
                        variant={selectedContact?.id === contact.id ? "secondary" : "ghost"}
                        className="w-full justify-start px-2"
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="flex items-center w-full">
                          <Avatar className="h-9 w-9 mr-2">
                            <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                              <span className="font-medium truncate">{contact.name}</span>
                              <Pin className="h-3 w-3 text-muted-foreground" />
                            </div>
                            <span className="text-xs text-muted-foreground truncate">{contact.role}</span>
                          </div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No pinned conversations</div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="groups" className="m-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                <div className="space-y-1 p-2">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <Button
                        key={contact.id}
                        variant={selectedContact?.id === contact.id ? "secondary" : "ghost"}
                        className="w-full justify-start px-2"
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="flex items-center w-full">
                          <Avatar className="h-9 w-9 mr-2">
                            <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                              <span className="font-medium truncate">{contact.name}</span>
                              <span className="text-xs text-muted-foreground">{contact.members} members</span>
                            </div>
                            <span className="text-xs text-muted-foreground truncate">{contact.lastSeen}</span>
                          </div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No group conversations</div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat area */}
        <div className="w-2/3 flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <img src={selectedContact?.avatar || "/placeholder.svg"} alt={selectedContact?.name} />
              </Avatar>
              <div>
                <div className="font-medium flex items-center gap-1">
                  {selectedContact?.name}
                  {selectedContact?.status === "online" && (
                    <span className="text-xs text-green-500 font-normal">• Online</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedContact?.role}
                  {selectedContact?.members && ` • ${selectedContact?.members} members`}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Video Call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={togglePin}>
                    {selectedContact?.pinned ? (
                      <>
                        <Pin className="h-4 w-4 mr-2" /> Unpin Conversation
                      </>
                    ) : (
                      <>
                        <Pin className="h-4 w-4 mr-2" /> Pin Conversation
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="h-4 w-4 mr-2" /> Mute Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" /> Archive Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex ${msg.isMe ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}>
                    {!msg.isMe && (
                      <Avatar className="h-8 w-8">
                        <img src={msg.senderAvatar || "/placeholder.svg"} alt={msg.sender} />
                      </Avatar>
                    )}
                    <div className={`space-y-1 ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
                      <div
                        className={`rounded-lg p-3 ${
                          msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                        } ${msg.isVoiceMessage ? "flex items-center gap-2" : ""}`}
                      >
                        {msg.isVoiceMessage ? (
                          <>
                            <Mic className="h-4 w-4" />
                            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gray-400 dark:bg-gray-500 w-1/2 rounded-full"></div>
                            </div>
                            <span>{formatTime(msg.duration ?? 0)}</span>
                          </>
                        ) : msg.isLink ? (
                          <a
                            href={msg.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {msg.content}
                          </a>
                        ) : (
                          msg.content
                        )}
                      </div>

                      {msg.attachments && (
                        <div className="flex flex-col gap-2">
                          {msg.attachments.map((attachment, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-2 p-2 rounded-md ${
                                msg.isMe ? "bg-primary/80 text-primary-foreground" : "bg-muted/80"
                              }`}
                            >
                              {attachment.type === "pdf" && <FileText className="h-4 w-4" />}
                              {attachment.type === "docx" && <FileText className="h-4 w-4" />}
                              {attachment.type === "xlsx" && <FileText className="h-4 w-4" />}
                              <div className="flex-1 min-w-0">
                                <div className="text-sm truncate">{attachment.name}</div>
                                <div className="text-xs opacity-70">{attachment.size}</div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div
                        className={`flex items-center text-xs text-muted-foreground ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <span>{format(new Date(msg.timestamp), "h:mm a")}</span>
                        {msg.isMe && <Check className={`h-3 w-3 ml-1 ${msg.read ? "text-blue-500" : ""}`} />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2">
                  <Avatar className="h-8 w-8">
                    <img src={selectedContact?.avatar || "/placeholder.svg"} alt={selectedContact?.name} />
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 flex items-center space-x-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-gray-400"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-gray-400"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-gray-400"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="p-3 border-t">
            {isRecording ? (
              <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="h-3 w-3 bg-red-500 rounded-full"
                  />
                  <span>Recording... {formatTime(recordingTime)}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsRecording(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" size="sm" onClick={stopRecording}>
                    Stop
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <Popover open={isAttachmentMenuOpen} onOpenChange={setIsAttachmentMenuOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48" align="start" alignOffset={-40} sideOffset={5}>
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start" onClick={() => handleAttachment("image")}>
                        <ImageIcon className="mr-2 h-4 w-4" /> Image
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={() => handleAttachment("file")}>
                        <FileText className="mr-2 h-4 w-4" /> Document
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={() => handleAttachment("location")}>
                        <MapPin className="mr-2 h-4 w-4" /> Location
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type a message..."
                    className="min-h-[2.5rem] max-h-32 pr-10 resize-none"
                    value={messageInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />
                  <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="absolute right-1 bottom-1 h-8 w-8 rounded-full">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end" alignOffset={-40}>
                      <EmojiPicker onSelect={handleEmojiSelect} />
                    </PopoverContent>
                  </Popover>
                </div>

                {messageInput.trim() ? (
                  <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={startRecording}>
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
