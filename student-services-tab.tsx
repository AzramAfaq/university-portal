"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FileText,
  Library,
  GraduationCap,
  Building,
  Coffee,
  Bus,
  Dumbbell,
  Laptop,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Clock,
  Calendar,
  MapPin,
  Users,
  Search,
  MessageSquare,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function StudentServicesTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const { toast } = useToast()

  const services = [
    {
      id: "academic",
      title: "Academic Services",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      description: "Access academic resources, course materials, and study guides",
    },
    {
      id: "counseling",
      title: "Counseling Services",
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      description: "Get support for academic, personal, and career development",
    },
    {
      id: "career",
      title: "Career Services",
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      description: "Explore career opportunities, internships, and job placements",
    },
    {
      id: "events",
      title: "Campus Events",
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      description: "Stay updated with campus activities and student events",
    },
    {
      id: "settings",
      title: "Account Settings",
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      description: "Manage your student account and preferences",
    },
  ]

  const filteredServices = searchQuery
    ? services.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : services

  return (
    <div key="services-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <BookOpen className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Student Services</h1>
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
          <span className="text-gray-700">Student Services</span>
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
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">University Services & Resources</h2>
            </div>
            <p className="mb-4 text-white/80">
              Access a wide range of services and resources designed to support your academic success and enhance your
              university experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Most services available 8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Located in the Student Center Building</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-navy-900">Available Services</h3>
              <p className="text-sm text-gray-500">Browse and access university services and resources</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search services..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className={`bg-${service.color}-50 p-6`}>
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`rounded-full bg-${service.color}-100 p-3`}>{service.icon}</div>
                      <Badge className={`bg-${service.color}-100 text-${service.color}-800`}>{service.status}</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-navy-900">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between border-t p-4">
                    <span className="text-sm text-gray-500">View details</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-${service.color}-600 hover:bg-${service.color}-50 hover:text-${service.color}-700`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <div className={`rounded-full bg-${service.color}-100 p-2`}>{service.icon}</div>
                            <span>{service.title}</span>
                          </DialogTitle>
                          <DialogDescription>{service.description}</DialogDescription>
                        </DialogHeader>

                        {service.id === "academic" && (
                          <div className="space-y-4">
                            <h4 className="mb-2 font-medium">Academic Resources</h4>
                            <div className="rounded-lg border p-4">
                              <h4 className="mb-2 font-medium">Library Hours</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Monday - Thursday</span>
                                  <span>8:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Friday</span>
                                  <span>8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Saturday</span>
                                  <span>10:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Sunday</span>
                                  <span>12:00 PM - 8:00 PM</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="rounded-lg border p-4">
                                <h4 className="mb-2 font-medium">Digital Resources</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>E-books & E-journals</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Academic Databases</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Research Papers</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Multimedia Resources</span>
                                  </li>
                                </ul>
                              </div>

                              <div className="rounded-lg border p-4">
                                <h4 className="mb-2 font-medium">Services</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Book Reservations</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Study Room Booking</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Research Assistance</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span>Printing & Scanning</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-2 font-medium">Your Library Account</h4>
                              <div className="rounded-lg border p-4">
                                <div className="mb-4 flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">Books Borrowed</p>
                                    <p className="text-sm text-gray-500">2 of 10 allowed</p>
                                  </div>
                                  <Progress value={20} className="w-32" />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Advanced Machine Learning</span>
                                    <span className="text-red-600">Due in 3 days</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Artificial Intelligence: A Modern Approach</span>
                                    <span className="text-amber-600">Due in 7 days</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {service.id === "career" && (
                          <div className="space-y-4">
                            <div className="rounded-lg border p-4">
                              <h4 className="mb-2 font-medium">Career Services Office Hours</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Monday - Friday</span>
                                  <span>9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Location</span>
                                  <span>Student Center, Room 205</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="rounded-lg border p-4">
                                <h4 className="mb-2 font-medium">Services Offered</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <span>Resume & CV Review</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <span>Mock Interviews</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <span>Career Counseling</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <span>Job Search Strategies</span>
                                  </li>
                                </ul>
                              </div>

                              <div className="rounded-lg border p-4">
                                <h4 className="mb-2 font-medium">Upcoming Events</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                    <span>Career Fair - April 15, 2025</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                    <span>Resume Workshop - April 10, 2025</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                    <span>Industry Talk: Tech Careers - April 20, 2025</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-2 font-medium">Job Board</h4>
                              <div className="rounded-lg border">
                                <div className="overflow-x-auto">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="border-b bg-gray-50">
                                        <th className="p-3 text-left text-sm font-medium text-gray-700">Position</th>
                                        <th className="p-3 text-left text-sm font-medium text-gray-700">Company</th>
                                        <th className="p-3 text-center text-sm font-medium text-gray-700">Type</th>
                                        <th className="p-3 text-center text-sm font-medium text-gray-700">Deadline</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b hover:bg-gray-50">
                                        <td className="p-3">AI Engineer Intern</td>
                                        <td className="p-3">TechCorp</td>
                                        <td className="p-3 text-center">
                                          <Badge className="bg-green-100 text-green-800">Internship</Badge>
                                        </td>
                                        <td className="p-3 text-center">April 30, 2025</td>
                                      </tr>
                                      <tr className="border-b hover:bg-gray-50">
                                        <td className="p-3">Data Scientist</td>
                                        <td className="p-3">DataWorks</td>
                                        <td className="p-3 text-center">
                                          <Badge className="bg-blue-100 text-blue-800">Full-time</Badge>
                                        </td>
                                        <td className="p-3 text-center">May 15, 2025</td>
                                      </tr>
                                      <tr className="hover:bg-gray-50">
                                        <td className="p-3">Software Developer</td>
                                        <td className="p-3">InnovateSoft</td>
                                        <td className="p-3 text-center">
                                          <Badge className="bg-purple-100 text-purple-800">Part-time</Badge>
                                        </td>
                                        <td className="p-3 text-center">April 25, 2025</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <DialogFooter>
                          <Button variant="outline">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700">Book Appointment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold text-navy-900">Request Assistance</h3>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic Services</SelectItem>
                        <SelectItem value="counseling">Counseling Services</SelectItem>
                        <SelectItem value="career">Career Services</SelectItem>
                        <SelectItem value="events">Campus Events</SelectItem>
                        <SelectItem value="settings">Account Settings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="urgency" className="mt-1">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe what you need assistance with..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">Submit Request</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-navy-900">Student Organizations</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Computing Society</h4>
                      <p className="text-sm text-gray-500">120 members</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    A community for computer science and IT enthusiasts to collaborate on projects and share knowledge.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Research Group</h4>
                      <p className="text-sm text-gray-500">85 members</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Focused on artificial intelligence research, machine learning projects, and industry applications.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Entrepreneurship Club</h4>
                      <p className="text-sm text-gray-500">95 members</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    For students interested in startups, business innovation, and entrepreneurial ventures.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

