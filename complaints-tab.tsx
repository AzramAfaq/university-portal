"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Info, CheckCircle, AlertTriangle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ComplaintsTab() {
  return (
    <div key="complaints-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <MessageSquare className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Complaints & Feedback</h1>
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
          <span className="text-gray-700">Complaints</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-navy-900">Student Complaint Portal</h2>
          <p className="text-sm text-gray-500">Submit your concerns, suggestions, or feedback</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-navy-900">Academic Complaints</h3>
                <p className="mt-2 text-sm text-gray-500">Report issues related to courses, faculty, or grading</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-amber-100 p-3 text-amber-600">
                  <Info className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-navy-900">Administrative Concerns</h3>
                <p className="mt-2 text-sm text-gray-500">Report issues with registration, fee, or facilities</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-green-100 p-3 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-navy-900">General Feedback</h3>
                <p className="mt-2 text-sm text-gray-500">Share suggestions or positive feedback about services</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start">
            <Info className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800">Complaint Submission Guidelines</h4>
              <p className="mt-1 text-sm text-blue-700">
                Please provide specific details about your concern, including relevant dates, names, and locations. All
                complaints are handled confidentially and will be addressed by the appropriate department within 5
                working days. For urgent matters, please contact the Student Affairs Office directly.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">Submit New Complaint</h3>
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="complaint-category">Complaint Category</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="services">Student Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" className="mt-1" placeholder="Brief subject of your complaint" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="complaint-description">Description</Label>
                <Textarea
                  id="complaint-description"
                  className="mt-1 min-h-[150px]"
                  placeholder="Please provide detailed information about your complaint or feedback"
                />
              </div>
              <div>
                <Label htmlFor="attachment">Attachments (if any)</Label>
                <Input id="attachment" type="file" className="mt-1" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
                Submit Complaint
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">Complaint History</h3>
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Ticket ID</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Subject</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Category</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Submission Date</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">TKT-2025-001</td>
                    <td className="p-3">Issue with AI Lab Equipment</td>
                    <td className="p-3 text-center">Facilities</td>
                    <td className="p-3 text-center">2025-03-15</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">TKT-2025-002</td>
                    <td className="p-3">Attendance Record Correction</td>
                    <td className="p-3 text-center">Academic</td>
                    <td className="p-3 text-center">2025-03-20</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-medium">TKT-2025-003</td>
                    <td className="p-3">Library Book Reservation System</td>
                    <td className="p-3 text-center">Services</td>
                    <td className="p-3 text-center">2025-03-25</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start">
            <AlertTriangle className="mr-3 mt-0.5 h-5 w-5 text-yellow-600" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-800">Important Note</h4>
              <p className="mt-1 text-sm text-yellow-700">
                For urgent matters requiring immediate attention, please contact the Student Affairs Office at
                student.affairs@uow.edu.pk or call +92-311-1234567.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

