"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookMarked,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  UserCheck,
  Bell,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "./app/UserContext"

export default function AttendanceTab() {
  const [selectedMonth, setSelectedMonth] = useState<string>("march")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedClass, setExpandedClass] = useState<number | null>(null)
  const { toast } = useToast()
  const { email } = useUser()
  const [attendance, setAttendance] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) return
    setLoading(true)
    fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Attendance API response:', data);
        if (data.success) setAttendance(data.attendance)
        else toast({ title: "Error", description: data.message, variant: "error" })
      })
      .catch(() => toast({ title: "Error", description: "Failed to fetch attendance", variant: "error" }))
      .finally(() => setLoading(false))
  }, [email])

  const summary = attendance[0] || {};

  const uniqueCourses = [...new Set(attendance.map((item) => item.code))]

  if (loading) return <div>Loading attendance...</div>
  if (!email) return <div>Please log in to view attendance.</div>

  return (
    <div key="attendance-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <BookMarked className="mr-2 h-6 w-6 text-navy-800 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Attendance Record</h1>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          <span>YOU ARE HERE: </span>
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            Home
          </a>
          <span> / </span>
          <span className="text-gray-700 dark:text-gray-300">Attendance</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white dark:border-gray-700">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <BookMarked className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Attendance Dashboard</h2>
            </div>
            <p className="mb-4 text-white/80">
              Track your class attendance, view attendance statistics, and monitor your attendance requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Academic Year 2024-2025</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Current Semester: Fall 2024</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Minimum Required: 75%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-100">Overall Attendance</p>
                          <p className="text-2xl font-bold text-white">{summary.overall_percentage ?? '-'}%</p>
                        </div>
                        <div className="rounded-full bg-white/20 p-3 text-white">
                          <Calendar className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Progress value={summary.overall_percentage ?? 0} className="mt-2 h-2" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        You're maintaining good attendance across all courses.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-100">Classes Attended</p>
                          <p className="text-2xl font-bold text-white">{summary.classes_attended ?? '-'} / {summary.total_classes ?? '-'}</p>
                        </div>
                        <div className="rounded-full bg-white/20 p-3 text-white">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Present Count</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{summary.classes_attended ?? '-'} Classes</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last attended: {summary.last_attended_date ?? '-'}</div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-red-100">Classes Missed</p>
                          <p className="text-2xl font-bold text-white">{summary.classes_missed ?? '-'} / {summary.total_classes ?? '-'}</p>
                        </div>
                        <div className="rounded-full bg-white/20 p-3 text-white">
                          <AlertTriangle className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Absence Count</span>
                        <span className="font-medium text-red-600 dark:text-red-400">{summary.classes_missed ?? '-'} Classes</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Remaining allowed absences: {summary.remaining_allowed_absences ?? '-'}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>Your attendance patterns over the semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Monthly Attendance</h3>
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">January</span>
                            <span className="text-xs font-medium">{summary.january_percentage ?? '-'}%</span>
                          </div>
                          <Progress value={summary.january_percentage ?? 0} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">February</span>
                            <span className="text-xs font-medium">{summary.february_percentage ?? '-'}%</span>
                          </div>
                          <Progress value={summary.february_percentage ?? 0} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">March</span>
                            <span className="text-xs font-medium">{summary.march_percentage ?? '-'}%</span>
                          </div>
                          <Progress value={summary.march_percentage ?? 0} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Day of Week Analysis</h3>
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Monday</span>
                            <span className="text-xs font-medium">{summary.monday_percentage ?? '-'}%</span>
                          </div>
                          <Progress value={summary.monday_percentage ?? 0} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Wednesday</span>
                            <span className="text-xs font-medium">{summary.wednesday_percentage ?? '-'}%</span>
                          </div>
                          <Progress value={summary.wednesday_percentage ?? 0} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Friday</span>
                            <span className="text-xs font-medium">{summary.friday_percentage ?? '-'}%</span>
                          </div>
                          <Progress value={summary.friday_percentage ?? 0} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Upcoming Classes</h3>
                      <CalendarDays className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                        <div>
                          <p className="font-medium">CS-331: Computer Networks</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">April 4, 2025 • 10:00 AM</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Tomorrow
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                        <div>
                          <p className="font-medium">AI-356: Natural Language Processing</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">April 5, 2025 • 1:00 PM</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          2 Days
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                        <div>
                          <p className="font-medium">AI-325: Intelligent Web Design</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">April 6, 2025 • 9:00 AM</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          3 Days
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/30">
            <div className="flex items-start">
              <AlertTriangle className="mr-3 mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">Attendance Policy</h4>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Students must maintain at least 75% attendance in all courses to be eligible for final examinations.
                  If your attendance falls below 75%, please contact your faculty advisor immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

