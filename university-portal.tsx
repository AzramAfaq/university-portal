"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Lock,
  Mail,
  Calendar,
  Bell,
  FileText,
  User,
  Clock,
  School,
  BookMarked,
  MessageSquare,
  FileSpreadsheet,
  BookText,
  Receipt,
  Settings,
  LogOut,
  Menu,
  CheckCircle2,
  XCircle,
  Info,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Award,
  Lightbulb,
  BarChart3,
  X,
  MessageCircle,
  FileCode2,
  Briefcase,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SemesterResultTab from "./semester-result-tab"
import EnhancedHECSurvey from "./enhanced-hec-survey"
import TranscriptGenerator from "./transcript-generator"
import ProfileTab from "./profile-tab"
import AttendanceTab from "./attendance-tab"
import FacultyFeedbackTab from "./faculty-feedback-tab"
import DatasheetTab from "./datasheet-tab"
import GradeBookTab from "./gradebook-tab"
import FeeVoucherTab from "./fee-voucher-tab"
import ComplaintsTab from "./complaints-tab"
import TimeTableTab from "./timetable-tab"
import SettingsTab from "./settings-tab"
import StudentServicesTab from "./student-services-tab"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { useThemeContext } from "@/components/theme-provider"
import { useMediaQuery } from "@/hooks/use-mobile"
import { useUser } from "./app/UserContext"
import ChatTab from "./chat-tab"

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface UniversityPortalProps {
  children: React.ReactNode;
}

export default function UniversityPortal({ children }: UniversityPortalProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const { toast } = useToast()

  const { theme } = useTheme()
  const { themeOptions } = useThemeContext()

  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({
    show: false,
    message: "",
    type: "info",
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(5)
  const [showNotificationBadge, setShowNotificationBadge] = useState(true)
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)

  // Add these state variables for Google authentication
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false)
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null)

  // Google OAuth configuration
  const googleClientId = "4814479499-44lvbqt1jvoe4bl93654veb4nmjfd2kl.apps.googleusercontent.com"
  const googleClientSecret = "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"

  const controls = useAnimation()
  const loginFormRef = useRef<HTMLFormElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { email, setEmail } = useUser()
  const [profile, setProfile] = useState<any>(null)

  // Initialize sidebar collapsed state based on screen size
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true)
    } else {
      setSidebarCollapsed(false)
    }
  }, [isMobile])

  const getThemeColor = () => {
    switch (themeOptions.theme) {
      case "purple":
        return "purple"
      case "green":
        return "green"
      default:
        return "blue"
    }
  }

  useEffect(() => {
    if (themeOptions.fontScale) {
      document.documentElement.style.fontSize = `${themeOptions.fontScale * 100}%`
    }
    return () => {
      document.documentElement.style.fontSize = "100%"
    }
  }, [themeOptions.fontScale])

  // Password strength checker
  useEffect(() => {
    if (credentials.password) {
      let strength = 0
      if (credentials.password.length > 6) strength += 1
      if (/[A-Z]/.test(credentials.password)) strength += 1
      if (/[0-9]/.test(credentials.password)) strength += 1
      if (/[^A-Za-z0-9]/.test(credentials.password)) strength += 1
      setPasswordStrength(strength)
    } else {
      setPasswordStrength(0)
    }
  }, [credentials.password])

  // Notification timer
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  // Show welcome dialog after login
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setShowWelcomeDialog(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn])

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && !sidebarCollapsed && isLoggedIn) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobile, sidebarCollapsed, isLoggedIn])

  useEffect(() => {
    if (!email) return;
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProfile(data.student);
      });
  }, [email]);

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()
    setIsExpanded(true)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setIsLoggedIn(true)
        setActiveTab("profile")
        setEmail(credentials.email)
        setNotification({
          show: true,
          message: "Login successful! Welcome back.",
          type: "success",
        })
      } else {
        setLoginAttempts((prev) => prev + 1)
        controls.start({
          x: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.5 },
        })
        setNotification({
          show: true,
          message: data.message || "Invalid credentials. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      setNotification({
        show: true,
        message: "An error occurred. Please try again.",
        type: "error",
      })
    }
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsExpanded(false)
    setActiveTab(null)
    setCredentials({
      email: "",
      password: "",
    })
    setEmail("")
    setNotification({
      show: true,
      message: "You have been logged out successfully.",
      type: "info",
    })
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const clearNotifications = () => {
    setUnreadNotifications(0)
    setShowNotificationBadge(false)
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read.",
      variant: "success",
    })
  }

  // Add this function for Google Sign In
  const handleGoogleSignIn = async () => {
    setIsGoogleAuthLoading(true)
    setGoogleAuthError(null)

    // Simulate Google authentication
    try {
      // In a real implementation, this would redirect to Google's OAuth flow
      // For this demo, we'll simulate a successful authentication after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful login
      setIsLoggedIn(true)
      setActiveTab("profile")
      setNotification({
        show: true,
        message: "Successfully signed in with Google!",
        type: "success",
      })
    } catch (error) {
      setGoogleAuthError("Failed to authenticate with Google. Please try again.")
      setNotification({
        show: true,
        message: "Google authentication failed. Please try again.",
        type: "error",
      })
    } finally {
      setIsGoogleAuthLoading(false)
    }
  }

  // Add navigation items for new pages
  const navigationItems: NavigationItem[] = [
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Assignments", icon: FileText, path: "/assignments" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Career", icon: Briefcase, path: "/career" },
    { name: "Community", icon: Users, path: "/community" },
    { name: "Gradebook", icon: BookMarked, path: "/gradebook" },
    { name: "Attendance", icon: Calendar, path: "/attendance" },
    { name: "Timetable", icon: Clock, path: "/timetable" },
    { name: "Fee Voucher", icon: Receipt, path: "/fee-voucher" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  const recentNotifications = [
    {
      id: 1,
      title: "Mid-Term Exam Schedule Released",
      description: "The mid-term examination schedule has been uploaded. Please check for any conflicts.",
      time: "2 hours ago",
      type: "info",
      icon: <Bell className="h-5 w-5 text-blue-600" />,
      read: false,
    },
    {
      id: 2,
      title: "Fee Submission Confirmed",
      description: "Your fee payment for Fall 2024 has been confirmed. Receipt available for download.",
      time: "Yesterday",
      type: "success",
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      read: false,
    },
    {
      id: 3,
      title: "Scholarship Opportunity",
      description: "New merit scholarship applications are open for high-achieving students.",
      time: "2 days ago",
      type: "warning",
      icon: <Award className="h-5 w-5 text-amber-600" />,
      read: false,
    },
    {
      id: 4,
      title: "New Course Registration",
      description: "Course registration for the next semester will begin on April 15, 2025.",
      time: "3 days ago",
      type: "info",
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
      read: true,
    },
    {
      id: 5,
      title: "Library Book Due",
      description: "Your borrowed book 'Advanced Machine Learning' is due in 3 days.",
      time: "4 days ago",
      type: "warning",
      icon: <BookOpen className="h-5 w-5 text-red-600" />,
      read: true,
    },
  ]

  // Add this useEffect for mobile font scaling
  useEffect(() => {
    if (isMobile) {
      // Apply much smaller font size for mobile
      document.documentElement.style.fontSize = "12px"

      // Add mobile-specific class to body
      document.body.classList.add("mobile-view")
    } else {
      // Reset to default or apply theme font scale
      document.documentElement.style.fontSize = themeOptions.fontScale ? `${themeOptions.fontScale * 100}%` : "100%"

      // Remove mobile-specific class
      document.body.classList.remove("mobile-view")
    }

    return () => {
      document.documentElement.style.fontSize = "100%"
      document.body.classList.remove("mobile-view")
    }
  }, [isMobile, themeOptions.fontScale])

  const [bgShapes, setBgShapes] = useState<any[]>([]);
  useEffect(() => {
    const shapes = Array.from({ length: 6 }).map((_, i) => ({
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: i * 2,
    }));
    setBgShapes(shapes);
  }, []);

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-navy-900 via-navy-800 to-indigo-900"
      } p-4`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {bgShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-500/10"
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              top: `${shape.top}%`,
              left: `${shape.left}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.8, 1],
              opacity: [0, 0.2, 0.1, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: shape.delay,
            }}
          />
        ))}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`fixed right-2 top-2 z-50 flex items-center gap-1 rounded-lg p-2 text-xs md:right-4 md:top-4 md:gap-2 md:p-4 md:text-sm shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : notification.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {notification.type === "success" && <CheckCircle2 className="h-3 w-3 md:h-5 md:w-5" />}
            {notification.type === "error" && <XCircle className="h-3 w-3 md:h-5 md:w-5" />}
            {notification.type === "info" && <Info className="h-3 w-3 md:h-5 md:w-5" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Dialog */}
      <AnimatePresence>
        {showWelcomeDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-4 max-w-md rounded-lg bg-white p-4 md:p-6 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="mb-3 md:mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="rounded-full bg-blue-100 p-1.5 md:p-2">
                    <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-navy-900">
                    Welcome Back, {profile?.name || "Student"}!
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowWelcomeDialog(false)}
                  className="h-6 w-6 md:h-8 md:w-8 rounded-full hover:bg-gray-100"
                >
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </Button>
              </div>
              <p className="mb-3 md:mb-4 text-xs md:text-sm text-gray-600">
                We're glad to see you again. Here's what's new since your last login:
              </p>
              <div className="mb-3 md:mb-4 space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3 rounded-lg bg-blue-50 p-2 md:p-3 text-xs md:text-sm">
                  <Calendar className="mt-0.5 h-3 w-3 md:h-5 md:w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-navy-900">Mid-Term Exam Schedule</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      The mid-term examination schedule has been released.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3 rounded-lg bg-green-50 p-2 md:p-3 text-xs md:text-sm">
                  <Award className="mt-0.5 h-3 w-3 md:h-5 md:w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-navy-900">New Scholarship Opportunity</p>
                    <p className="text-xs md:text-sm text-gray-600">You're eligible for a merit-based scholarship.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3 rounded-lg bg-amber-50 p-2 md:p-3 text-xs md:text-sm">
                  <Lightbulb className="mt-0.5 h-3 w-3 md:h-5 md:w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-navy-900">HEC Survey Available</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      Please complete the HEC survey by April 15, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={() => setShowWelcomeDialog(false)}
                  className="text-xs md:text-sm py-1 md:py-2"
                >
                  Remind Me Later
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-xs md:text-sm py-1 md:py-2"
                  onClick={() => {
                    setShowWelcomeDialog(false)
                    setActiveTab("profile")
                  }}
                >
                  Go to Dashboard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isExpanded && !isLoggedIn ? (
          <motion.div
            className={`relative z-10 flex w-full max-w-5xl flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-4 md:p-6 backdrop-blur-md md:flex-row md:p-0 ${
              theme === "dark" ? "border-gray-700/30 bg-gray-800/20" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 1.2,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{ duration: 0.5 }}
            key="signup-initial"
          >
            {/* Left side with illustration */}
            <div className="mb-4 md:mb-6 flex w-full flex-col items-center justify-center p-3 md:p-4 md:mb-0 md:w-1/2 md:p-8">
              <motion.div
                className="mb-3 md:mb-4 flex h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                <Image
                  src="/images/university-logo.png"
                  alt="University of Wah Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </motion.div>

              <motion.h1
                className="mb-2 text-center text-lg md:text-xl lg:text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                University of Wah
              </motion.h1>

              <motion.p
                className="mb-4 md:mb-8 text-center text-xs md:text-sm text-gold-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Competence through Excellence
              </motion.p>

              <motion.div
                className="grid w-full grid-cols-2 gap-2 md:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="https://www.uow.edu.pk/Views/Events/EventDefault" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="group relative h-[60px] md:h-[80px] lg:h-[100px] w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/80 to-indigo-700/80 p-2 md:p-3 lg:p-4 text-center shadow-lg transition-all hover:shadow-xl"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center">
                      <Bell className="mb-1 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-xs md:text-sm font-medium text-white">Announcements</span>
                    </div>
                  </motion.div>
                </Link>

                <Link
                  href="https://www.uow.edu.pk/Views/Programs/ComputerScience/Computer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    className="group relative h-[60px] md:h-[80px] lg:h-[100px] w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/80 to-navy-700/80 p-2 md:p-3 lg:p-4 text-center shadow-lg transition-all hover:shadow-xl"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center">
                      <BookOpen className="mb-1 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-xs md:text-sm font-medium text-white">Course Catalog</span>
                    </div>
                  </motion.div>
                </Link>

                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="group relative h-[60px] md:h-[80px] lg:h-[100px] w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-navy-600/80 to-indigo-800/80 p-2 md:p-3 lg:p-4 text-center shadow-lg transition-all hover:shadow-xl"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center">
                      <Calendar className="mb-1 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-xs md:text-sm font-medium text-white">Academic Calendar</span>
                    </div>
                  </motion.div>
                </Link>

                <Link
                  href="https://admissions.uow.edu.pk/admissions/Schedule"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    className="group relative h-[60px] md:h-[80px] lg:h-[100px] w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gold-500/80 to-amber-700/80 p-2 md:p-3 lg:p-4 text-center shadow-lg transition-all hover:shadow-xl"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center">
                      <FileText className="mb-1 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-xs md:text-sm font-medium text-white">Admission Schedule</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right side with sign up */}
            <div
              className={`flex w-full flex-col items-center justify-center rounded-xl ${
                theme === "dark" ? "bg-gray-800/80" : "bg-navy-800/80"
              } p-3 md:p-5 backdrop-blur-md md:w-1/2 md:rounded-l-none md:rounded-r-2xl md:p-8`}
            >
              <motion.h2
                className="mb-2 md:mb-3 text-base md:text-lg lg:text-xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Student Portal
              </motion.h2>

              <motion.p
                className="mb-4 md:mb-6 text-center text-xs md:text-sm text-gold-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Access your courses, assignments, grades, and campus resources all in one place.
              </motion.p>

              <motion.div
                className="mb-3 md:mb-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={(e) => handleExpand(e)}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 py-2 md:py-4 text-sm md:text-base font-semibold text-navy-900 hover:from-gold-600 hover:to-gold-700"
                >
                  SIGN IN
                </Button>
              </motion.div>

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 border-gold-500/50 bg-transparent py-2 md:py-4 text-sm md:text-base font-semibold text-gold-300 hover:bg-gold-500/10"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleAuthLoading}
                >
                  {isGoogleAuthLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      SIGNING IN WITH GOOGLE...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5">
                        <path
                          fill="#EA4335"
                          d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                        />
                      </svg>
                      SIGN IN WITH GOOGLE
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                className="mt-4 md:mt-6 flex items-center justify-center space-x-2 text-gold-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs">Current semester: Fall 2025</span>
              </motion.div>
            </div>
          </motion.div>
        ) : isExpanded && !isLoggedIn ? (
          <motion.div
            className={`relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 ${
              theme === "dark" ? "border-gray-700/30 bg-gray-800/20" : "bg-white/10"
            } backdrop-blur-md md:flex-row`}
            initial={{
              opacity: 0,
              clipPath: "circle(0% at 75% 50%)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at 75% 50%)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smoother animation
            }}
            key="auth-expanded"
          >
            {/* Left side - University Info */}
            <div
              className={`flex w-full flex-col items-center justify-center ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90"
                  : "bg-gradient-to-br from-navy-900/90 to-navy-800/90"
              } p-4 md:p-6 backdrop-blur-md md:w-1/2 md:p-8`}
            >
              <motion.div
                className="mb-4 md:mb-6 flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Image
                  src="/images/university-logo.png"
                  alt="University of Wah Logo"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </motion.div>

              <motion.h1
                className="mb-2 text-center text-base md:text-lg lg:text-xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Avicena Portal
              </motion.h1>

              <motion.p
                className="mb-4 md:mb-6 text-center text-xs md:text-sm text-gold-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Competence through Excellence
              </motion.p>

              <motion.div
                className="mb-4 md:mb-6 space-y-2 md:space-y-3 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="mr-2 md:mr-3 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-gold-500/20">
                    <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-medium">Access Your Courses</h3>
                    <p className="text-xs text-gold-200">View materials and assignments</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-2 md:mr-3 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-gold-500/20">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-medium">Academic Calendar</h3>
                    <p className="text-xs text-gold-200">Important dates and events</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-2 md:mr-3 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-gold-500/20">
                    <School className="h-3 w-3 md:h-4 md:w-4 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-medium">Avicena Learning System</h3>
                    <p className="text-xs text-gold-200">Advanced educational tools</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-2 border-gold-500/50 bg-transparent py-2 md:py-4 text-xs md:text-sm font-semibold text-white hover:bg-gold-500/10"
                >
                  CAMPUS INFORMATION
                </Button>
              </motion.div>
            </div>

            {/* Right side - Auth Form */}
            <div className="flex w-full flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-6 md:w-1/2 md:p-8">
              <motion.div
                className="mb-3 md:mb-4 w-full text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="mb-2 flex justify-center">
                  <Image
                    src="/images/university-logo.png"
                    alt="University of Wah Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-base md:text-xl font-bold text-navy-900 dark:text-white">Student Login</h2>
                <p className="text-xs md:text-sm text-navy-600 dark:text-gray-300">Access your student account</p>
              </motion.div>

              <form ref={loginFormRef} onSubmit={handleLogin} className="w-full">
                {/* Student ID / Email Field - Exactly matching the screenshot */}
                <div className="mb-3 md:mb-4">
                  <label className="mb-1 md:mb-2 block text-xs md:text-sm lg:text-base font-medium text-navy-700 dark:text-gray-200">
                    Email
                  </label>
                  <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 md:px-3 py-1.5 md:py-2">
                    <Mail className="mr-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      className="w-full border-0 bg-transparent text-xs md:text-sm focus:outline-none dark:text-white"
                      placeholder="student@uow.edu.pk"
                    />
                  </div>
                </div>

                {/* Password Field - Exactly matching the screenshot */}
                <div className="mb-3 md:mb-4">
                  <div className="mb-1 md:mb-2 flex items-center justify-between">
                    <label className="text-xs md:text-sm lg:text-base font-medium text-navy-700 dark:text-gray-200">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 md:px-3 py-1.5 md:py-2">
                    <Lock className="mr-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      className="w-full border-0 bg-transparent text-xs md:text-sm focus:outline-none dark:text-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="ml-2 rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 md:h-4 md:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 md:h-4 md:w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me checkbox - Exactly matching the screenshot */}
                <div className="mb-4 md:mb-6 flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="h-4 w-4 md:h-5 md:w-5 rounded border-gray-300 dark:border-gray-600"
                  />
                  <Label htmlFor="remember" className="text-xs md:text-sm text-navy-700 dark:text-gray-300">
                    Remember me on this device
                  </Label>
                </div>

                <div className="mb-3 md:mb-4 w-full">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-navy-800 to-purple-800 py-1.5 md:py-2 lg:py-4 text-xs md:text-sm text-white hover:from-navy-900 hover:to-purple-900"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" />
                        SIGNING IN...
                      </>
                    ) : (
                      "SIGN IN"
                    )}
                  </Button>
                </div>
              </form>

              <div className="mb-3 md:mb-4 flex w-full items-center justify-between">
                <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
                <span className="mx-4 text-xs text-gray-500 dark:text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
              </div>

              <div className="w-full">
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 border-gold-500 py-1.5 md:py-2 lg:py-4 text-xs md:text-sm text-navy-800 dark:text-white hover:bg-gold-50 dark:hover:bg-gray-700"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleAuthLoading}
                >
                  {isGoogleAuthLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" />
                      SIGNING IN WITH GOOGLE...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5"
                      >
                        <path
                          fill="#EA4335"
                          d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                        />
                      </svg>
                      SIGN IN WITH GOOGLE
                    </>
                  )}
                </Button>
              </div>

              <p className="mt-3 md:mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                By signing in, you agree to the University of Wah's{" "}
                <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative z-10 h-screen w-full max-w-full overflow-hidden bg-white dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key="dashboard"
          >
            {/* Header */}
            <header
              className={`fixed top-0 left-0 right-0 z-30 flex h-10 md:h-12 lg:h-14 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r ${
                getThemeColor() === "purple"
                  ? "from-purple-800 to-purple-900"
                  : getThemeColor() === "green"
                    ? "from-green-800 to-green-900"
                    : "from-navy-800 to-navy-900"
              } px-2 md:px-3 shadow-md`}
            >
              <div className="flex items-center">
                <button
                  className="mr-2 rounded-full p-1 text-white hover:bg-white/10 md:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div className="flex items-center">
                  <Image
                    src="/images/university-logo.png"
                    alt="University of Wah Logo"
                    width={24}
                    height={24}
                    className="mr-1 md:mr-2 object-contain"
                  />
                  <span className="text-sm md:text-base font-bold text-white">AVICENNA</span>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                {/* Notifications */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8 relative text-white hover:bg-white/10"
                          >
                            <Bell className="h-4 w-4" />
                            {showNotificationBadge && unreadNotifications > 0 && (
                              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {unreadNotifications}
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 md:w-80 p-0" align="end">
                          <div className="flex items-center justify-between border-b p-2 md:p-3">
                            <h3 className="text-xs md:text-sm font-semibold">Notifications</h3>
                            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearNotifications}>
                              Mark all as read
                            </Button>
                          </div>
                          <div className="max-h-[250px] md:max-h-[300px] overflow-y-auto">
                            {recentNotifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`border-b p-2 md:p-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${!notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                              >
                                <div className="flex gap-2 md:gap-3">
                                  <div
                                    className={`mt-0.5 rounded-full ${
                                      notification.type === "success"
                                        ? "bg-green-100 dark:bg-green-900/50"
                                        : notification.type === "warning"
                                          ? "bg-amber-100 dark:bg-amber-900/50"
                                          : "bg-blue-100 dark:bg-blue-900/50"
                                    } p-1 md:p-2`}
                                  >
                                    {React.cloneElement(notification.icon, { className: "h-3 w-3 md:h-4 md:w-4" })}
                                  </div>
                                  <div>
                                    <p className="text-xs md:text-sm font-medium dark:text-white">
                                      {notification.title}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {notification.description}
                                    </p>
                                    <p className="mt-1 text-[10px] md:text-xs text-gray-500 dark:text-gray-500">
                                      {notification.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t p-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-full text-xs text-blue-600 dark:text-blue-400"
                            >
                              View all notifications
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Quick Stats */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 text-white hover:bg-white/10"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Quick Stats</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Chat */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 text-white hover:bg-white/10"
                        onClick={() => setActiveTab("chat")}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Chat</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-7 md:h-8 items-center gap-1 md:gap-2 text-xs md:text-sm font-medium text-white hover:bg-white/10"
                    >
                      <Avatar className="h-6 w-6 md:h-7 md:w-7">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                          {profile?.name ? profile.name.split(" ").map((n: string) => n[0]).join("") : "ST"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden text-left md:block">
                        <p className="text-xs font-medium">{profile?.name || "Student Name"}</p>
                        <p className="text-[10px] text-gray-300">{profile?.registration_no || "Reg No"}</p>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 md:w-56" align="end">
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="ghost"
                        className="justify-start text-xs md:text-sm h-8"
                        onClick={() => handleTabChange("profile")}
                      >
                        <User className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                        <span>Profile</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-xs md:text-sm h-8"
                        onClick={() => handleTabChange("settings")}
                      >
                        <Settings className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                        <span>Settings</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-xs md:text-sm h-8 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </header>

            <div className="flex h-[calc(100vh-2.5rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-3.5rem)] pt-10 md:pt-12 lg:pt-14">
              {/* Mobile sidebar backdrop */}
              {isMobile && !sidebarCollapsed && (
                <motion.div
                  className="fixed inset-0 z-20 bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={toggleSidebar}
                />
              )}

              {/* Sidebar */}
              <motion.aside
                className={`${
                  isMobile
                    ? sidebarCollapsed
                      ? "fixed -left-64 z-30"
                      : "fixed left-0 z-30 w-[70%] max-w-[250px]"
                    : sidebarCollapsed
                      ? "w-12 md:w-14"
                      : "w-40 md:w-48"
                } h-[calc(100vh-2.5rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-3.5rem)] shrink-0 border-r border-gray-200 dark:border-gray-700 ${
                  getThemeColor() === "purple"
                    ? "bg-purple-900"
                    : getThemeColor() === "green"
                      ? "bg-green-900"
                      : "bg-navy-900"
                } text-white overflow-y-auto transition-all duration-300 mobile-scrollbar`}
                initial={{ x: isMobile ? -250 : -20, opacity: 0 }}
                animate={{ x: isMobile && sidebarCollapsed ? -250 : 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {isMobile && !sidebarCollapsed && (
                  <div className="sticky top-0 z-10 flex justify-end p-1 bg-navy-900">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/10"
                      onClick={toggleSidebar}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className={`p-2 md:p-3 text-center ${sidebarCollapsed && !isMobile ? "hidden md:block" : ""}`}>
                  <div className="mb-1 md:mb-2 flex justify-center">
                    <Image
                      src="/images/university-logo.png"
                      alt="University of Wah Logo"
                      width={sidebarCollapsed && !isMobile ? 24 : 32}
                      height={sidebarCollapsed && !isMobile ? 24 : 32}
                      className="object-contain"
                    />
                  </div>
                  {(!sidebarCollapsed || isMobile) && (
                    <div className="text-xs md:text-sm font-bold text-gold-300">AVICENNA</div>
                  )}
                </div>
                {(!sidebarCollapsed || isMobile) && (
                  <div className="border-b border-navy-700 py-1 text-center text-[10px] md:text-xs text-gray-400">
                    NAVIGATION
                  </div>
                )}
                <nav className="p-1 md:p-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
                  {navigationItems.map((item: NavigationItem, index: number) => (
                    <motion.div
                      key={item.name}
                      className="mb-1 overflow-hidden rounded-md"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.path}
                              className={`flex w-full items-center rounded-md p-1.5 md:p-2 text-left text-xs md:text-sm font-medium ${
                                activeTab === item.name.toLowerCase()
                                  ? `bg-${getThemeColor()}-100 text-${getThemeColor()}-700`
                                  : "text-gray-300 hover:bg-navy-800"
                              }`}
                              onClick={() => handleTabChange(item.name.toLowerCase())}
                            >
                              <item.icon className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                              <span className={sidebarCollapsed ? "hidden" : ""}>{item.name}</span>
                            </Link>
                          </TooltipTrigger>
                          {sidebarCollapsed && !isMobile && (
                            <TooltipContent side="right">
                              <p>{item.name}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </nav>
              </motion.aside>

              {/* Main content */}
              <motion.main
                className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 p-2 md:p-3 lg:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  fontSize: isMobile ? "0.85rem" : "1rem",
                  maxWidth: "100vw",
                }}
              >
                {children}
              </motion.main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

