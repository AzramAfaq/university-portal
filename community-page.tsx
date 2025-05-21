"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Tag,
  ImageIcon,
  Megaphone,
  Flame,
  TrendingUp,
  Calendar,
  Users,
  MapPin,
  Bell,
  Filter,
  ChevronDown,
  Send,
  CheckCircle,
  X,
  UserPlus,
  CalendarPlus,
  Clock,
  Globe,
  Lock,
  User,
  UserCheck,
  AlertCircle,
  Loader2,
  RefreshCw,
  EyeOff,
  Flag,
  ChevronRight,
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

// Sample data for posts
const posts = [
  {
    id: 1,
    author: {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Professor",
      department: "Computer Science",
    },
    content:
      "Excited to announce that our department will be hosting a tech symposium next month! We'll have industry experts from Google, Microsoft, and local tech companies. Great networking opportunity for students looking for internships and job placements. Mark your calendars for May 20th!",
    images: ["/placeholder.svg?height=300&width=500"],
    timestamp: "2023-05-01T14:30:00",
    likes: 45,
    comments: 12,
    liked: false,
    bookmarked: false,
    tags: ["event", "tech", "networking"],
    commentsList: [
      {
        id: 1,
        author: {
          id: 5,
          name: "Alex Chen",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Student",
        },
        content: "Will there be opportunities for students to present their projects?",
        timestamp: "2023-05-01T15:10:00",
        likes: 3,
      },
      {
        id: 2,
        author: {
          id: 2,
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Professor",
        },
        content: "Yes, we'll have a student showcase section! Details will be announced next week.",
        timestamp: "2023-05-01T15:25:00",
        likes: 5,
      },
    ],
  },
  {
    id: 2,
    author: {
      id: 3,
      name: "University Sports Club",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Organization",
    },
    content:
      "Congratulations to our cricket team for winning the inter-university championship! 🏆 What an amazing performance against tough competition. Special shoutout to team captain Ali Hassan for his outstanding leadership throughout the tournament.",
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    timestamp: "2023-04-30T18:15:00",
    likes: 78,
    comments: 23,
    liked: true,
    bookmarked: true,
    tags: ["sports", "achievement", "cricket"],
    commentsList: [
      {
        id: 1,
        author: {
          id: 7,
          name: "Fatima Khan",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Student",
        },
        content: "So proud of our team! The final match was incredible!",
        timestamp: "2023-04-30T19:05:00",
        likes: 12,
      },
      {
        id: 2,
        author: {
          id: 8,
          name: "Ali Hassan",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Student",
        },
        content: "Thank you everyone for your support! This was truly a team effort.",
        timestamp: "2023-04-30T20:30:00",
        likes: 25,
      },
    ],
  },
  {
    id: 3,
    author: {
      id: 4,
      name: "Student Council",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Organization",
    },
    content:
      "Reminder: Elections for the new Student Council will be held next week. If you're interested in running for a position, please submit your nomination by Friday. This is your chance to make a difference in campus life and gain valuable leadership experience!",
    timestamp: "2023-04-29T10:45:00",
    likes: 32,
    comments: 8,
    liked: false,
    bookmarked: false,
    tags: ["announcement", "election", "leadership"],
    commentsList: [
      {
        id: 1,
        author: {
          id: 9,
          name: "Zainab Ahmed",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Student",
        },
        content: "Where can we submit the nominations?",
        timestamp: "2023-04-29T11:15:00",
        likes: 2,
      },
      {
        id: 2,
        author: {
          id: 4,
          name: "Student Council",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Organization",
        },
        content:
          "You can submit them at the Student Affairs Office or through the online portal on the university website.",
        timestamp: "2023-04-29T11:30:00",
        likes: 4,
      },
    ],
  },
  {
    id: 4,
    author: {
      id: 5,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Student",
      department: "Computer Science",
    },
    content:
      "Just finished my final project for the Software Engineering course! Built a full-stack web application using React and Node.js. It was challenging but incredibly rewarding. Thanks to everyone who helped me troubleshoot along the way! #CodeLife",
    images: ["/placeholder.svg?height=300&width=500"],
    timestamp: "2023-04-28T22:10:00",
    likes: 56,
    comments: 15,
    liked: true,
    bookmarked: false,
    tags: ["project", "coding", "achievement"],
    commentsList: [
      {
        id: 1,
        author: {
          id: 10,
          name: "Maya Patel",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Student",
        },
        content: "Looks amazing! Would love to see a demo sometime.",
        timestamp: "2023-04-28T22:30:00",
        likes: 3,
      },
      {
        id: 2,
        author: {
          id: 2,
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Professor",
        },
        content:
          "Great work, Alex! Your project demonstrates excellent application of the concepts we covered in class.",
        timestamp: "2023-04-29T09:15:00",
        likes: 8,
      },
    ],
  },
  {
    id: 5,
    author: {
      id: 6,
      name: "University Library",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Organization",
    },
    content:
      "New resources alert! We've just added 500+ new e-books to our digital collection, covering various subjects from computer science to literature. Access them through the library portal using your student credentials. Happy reading!",
    timestamp: "2023-04-27T09:30:00",
    likes: 28,
    comments: 5,
    liked: false,
    bookmarked: true,
    tags: ["library", "resources", "books"],
    commentsList: [
      {
        id: 1,
        author: {
          id: 11,
          name: "James Wilson",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Student",
        },
        content: "Are there any new books on artificial intelligence?",
        timestamp: "2023-04-27T10:05:00",
        likes: 1,
      },
      {
        id: 2,
        author: {
          id: 6,
          name: "University Library",
          avatar: "/placeholder.svg?height=30&width=30",
          role: "Organization",
        },
        content:
          "Yes, we've added several new titles on AI and machine learning. Check the 'New Arrivals' section on the portal!",
        timestamp: "2023-04-27T10:20:00",
        likes: 3,
      },
    ],
  },
]

// Sample data for events
const events = [
  {
    id: 1,
    title: "Tech Symposium 2023",
    organizer: "Computer Science Department",
    date: "2023-05-20T09:00:00",
    location: "Main Auditorium",
    description:
      "A day-long symposium featuring talks from industry experts, networking sessions, and workshops on emerging technologies.",
    attendees: 120,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["tech", "networking", "workshop"],
    registered: false,
    interested: true,
  },
  {
    id: 2,
    title: "Annual Cultural Festival",
    organizer: "Student Council",
    date: "2023-06-10T16:00:00",
    location: "University Grounds",
    description:
      "Celebrate diversity through music, dance, art, and food from different cultures. Open to all students and faculty.",
    attendees: 500,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["culture", "festival", "entertainment"],
    registered: true,
    interested: true,
  },
  {
    id: 3,
    title: "Career Fair Spring 2023",
    organizer: "Career Development Center",
    date: "2023-05-15T10:00:00",
    location: "University Sports Complex",
    description:
      "Connect with over 50 companies offering internships and job opportunities. Bring your resume and dress professionally.",
    attendees: 350,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["career", "jobs", "networking"],
    registered: false,
    interested: false,
  },
  {
    id: 4,
    title: "Research Symposium",
    organizer: "Graduate Studies Department",
    date: "2023-05-25T13:00:00",
    location: "Science Building, Room 305",
    description:
      "Graduate students present their research findings. Great opportunity to learn about cutting-edge research in various fields.",
    attendees: 85,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["research", "academic", "presentation"],
    registered: false,
    interested: false,
  },
  {
    id: 5,
    title: "Hackathon 2023",
    organizer: "Programming Club",
    date: "2023-06-05T09:00:00",
    location: "Computer Science Building",
    description:
      "24-hour coding competition. Form teams and build innovative solutions to real-world problems. Prizes for top projects!",
    attendees: 120,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["coding", "competition", "innovation"],
    registered: false,
    interested: true,
  },
]

// Sample data for groups
const groups = [
  {
    id: 1,
    name: "Programming Club",
    description: "A community of coding enthusiasts who meet weekly to work on projects and learn new technologies.",
    members: 78,
    image: "/placeholder.svg?height=100&width=100",
    joined: true,
    privacy: "public",
    activity: "high",
    posts: 45,
    events: 3,
  },
  {
    id: 2,
    name: "Debate Society",
    description: "Improve your public speaking and critical thinking skills through regular debates and discussions.",
    members: 45,
    image: "/placeholder.svg?height=100&width=100",
    joined: false,
    privacy: "public",
    activity: "medium",
    posts: 28,
    events: 2,
  },
  {
    id: 3,
    name: "Photography Club",
    description: "For photography enthusiasts to share their work, learn techniques, and participate in photo walks.",
    members: 62,
    image: "/placeholder.svg?height=100&width=100",
    joined: true,
    privacy: "public",
    activity: "high",
    posts: 87,
    events: 5,
  },
  {
    id: 4,
    name: "Sports Club",
    description: "Join various sports teams or participate in recreational activities to stay fit and have fun.",
    members: 120,
    image: "/placeholder.svg?height=100&width=100",
    joined: false,
    privacy: "public",
    activity: "high",
    posts: 56,
    events: 8,
  },
  {
    id: 5,
    name: "AI Research Group",
    description:
      "Students and faculty exploring artificial intelligence and machine learning research and applications.",
    members: 35,
    image: "/placeholder.svg?height=100&width=100",
    joined: false,
    privacy: "private",
    activity: "medium",
    posts: 32,
    events: 1,
  },
  {
    id: 6,
    name: "International Students Association",
    description: "Supporting international students and promoting cultural exchange on campus.",
    members: 95,
    image: "/placeholder.svg?height=100&width=100",
    joined: false,
    privacy: "public",
    activity: "medium",
    posts: 41,
    events: 4,
  },
]

// Sample data for trending topics
const trendingTopics = [
  { id: 1, name: "Final Exams", posts: 156 },
  { id: 2, name: "Campus Renovation", posts: 89 },
  { id: 3, name: "Summer Internships", posts: 72 },
  { id: 4, name: "Cricket Championship", posts: 65 },
  { id: 5, name: "Course Registration", posts: 54 },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [localPosts, setLocalPosts] = useState(posts || [])
  const [localEvents, setLocalEvents] = useState(events || [])
  const [localGroups, setLocalGroups] = useState(groups || [])
  const [activeTab, setActiveTab] = useState("feed")
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [showCommentBox, setShowCommentBox] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    privacy: "public",
    image: null,
  })
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: null,
    tags: [],
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [postImages, setPostImages] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    role: "all",
    sortBy: "recent",
    timeFrame: "all",
  })

  const postInputRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Filter posts, events, and groups based on search query
    setIsRefreshing(true)

    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleNewPost = (e) => {
    e.preventDefault()
    if (newPostContent.trim() || postImages.length > 0) {
      setIsUploading(true)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)

          setTimeout(() => {
            const newPost = {
              id: localPosts.length + 1,
              author: {
                id: 1,
                name: "John Doe",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "Student",
                department: "Computer Science",
              },
              content: newPostContent,
              timestamp: new Date().toISOString(),
              likes: 0,
              comments: 0,
              liked: false,
              bookmarked: false,
              tags: newPostContent.match(/#\w+/g) || [],
              images: postImages.length > 0 ? ["/placeholder.svg?height=300&width=500"] : [],
              commentsList: [],
            }

            setLocalPosts([newPost, ...localPosts])
            setNewPostContent("")
            setPostImages([])
            setIsUploading(false)
            setUploadProgress(0)
          }, 500)
        }
      }, 200)
    }
  }

  const toggleLike = (postId) => {
    setLocalPosts(
      localPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const toggleBookmark = (postId) => {
    setLocalPosts(
      localPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return

    setLocalPosts(
      localPosts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: (post.commentsList?.length || 0) + 1,
            author: {
              id: 1,
              name: "John Doe",
              avatar: "/placeholder.svg?height=30&width=30",
              role: "Student",
            },
            content: commentText,
            timestamp: new Date().toISOString(),
            likes: 0,
          }

          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...(post.commentsList || []), newComment],
          }
        }
        return post
      }),
    )

    setCommentText("")
    setShowCommentBox(null)
  }

  const toggleEventRegistration = (eventId) => {
    setLocalEvents(
      localEvents.map((event) => {
        if (event.id === eventId) {
          const newRegistered = !event.registered
          return {
            ...event,
            registered: newRegistered,
            attendees: newRegistered ? event.attendees + 1 : event.attendees - 1,
          }
        }
        return event
      }),
    )
  }

  const toggleEventInterest = (eventId) => {
    setLocalEvents(
      localEvents.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            interested: !event.interested,
          }
        }
        return event
      }),
    )
  }

  const toggleGroupMembership = (groupId) => {
    setLocalGroups(
      localGroups.map((group) => {
        if (group.id === groupId) {
          const newJoined = !group.joined
          return {
            ...group,
            joined: newJoined,
            members: newJoined ? group.members + 1 : group.members - 1,
          }
        }
        return group
      }),
    )
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the files to a server
      // Here we'll just simulate adding image placeholders
      const newImages = Array.from(e.target.files).map((_, index) => ({
        id: postImages.length + index + 1,
        name: `image_${postImages.length + index + 1}.jpg`,
        size: Math.floor(Math.random() * 5000) + 500 + "KB",
      }))

      setPostImages([...postImages, ...newImages])
    }
  }

  const removeImage = (imageId) => {
    setPostImages(postImages.filter((img) => img.id !== imageId))
  }

  const handleCreateGroup = () => {
    if (!newGroupData.name || !newGroupData.description) return

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        setTimeout(() => {
          const newGroup = {
            id: localGroups.length + 1,
            name: newGroupData.name,
            description: newGroupData.description,
            members: 1,
            image: "/placeholder.svg?height=100&width=100",
            joined: true,
            privacy: newGroupData.privacy,
            activity: "low",
            posts: 0,
            events: 0,
          }

          setLocalGroups([newGroup, ...localGroups])
          setNewGroupData({
            name: "",
            description: "",
            privacy: "public",
            image: null,
          })
          setIsCreatingGroup(false)
          setIsUploading(false)
          setUploadProgress(0)
        }, 500)
      }
    }, 200)
  }

  const handleCreateEvent = () => {
    if (!newEventData.title || !newEventData.description || !newEventData.date || !newEventData.location) return

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        setTimeout(() => {
          const dateTime = `${newEventData.date}T${newEventData.time || "00:00:00"}`
          const newEvent = {
            id: localEvents.length + 1,
            title: newEventData.title,
            organizer: "John Doe",
            date: dateTime,
            location: newEventData.location,
            description: newEventData.description,
            attendees: 1,
            image: "/placeholder.svg?height=200&width=300",
            tags: newEventData.tags.length > 0 ? newEventData.tags.split(",").map((tag) => tag.trim()) : ["event"],
            registered: true,
            interested: true,
          }

          setLocalEvents([newEvent, ...localEvents])
          setNewEventData({
            title: "",
            description: "",
            date: "",
            time: "",
            location: "",
            image: null,
            tags: [],
          })
          setIsCreatingEvent(false)
          setIsUploading(false)
          setUploadProgress(0)
        }, 500)
      }
    }, 200)
  }

  const refreshFeed = () => {
    setIsRefreshing(true)

    setTimeout(() => {
      // Simulate getting new data
      setIsRefreshing(false)
    }, 1500)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatEventDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatRelativeTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  // Filter posts based on filter options
  const getFilteredPosts = () => {
    let filtered = [...localPosts]

    // Filter by role
    if (filterOptions.role !== "all") {
      filtered = filtered.filter((post) => post.author.role.toLowerCase() === filterOptions.role.toLowerCase())
    }

    // Sort by selected option
    if (filterOptions.sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    } else if (filterOptions.sortBy === "popular") {
      filtered.sort((a, b) => b.likes - a.likes)
    } else if (filterOptions.sortBy === "comments") {
      filtered.sort((a, b) => b.comments - a.comments)
    }

    // Filter by time frame
    if (filterOptions.timeFrame !== "all") {
      const now = new Date()
      const cutoff = new Date()

      if (filterOptions.timeFrame === "today") {
        cutoff.setHours(0, 0, 0, 0)
      } else if (filterOptions.timeFrame === "week") {
        cutoff.setDate(now.getDate() - 7)
      } else if (filterOptions.timeFrame === "month") {
        cutoff.setMonth(now.getMonth() - 1)
      }

      filtered = filtered.filter((post) => new Date(post.timestamp) >= cutoff)
    }

    return filtered
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="bg-navy-100 dark:bg-navy-800 p-3 rounded-full">
            <Users className="h-6 w-6 text-navy-600 dark:text-navy-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground">Connect with students, faculty, and campus organizations</p>
          </div>
        </div>
        <form onSubmit={handleSearch} className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search community..."
              className="w-full md:w-[300px] pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-navy-50 to-navy-100 dark:from-navy-900 dark:to-navy-800">
              <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleNewPost}>
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow space-y-4">
                    <Textarea
                      ref={postInputRef}
                      placeholder="What's on your mind?"
                      className="min-h-[100px] border-navy-200 focus:border-navy-400 focus:ring-navy-400 transition-all duration-300"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />

                    {postImages.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Attached Images</div>
                        <div className="flex flex-wrap gap-2">
                          {postImages.map((img) => (
                            <div key={img.id} className="relative group">
                              <div className="bg-muted rounded-md p-2 pr-8">
                                <div className="flex items-center gap-2">
                                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm truncate max-w-[150px]">{img.name}</span>
                                  <span className="text-xs text-muted-foreground">{img.size}</span>
                                </div>
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(img.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {isUploading && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-navy-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          ></motion.div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={handleImageUpload}
                        >
                          <ImageIcon className="h-4 w-4" />
                          <span>Photo</span>
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                        />
                        <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span>Tag</span>
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              <span>Public</span>
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <div className="space-y-1">
                              <Button variant="ghost" className="w-full justify-start">
                                <Globe className="h-4 w-4 mr-2" /> Public
                              </Button>
                              <Button variant="ghost" className="w-full justify-start">
                                <Users className="h-4 w-4 mr-2" /> Friends
                              </Button>
                              <Button variant="ghost" className="w-full justify-start">
                                <Lock className="h-4 w-4 mr-2" /> Only Me
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button
                        type="submit"
                        disabled={(!newPostContent.trim() && postImages.length === 0) || isUploading}
                        className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
                          </>
                        ) : (
                          "Post"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-2">
                <TabsList>
                  <TabsTrigger
                    value="feed"
                    className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Feed</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="trending"
                    className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
                  >
                    <Flame className="h-4 w-4 mr-2" />
                    <span>Trending</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="announcements"
                    className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
                  >
                    <Megaphone className="h-4 w-4 mr-2" />
                    <span>Announcements</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Events</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="groups"
                    className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    <span>Groups</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshFeed}
                    disabled={isRefreshing}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2">
                        <div className="mb-2">
                          <div className="text-sm font-medium mb-1">Show posts from</div>
                          <select
                            className="w-full p-1 text-sm border rounded"
                            value={filterOptions.role}
                            onChange={(e) => setFilterOptions({ ...filterOptions, role: e.target.value })}
                          >
                            <option value="all">Everyone</option>
                            <option value="student">Students</option>
                            <option value="professor">Professors</option>
                            <option value="organization">Organizations</option>
                          </select>
                        </div>

                        <div className="mb-2">
                          <div className="text-sm font-medium mb-1">Sort by</div>
                          <select
                            className="w-full p-1 text-sm border rounded"
                            value={filterOptions.sortBy}
                            onChange={(e) => setFilterOptions({ ...filterOptions, sortBy: e.target.value })}
                          >
                            <option value="recent">Most Recent</option>
                            <option value="popular">Most Popular</option>
                            <option value="comments">Most Comments</option>
                          </select>
                        </div>

                        <div className="mb-2">
                          <div className="text-sm font-medium mb-1">Time frame</div>
                          <select
                            className="w-full p-1 text-sm border rounded"
                            value={filterOptions.timeFrame}
                            onChange={(e) => setFilterOptions({ ...filterOptions, timeFrame: e.target.value })}
                          >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                          </select>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="feed" className="space-y-6 m-0">
                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-grow">
                              <Skeleton className="h-4 w-1/3" />
                              <Skeleton className="h-3 w-1/4" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-40 w-full" />
                        </CardContent>
                        <CardFooter>
                          <div className="flex justify-between w-full">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-20" />
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                    {getFilteredPosts().length === 0 ? (
                      <div className="text-center py-10">
                        <div className="bg-muted inline-flex p-3 rounded-full mb-4">
                          <AlertCircle className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No posts found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your filters or search terms to find what you're looking for.
                        </p>
                      </div>
                    ) : (
                      getFilteredPosts().map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                          <Card className="overflow-hidden border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700 transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={post.author.avatar || "/placeholder.svg"}
                                      alt={post.author.name}
                                    />
                                    <AvatarFallback>
                                      {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{post.author.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                      <span>{post.author.role}</span>
                                      {post.author.department && (
                                        <>
                                          <span>•</span>
                                          <span>{post.author.department}</span>
                                        </>
                                      )}
                                      <span>•</span>
                                      <span>{formatRelativeTime(post.timestamp)}</span>
                                    </div>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Bell className="h-4 w-4 mr-2" /> Turn on notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Bookmark className="h-4 w-4 mr-2" /> Save post
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <EyeOff className="h-4 w-4 mr-2" /> Hide post
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Flag className="h-4 w-4 mr-2" /> Report post
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="whitespace-pre-line">{post.content}</p>
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-900 dark:text-navy-300 dark:hover:bg-navy-800"
                                    >
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {post.images && post.images.length > 0 && (
                                <div className={`grid gap-2 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                                  {post.images.map((image, index) => (
                                    <motion.div
                                      key={index}
                                      className="rounded-md overflow-hidden bg-muted"
                                      whileHover={{ scale: 1.02 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                      />
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="border-t pt-3">
                              <div className="flex justify-between w-full">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${post.liked ? "text-red-500" : ""}`}
                                  onClick={() => toggleLike(post.id)}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${post.liked ? "fill-current" : ""} transition-transform duration-300 ${post.liked ? "scale-110" : ""}`}
                                  />
                                  <span>{post.likes}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center gap-1"
                                  onClick={() => {
                                    setShowCommentBox(showCommentBox === post.id ? null : post.id)
                                    setSelectedPost(post)
                                  }}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${post.bookmarked ? "text-blue-500" : ""}`}
                                  onClick={() => toggleBookmark(post.id)}
                                >
                                  <Bookmark
                                    className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""} transition-transform duration-300 ${post.bookmarked ? "scale-110" : ""}`}
                                  />
                                  <span>Save</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <Share2 className="h-4 w-4" />
                                  <span>Share</span>
                                </Button>
                              </div>
                            </CardFooter>

                            {/* Comments section */}
                            {(showCommentBox === post.id || post.commentsList?.length > 0) && (
                              <div className="px-4 pb-4 border-t">
                                {post.commentsList && post.commentsList.length > 0 && (
                                  <div className="mt-3 space-y-3">
                                    <div className="text-sm font-medium">Comments</div>
                                    {post.commentsList.map((comment) => (
                                      <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-2"
                                      >
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage
                                            src={comment.author.avatar || "/placeholder.svg"}
                                            alt={comment.author.name}
                                          />
                                          <AvatarFallback>
                                            {comment.author.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="bg-muted p-2 rounded-lg">
                                            <div className="flex justify-between items-start">
                                              <div className="font-medium text-sm">{comment.author.name}</div>
                                              <div className="text-xs text-muted-foreground">
                                                {formatRelativeTime(comment.timestamp)}
                                              </div>
                                            </div>
                                            <div className="text-sm mt-1">{comment.content}</div>
                                          </div>
                                          <div className="flex items-center gap-3 mt-1 text-xs">
                                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                                              Like ({comment.likes})
                                            </button>
                                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                                              Reply
                                            </button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                )}

                                {showCommentBox === post.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 flex gap-2"
                                  >
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Your Avatar" />
                                      <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 flex items-end gap-2">
                                      <Input
                                        placeholder="Write a comment..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="flex-1"
                                      />
                                      <Button
                                        size="sm"
                                        onClick={() => handleAddComment(post.id)}
                                        disabled={!commentText.trim()}
                                      >
                                        <Send className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="trending" className="space-y-6 m-0">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  {localPosts &&
                    localPosts
                      .sort((a, b) => b.likes - a.likes)
                      .slice(0, 5)
                      .map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                          <Card className="overflow-hidden border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700 transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={post.author.avatar || "/placeholder.svg"}
                                      alt={post.author.name}
                                    />
                                    <AvatarFallback>
                                      {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{post.author.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                      <span>{post.author.role}</span>
                                      {post.author.department && (
                                        <>
                                          <span>•</span>
                                          <span>{post.author.department}</span>
                                        </>
                                      )}
                                      <span>•</span>
                                      <span>{formatRelativeTime(post.timestamp)}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                                  >
                                    Trending
                                  </Badge>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="whitespace-pre-line">{post.content}</p>
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-900 dark:text-navy-300 dark:hover:bg-navy-800"
                                    >
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {post.images && post.images.length > 0 && (
                                <div className={`grid gap-2 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                                  {post.images.map((image, index) => (
                                    <div key={index} className="rounded-md overflow-hidden bg-muted">
                                      <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                            <CardFooter>
                              <div className="flex justify-between w-full">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${post.liked ? "text-red-500" : ""}`}
                                  onClick={() => toggleLike(post.id)}
                                >
                                  <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                                  <span>{post.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${post.bookmarked ? "text-blue-500" : ""}`}
                                  onClick={() => toggleBookmark(post.id)}
                                >
                                  <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
                                  <span>Save</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <Share2 className="h-4 w-4" />
                                  <span>Share</span>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="announcements" className="space-y-6 m-0">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  {localPosts &&
                    localPosts
                      .filter((post) => post.author.role === "Organization" || post.author.role === "Professor")
                      .map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                          <Card className="overflow-hidden border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700 transition-all duration-300 hover:shadow-md">
                            <div className="bg-navy-50 dark:bg-navy-900 px-4 py-1 text-xs font-medium text-navy-800 dark:text-navy-200 flex items-center">
                              <Megaphone className="h-3 w-3 mr-1" />
                              Official Announcement
                            </div>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={post.author.avatar || "/placeholder.svg"}
                                      alt={post.author.name}
                                    />
                                    <AvatarFallback>
                                      {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{post.author.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                      <span>{post.author.role}</span>
                                      {post.author.department && (
                                        <>
                                          <span>•</span>
                                          <span>{post.author.department}</span>
                                        </>
                                      )}
                                      <span>•</span>
                                      <span>{formatRelativeTime(post.timestamp)}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="whitespace-pre-line">{post.content}</p>
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-900 dark:text-navy-300 dark:hover:bg-navy-800"
                                    >
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {post.images && post.images.length > 0 && (
                                <div className={`grid gap-2 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                                  {post.images.map((image, index) => (
                                    <div key={index} className="rounded-md overflow-hidden bg-muted">
                                      <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                            <CardFooter>
                              <div className="flex justify-between w-full">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${post.liked ? "text-red-500" : ""}`}
                                  onClick={() => toggleLike(post.id)}
                                >
                                  <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                                  <span>{post.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${post.bookmarked ? "text-blue-500" : ""}`}
                                  onClick={() => toggleBookmark(post.id)}
                                >
                                  <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
                                  <span>Save</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <Bell className="h-4 w-4" />
                                  <span>Follow</span>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6 m-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Upcoming Events</h3>
                  <Button onClick={() => setIsCreatingEvent(true)} className="flex items-center gap-1">
                    <CalendarPlus className="h-4 w-4 mr-1" />
                    Create Event
                  </Button>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {localEvents.map((event, index) => (
                    <motion.div key={event.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                      <Card className="h-full overflow-hidden border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700 transition-all duration-300 hover:shadow-md">
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {event.registered && <Badge className="bg-green-500 hover:bg-green-600">Registered</Badge>}
                            {event.interested && !event.registered && (
                              <Badge variant="outline" className="bg-white/80 dark:bg-black/50">
                                Interested
                              </Badge>
                            )}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                            <div className="flex items-center text-white/90 text-sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatEventDate(event.date)}</span>
                              <span className="mx-1">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{format(new Date(event.date), "h:mm a")}</span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Organized by {event.organizer}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-sm line-clamp-2 mb-3">{event.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {event.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-900 dark:text-navy-300 dark:hover:bg-navy-800"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t p-4 flex justify-between">
                          <Button
                            variant={event.interested ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => toggleEventInterest(event.id)}
                            className={
                              event.interested ? "bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-200" : ""
                            }
                          >
                            {event.interested ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" /> Interested
                              </>
                            ) : (
                              "Interested"
                            )}
                          </Button>
                          <Button
                            variant={event.registered ? "secondary" : "default"}
                            size="sm"
                            onClick={() => toggleEventRegistration(event.id)}
                            className={
                              event.registered
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : ""
                            }
                          >
                            {event.registered ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" /> Registered
                              </>
                            ) : (
                              "Register"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="groups" className="space-y-6 m-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">University Groups</h3>
                  <Button onClick={() => setIsCreatingGroup(true)} className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Create Group
                  </Button>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {localGroups.map((group, index) => (
                    <motion.div key={group.id} variants={itemVariants} transition={{ delay: index * 0.05 }}>
                      <Card className="h-full overflow-hidden border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700 transition-all duration-300 hover:shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                              <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{group.name}</CardTitle>
                                <Badge
                                  variant="outline"
                                  className={
                                    group.privacy === "public"
                                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                                      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                                  }
                                >
                                  {group.privacy === "public" ? (
                                    <Globe className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Lock className="h-3 w-3 mr-1" />
                                  )}
                                  {group.privacy}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{group.members} members</span>
                                <span className="mx-1">•</span>
                                <span>
                                  {group.activity === "high"
                                    ? "Very active"
                                    : group.activity === "medium"
                                      ? "Active"
                                      : "Low activity"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm line-clamp-2 mb-3">{group.description}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{group.posts} posts</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{group.events} events</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3">
                          <Button
                            variant={group.joined ? "secondary" : "default"}
                            className={`w-full ${
                              group.joined ? "bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-200" : ""
                            }`}
                            onClick={() => toggleGroupMembership(group.id)}
                          >
                            {group.joined ? (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" /> Joined
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-4 w-4 mr-2" /> Join Group
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          <Dialog open={selectedPost !== null} onOpenChange={(open) => !open && setSelectedPost(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Post Details</DialogTitle>
              </DialogHeader>
              {selectedPost && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedPost.author.avatar || "/placeholder.svg"}
                        alt={selectedPost.author.name}
                      />
                      <AvatarFallback>
                        {selectedPost.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedPost.author.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>{selectedPost.author.role}</span>
                        {selectedPost.author.department && (
                          <>
                            <span>•</span>
                            <span>{selectedPost.author.department}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>
                          {formatDate(selectedPost.timestamp)} at {formatTime(selectedPost.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="whitespace-pre-line">{selectedPost.content}</p>

                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedPost.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-900 dark:text-navy-300 dark:hover:bg-navy-800"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {selectedPost.images && selectedPost.images.length > 0 && (
                    <div className={`grid gap-2 ${selectedPost.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {selectedPost.images.map((image, index) => (
                        <div key={index} className="rounded-md overflow-hidden bg-muted">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-y">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{selectedPost.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{selectedPost.comments} comments</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Comments</h4>
                    <ScrollArea className="h-60">
                      <div className="space-y-3">
                        {selectedPost.commentsList && selectedPost.commentsList.length > 0 ? (
                          selectedPost.commentsList.map((comment) => (
                            <div key={comment.id} className="flex gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={comment.author.avatar || "/placeholder.svg"}
                                  alt={comment.author.name}
                                />
                                <AvatarFallback>
                                  {comment.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted p-2 rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div className="font-medium text-sm">{comment.author.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatRelativeTime(comment.timestamp)}
                                    </div>
                                  </div>
                                  <div className="text-sm mt-1">{comment.content}</div>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs">
                                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                                    Like ({comment.likes})
                                  </button>
                                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted-foreground py-4">No comments yet</div>
                        )}
                      </div>
                    </ScrollArea>

                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Your Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex items-end gap-2">
                        <Input
                          placeholder="Write a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAddComment(selectedPost.id)}
                          disabled={!commentText.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={selectedEvent !== null} onOpenChange={(open) => !open && setSelectedEvent(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Event Details</DialogTitle>
              </DialogHeader>
              {selectedEvent && (
                <div className="space-y-4">
                  <div className="relative rounded-md overflow-hidden">
                    <img
                      src={selectedEvent.image || "/placeholder.svg"}
                      alt={selectedEvent.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h2 className="text-white text-2xl font-bold">{selectedEvent.title}</h2>
                      <div className="flex items-center text-white/90 text-sm mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatEventDate(selectedEvent.date)}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{format(new Date(selectedEvent.date), "h:mm a")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Organizer</div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedEvent.organizer}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Location</div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Attendees</div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedEvent.attendees} people attending</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Description</div>
                    <p>{selectedEvent.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-900 dark:text-navy-300 dark:hover:bg-navy-800"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant={selectedEvent.interested ? "secondary" : "outline"}
                      onClick={() => toggleEventInterest(selectedEvent.id)}
                      className={
                        selectedEvent.interested ? "bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-200" : ""
                      }
                    >
                      {selectedEvent.interested ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" /> Interested
                        </>
                      ) : (
                        "Interested"
                      )}
                    </Button>

                    <Button
                      variant={selectedEvent.registered ? "secondary" : "default"}
                      onClick={() => toggleEventRegistration(selectedEvent.id)}
                      className={
                        selectedEvent.registered
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : ""
                      }
                    >
                      {selectedEvent.registered ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" /> Registered
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={selectedGroup !== null} onOpenChange={(open) => !open && setSelectedGroup(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Group Details</DialogTitle>
              </DialogHeader>
              {selectedGroup && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedGroup.image || "/placeholder.svg"} alt={selectedGroup.name} />
                      <AvatarFallback>{selectedGroup.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={
                            selectedGroup.privacy === "public"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                          }
                        >
                          {selectedGroup.privacy === "public" ? (
                            <Globe className="h-3 w-3 mr-1" />
                          ) : (
                            <Lock className="h-3 w-3 mr-1" />
                          )}
                          {selectedGroup.privacy}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-1" />
                          {selectedGroup.members} members
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">About</div>
                    <p>{selectedGroup.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Activity</div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedGroup.posts} posts</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Events</div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedGroup.events} upcoming events</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline">View Posts</Button>
                    <Button
                      variant={selectedGroup.joined ? "secondary" : "default"}
                      onClick={() => toggleGroupMembership(selectedGroup.id)}
                      className={
                        selectedGroup.joined ? "bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-200" : ""
                      }
                    >
                      {selectedGroup.joined ? (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" /> Joined
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" /> Join Group
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Name</label>
                  <Input
                    placeholder="Enter group name"
                    value={newGroupData.name}
                    onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="What is this group about?"
                    value={newGroupData.description}
                    onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Privacy</label>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="public"
                        name="privacy"
                        value="public"
                        checked={newGroupData.privacy === "public"}
                        onChange={() => setNewGroupData({ ...newGroupData, privacy: "public" })}
                        className="mr-2"
                      />
                      <label htmlFor="public" className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" /> Public
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="private"
                        name="privacy"
                        value="private"
                        checked={newGroupData.privacy === "private"}
                        onChange={() => setNewGroupData({ ...newGroupData, privacy: "private" })}
                        className="mr-2"
                      />
                      <label htmlFor="private" className="flex items-center">
                        <Lock className="h-4 w-4 mr-1" /> Private
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Image</label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Click to upload an image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF, max 5MB</p>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Creating group...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-navy-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingGroup(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={!newGroupData.name || !newGroupData.description || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                    </>
                  ) : (
                    "Create Group"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreatingEvent} onOpenChange={setIsCreatingEvent}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Title</label>
                  <Input
                    placeholder="Enter event title"
                    value={newEventData.title}
                    onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="What is this event about?"
                    value={newEventData.description}
                    onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={newEventData.date}
                      onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input
                      type="time"
                      value={newEventData.time}
                      onChange={(e) => setNewEventData({ ...newEventData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="Where will this event take place?"
                    value={newEventData.location}
                    onChange={(e) => setNewEventData({ ...newEventData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input
                    placeholder="e.g. tech, workshop, networking"
                    value={newEventData.tags}
                    onChange={(e) => setNewEventData({ ...newEventData, tags: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Image</label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Click to upload an image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF, max 5MB</p>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Creating event...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-navy-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingEvent(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateEvent}
                  disabled={
                    !newEventData.title ||
                    !newEventData.description ||
                    !newEventData.date ||
                    !newEventData.location ||
                    isUploading
                  }
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                    </>
                  ) : (
                    "Create Event"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events &&
                events.slice(0, 3).map((event) => (
                  <motion.div
                    key={event.id}
                    className="flex gap-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="min-w-[60px] text-center">
                      <div className="bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 rounded-t-md py-1 text-xs font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="bg-muted rounded-b-md py-2 text-lg font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                        {event.title}
                      </h4>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group" onClick={() => setActiveTab("events")}>
                View All Events
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Groups You Might Like</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {groups &&
                groups
                  .filter((g) => !g.joined)
                  .slice(0, 3)
                  .map((group) => (
                    <motion.div
                      key={group.id}
                      className="flex gap-3 group cursor-pointer"
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedGroup(group)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                        <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <h4 className="font-medium group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                          {group.name}
                        </h4>
                        <div className="text-xs text-muted-foreground mt-1">{group.members} members</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleGroupMembership(group.id)
                        }}
                      >
                        Join
                      </Button>
                    </motion.div>
                  ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group" onClick={() => setActiveTab("groups")}>
                View All Groups
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trendingTopics &&
                  trendingTopics.map((topic) => (
                    <motion.div
                      key={topic.id}
                      className="flex justify-between items-center group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="rounded-full">
                          {topic.id}
                        </Badge>
                        <span className="font-medium group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                          #{topic.name}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{topic.posts} posts</div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
