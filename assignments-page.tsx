"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CalendarDays,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Download,
  Eye,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  X,
  FileCheck,
  BarChart,
  Info,
  Paperclip,
  Loader2,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample assignment data
const assignments = [
  {
    id: 1,
    title: "Research Paper on Modern Computing",
    course: "Computer Science 101",
    courseCode: "CS-101",
    dueDate: "2025-06-15T23:59:59",
    status: "pending",
    description:
      "Write a 10-page research paper on a modern computing topic of your choice. Include at least 5 academic references. The paper should follow APA format and include an abstract, introduction, literature review, methodology, findings, discussion, and conclusion.",
    attachments: ["Assignment_Guidelines.pdf", "Rubric.pdf", "APA_Format_Guide.pdf"],
    submissionType: "document",
    maxScore: 100,
    weight: "20% of final grade",
    instructor: "Dr. Sarah Johnson",
    department: "Computer Science",
  },
  {
    id: 2,
    title: "Database Design Project",
    course: "Database Systems",
    courseCode: "CS-305",
    dueDate: "2025-06-10T23:59:59",
    status: "submitted",
    submittedOn: "2025-06-08T14:30:22",
    description:
      "Design and implement a relational database for a small business. Include ER diagrams, schema definitions, and sample queries. Your submission should include a complete database design document and SQL implementation scripts.",
    attachments: ["Project_Requirements.pdf", "Sample_ER_Diagram.png"],
    submissionType: "project",
    maxScore: 100,
    weight: "25% of final grade",
    feedback: "Good work on the ER diagrams. Consider normalizing your tables further.",
    instructor: "Prof. Michael Chen",
    department: "Computer Science",
  },
  {
    id: 3,
    title: "Calculus Problem Set",
    course: "Mathematics 201",
    courseCode: "MATH-201",
    dueDate: "2025-06-05T23:59:59",
    status: "graded",
    submittedOn: "2025-06-04T18:45:10",
    score: 85,
    description: "Complete problems 1-20 in Chapter 5 of the textbook. Show all work and steps for full credit.",
    attachments: ["Problem_Set.pdf", "Formula_Sheet.pdf"],
    submissionType: "document",
    maxScore: 100,
    weight: "10% of final grade",
    feedback: "Good work overall. Review the chain rule applications in problems 15-17.",
    instructor: "Dr. Emily Rodriguez",
    department: "Mathematics",
  },
  {
    id: 4,
    title: "Physics Lab Report",
    course: "Physics 102",
    courseCode: "PHYS-102",
    dueDate: "2025-06-20T23:59:59",
    status: "pending",
    description:
      "Write a comprehensive lab report on the pendulum experiment conducted in lab session 8. Include your data collection, analysis, and conclusions.",
    attachments: ["Lab_Report_Template.docx", "Data_Sheet.xlsx", "Lab_Manual_Excerpt.pdf"],
    submissionType: "report",
    maxScore: 50,
    weight: "15% of final grade",
    instructor: "Dr. Robert Lee",
    department: "Physics",
  },
  {
    id: 5,
    title: "Literature Analysis Essay",
    course: "English Literature",
    courseCode: "ENG-210",
    dueDate: "2025-06-12T23:59:59",
    status: "late",
    description:
      "Write a 5-page analysis of the themes in Shakespeare's Hamlet. Focus on character development, symbolism, and historical context.",
    attachments: ["Essay_Guidelines.pdf", "Hamlet_Critical_Analysis.pdf"],
    submissionType: "essay",
    maxScore: 100,
    weight: "20% of final grade",
    instructor: "Prof. Amanda Williams",
    department: "English",
  },
  {
    id: 6,
    title: "Marketing Strategy Presentation",
    course: "Marketing 301",
    courseCode: "MKT-301",
    dueDate: "2025-06-25T23:59:59",
    status: "pending",
    description:
      "Prepare a 10-minute presentation on a marketing strategy for a product of your choice. Include market analysis, target audience, and promotional tactics.",
    attachments: ["Presentation_Template.pptx", "Grading_Criteria.pdf"],
    submissionType: "presentation",
    maxScore: 100,
    weight: "30% of final grade",
    instructor: "Dr. James Wilson",
    department: "Business",
  },
]

// Helper function to format dates
function formatDate(dateString: string) {
  try {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date")
    }
    return date.toLocaleDateString("en-US", options)
  } catch (error) {
    return "Invalid date"
  }
}

// Helper function to calculate days remaining
function getDaysRemaining(dueDate: string) {
  try {
  const now = new Date()
  const due = new Date(dueDate)
    if (isNaN(due.getTime())) {
      throw new Error("Invalid date")
    }
  const diffTime = due.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
  } catch (error) {
    return 0
  }
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      darkBg: "dark:bg-yellow-900/30",
      darkText: "dark:text-yellow-400",
      darkBorder: "dark:border-yellow-800",
      label: "Pending"
    },
    submitted: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      darkBg: "dark:bg-blue-900/30",
      darkText: "dark:text-blue-400",
      darkBorder: "dark:border-blue-800",
      label: "Submitted"
    },
    graded: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      darkBg: "dark:bg-green-900/30",
      darkText: "dark:text-green-400",
      darkBorder: "dark:border-green-800",
      label: "Graded"
    },
    late: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      darkBg: "dark:bg-red-900/30",
      darkText: "dark:text-red-400",
      darkBorder: "dark:border-red-800",
      label: "Late"
    }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    darkBg: "dark:bg-gray-900/30",
    darkText: "dark:text-gray-400",
    darkBorder: "dark:border-gray-800",
    label: "Unknown"
  }

      return (
        <Badge
          variant="outline"
      className={`${config.bg} ${config.text} ${config.border} ${config.darkBg} ${config.darkText} ${config.darkBorder}`}
        >
      {config.label}
        </Badge>
      )
}

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [courseFilter, setCourseFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("dueDate")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [submissionNotes, setSubmissionNotes] = useState("")

  const assignmentsContainerRef = useRef<HTMLDivElement>(null)

  // Get unique courses for filter
  const courses = [...new Set(assignments.map((a) => a.course))]

  // Filter assignments based on search term, active tab, and course filter
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.courseCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCourse = courseFilter === "all" || assignment.course === courseFilter

    if (activeTab === "all") return matchesSearch && matchesCourse
    if (activeTab === "pending") return matchesSearch && matchesCourse && assignment.status === "pending"
    if (activeTab === "submitted") return matchesSearch && matchesCourse && assignment.status === "submitted"
    if (activeTab === "graded") return matchesSearch && matchesCourse && assignment.status === "graded"
    if (activeTab === "late") return matchesSearch && matchesCourse && assignment.status === "late"

    return matchesSearch && matchesCourse
  })

  // Sort assignments
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortOrder === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    } else if (sortOrder === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortOrder === "course") {
      return a.course.localeCompare(b.course)
    }
    return 0
  })

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files
      if (!files) return

      const maxFileSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

      Array.from(files).forEach(file => {
        if (file.size > maxFileSize) {
          throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`)
        }
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`File ${file.name} is not a supported type. Please upload PDF or Word documents.`)
        }
        // Add file to state
        setUploadedFiles(prev => [...prev, file])
      })
    } catch (error) {
      // Handle error (you might want to show a toast notification here)
      console.error('File upload error:', error)
    }
  }

  // Remove uploaded file
  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName))
  }

  // Handle assignment submission
  const handleSubmitAssignment = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitDialogOpen(false)
      setSelectedAssignment(null)
      setUploadedFiles([])
      setSubmissionNotes("")
      setShowSuccessMessage(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }, 1500)
  }

  // Scroll to top when filters change
  useEffect(() => {
    if (assignmentsContainerRef.current) {
      assignmentsContainerRef.current.scrollTop = 0
    }
  }, [activeTab, searchTerm, courseFilter, sortOrder])

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-navy-50 dark:bg-navy-900 p-2 rounded-full">
            <BookOpen className="h-6 w-6 text-navy-600 dark:text-navy-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">Manage and submit your course assignments</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-0 md:ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCourseFilter("all")}>All Courses</DropdownMenuItem>
              {courses.map((course) => (
                <DropdownMenuItem key={course} onClick={() => setCourseFilter(course)}>
                  {course}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-0 md:ml-2 mt-2 md:mt-0">
                <BarChart className="h-4 w-4 mr-1" />
                <span>Sort: {sortOrder === "dueDate" ? "Due Date" : sortOrder === "title" ? "Title" : "Course"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOrder("dueDate")}>Due Date</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("title")}>Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("course")}>Course</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <motion.div
        className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Assignment Analytics</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-800 p-3 mr-3">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Assignments</div>
                <div className="text-xl font-bold">{assignments.length}</div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-green-100 dark:bg-green-800 p-3 mr-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                <div className="text-xl font-bold">
                  {assignments.filter((a) => a.status === "graded" || a.status === "submitted").length}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-yellow-100 dark:bg-yellow-800 p-3 mr-3">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
                <div className="text-xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-red-100 dark:bg-red-800 p-3 mr-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Late/Overdue</div>
                <div className="text-xl font-bold">{assignments.filter((a) => a.status === "late").length}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Assignment Completion Progress</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(assignments.filter((a) => a.status === "graded" || a.status === "submitted").length / assignments.length) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0%</span>
              <span>
                {Math.round(
                  (assignments.filter((a) => a.status === "graded" || a.status === "submitted").length /
                    assignments.length) *
                    100,
                )}
                % Complete
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-muted/50 p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="submitted"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            Submitted
          </TabsTrigger>
          <TabsTrigger
            value="graded"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            Graded
          </TabsTrigger>
          <TabsTrigger
            value="late"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            Late
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4" ref={assignmentsContainerRef}>
          {courseFilter !== "all" && (
            <div className="flex items-center justify-between bg-navy-50/50 dark:bg-navy-900/50 p-3 rounded-lg mb-4">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-navy-600 dark:text-navy-300" />
                <span className="font-medium">Filtered by: {courseFilter}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setCourseFilter("all")}>
                <X className="h-4 w-4 mr-1" />
                Clear Filter
              </Button>
            </div>
          )}

          {sortedAssignments.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No assignments found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm ? "Try adjusting your search terms" : "You don't have any assignments in this category"}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {sortedAssignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-navy-100 dark:border-navy-800 group-hover:border-navy-300 dark:group-hover:border-navy-700 relative">
                      {assignment.status === "pending" && getDaysRemaining(assignment.dueDate) <= 2 && (
                        <motion.div
                          className="absolute top-2 right-2 z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            Due Soon
                          </Badge>
                        </motion.div>
                      )}

                      <CardHeader className="pb-2 relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                              {assignment.title}
                            </CardTitle>
                            <CardDescription className="flex items-center">
                              <span>{assignment.course}</span>
                              <span className="mx-1">•</span>
                              <span className="text-xs font-mono">{assignment.courseCode}</span>
                            </CardDescription>
                          </div>
                          <StatusBadge status={assignment.status} />
                        </div>

                        {assignment.status === "graded" && (
                          <motion.div
                            className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-green-500/10 z-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </CardHeader>

                      <CardContent className="pb-2 relative z-10">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <CalendarDays className="mr-1 h-4 w-4" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                        </div>

                        {assignment.status === "pending" && (
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>
                                {getDaysRemaining(assignment.dueDate) > 0
                                  ? `${getDaysRemaining(assignment.dueDate)} days remaining`
                                  : "Due today"}
                              </span>
                            </div>
                            {getDaysRemaining(assignment.dueDate) <= 2 && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        )}

                        {assignment.status === "graded" && assignment.score !== undefined && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Score</span>
                              <span className="text-sm font-medium">{assignment.score}/{assignment.maxScore}</span>
                            </div>
                            <Progress
                              value={(assignment.score / assignment.maxScore) * 100}
                              className="h-2"
                            />
                          </div>
                        )}

                        <p className="text-sm line-clamp-2 mt-2">{assignment.description}</p>

                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <FileText className="mr-1 h-3 w-3" />
                          <span>{assignment.submissionType}</span>
                          <span className="mx-1">•</span>
                          <span>{assignment.weight}</span>
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-between pt-2 relative z-10">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAssignment(assignment)}
                          className="group/btn border-navy-200 hover:border-navy-400 hover:bg-navy-50 dark:hover:bg-navy-900 transition-all duration-300"
                        >
                          <Eye className="mr-1 h-4 w-4 text-navy-600" />
                          Details
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>

                        {assignment.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedAssignment(assignment)
                              setIsSubmitDialogOpen(true)
                            }}
                            className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            <Upload className="mr-1 h-4 w-4" />
                            Submit
                          </Button>
                        )}

                        {assignment.status === "submitted" && (
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled
                            className="bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-200"
                          >
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                            Submitted
                          </Button>
                        )}

                        {assignment.status === "graded" && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-navy-100 text-navy-800 hover:bg-navy-200 dark:bg-navy-800 dark:text-navy-200 transition-all duration-300"
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Feedback
                          </Button>
                        )}

                        {assignment.status === "late" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="transition-all duration-300 hover:bg-red-700"
                          >
                            <AlertCircle className="mr-1 h-4 w-4" />
                            Submit Late
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Assignment Details Dialog */}
      {selectedAssignment && (
        <Dialog
          open={!!selectedAssignment && !isSubmitDialogOpen}
          onOpenChange={(open) => !open && setSelectedAssignment(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="bg-navy-100 dark:bg-navy-800 p-2 rounded-full">
                  <FileCheck className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                </div>
                <div>
                  <DialogTitle>{selectedAssignment.title}</DialogTitle>
                  <DialogDescription>
                    {selectedAssignment.course} ({selectedAssignment.courseCode})
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Due: {formatDate(selectedAssignment.dueDate)}</span>
                </div>
                <StatusBadge status={selectedAssignment.status} />
              </div>

              <div className="flex flex-wrap gap-y-2 gap-x-4">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Type: {selectedAssignment.submissionType}</span>
                </div>

                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Weight: {selectedAssignment.weight}</span>
                </div>

                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Instructor: {selectedAssignment.instructor}</span>
                </div>
              </div>

              <div className="mt-2">
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <div className="text-sm bg-muted p-3 rounded-md">{selectedAssignment.description}</div>
              </div>

              {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {selectedAssignment.attachments.map((attachment: string, index: number) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between bg-muted p-2 rounded-md group hover:bg-muted/80"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{attachment}</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="opacity-70 group-hover:opacity-100">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download attachment</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAssignment.status === "submitted" && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-2">Submission Details</h4>
                  <div className="text-sm bg-muted p-3 rounded-md">
                    <p>Submitted on: {formatDate(selectedAssignment.submittedOn)}</p>
                    {selectedAssignment.feedback && (
                      <div className="mt-2">
                        <p className="font-medium">Feedback:</p>
                        <p>{selectedAssignment.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedAssignment.status === "graded" && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-2">Grade Details</h4>
                  <div className="text-sm bg-muted p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">
                        Score: {selectedAssignment.score}/{selectedAssignment.maxScore}
                      </span>
                      <span className="font-medium">
                        {Math.round((selectedAssignment.score / selectedAssignment.maxScore) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(selectedAssignment.score / selectedAssignment.maxScore) * 100}
                      className="h-2 mb-3"
                    />

                    {selectedAssignment.feedback && (
                      <div className="mt-2">
                        <p className="font-medium">Feedback:</p>
                        <p>{selectedAssignment.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              {selectedAssignment.status === "pending" && (
                <Button
                  onClick={() => {
                    setIsSubmitDialogOpen(true)
                  }}
                  className="bg-navy-600 hover:bg-navy-700 text-white"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Assignment
                </Button>
              )}

              {selectedAssignment.status === "submitted" && (
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Submission
                </Button>
              )}

              {selectedAssignment.status === "graded" && (
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Feedback
                </Button>
              )}

              {selectedAssignment.status === "late" && (
                <Button variant="destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Submit Late Assignment
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Submit Assignment Dialog */}
      {selectedAssignment && (
        <Dialog
          open={isSubmitDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsSubmitDialogOpen(false)
              // Don't clear selectedAssignment here to allow going back to details
            }
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-navy-600 to-navy-800 p-2 rounded-full">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <DialogTitle>Submit Assignment</DialogTitle>
                  <DialogDescription>
                    {selectedAssignment.title} - {selectedAssignment.course}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Due: {formatDate(selectedAssignment.dueDate)}</span>

                  {getDaysRemaining(selectedAssignment.dueDate) <= 2 &&
                    getDaysRemaining(selectedAssignment.dueDate) > 0 && (
                      <Badge
                        variant="outline"
                        className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                      >
                        Due soon
                      </Badge>
                    )}

                  {getDaysRemaining(selectedAssignment.dueDate) <= 0 && (
                    <Badge variant="destructive" className="ml-2">
                      Due today
                    </Badge>
                  )}
                </div>

                <div className="text-sm flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Weight: {selectedAssignment.weight}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="submission-text" className="text-sm font-medium">
                  Submission Notes (Optional)
                </label>
                <Textarea
                  id="submission-text"
                  placeholder="Add any notes for your instructor..."
                  className="min-h-[100px] border-navy-200 focus:border-navy-400 focus:ring-navy-400 transition-all duration-300"
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Files</label>
                <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Upload className="h-8 w-8 mx-auto text-navy-600 dark:text-navy-400" />
                    <p className="mt-2 text-sm font-medium">Drag and drop your files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: PDF, DOCX, PPTX, ZIP (Max size: 50MB)
                    </p>
                    <div className="relative mt-4">
                      <input type="file" id="file-upload" className="hidden" multiple onChange={handleFileUpload} />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>
                  </motion.div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selected Files</label>
                  <div className="border rounded-md divide-y">
                    <AnimatePresence>
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={file.name}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between p-2"
                        >
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 mr-2 text-navy-600" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.name)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors duration-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              <div className="bg-navy-50/50 dark:bg-navy-900/50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-navy-600 dark:text-navy-300" />
                  <h4 className="text-sm font-medium">Submission Requirements</h4>
                </div>
                <ScrollArea className="h-24">
                  <div className="text-sm space-y-2">
                    <p>• Submit your assignment as a single PDF or DOCX file.</p>
                    <p>• Include your name and student ID in the header of each page.</p>
                    <p>• Follow the formatting guidelines provided in the assignment description.</p>
                    <p>• Ensure all references are properly cited using APA format.</p>
                    <p>• Late submissions may be subject to penalties as per course policy.</p>
                  </div>
                </ScrollArea>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSubmitDialogOpen(false)}
                className="border-navy-200 hover:border-navy-400 hover:bg-navy-50 dark:hover:bg-navy-900 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={handleSubmitAssignment}
                disabled={isSubmitting || uploadedFiles.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Assignment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 shadow-lg flex items-center gap-2 z-50 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium">Assignment Submitted!</p>
              <p className="text-sm">Your assignment has been successfully submitted.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
