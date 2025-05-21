"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileSpreadsheet, Download, Printer, Award, TrendingUp, BarChart3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useUser } from "./app/UserContext"

export default function SemesterResultTab() {
  const { email } = useUser()
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) return
    setLoading(true)
    fetch("/api/semester_results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setResults(data.results)
      })
      .finally(() => setLoading(false))
  }, [email])

  if (loading) return <div>Loading semester results...</div>
  if (!results.length) return <div>Please log in to view your semester results.</div>

  // For demo, just show the first semester result
  const result = results[0]

  return (
    <div key="semesterresult-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <FileSpreadsheet className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Semester Result</h1>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500"
        >
          <span>YOU ARE HERE: </span>
          <a href="#" className="text-blue-600 hover:underline">
            Home
          </a>
          <span> / </span>
          <span className="text-gray-700">Semester Result</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Academic Results</h2>
            <p className="text-sm text-gray-500">View your semester results and academic performance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="fall2024">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fall2024">Fall 2024</SelectItem>
                <SelectItem value="spring2024">Spring 2024</SelectItem>
                <SelectItem value="fall2023">Fall 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                <span className="text-4xl font-bold text-gray-400">AK</span>
              </div>
            </div>
            <div className="col-span-1 md:col-span-3">
              <h3 className="text-lg font-bold text-navy-900">Abdullah Khan</h3>
              <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Registration No:</p>
                  <p className="font-medium">UW-22-AI-BS-014</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department:</p>
                  <p className="font-medium">Computer Science</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Program:</p>
                  <p className="font-medium">BS Artificial Intelligence</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Semester:</p>
                  <p className="font-medium">6 (Fall 2024)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Semester GPA</p>
                  <p className="text-2xl font-bold text-blue-700">{result.semester_gpa}</p>
                </div>
                <div className="rounded-full bg-blue-200 p-3 text-blue-700">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">{result.semester}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Credit Hours</p>
                  <p className="text-2xl font-bold text-green-700">{result.credit_hours}</p>
                </div>
                <div className="rounded-full bg-green-200 p-3 text-green-700">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">Current Semester</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">CGPA Trend</p>
                  <p className="text-2xl font-bold text-purple-700">+0.05</p>
                </div>
                <div className="rounded-full bg-purple-200 p-3 text-purple-700">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">Improvement from last semester</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">Semester Result - FALL 2024</h3>
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Course Code</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Course Title</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Credit Hours</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">CS-324</td>
                    <td className="p-3">Operating System</td>
                    <td className="p-3 text-center">3+1</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-green-100 text-green-800">A-</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">AI-354</td>
                    <td className="p-3">Knowledge Representation and Reasoning</td>
                    <td className="p-3 text-center">3+0</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-green-100 text-green-800">A</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">MGT-121</td>
                    <td className="p-3">Principles of Marketing</td>
                    <td className="p-3 text-center">3+0</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-blue-100 text-blue-800">B</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">AI-353</td>
                    <td className="p-3">Machine Learning</td>
                    <td className="p-3 text-center">2+1</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-green-100 text-green-800">B+</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">ISL-101</td>
                    <td className="p-3">Islamic Studies</td>
                    <td className="p-3 text-center">2+0</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-blue-100 text-blue-800">B-</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 text-right text-sm text-gray-500">
            <p>Semester Credit Hours: 15</p>
            <p>Generated on: 30 March, 2025</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">GPA Calculation</h3>
          <div className="rounded-lg border p-4">
            <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">A = 4.0</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">A- = 3.7</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">B+ = 3.3</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">B = 3.0</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">B- = 2.7</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">C+ = 2.3</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">C = 2.0</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">F = 0.0</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">GPA = (Credit Hours × Grade Points) ÷ Total Credit Hours</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">View All Results</Button>
        </div>
      </motion.div>
    </div>
  )
}

