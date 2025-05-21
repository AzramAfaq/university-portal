"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookText,
  AlertTriangle,
  Download,
  Award,
  Calendar,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Eye,
  Printer,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { useUser } from "./app/UserContext"

export default function GradeBookTab() {
  const [selectedSemester, setSelectedSemester] = useState<string>("fall2024")
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const { theme } = useTheme()
  const { email } = useUser()
  const [grades, setGrades] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [academic, setAcademic] = useState<any>(null)

  const gradeBookData = [
    {
      id: 1,
      code: "CS-331",
      title: "Computer Networks",
      faculty: "Sadia Waheed",
      creditHours: "3+1",
      assignment: "A",
      quiz: "Q",
      midTerm: "M",
      sessional: "S",
    },
    {
      id: 2,
      code: "CS-347",
      title: "Introduction to Information Security",
      faculty: "Isra",
      creditHours: "3+0",
      assignment: "--",
      quiz: "--",
      midTerm: "--",
      sessional: "--",
    },
    {
      id: 3,
      code: "AI-365",
      title: "Computer Vision",
      faculty: "Rizwan Taj",
      creditHours: "2+1",
      assignment: "--",
      quiz: "--",
      midTerm: "--",
      sessional: "--",
    },
    {
      id: 4,
      code: "AI-356",
      title: "Natural Language Processing",
      faculty: "Rizwan Taj",
      creditHours: "3+0",
      assignment: "--",
      quiz: "--",
      midTerm: "--",
      sessional: "--",
    },
    {
      id: 5,
      code: "AI-325",
      title: "Intelligent web design and development",
      faculty: "Afrasiab",
      creditHours: "2+1",
      assignment: "--",
      quiz: "--",
      midTerm: "--",
      sessional: "--",
    },
    {
      id: 6,
      code: "AI-325",
      title: "Intelligent web design and development",
      faculty: "Aqsa",
      creditHours: "2+1",
      assignment: "--",
      quiz: "--",
      midTerm: "--",
      sessional: "--",
    },
  ]

  const previousSemesterData = {
    fall2024: {
      gpa: "3.67",
      courses: [
        {
          id: 1,
          code: "CS-324",
          title: "Operating System",
          faculty: "Dr. Ali Ahmed",
          creditHours: "3+1",
          grade: "A-",
          gradePoints: 3.7,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "18/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "17/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "19/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "9/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "8/10", weightage: "5%" },
          ],
          midterm: { marks: "27/30", weightage: "30%" },
          sessional: { marks: "42/50", weightage: "45%" },
        },
        {
          id: 2,
          code: "AI-354",
          title: "Knowledge Representation and Reasoning",
          faculty: "Ms. Farah Khan",
          creditHours: "3+0",
          grade: "A",
          gradePoints: 4.0,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "19/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "20/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "18/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "10/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "9/10", weightage: "5%" },
          ],
          midterm: { marks: "28/30", weightage: "30%" },
          sessional: { marks: "45/50", weightage: "45%" },
        },
        {
          id: 3,
          code: "MGT-121",
          title: "Principles of Marketing",
          faculty: "Dr. Nazia Khalid",
          creditHours: "3+0",
          grade: "B",
          gradePoints: 3.0,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "16/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "15/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "17/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "7/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "8/10", weightage: "5%" },
          ],
          midterm: { marks: "22/30", weightage: "30%" },
          sessional: { marks: "38/50", weightage: "45%" },
        },
        {
          id: 4,
          code: "AI-353",
          title: "Machine Learning",
          faculty: "Dr. Usman Ali",
          creditHours: "2+1",
          grade: "B+",
          gradePoints: 3.3,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "17/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "18/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "16/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "8/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "9/10", weightage: "5%" },
          ],
          midterm: { marks: "25/30", weightage: "30%" },
          sessional: { marks: "40/50", weightage: "45%" },
        },
        {
          id: 5,
          code: "ISL-101",
          title: "Islamic Studies",
          faculty: "Dr. Asif Malik",
          creditHours: "2+0",
          grade: "B-",
          gradePoints: 2.7,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "15/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "16/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "7/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "8/10", weightage: "5%" },
          ],
          midterm: { marks: "21/30", weightage: "30%" },
          sessional: { marks: "36/50", weightage: "50%" },
        },
      ],
    },
    spring2024: {
      gpa: "3.70",
      courses: [
        {
          id: 1,
          code: "CS-301",
          title: "Database Systems",
          faculty: "Dr. Amir Khan",
          creditHours: "3+1",
          grade: "A",
          gradePoints: 4.0,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "19/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "18/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "20/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "9/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "10/10", weightage: "5%" },
          ],
          midterm: { marks: "28/30", weightage: "30%" },
          sessional: { marks: "46/50", weightage: "45%" },
        },
        {
          id: 2,
          code: "AI-302",
          title: "Deep Learning",
          faculty: "Dr. Saima Jabeen",
          creditHours: "3+1",
          grade: "A-",
          gradePoints: 3.7,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "18/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "17/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "19/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "8/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "9/10", weightage: "5%" },
          ],
          midterm: { marks: "26/30", weightage: "30%" },
          sessional: { marks: "43/50", weightage: "45%" },
        },
      ],
    },
    fall2023: {
      gpa: "3.65",
      courses: [
        {
          id: 1,
          code: "CS-201",
          title: "Data Structures",
          faculty: "Dr. Tariq Mahmood",
          creditHours: "3+1",
          grade: "A",
          gradePoints: 4.0,
          assignments: [
            { id: 1, title: "Assignment 1", marks: "19/20", weightage: "5%" },
            { id: 2, title: "Assignment 2", marks: "18/20", weightage: "5%" },
            { id: 3, title: "Assignment 3", marks: "20/20", weightage: "5%" },
          ],
          quizzes: [
            { id: 1, title: "Quiz 1", marks: "9/10", weightage: "5%" },
            { id: 2, title: "Quiz 2", marks: "10/10", weightage: "5%" },
          ],
          midterm: { marks: "28/30", weightage: "30%" },
          sessional: { marks: "46/50", weightage: "45%" },
        },
      ],
    },
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

  const toggleCourseDetails = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null)
    } else {
      setExpandedCourse(courseId)
    }
  }

  const handleDownloadGradeReport = () => {
    toast({
      title: "Grade Report Downloaded",
      description: "Your grade report has been downloaded successfully.",
      variant: "success",
    })
  }

  const handlePrintGradeReport = () => {
    toast({
      title: "Printing Grade Report",
      description: "Your grade report is being sent to the printer.",
      variant: "info",
    })
  }

  const filteredCourses =
    previousSemesterData[selectedSemester as keyof typeof previousSemesterData]?.courses.filter(
      (course) =>
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    fetch("/api/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGrades(data.grades);
      })
      .finally(() => setLoading(false));
    // Fetch CGPA from profile API
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile(data.student);
          setAcademic(data.academic);
        }
      });
  }, [email]);

  if (loading) return <div>Loading grades...</div>;
  if (!grades.length) return <div>No grades found for this student.</div>;

  return (
    <div key="gradebook-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <BookText className="mr-2 h-6 w-6 text-navy-800 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Grade Book</h1>
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
          <span className="text-gray-700 dark:text-gray-300">Grade Book</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-navy-900 dark:text-white">Academic Grade Records</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">View your grades and academic progress</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrintGradeReport}>
              <Printer className="h-4 w-4" />
              Print Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleDownloadGradeReport}>
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current CGPA</p>
                  <p className="text-2xl font-bold text-navy-900 dark:text-white">{academic?.semester_gpa ?? "-"}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">Dean's List: Top 10%</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Semester</p>
                  <p className="text-2xl font-bold text-navy-900 dark:text-white">Fall 2024</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-800 dark:text-purple-300">
                  <BookText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">Final exams: May 20-30</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Credits Completed</p>
                  <p className="text-2xl font-bold text-navy-900 dark:text-white">94 / 148</p>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-800 dark:text-green-300">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">63% degree completion</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>GPA Trend Analysis</CardTitle>
              <CardDescription>Track your academic performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Semester GPA</h3>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Fall 2024</span>
                        <span className="text-xs font-medium">3.67</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Spring 2024</span>
                        <span className="text-xs font-medium">3.70</span>
                      </div>
                      <Progress value={93} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Fall 2023</span>
                        <span className="text-xs font-medium">3.65</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Grade Distribution</h3>
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">A/A+/A-</span>
                        <span className="text-xs font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full bg-green-500"></div>
                      </Progress>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">B+/B/B-</span>
                        <span className="text-xs font-medium">38%</span>
                      </div>
                      <Progress value={38} className="h-2 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full bg-blue-500"></div>
                      </Progress>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">C+/C/C-</span>
                        <span className="text-xs font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full bg-yellow-500"></div>
                      </Progress>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">D+/D/F</span>
                        <span className="text-xs font-medium">5%</span>
                      </div>
                      <Progress value={5} className="h-2 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full bg-red-500"></div>
                      </Progress>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Academic Standing</h3>
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="mt-4">
                    <div className="mb-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                      <div className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-300">Good Standing</p>
                          <p className="text-xs text-green-600 dark:text-green-400">CGPA above 3.0</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="mb-1">• Dean's List: 2 semesters</p>
                      <p className="mb-1">• President's Honor: 1 semester</p>
                      <p>• Merit Scholarship: Eligible</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Semester</TabsTrigger>
            <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
            <TabsTrigger value="transcript">Academic Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="rounded-lg border dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                      <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Course</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Faculty</th>
                      <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Assignment</th>
                      <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Quiz</th>
                      <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Mid Term</th>
                      <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Sessional</th>
                      <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.filter(g => g.semester === 'Fall 2024').map((grade) => (
                      <tr key={grade.grade_id} className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{grade.course_code}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{grade.course_title}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{grade.credit_hours}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{grade.faculty || grade.teacher_name || '-'}</div>
                        </td>
                        <td className="p-3 text-center">{grade.assignment ?? '--'}</td>
                        <td className="p-3 text-center">{grade.quiz ?? '--'}</td>
                        <td className="p-3 text-center">{grade.mid_term ?? '--'}</td>
                        <td className="p-3 text-center">{grade.sessional ?? '--'}</td>
                        <td className="p-3 text-center"><Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/30">
              <div className="flex items-start">
                <AlertTriangle className="mr-3 mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-500" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Grading Key</h4>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                    <span className="font-semibold">A:</span> Assignment, <span className="font-semibold">Q:</span>{" "}
                    Quiz, <span className="font-semibold">M:</span> Mid Term, <span className="font-semibold">S:</span>{" "}
                    Sessional
                  </p>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                    Results will be updated progressively throughout the semester. Final grades will be visible after
                    the completion of end-term examinations.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="previous" className="space-y-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Select defaultValue={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall2024">Fall 2024</SelectItem>
                  <SelectItem value="spring2024">Spring 2024</SelectItem>
                  <SelectItem value="fall2023">Fall 2023</SelectItem>
                </SelectContent>
              </Select>

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
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {selectedSemester === "fall2024"
                      ? "Fall 2024"
                      : selectedSemester === "spring2024"
                        ? "Spring 2024"
                        : "Fall 2023"}{" "}
                    Results
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    GPA: {previousSemesterData[selectedSemester as keyof typeof previousSemesterData]?.gpa}
                  </Badge>
                </div>
                <CardDescription>Detailed breakdown of your academic performance</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <div key={course.id} className="rounded-lg border dark:border-gray-700">
                        <div
                          className="flex cursor-pointer items-center justify-between border-b p-4 dark:border-gray-700"
                          onClick={() => toggleCourseDetails(`${selectedSemester}-${course.id}`)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{course.code}</span>
                                  <Badge className={getGradeColor(course.grade)}>{course.grade}</Badge>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{course.title}</p>
                              </div>
                              <div className="hidden md:block">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Faculty: {course.faculty}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Credit Hours: {course.creditHours}
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <p className="text-sm font-medium">Grade Points: {course.gradePoints.toFixed(1)}</p>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            {expandedCourse === `${selectedSemester}-${course.id}` ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </div>
                        </div>

                        {expandedCourse === `${selectedSemester}-${course.id}` && (
                          <div className="p-4">
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                <h4 className="mb-2 font-medium">Assignments</h4>
                                <div className="space-y-2">
                                  {course.assignments.map((assignment) => (
                                    <div key={assignment.id} className="flex items-center justify-between">
                                      <span className="text-sm">{assignment.title}</span>
                                      <div className="text-right">
                                        <span className="text-sm font-medium">{assignment.marks}</span>
                                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                          ({assignment.weightage})
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                <h4 className="mb-2 font-medium">Quizzes</h4>
                                <div className="space-y-2">
                                  {course.quizzes.map((quiz) => (
                                    <div key={quiz.id} className="flex items-center justify-between">
                                      <span className="text-sm">{quiz.title}</span>
                                      <div className="text-right">
                                        <span className="text-sm font-medium">{quiz.marks}</span>
                                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                          ({quiz.weightage})
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                <h4 className="mb-2 font-medium">Mid Term</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Examination</span>
                                  <div className="text-right">
                                    <span className="text-sm font-medium">{course.midterm.marks}</span>
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                      ({course.midterm.weightage})
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                <h4 className="mb-2 font-medium">Sessional</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Final Examination</span>
                                  <div className="text-right">
                                    <span className="text-sm font-medium">{course.sessional.marks}</span>
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                      ({course.sessional.weightage})
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                View Full Details
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center dark:border-gray-700">
                      <p className="text-gray-500 dark:text-gray-400">
                        No courses found matching your search criteria.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline" className="flex items-center gap-1" onClick={handleDownloadGradeReport}>
                <Download className="h-4 w-4" />
                Download Semester Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Transcript</CardTitle>
                <CardDescription>
                  Your official academic transcript is available for download. You can also request official copies
                  through the Registrar's Office.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-lg border p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Transcript Status</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: March 30, 2025</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Available
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Student Information</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Name:</span> Abdullah Khan
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Registration No:</span> UW-22-AI-BS-014
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Program:</span> BS Artificial Intelligence
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Department:</span> Computer Science
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium">Academic Standing</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">CGPA:</span> 3.67
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Credits Earned:</span> 94 of 148
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Standing:</span> Good Standing
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">Expected Graduation:</span> Spring 2026
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Official Transcript</Button>
                  <Button variant="outline" className="flex-1">
                    Request Printed Copy
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transcript Request History</CardTitle>
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
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                            Purpose
                          </th>
                          <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                          </th>
                          <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                          <td className="p-3">March 15, 2025</td>
                          <td className="p-3">Digital Copy</td>
                          <td className="p-3">Scholarship Application</td>
                          <td className="p-3 text-center">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Completed
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                          <td className="p-3">February 10, 2025</td>
                          <td className="p-3">Official Copy</td>
                          <td className="p-3">Internship</td>
                          <td className="p-3 text-center">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Completed
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
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
      </motion.div>
    </div>
  )
}

