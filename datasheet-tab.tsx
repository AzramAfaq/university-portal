"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  FileSpreadsheet,
  Download,
  Printer,
  Book,
  Clock,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Award,
  GraduationCap,
  FileText,
  ArrowUpRight,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "./app/UserContext"

export default function DatasheetTab() {
  const [selectedSemester, setSelectedSemester] = useState<string>("current")
  const [expandedSection, setExpandedSection] = useState<string | null>("academic")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const { email } = useUser()
  const [profile, setProfile] = useState<any>(null)
  const [academic, setAcademic] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) return
    setLoading(true)
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile(data.student)
          setAcademic(data.academic)
        }
      })
      .finally(() => setLoading(false))
  }, [email])

  const courseHistory = [
    { semester: "Fall 2022", code: "CS-101", title: "Introduction to Programming", creditHours: "3+1", grade: "A" },
    { semester: "Fall 2022", code: "AI-101", title: "Fundamentals of AI", creditHours: "3+0", grade: "A-" },
    { semester: "Spring 2023", code: "CS-102", title: "Data Structures", creditHours: "3+1", grade: "A-" },
    { semester: "Spring 2023", code: "AI-102", title: "AI Algorithms", creditHours: "3+0", grade: "A" },
    { semester: "Fall 2023", code: "CS-201", title: "Database Systems", creditHours: "3+1", grade: "B+" },
    { semester: "Fall 2023", code: "AI-201", title: "Machine Learning Fundamentals", creditHours: "3+1", grade: "A" },
    { semester: "Spring 2024", code: "CS-301", title: "Software Engineering", creditHours: "3+0", grade: "A-" },
    { semester: "Spring 2024", code: "AI-301", title: "Deep Learning", creditHours: "3+1", grade: "B+" },
    { semester: "Fall 2024", code: "CS-324", title: "Operating System", creditHours: "3+1", grade: "A-" },
    {
      semester: "Fall 2024",
      code: "AI-354",
      title: "Knowledge Representation and Reasoning",
      creditHours: "3+0",
      grade: "A",
    },
    { semester: "Fall 2024", code: "MGT-121", title: "Principles of Marketing", creditHours: "3+0", grade: "B" },
    { semester: "Fall 2024", code: "AI-353", title: "Machine Learning", creditHours: "2+1", grade: "B+" },
    { semester: "Fall 2024", code: "ISL-101", title: "Islamic Studies", creditHours: "2+0", grade: "B-" },
  ]

  const filteredCourses = courseHistory.filter((course) => {
    if (
      searchQuery &&
      !(
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false
    return true
  })

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const handleDownload = () => {
    toast({
      title: "Datasheet Downloaded",
      description: "Your datasheet has been downloaded successfully.",
      variant: "success",
    })
  }

  const handlePrint = () => {
    toast({
      title: "Printing Datasheet",
      description: "Your datasheet is being sent to the printer.",
      variant: "info",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A secure link to your datasheet has been generated and copied to clipboard.",
      variant: "success",
    })
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A+":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "A-":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "B+":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "B":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "B-":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "C+":
      case "C":
      case "C-":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "D+":
      case "D":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "F":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  if (loading) return <div>Loading data sheet...</div>
  if (!profile) return <div>Please log in to view your data sheet.</div>

  return (
    <div key="datasheet-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <FileSpreadsheet className="mr-2 h-6 w-6 text-navy-800 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Data Sheet</h1>
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
          <span className="text-gray-700 dark:text-gray-300">Data Sheet</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white dark:border-gray-700">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Academic Data Sheet</h2>
            </div>
            <p className="mb-4 text-white/80">
              Comprehensive record of your academic information, achievements, and progress throughout your degree
              program.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span>BS Artificial Intelligence</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Batch 2022-2026</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Award className="h-4 w-4" />
                <span>CGPA: 3.67</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">Student Data Sheet</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comprehensive record of your academic information
              </p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="fall2024">Fall 2024</SelectItem>
                  <SelectItem value="spring2024">Spring 2024</SelectItem>
                  <SelectItem value="fall2023">Fall 2023</SelectItem>
                  <SelectItem value="all">All Semesters</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Course History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="mb-6 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                <div className="mb-6 flex items-center">
                  <div className="mr-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    <span className="text-4xl font-bold">AK</span>
                  </div>
                  <div>
                    <motion.h3
                      className="text-xl font-bold text-navy-900 dark:text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {profile.name}
                    </motion.h3>
                    <motion.div
                      className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Registration No:</p>
                        <p className="font-medium">{profile.registration_no}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Department:</p>
                        <p className="font-medium">{profile.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Program:</p>
                        <p className="font-medium">{profile.program}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Admission Date:</p>
                        <p className="font-medium">{profile.admission_date ? new Date(profile.admission_date).toLocaleDateString() : "-"}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-100">Current Semester</p>
                            <p className="text-2xl font-bold text-white">{academic?.semester ? `${academic.semester}th Semester` : "-"}</p>
                          </div>
                          <div className="rounded-full bg-white/20 p-3 text-white">
                            <Calendar className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fall 2024</div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-100">Total Credit Hours</p>
                            <p className="text-2xl font-bold text-white">{academic?.credit_hours ? `${academic.credit_hours} / 148` : "-"}</p>
                          </div>
                          <div className="rounded-full bg-white/20 p-3 text-white">
                            <Book className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">63% Completed</div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-purple-100">Expected Graduation</p>
                            <p className="text-2xl font-bold text-white">{academic?.expected_graduation || "-"}</p>
                          </div>
                          <div className="rounded-full bg-white/20 p-3 text-white">
                            <Clock className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">3 Semesters Remaining</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 dark:border-gray-700"
                    onClick={() => toggleSection("academic")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Academic Information</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Degree progress and academic standing
                        </p>
                      </div>
                    </div>
                    <div>
                      {expandedSection === "academic" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSection === "academic" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-lg border p-4 dark:border-gray-700">
                          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <h5 className="mb-2 font-medium">Degree Progress</h5>
                              <div className="space-y-2">
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Overall Completion</span>
                                    <span className="text-sm font-medium">{academic?.overall_completion ? `${academic.overall_completion}%` : "-"}</span>
                                  </div>
                                  <Progress value={academic?.overall_completion || 0} className="h-2" />
                                </div>
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Core Courses</span>
                                    <span className="text-sm font-medium">{academic?.core_courses_completion ? `${academic.core_courses_completion}%` : "-"}</span>
                                  </div>
                                  <Progress value={academic?.core_courses_completion || 0} className="h-2" />
                                </div>
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Electives</span>
                                    <span className="text-sm font-medium">{academic?.electives_completion ? `${academic.electives_completion}%` : "-"}</span>
                                  </div>
                                  <Progress value={academic?.electives_completion || 0} className="h-2" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="mb-2 font-medium">Academic Standing</h5>
                              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                                <div className="flex items-center">
                                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                                  <div>
                                    <p className="font-medium text-green-800 dark:text-green-300">{academic?.standing || "-"}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400">{academic?.standing_note || "-"}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 space-y-1 text-sm">
                                <p><span className="text-gray-500 dark:text-gray-400">Current CGPA:</span> {academic?.cgpa || "-"}</p>
                                <p><span className="text-gray-500 dark:text-gray-400">Last Semester GPA:</span> {academic?.last_gpa || "-"}</p>
                                <p><span className="text-gray-500 dark:text-gray-400">Highest GPA:</span> {academic?.highest_gpa || "-"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 dark:border-gray-700"
                    onClick={() => toggleSection("achievements")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900 dark:text-amber-400">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Achievements & Honors</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Academic awards and recognitions</p>
                      </div>
                    </div>
                    <div>
                      {expandedSection === "achievements" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSection === "achievements" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-lg border p-4 dark:border-gray-700">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                              <Award className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <p className="font-medium text-navy-900 dark:text-white">Dean's List</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Fall 2023, Spring 2024</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                              <Award className="mt-0.5 h-5 w-5 text-purple-600 dark:text-purple-400" />
                              <div>
                                <p className="font-medium text-navy-900 dark:text-white">Merit Scholarship</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Awarded for Fall 2023</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                              <Award className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
                              <div>
                                <p className="font-medium text-navy-900 dark:text-white">
                                  Computing Society Excellence Award
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  For outstanding contribution to AI research
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg border p-4 dark:border-gray-700"
                    onClick={() => toggleSection("requirements")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Degree Requirements</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Graduation requirements and progress</p>
                      </div>
                    </div>
                    <div>
                      {expandedSection === "requirements" ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSection === "requirements" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-lg border p-4 dark:border-gray-700">
                          <div className="space-y-4">
                            <div>
                              <h5 className="mb-2 font-medium">Credit Requirements</h5>
                              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                  <p className="text-sm font-medium">Core Courses</p>
                                  <p className="text-lg font-bold">
                                    72 <span className="text-sm text-gray-500 dark:text-gray-400">/ 96 credits</span>
                                  </p>
                                  <Progress value={75} className="mt-1 h-2" />
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                  <p className="text-sm font-medium">Electives</p>
                                  <p className="text-lg font-bold">
                                    12 <span className="text-sm text-gray-500 dark:text-gray-400">/ 24 credits</span>
                                  </p>
                                  <Progress value={50} className="mt-1 h-2" />
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                  <p className="text-sm font-medium">General Education</p>
                                  <p className="text-lg font-bold">
                                    10 <span className="text-sm text-gray-500 dark:text-gray-400">/ 16 credits</span>
                                  </p>
                                  <Progress value={62.5} className="mt-1 h-2" />
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                  <p className="text-sm font-medium">Labs & Projects</p>
                                  <p className="text-lg font-bold">
                                    0 <span className="text-sm text-gray-500 dark:text-gray-400">/ 12 credits</span>
                                  </p>
                                  <Progress value={0} className="mt-1 h-2" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="mb-2 font-medium">Additional Requirements</h5>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  <span className="text-sm">Minimum CGPA of 2.0</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                                  <span className="text-sm">Final Year Project</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                                  <span className="text-sm">Internship (6 weeks minimum)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="fall2024">Fall 2024</SelectItem>
                      <SelectItem value="spring2024">Spring 2024</SelectItem>
                      <SelectItem value="fall2023">Fall 2023</SelectItem>
                      <SelectItem value="spring2023">Spring 2023</SelectItem>
                      <SelectItem value="fall2022">Fall 2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      className="pl-9 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Course History</CardTitle>
                  <CardDescription>Complete record of all courses taken</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border dark:border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Semester
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Course Code
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Course Title
                            </th>
                            <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Credit Hours
                            </th>
                            <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCourses.map((course, index) => (
                            <motion.tr
                              key={index}
                              className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <td className="p-3">{course.semester}</td>
                              <td className="p-3 font-medium">{course.code}</td>
                              <td className="p-3">{course.title}</td>
                              <td className="p-3 text-center">{course.creditHours}</td>
                              <td className="p-3 text-center">
                                <Badge className={getGradeColor(course.grade)}>{course.grade}</Badge>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Semester-wise Performance</CardTitle>
                  <CardDescription>GPA trend across semesters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-medium">GPA Trend</h3>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          CGPA: 3.67
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Fall 2022</span>
                            <span className="text-sm font-medium">3.82</span>
                          </div>
                          <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white"
                              style={{ width: "95.5%" }}
                            >
                              <div className="flex h-full items-center justify-center">3.82</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Spring 2023</span>
                            <span className="text-sm font-medium">3.78</span>
                          </div>
                          <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white"
                              style={{ width: "94.5%" }}
                            >
                              <div className="flex h-full items-center justify-center">3.78</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Fall 2023</span>
                            <span className="text-sm font-medium">3.65</span>
                          </div>
                          <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white"
                              style={{ width: "91.25%" }}
                            >
                              <div className="flex h-full items-center justify-center">3.65</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Spring 2024</span>
                            <span className="text-sm font-medium">3.70</span>
                          </div>
                          <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white"
                              style={{ width: "92.5%" }}
                            >
                              <div className="flex h-full items-center justify-center">3.70</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Fall 2024</span>
                            <span className="text-sm font-medium">3.67</span>
                          </div>
                          <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white"
                              style={{ width: "91.75%" }}
                            >
                              <div className="flex h-full items-center justify-center">3.67</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Official Documents</CardTitle>
                  <CardDescription>Access and download your official academic documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Official Transcript</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Complete academic record</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Enrollment Certificate</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Proof of current enrollment</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Character Certificate</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Student conduct and character</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900 dark:text-amber-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Fee Structure</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Detailed fee breakdown</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Request History</CardTitle>
                  <CardDescription>Track your document requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border dark:border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Request Date
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Document Type
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Purpose
                            </th>
                            <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                            <td className="p-3">March 15, 2025</td>
                            <td className="p-3">Official Transcript</td>
                            <td className="p-3">Scholarship Application</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Completed
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                            <td className="p-3">February 10, 2025</td>
                            <td className="p-3">Enrollment Certificate</td>
                            <td className="p-3">Internship</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Completed
                              </Badge>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="p-3">January 5, 2025</td>
                            <td className="p-3">Character Certificate</td>
                            <td className="p-3">Job Application</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Completed
                              </Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="flex items-center gap-1" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Request Official Copy
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

