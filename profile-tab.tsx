"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen, Shield, Bell, Gift } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { useUser } from "./app/UserContext"

export default function ProfileTab() {
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

  if (loading) return <div>Loading profile...</div>
  if (!profile) return <div>Please log in to view your profile.</div>

  return (
    <div key="profile-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <User className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-xl md:text-2xl font-bold text-navy-900">Student Profile</h1>
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
          <span className="text-gray-700">Student Profile</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile Information Card */}
        <motion.div
          className="md:col-span-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-6 text-center text-white">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-4xl font-bold text-gray-400">
                  {profile.name ? profile.name.split(" ").map((n: string) => n[0]).join("") : "ST"}
                </div>
              </div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-gray-300">{profile.program || "-"}</p>
              <Badge className="mt-2 bg-gold-500 text-navy-900">
                {academic?.semester ? `${academic.semester}th Semester Student` : "Student"}
              </Badge>
            </div>
            <CardContent className="p-0">
              <ul className="divide-y">
                <li className="flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration No</p>
                    <p className="font-medium">{profile.registration_no}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profile.phone || "-"}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{profile.address || "-"}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "-"}</p>
                  </div>
                </li>
              </ul>
              <div className="flex p-4">
                <Button className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic Info & Notifications */}
        <motion.div
          className="md:col-span-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Academic Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-navy-900">Academic Progress</h2>
                  <Badge className="bg-blue-100 text-blue-800">Fall 2024</Badge>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <GraduationCap className="mx-auto mb-2 h-6 w-6 text-navy-700" />
                    <p className="text-sm text-gray-500">Current CGPA</p>
                    <p className="text-xl font-bold text-navy-900">{academic?.semester_gpa ?? "-"}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <BookOpen className="mx-auto mb-2 h-6 w-6 text-navy-700" />
                    <p className="text-sm text-gray-500">Credit Hours</p>
                    <p className="text-xl font-bold text-navy-900">{academic ? `${academic.credit_hours}/148` : "-"}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <Calendar className="mx-auto mb-2 h-6 w-6 text-navy-700" />
                    <p className="text-sm text-gray-500">Semester</p>
                    <p className="text-xl font-bold text-navy-900">{academic ? `${academic.semester} of 8` : "-"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Degree Completion</span>
                      <span className="text-sm font-medium">63%</span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Current Semester</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Enrollment */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-bold text-navy-900">Current Enrollment</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="p-3 text-left text-sm font-medium text-gray-700">Course Code</th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700">Course Title</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700">Credit Hours</th>
                        <th className="p-3 text-center text-sm font-medium text-gray-700">Instructor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">CS-324</td>
                        <td className="p-3">Operating System</td>
                        <td className="p-3 text-center">3+1</td>
                        <td className="p-3 text-center">Dr. Ali Ahmed</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">AI-354</td>
                        <td className="p-3">Knowledge Representation and Reasoning</td>
                        <td className="p-3 text-center">3+0</td>
                        <td className="p-3 text-center">Ms. Farah Khan</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">MGT-121</td>
                        <td className="p-3">Principles of Marketing</td>
                        <td className="p-3 text-center">3+0</td>
                        <td className="p-3 text-center">Dr. Nazia Khalid</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">AI-353</td>
                        <td className="p-3">Machine Learning</td>
                        <td className="p-3 text-center">2+1</td>
                        <td className="p-3 text-center">Dr. Usman Ali</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">ISL-101</td>
                        <td className="p-3">Islamic Studies</td>
                        <td className="p-3 text-center">2+0</td>
                        <td className="p-3 text-center">Dr. Asif Malik</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-navy-900">Recent Notifications</h2>
                  <Badge className="bg-red-100 text-red-800">5 New</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 rounded-lg border border-l-4 border-l-blue-500 bg-blue-50 p-3">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-navy-900">Mid-Term Exam Schedule Released</p>
                      <p className="text-sm text-gray-600">
                        The mid-term examination schedule has been uploaded. Please check for any conflicts.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-lg border border-l-4 border-l-green-500 bg-green-50 p-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-navy-900">Fee Submission Confirmed</p>
                      <p className="text-sm text-gray-600">
                        Your fee payment for Fall 2024 has been confirmed. Receipt available for download.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-lg border border-l-4 border-l-purple-500 bg-purple-50 p-3">
                    <Gift className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-navy-900">Scholarship Opportunity</p>
                      <p className="text-sm text-gray-600">
                        New merit scholarship applications are open for high-achieving students.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">View All Notifications</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

