"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Info, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function FacultyFeedbackTab() {
  const [openModal, setOpenModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<{
    id: number;
    code: string;
    title: string;
    creditHours: string;
    status: string;
  } | null>(null)
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""))

  const questions = [
    "The course objectives were clear.",
    "The instructor was well prepared.",
    "The teaching methods were effective.",
    "The course materials were helpful.",
    "The instructor encouraged participation.",
    "The instructor was available for help.",
    "The course workload was appropriate.",
    "The assessment methods were fair.",
    "The course improved my knowledge.",
    "I would recommend this course to others."
  ]

  const options = [
    { value: "strongly_agree", label: "Strongly Agree" },
    { value: "agree", label: "Agree" },
    { value: "neutral", label: "Neutral" },
    { value: "disagree", label: "Disagree" },
    { value: "strongly_disagree", label: "Strongly Disagree" }
  ]

  const handleOpen = (course: {
    id: number;
    code: string;
    title: string;
    creditHours: string;
    status: string;
  }) => {
    setSelectedCourse(course)
    setAnswers(Array(10).fill(""))
    setOpenModal(true)
  }

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[idx] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    // Submit logic here (API call, etc.)
    setOpenModal(false)
  }

  const facultyFeedbackData = [
    {
      id: 1,
      code: "AI-353",
      title: "Machine Learning (Th)",
      creditHours: "2+1",
      status: "In progress",
    },
    {
      id: 2,
      code: "AI-353",
      title: "Machine Learning (Pr)",
      creditHours: "2+1",
      status: "In progress",
    },
    {
      id: 3,
      code: "AI-354",
      title: "Knowledge Representation and Reasoning (Th)",
      creditHours: "3+0",
      status: "In progress",
    },
    {
      id: 4,
      code: "CS-324",
      title: "Operating System (Th)",
      creditHours: "3+1",
      status: "In progress",
    },
    {
      id: 5,
      code: "CS-324",
      title: "Operating System (Pr)",
      creditHours: "3+1",
      status: "In progress",
    },
    {
      id: 6,
      code: "ISL-101",
      title: "Islamic Studies (Th)",
      creditHours: "2+0",
      status: "In progress",
    },
    {
      id: 7,
      code: "MGT-121",
      title: "Principles of Marketing (Th)",
      creditHours: "3+0",
      status: "In progress",
    },
  ]

  return (
    <div key="facultyfeedback-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <MessageSquare className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Faculty Feedback</h1>
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
          <span className="text-gray-700">Faculty Feedback</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-navy-900">Faculty Feedback System</h2>
          <p className="text-sm text-gray-500">Your feedback helps us improve teaching quality and course delivery.</p>
        </div>

        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start">
            <Info className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800">Feedback Guidelines</h4>
              <p className="mt-1 text-sm text-blue-700">
                Please provide honest, constructive feedback about your course instructors. All feedback is anonymous
                and will be used to improve teaching methods and course content. Complete all pending feedback forms
                before the deadline to help us enhance your learning experience.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">Pending Feedback Forms</h3>
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Course</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Credit Hours</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Status</th>
                    <th className="p-3 text-center text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyFeedbackData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{item.code}</p>
                          <p className="text-sm text-gray-500">{item.title}</p>
                        </div>
                      </td>
                      <td className="p-3 text-center">{item.creditHours}</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-yellow-100 text-yellow-800">{item.status}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Button size="sm" onClick={() => handleOpen(item)}>
                          Provide Feedback
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start">
            <AlertTriangle className="mr-3 mt-0.5 h-5 w-5 text-yellow-600" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-800">Important Notice</h4>
              <p className="mt-1 text-sm text-yellow-700">
                Feedback submission deadline is April 15, 2025. Students who do not complete all feedback forms may face
                delays in accessing their final examination results.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="relative bg-white rounded-lg shadow-lg">
            <DialogHeader className="p-6 pb-2 border-b flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Course Feedback</DialogTitle>
                <div className="text-sm text-gray-500 mt-1">
                  {selectedCourse && `${selectedCourse.code} - ${selectedCourse.title}`}
                </div>
              </div>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-gray-100 focus:outline-none"
                onClick={() => setOpenModal(false)}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </DialogHeader>
            <div className="px-6 pt-4">
              <Progress value={answers.filter(Boolean).length * 10} className="h-2 mb-6" />
            </div>
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
              <div className="space-y-6 max-h-[55vh] overflow-y-auto px-6 pb-32 pt-2">
                {questions.map((q, idx) => (
                  <div key={idx} className="mb-2 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
                    <Label className="block mb-3 font-medium text-gray-900">{idx + 1}. {q}</Label>
                    <RadioGroup
                      value={answers[idx]}
                      onValueChange={val => handleChange(idx, val)}
                      className="flex flex-wrap gap-4"
                    >
                      {options.map(opt => (
                        <div key={opt.value} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={opt.value}
                            id={`${idx}-${opt.value}`}
                            className="border-2 border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-100 focus:ring-2 focus:ring-blue-400"
                          />
                          <Label htmlFor={`${idx}-${opt.value}`} className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
              <DialogFooter className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-end z-10">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full max-w-xs">Submit Feedback</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

