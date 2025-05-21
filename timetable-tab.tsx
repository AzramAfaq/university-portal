"use client"

import React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Printer, Clock, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TimeTableTab() {
  return (
    <div key="timetable-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <Calendar className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Class Time Table</h1>
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
          <span className="text-gray-700">Time Table</span>
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
            <h2 className="text-xl font-bold text-navy-900">Weekly Class Schedule</h2>
            <p className="text-sm text-gray-500">Fall Semester 2024</p>
          </div>
          <div className="flex gap-2">
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

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Classes</p>
                  <p className="text-2xl font-bold text-navy-900">15</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">Per Week</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Theory Classes</p>
                  <p className="text-2xl font-bold text-purple-600">11</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                  <User className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">5 Courses</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Lab Classes</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">3 Practical Labs</div>
            </CardContent>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="mb-6 grid grid-cols-6 gap-2">
              <div className="col-span-1"></div>
              <div className="col-span-1 rounded-t-lg bg-gray-50 p-2 text-center font-medium">Monday</div>
              <div className="col-span-1 rounded-t-lg bg-gray-50 p-2 text-center font-medium">Tuesday</div>
              <div className="col-span-1 rounded-t-lg bg-gray-50 p-2 text-center font-medium">Wednesday</div>
              <div className="col-span-1 rounded-t-lg bg-gray-50 p-2 text-center font-medium">Thursday</div>
              <div className="col-span-1 rounded-t-lg bg-gray-50 p-2 text-center font-medium">Friday</div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {/* Time Slots */}
              {[
                "08:30 - 10:00",
                "10:00 - 11:30",
                "11:30 - 13:00",
                "13:00 - 14:00",
                "14:00 - 15:30",
                "15:30 - 17:00",
              ].map((timeSlot, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`flex items-center justify-center rounded-lg bg-gray-50 p-2 text-center text-sm font-medium ${
                      index === 3 ? "bg-gray-200" : ""
                    }`}
                  >
                    {timeSlot}
                    {index === 3 && <span className="ml-2 text-xs text-gray-500">(Break)</span>}
                  </div>

                  {/* Monday */}
                  <div
                    className={`rounded-lg ${
                      index === 3
                        ? "bg-gray-100 p-2 text-center text-xs text-gray-500"
                        : index === 0
                          ? "bg-blue-50 p-2"
                          : index === 1
                            ? "bg-purple-50 p-2"
                            : index === 2
                              ? "bg-green-50 p-2"
                              : index === 4
                                ? "bg-amber-50 p-2"
                                : index === 5
                                  ? "bg-blue-50 p-2"
                                  : ""
                    }`}
                  >
                    {index === 3 ? (
                      "Lunch Break"
                    ) : index === 0 ? (
                      <div>
                        <div className="font-medium">CS-324</div>
                        <div className="mt-1 text-xs text-gray-500">Operating System</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room CS-3
                        </div>
                      </div>
                    ) : index === 4 ? (
                      <div>
                        <div className="font-medium">CS-324</div>
                        <div className="mt-1 text-xs text-gray-500">OS (Lab)</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Lab 2
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Tuesday */}
                  <div
                    className={`rounded-lg ${
                      index === 3
                        ? "bg-gray-100 p-2 text-center text-xs text-gray-500"
                        : index === 0
                          ? "bg-red-50 p-2"
                          : index === 1
                            ? "bg-green-50 p-2"
                            : index === 5
                              ? "bg-purple-50 p-2"
                              : ""
                    }`}
                  >
                    {index === 3 ? (
                      "Lunch Break"
                    ) : index === 0 ? (
                      <div>
                        <div className="font-medium">AI-354</div>
                        <div className="mt-1 text-xs text-gray-500">Knowledge Rep.</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room AI-2
                        </div>
                      </div>
                    ) : index === 1 ? (
                      <div>
                        <div className="font-medium">MGT-121</div>
                        <div className="mt-1 text-xs text-gray-500">Marketing</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room B-3
                        </div>
                      </div>
                    ) : index === 5 ? (
                      <div>
                        <div className="font-medium">ISL-101</div>
                        <div className="mt-1 text-xs text-gray-500">Islamic Studies</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room G-1
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Wednesday */}
                  <div
                    className={`rounded-lg ${
                      index === 3
                        ? "bg-gray-100 p-2 text-center text-xs text-gray-500"
                        : index === 1
                          ? "bg-blue-50 p-2"
                          : index === 2
                            ? "bg-amber-50 p-2"
                            : index === 4
                              ? "bg-green-50 p-2"
                              : ""
                    }`}
                  >
                    {index === 3 ? (
                      "Lunch Break"
                    ) : index === 1 ? (
                      <div>
                        <div className="font-medium">CS-324</div>
                        <div className="mt-1 text-xs text-gray-500">Operating System</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room CS-3
                        </div>
                      </div>
                    ) : index === 2 ? (
                      <div>
                        <div className="font-medium">AI-353</div>
                        <div className="mt-1 text-xs text-gray-500">Machine Learning</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room AI-1
                        </div>
                      </div>
                    ) : index === 4 ? (
                      <div>
                        <div className="font-medium">AI-353</div>
                        <div className="mt-1 text-xs text-gray-500">ML (Lab)</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Lab 3
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Thursday */}
                  <div
                    className={`rounded-lg ${
                      index === 3
                        ? "bg-gray-100 p-2 text-center text-xs text-gray-500"
                        : index === 0
                          ? "bg-amber-50 p-2"
                          : index === 1
                            ? "bg-red-50 p-2"
                            : index === 4
                              ? "bg-purple-50 p-2"
                              : ""
                    }`}
                  >
                    {index === 3 ? (
                      "Lunch Break"
                    ) : index === 0 ? (
                      <div>
                        <div className="font-medium">AI-353</div>
                        <div className="mt-1 text-xs text-gray-500">Machine Learning</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room AI-1
                        </div>
                      </div>
                    ) : index === 1 ? (
                      <div>
                        <div className="font-medium">AI-354</div>
                        <div className="mt-1 text-xs text-gray-500">Knowledge Rep.</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room AI-2
                        </div>
                      </div>
                    ) : index === 4 ? (
                      <div>
                        <div className="font-medium">ISL-101</div>
                        <div className="mt-1 text-xs text-gray-500">Islamic Studies</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room G-1
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Friday */}
                  <div
                    className={`rounded-lg ${
                      index === 3
                        ? "bg-gray-100 p-2 text-center text-xs text-gray-500"
                        : index === 1
                          ? "bg-amber-50 p-2"
                          : index === 2
                            ? "bg-green-50 p-2"
                            : index === 5
                              ? "bg-red-50 p-2"
                              : ""
                    }`}
                  >
                    {index === 3 ? (
                      "Lunch Break"
                    ) : index === 1 ? (
                      <div>
                        <div className="font-medium">AI-353</div>
                        <div className="mt-1 text-xs text-gray-500">Machine Learning</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room AI-1
                        </div>
                      </div>
                    ) : index === 2 ? (
                      <div>
                        <div className="font-medium">MGT-121</div>
                        <div className="mt-1 text-xs text-gray-500">Marketing</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room B-3
                        </div>
                      </div>
                    ) : index === 5 ? (
                      <div>
                        <div className="font-medium">AI-354</div>
                        <div className="mt-1 text-xs text-gray-500">Knowledge Rep.</div>
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" /> Room AI-2
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">Class Color Legend</h3>
          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-2 bg-blue-50 text-blue-800">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              Operating System
            </Badge>
            <Badge className="flex items-center gap-2 bg-red-50 text-red-800">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              Knowledge Representation
            </Badge>
            <Badge className="flex items-center gap-2 bg-amber-50 text-amber-800">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              Machine Learning
            </Badge>
            <Badge className="flex items-center gap-2 bg-green-50 text-green-800">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              Marketing
            </Badge>
            <Badge className="flex items-center gap-2 bg-purple-50 text-purple-800">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              Islamic Studies
            </Badge>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

