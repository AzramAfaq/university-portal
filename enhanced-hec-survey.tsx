"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Info,
  CheckCircle2,
  Clock,
  Award,
  Download,
  Sparkles,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EnhancedHECSurvey() {
  return (
    <div key="hecsurvey-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <FileText className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">HEC Student Survey</h1>
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
          <span className="text-gray-700">HEC Survey</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Award className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Higher Education Commission Survey 2025</h2>
            </div>
            <p className="mb-4 text-white/80">
              Your feedback is crucial for improving the quality of higher education in Pakistan. This comprehensive
              survey helps HEC evaluate and enhance educational standards across all institutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Estimated time: 15-20 minutes</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Confidential & Anonymous</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Deadline: April 15, 2025</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="mx-auto max-w-4xl p-6">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-navy-900">Survey Progress</h3>
              <Badge className="bg-blue-100 text-blue-800">25% Complete</Badge>
            </div>
            <Progress value={25} className="h-2" />
          </div>

          <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-navy-900">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="university">University Name</Label>
                    <Input id="university" defaultValue="University of Wah" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="regNo">Registration Number</Label>
                    <Input id="regNo" defaultValue="UW-22-AI-BS-014" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree Program</Label>
                    <Input id="degree" defaultValue="BS Artificial Intelligence" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="discipline">Discipline</Label>
                    <Input id="discipline" defaultValue="Computer Science" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="abdullah.khan@uow.edu.pk" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input id="phone" placeholder="03xx-xxxxxxx" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <Textarea id="address" className="mt-1" placeholder="Enter your complete residential address" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-navy-900">Contact Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">What is the best way of contacting you?</Label>
                    <RadioGroup defaultValue="email">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mobile" id="contact-mobile" />
                        <Label htmlFor="contact-mobile">Mobile Phone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                        <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="landline" id="contact-landline" />
                        <Label htmlFor="contact-landline">Landline</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mail" id="contact-mail" />
                        <Label htmlFor="contact-mail">Snail Mail (i.e., ordinary post)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">Next: Academic</Button>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-navy-900">Academic Experience</h3>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">How would you rate the quality of teaching?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Excellent</SelectItem>
                        <SelectItem value="4">Very Good</SelectItem>
                        <SelectItem value="3">Good</SelectItem>
                        <SelectItem value="2">Fair</SelectItem>
                        <SelectItem value="1">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">How would you rate the campus facilities?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Excellent</SelectItem>
                        <SelectItem value="4">Very Good</SelectItem>
                        <SelectItem value="3">Good</SelectItem>
                        <SelectItem value="2">Fair</SelectItem>
                        <SelectItem value="1">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">How would you rate the student support services?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Excellent</SelectItem>
                        <SelectItem value="4">Very Good</SelectItem>
                        <SelectItem value="3">Good</SelectItem>
                        <SelectItem value="2">Fair</SelectItem>
                        <SelectItem value="1">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="academic-feedback" className="mb-2 block">
                    Please provide any additional feedback about your academic experience:
                  </Label>
                  <Textarea
                    id="academic-feedback"
                    placeholder="Share your thoughts on curriculum, teaching methods, etc."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline">Previous: General</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Next: Facilities</Button>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-navy-900">Campus Facilities & Technology</h3>

                <div className="mb-6">
                  <Label className="mb-2 block">How do you USUALLY access the Internet?</Label>
                  <RadioGroup defaultValue="broadband">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="broadband" id="internet-broadband" />
                      <Label htmlFor="internet-broadband">Broadband Connection (at home)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile" id="internet-mobile" />
                      <Label htmlFor="internet-mobile">Mobile package (on phone)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cafe" id="internet-cafe" />
                      <Label htmlFor="internet-cafe">I go to an Internet Cafe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="friend" id="internet-friend" />
                      <Label htmlFor="internet-friend">I use a friend's internet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="university" id="internet-university" />
                      <Label htmlFor="internet-university">I use the university's internet</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mb-6 space-y-4">
                  <div>
                    <Label className="mb-2 block">
                      How would you rate the quality of internet connectivity on campus?
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Poor</span>
                      <Slider defaultValue={[3]} max={5} step={1} className="flex-1" />
                      <span className="text-sm text-gray-500">Excellent</span>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">How would you rate the laboratory facilities?</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Inadequate</span>
                      <Slider defaultValue={[4]} max={5} step={1} className="flex-1" />
                      <span className="text-sm text-gray-500">State-of-the-art</span>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">How would you rate the library resources?</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Limited</span>
                      <Slider defaultValue={[4]} max={5} step={1} className="flex-1" />
                      <span className="text-sm text-gray-500">Comprehensive</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="facilities-feedback" className="mb-2 block">
                    Please provide any additional feedback about campus facilities:
                  </Label>
                  <Textarea
                    id="facilities-feedback"
                    placeholder="Share your thoughts on classrooms, cafeteria, sports facilities, etc."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline">Previous: Academic</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Next: Feedback</Button>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-navy-900">Overall Experience & Suggestions</h3>

                <div className="mb-6 space-y-4">
                  <div>
                    <Label className="mb-2 block">
                      Overall, how satisfied are you with your educational experience?
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Not Satisfied</span>
                      <Slider defaultValue={[4]} max={5} step={1} className="flex-1" />
                      <span className="text-sm text-gray-500">Very Satisfied</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="strengths" className="mb-2 block">
                      What are the strengths of your institution?
                    </Label>
                    <Textarea
                      id="strengths"
                      placeholder="Please list the major strengths of your institution"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="improvements" className="mb-2 block">
                      What areas need improvement?
                    </Label>
                    <Textarea
                      id="improvements"
                      placeholder="Please suggest areas that need improvement"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="suggestions" className="mb-2 block">
                      Do you have any suggestions for HEC to improve higher education in Pakistan?
                    </Label>
                    <Textarea
                      id="suggestions"
                      placeholder="Please provide your suggestions"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900">Thank You for Your Participation</h4>
                      <p className="mt-1 text-xs text-gray-600">
                        Your feedback is valuable and will help improve the quality of higher education in Pakistan. All
                        responses are confidential and will be used for statistical purposes only.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline">Previous: Facilities</Button>
              <Button className="bg-green-600 hover:bg-green-700">Submit Survey</Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-navy-900">Survey Analytics</h3>
        <p className="mb-6 text-sm text-gray-500">
          View aggregated survey results from previous years to see how your institution compares to national averages.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-navy-900">Teaching Quality</h4>
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Your Institution</span>
                    <span className="text-xs font-medium">4.2/5.0</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">National Average</span>
                    <span className="text-xs font-medium">3.8/5.0</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-navy-900">Facilities</h4>
                <PieChart className="h-5 w-5 text-purple-600" />
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Your Institution</span>
                    <span className="text-xs font-medium">3.9/5.0</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">National Average</span>
                    <span className="text-xs font-medium">3.5/5.0</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-navy-900">Overall Satisfaction</h4>
                <LineChart className="h-5 w-5 text-green-600" />
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Your Institution</span>
                    <span className="text-xs font-medium">4.3/5.0</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">National Average</span>
                    <span className="text-xs font-medium">3.9/5.0</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download Full Analytics Report
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

