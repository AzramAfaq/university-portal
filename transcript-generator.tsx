"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Download,
  Printer,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  BadgeCheck,
  Info,
  FileSpreadsheet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function TranscriptGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedTranscript, setGeneratedTranscript] = useState<boolean>(false)
  const [transcriptType, setTranscriptType] = useState<string>("complete")

  const handleGenerateTranscript = () => {
    setIsLoading(true)
    // Simulate API call to generate transcript
    setTimeout(() => {
      setIsLoading(false)
      setGeneratedTranscript(true)
    }, 1500)
  }

  return (
    <div key="transcript-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <FileText className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Transcript & Documents</h1>
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
          <span className="text-gray-700">Transcript</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200 bg-gradient-to-r from-navy-800 to-navy-900 p-6 text-white">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">University Transcripts & Documents</h2>
            </div>
            <p className="mb-4 text-white/80">
              Generate, view, and download your official academic transcripts and other important university documents.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <BadgeCheck className="h-4 w-4" />
                <span>Official & Verifiable</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Processing Time: 1-2 business days</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: March 30, 2025</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="generate" className="mx-auto max-w-4xl p-6">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate Documents</TabsTrigger>
            <TabsTrigger value="history">Request History</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Academic Documents</CardTitle>
                <CardDescription>Select the document type and specifications needed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="documentType" className="text-base font-medium">
                      Document Type
                    </Label>
                    <RadioGroup defaultValue="transcript" className="mt-3">
                      <div className="flex items-start space-x-2 rounded-md border p-3 hover:bg-gray-50">
                        <RadioGroupItem value="transcript" id="transcript" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="transcript" className="text-base font-medium">
                            Academic Transcript
                          </Label>
                          <p className="text-sm text-gray-500">
                            Official document showing all courses taken and grades earned
                          </p>
                        </div>
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                          <FileText className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 rounded-md border p-3 hover:bg-gray-50">
                        <RadioGroupItem value="degree" id="degree" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="degree" className="text-base font-medium">
                            Degree Verification
                          </Label>
                          <p className="text-sm text-gray-500">
                            Confirmation of degree completion and graduation status
                          </p>
                        </div>
                        <div className="rounded-full bg-green-100 p-2 text-green-600">
                          <BadgeCheck className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 rounded-md border p-3 hover:bg-gray-50">
                        <RadioGroupItem value="enrollment" id="enrollment" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="enrollment" className="text-base font-medium">
                            Enrollment Certificate
                          </Label>
                          <p className="text-sm text-gray-500">Verification of current enrollment and student status</p>
                        </div>
                        <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                          <FileSpreadsheet className="h-5 w-5" />
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="transcriptType" className="text-base font-medium">
                      Transcript Type
                    </Label>
                    <Select defaultValue={transcriptType} onValueChange={(value) => setTranscriptType(value)}>
                      <SelectTrigger id="transcriptType">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complete">Complete Transcript</SelectItem>
                        <SelectItem value="semester">Semester-Specific</SelectItem>
                        <SelectItem value="cgpa">CGPA Only</SelectItem>
                      </SelectContent>
                    </Select>

                    {transcriptType === "semester" && (
                      <Select defaultValue="spring2025">
                        <SelectTrigger className="mt-3">
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring2025">Spring 2025</SelectItem>
                          <SelectItem value="fall2024">Fall 2024</SelectItem>
                          <SelectItem value="spring2024">Spring 2024</SelectItem>
                          <SelectItem value="fall2023">Fall 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Document Purpose</Label>
                    <Select defaultValue="employment">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="further-education">Further Education</SelectItem>
                        <SelectItem value="scholarship">Scholarship</SelectItem>
                        <SelectItem value="visa">Visa Application</SelectItem>
                        <SelectItem value="personal">Personal Records</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Delivery Format</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="digital" defaultChecked />
                        <Label htmlFor="digital">Digital Copy (PDF)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="printed" />
                        <Label htmlFor="printed">Printed Copy (Additional fee may apply)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sealed" />
                        <Label htmlFor="sealed">Sealed Envelope (For official purposes)</Label>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-3 mt-0.5 h-5 w-5 text-amber-600" />
                      <div>
                        <h4 className="text-sm font-semibold text-amber-800">Important Notice</h4>
                        <p className="mt-1 text-xs text-amber-700">
                          Official printed transcripts may take 1-2 business days to process. Digital copies are usually
                          available within 24 hours. A verification email will be sent when your document is ready.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleGenerateTranscript}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4" />
                          <span>Generate Document</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {generatedTranscript && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card>
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Transcript Preview</CardTitle>
                      <Badge className="bg-green-100 text-green-800">DRAFT</Badge>
                    </div>
                    <CardDescription>
                      This is a preview of your transcript. The official document will be available for download after
                      processing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex justify-between">
                        <div className="mb-6 flex items-center gap-4">
                          <div className="h-16 w-16">
                            <Image
                              src="/images/university-logo.png"
                              alt="University of Wah Logo"
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-navy-900">UNIVERSITY OF WAH</h2>
                            <p className="text-sm text-gray-500">Quaid Avenue, Wah Cantt, Pakistan</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <h3 className="text-lg font-bold text-navy-900">OFFICIAL TRANSCRIPT</h3>
                          <p className="text-sm text-gray-500">Generated on: March 31, 2025</p>
                        </div>
                      </div>

                      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Student Name</p>
                            <p className="font-medium text-navy-900">Abdullah Khan</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Registration No.</p>
                            <p className="font-medium text-navy-900">UW-22-AI-BS-014</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Program</p>
                            <p className="font-medium text-navy-900">BS Artificial Intelligence</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Department</p>
                            <p className="font-medium text-navy-900">Computer Science</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Admission Date</p>
                            <p className="font-medium text-navy-900">September 15, 2022</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <p className="font-medium text-navy-900">Active / Regular</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="mb-3 text-lg font-bold text-navy-900">Academic Record</h3>
                        <div className="rounded-lg border border-gray-200">
                          <div className="border-b border-gray-200 bg-gray-50 p-3">
                            <h4 className="font-semibold text-navy-800">Fall 2022 Semester</h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b bg-gray-50">
                                  <th className="p-3 text-left text-sm font-medium text-gray-700">Course Code</th>
                                  <th className="p-3 text-left text-sm font-medium text-gray-700">Course Title</th>
                                  <th className="p-3 text-center text-sm font-medium text-gray-700">Credit Hours</th>
                                  <th className="p-3 text-center text-sm font-medium text-gray-700">Grade</th>
                                  <th className="p-3 text-center text-sm font-medium text-gray-700">Grade Points</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">CS-101</td>
                                  <td className="p-3">Introduction to Programming</td>
                                  <td className="p-3 text-center">3+1</td>
                                  <td className="p-3 text-center">A</td>
                                  <td className="p-3 text-center">4.00</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">AI-101</td>
                                  <td className="p-3">Fundamentals of AI</td>
                                  <td className="p-3 text-center">3+0</td>
                                  <td className="p-3 text-center">A-</td>
                                  <td className="p-3 text-center">3.70</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">MATH-101</td>
                                  <td className="p-3">Calculus I</td>
                                  <td className="p-3 text-center">3+0</td>
                                  <td className="p-3 text-center">B+</td>
                                  <td className="p-3 text-center">3.30</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">ENG-101</td>
                                  <td className="p-3">English Composition</td>
                                  <td className="p-3 text-center">3+0</td>
                                  <td className="p-3 text-center">A</td>
                                  <td className="p-3 text-center">4.00</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">PST-101</td>
                                  <td className="p-3">Pakistan Studies</td>
                                  <td className="p-3 text-center">2+0</td>
                                  <td className="p-3 text-center">A</td>
                                  <td className="p-3 text-center">4.00</td>
                                </tr>
                              </tbody>
                              <tfoot className="bg-gray-50">
                                <tr>
                                  <td colSpan={2} className="p-3 text-right font-medium">
                                    Semester Total:
                                  </td>
                                  <td className="p-3 text-center font-medium">16</td>
                                  <td className="p-3 text-center font-medium">GPA:</td>
                                  <td className="p-3 text-center font-medium">3.82</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg border border-gray-200">
                          <div className="border-b border-gray-200 bg-gray-50 p-3">
                            <h4 className="font-semibold text-navy-800">Spring 2023 Semester</h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b bg-gray-50">
                                  <th className="p-3 text-left text-sm font-medium text-gray-700">Course Code</th>
                                  <th className="p-3 text-left text-sm font-medium text-gray-700">Course Title</th>
                                  <th className="p-3 text-center text-sm font-medium text-gray-700">Credit Hours</th>
                                  <th className="p-3 text-center text-sm font-medium text-gray-700">Grade</th>
                                  <th className="p-3 text-center text-sm font-medium text-gray-700">Grade Points</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">CS-102</td>
                                  <td className="p-3">Data Structures</td>
                                  <td className="p-3 text-center">3+1</td>
                                  <td className="p-3 text-center">A-</td>
                                  <td className="p-3 text-center">3.70</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">AI-102</td>
                                  <td className="p-3">AI Algorithms</td>
                                  <td className="p-3 text-center">3+0</td>
                                  <td className="p-3 text-center">A</td>
                                  <td className="p-3 text-center">4.00</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">MATH-102</td>
                                  <td className="p-3">Calculus II</td>
                                  <td className="p-3 text-center">3+0</td>
                                  <td className="p-3 text-center">B</td>
                                  <td className="p-3 text-center">3.00</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">ENG-102</td>
                                  <td className="p-3">Technical Writing</td>
                                  <td className="p-3 text-center">3+0</td>
                                  <td className="p-3 text-center">A</td>
                                  <td className="p-3 text-center">4.00</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-3 font-medium">ISL-101</td>
                                  <td className="p-3">Islamic Studies</td>
                                  <td className="p-3 text-center">2+0</td>
                                  <td className="p-3 text-center">A-</td>
                                  <td className="p-3 text-center">3.70</td>
                                </tr>
                              </tbody>
                              <tfoot className="bg-gray-50">
                                <tr>
                                  <td colSpan={2} className="p-3 text-right font-medium">
                                    Semester Total:
                                  </td>
                                  <td className="p-3 text-center font-medium">16</td>
                                  <td className="p-3 text-center font-medium">GPA:</td>
                                  <td className="p-3 text-center font-medium">3.68</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                          <div className="text-sm font-medium text-gray-500">Total Credits Earned</div>
                          <div className="text-xl font-bold text-navy-900">124/148</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                          <div className="text-sm font-medium text-gray-500">Current CGPA</div>
                          <div className="text-xl font-bold text-navy-900">3.67</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                          <div className="text-sm font-medium text-gray-500">Standing</div>
                          <div className="text-xl font-bold text-green-600">Good Standing</div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-center text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <Info className="h-4 w-4" />
                          <span className="text-sm">Watermark will appear on official transcript</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Document processing in progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Printer className="h-4 w-4" />
                          <span>Print Preview</span>
                        </Button>
                        <Button size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                          <Download className="h-4 w-4" />
                          <span>Download PDF</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Request History</CardTitle>
                <CardDescription>View the status of your previous document requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="p-3 text-left text-sm font-medium text-gray-700">Request Date</th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700">Document Type</th>
                          <th className="p-3 text-center text-sm font-medium text-gray-700">Purpose</th>
                          <th className="p-3 text-center text-sm font-medium text-gray-700">Status</th>
                          <th className="p-3 text-center text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">2025-03-15</td>
                          <td className="p-3">Complete Transcript</td>
                          <td className="p-3 text-center">Scholarship</td>
                          <td className="p-3 text-center">
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm" className="ml-2">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">2025-02-28</td>
                          <td className="p-3">Enrollment Certificate</td>
                          <td className="p-3 text-center">Visa Application</td>
                          <td className="p-3 text-center">
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm" className="ml-2">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">2024-12-10</td>
                          <td className="p-3">Semester Transcript</td>
                          <td className="p-3 text-center">Internship</td>
                          <td className="p-3 text-center">
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm" className="ml-2">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
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

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>Information about verifying the authenticity of your documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start">
                    <Info className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800">Document Verification Information</h4>
                      <p className="mt-1 text-sm text-blue-700">
                        All official documents issued by the University of Wah contain QR codes and unique verification
                        numbers that can be used to confirm their authenticity. Third parties can verify documents
                        through the university's online verification portal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium text-navy-900">Verification Methods</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <h4 className="font-medium text-navy-900">Online Verification</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Visit{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          verify.uow.edu.pk
                        </a>{" "}
                        and enter the document's unique verification code to confirm its authenticity.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-2 text-green-600">
                          <BadgeCheck className="h-5 w-5" />
                        </div>
                        <h4 className="font-medium text-navy-900">QR Code Scanning</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Scan the QR code printed on official documents using any QR scanner app to instantly verify the
                        document's authenticity.
                      </p>
                    </div>
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

