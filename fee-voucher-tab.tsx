"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Receipt,
  Download,
  Printer,
  AlertCircle,
  CreditCard,
  Calendar,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  DollarSign,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function FeeVoucherTab() {
  const [selectedSession, setSelectedSession] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedVoucher, setExpandedVoucher] = useState<string | null>(null)
  const { toast } = useToast()

  const feeVoucherData = [
    {
      id: "v1",
      voucherNo: "19278842",
      session: "SP25",
      issueDate: "2025-03-06",
      dueDate: "2025-03-24",
      validityDate: "2025-04-07",
      feeType: "Full Fee",
      status: "Paid",
      amount: 85000,
      paidDate: "2025-03-20",
      paidAmount: 85000,
      paymentMethod: "Online Banking",
      transactionId: "TXN-78945612",
      breakdown: [
        { item: "Tuition Fee", amount: 75000 },
        { item: "Lab Fee", amount: 5000 },
        { item: "Library Fee", amount: 2000 },
        { item: "Examination Fee", amount: 3000 },
      ],
    },
    {
      id: "v2",
      voucherNo: "19278843",
      session: "SP25",
      issueDate: "2025-03-06",
      dueDate: "2025-03-24",
      validityDate: "2025-04-07",
      feeType: "Hostel Fee",
      status: "Paid",
      amount: 35000,
      paidDate: "2025-03-22",
      paidAmount: 35000,
      paymentMethod: "Credit Card",
      transactionId: "TXN-78945613",
      breakdown: [
        { item: "Room Charges", amount: 25000 },
        { item: "Utility Charges", amount: 5000 },
        { item: "Mess Charges", amount: 5000 },
      ],
    },
    {
      id: "v3",
      voucherNo: "19273443",
      session: "FA24",
      issueDate: "2024-10-17",
      dueDate: "2024-11-08",
      validityDate: "2024-11-15",
      feeType: "Full Fee",
      status: "Paid",
      amount: 85000,
      paidDate: "2024-11-05",
      paidAmount: 85000,
      paymentMethod: "Bank Deposit",
      transactionId: "TXN-45678912",
      breakdown: [
        { item: "Tuition Fee", amount: 75000 },
        { item: "Lab Fee", amount: 5000 },
        { item: "Library Fee", amount: 2000 },
        { item: "Examination Fee", amount: 3000 },
      ],
    },
    {
      id: "v4",
      voucherNo: "19273444",
      session: "FA24",
      issueDate: "2024-10-17",
      dueDate: "2024-11-08",
      validityDate: "2024-11-15",
      feeType: "Hostel Fee",
      status: "Paid",
      amount: 35000,
      paidDate: "2024-11-06",
      paidAmount: 35000,
      paymentMethod: "Online Banking",
      transactionId: "TXN-45678913",
      breakdown: [
        { item: "Room Charges", amount: 25000 },
        { item: "Utility Charges", amount: 5000 },
        { item: "Mess Charges", amount: 5000 },
      ],
    },
    {
      id: "v5",
      voucherNo: "19263810",
      session: "SP24",
      issueDate: "2024-02-28",
      dueDate: "2024-03-15",
      validityDate: "2024-04-08",
      feeType: "Full Fee",
      status: "Paid",
      amount: 80000,
      paidDate: "2024-03-12",
      paidAmount: 80000,
      paymentMethod: "Bank Deposit",
      transactionId: "TXN-12345678",
      breakdown: [
        { item: "Tuition Fee", amount: 70000 },
        { item: "Lab Fee", amount: 5000 },
        { item: "Library Fee", amount: 2000 },
        { item: "Examination Fee", amount: 3000 },
      ],
    },
    {
      id: "v6",
      voucherNo: "19263811",
      session: "SP24",
      issueDate: "2024-02-28",
      dueDate: "2024-03-15",
      validityDate: "2024-04-08",
      feeType: "Hostel Fee",
      status: "Paid",
      amount: 35000,
      paidDate: "2024-03-14",
      paidAmount: 35000,
      paymentMethod: "Credit Card",
      transactionId: "TXN-12345679",
      breakdown: [
        { item: "Room Charges", amount: 25000 },
        { item: "Utility Charges", amount: 5000 },
        { item: "Mess Charges", amount: 5000 },
      ],
    },
  ]

  const feeItems = [
    { item: "Tuition Fee", amount: 50000 },
    { item: "Registration Fee", amount: 5000 },
    { item: "Examination Fee", amount: 3000 },
    { item: "Student Activity Fee", amount: 2000 },
    { item: "Technology Fee", amount: 1500 },
    { item: "Sports Fee", amount: 1000 },
    { item: "Development Fee", amount: 2500 },
  ]

  const filteredVouchers = feeVoucherData.filter((voucher) => {
    if (selectedSession !== "all" && voucher.session !== selectedSession) return false
    if (
      searchQuery &&
      !(
        voucher.voucherNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voucher.feeType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false
    return true
  })

  const toggleVoucherDetails = (id: string) => {
    if (expandedVoucher === id) {
      setExpandedVoucher(null)
    } else {
      setExpandedVoucher(id)
    }
  }

  const handleDownload = (voucherId: string) => {
    toast({
      title: "Voucher Downloaded",
      description: `Fee voucher ${voucherId} has been downloaded successfully.`,
      variant: "success",
    })
  }

  const handlePrint = (voucherId: string) => {
    toast({
      title: "Printing Voucher",
      description: `Fee voucher ${voucherId} is being sent to the printer.`,
      variant: "info",
    })
  }

  const handleExportHistory = () => {
    toast({
      title: "Payment History Exported",
      description: "Your payment history has been exported successfully.",
      variant: "success",
    })
  }

  // Calculate total fees paid
  const totalPaid = feeVoucherData.reduce((sum, voucher) => sum + voucher.paidAmount, 0)

  // Calculate fee breakdown by type
  const tuitionTotal = feeVoucherData.reduce((sum, voucher) => {
    const tuition = voucher.breakdown.find((item) => item.item === "Tuition Fee")
    return sum + (tuition?.amount || 0)
  }, 0)

  const hostelTotal = feeVoucherData.reduce((sum, voucher) => {
    if (voucher.feeType === "Hostel Fee") {
      return sum + voucher.amount
    }
    return sum
  }, 0)

  const otherTotal = totalPaid - tuitionTotal - hostelTotal

  return (
    <div key="feevoucher-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <Receipt className="mr-2 h-6 w-6 text-navy-800 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Fee Vouchers</h1>
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
          <span className="text-gray-700 dark:text-gray-300">Fee Voucher</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200 bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white dark:border-gray-700">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Receipt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Financial Records & Payments</h2>
            </div>
            <p className="mb-4 text-white/80">
              View and manage your fee vouchers, payment history, and financial records in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <DollarSign className="h-4 w-4" />
                <span>Total Paid: PKR {totalPaid.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Current Session: Spring 2025</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Next Due: No Pending Payments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="vouchers" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="vouchers">Fee Vouchers</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="analytics">Financial Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="vouchers" className="space-y-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select defaultValue={selectedSession} onValueChange={setSelectedSession}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sessions</SelectItem>
                      <SelectItem value="SP25">Spring 2025</SelectItem>
                      <SelectItem value="FA24">Fall 2024</SelectItem>
                      <SelectItem value="SP24">Spring 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <Input
                      placeholder="Search vouchers..."
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
                <CardHeader>
                  <CardTitle>Fee Vouchers</CardTitle>
                  <CardDescription>View and manage your fee vouchers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {filteredVouchers.length > 0 ? (
                        filteredVouchers.map((voucher) => (
                          <motion.div
                            key={voucher.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden rounded-lg border dark:border-gray-700"
                          >
                            <div
                              className="flex cursor-pointer items-center justify-between border-b p-4 dark:border-gray-700"
                              onClick={() => toggleVoucherDetails(voucher.id)}
                            >
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Voucher #{voucher.voucherNo}</span>
                                      <Badge
                                        className={
                                          voucher.status === "Paid"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                        }
                                      >
                                        {voucher.status}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {voucher.feeType} - {voucher.session}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Issue Date: {voucher.issueDate}
                                    </p>
                                  </div>
                                  <div className="mt-2 md:mt-0 md:text-right">
                                    <p className="font-medium">PKR {voucher.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Due Date: {voucher.dueDate}
                                    </p>
                                    {voucher.status === "Paid" && (
                                      <p className="text-xs text-green-600 dark:text-green-400">
                                        Paid on: {voucher.paidDate}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4">
                                {expandedVoucher === voucher.id ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                )}
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedVoucher === voucher.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="p-4">
                                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-2 font-medium">Voucher Details</h4>
                                        <div className="space-y-1 text-sm">
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Voucher Number:</span>{" "}
                                            {voucher.voucherNo}
                                          </p>
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Session:</span>{" "}
                                            {voucher.session}
                                          </p>
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Fee Type:</span>{" "}
                                            {voucher.feeType}
                                          </p>
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Issue Date:</span>{" "}
                                            {voucher.issueDate}
                                          </p>
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Due Date:</span>{" "}
                                            {voucher.dueDate}
                                          </p>
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Validity Date:</span>{" "}
                                            {voucher.validityDate}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-2 font-medium">Payment Details</h4>
                                        <div className="space-y-1 text-sm">
                                          <p>
                                            <span className="text-gray-500 dark:text-gray-400">Status:</span>{" "}
                                            {voucher.status}
                                          </p>
                                          {voucher.status === "Paid" && (
                                            <>
                                              <p>
                                                <span className="text-gray-500 dark:text-gray-400">Paid Date:</span>{" "}
                                                {voucher.paidDate}
                                              </p>
                                              <p>
                                                <span className="text-gray-500 dark:text-gray-400">Paid Amount:</span>{" "}
                                                PKR {voucher.paidAmount.toLocaleString()}
                                              </p>
                                              <p>
                                                <span className="text-gray-500 dark:text-gray-400">
                                                  Payment Method:
                                                </span>{" "}
                                                {voucher.paymentMethod}
                                              </p>
                                              <p>
                                                <span className="text-gray-500 dark:text-gray-400">
                                                  Transaction ID:
                                                </span>{" "}
                                                {voucher.transactionId}
                                              </p>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-4">
                                      <h4 className="mb-2 font-medium">Fee Breakdown</h4>
                                      <div className="rounded-lg border dark:border-gray-700">
                                        <div className="overflow-x-auto">
                                          <table className="w-full">
                                            <thead>
                                              <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                                                <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                  Item
                                                </th>
                                                <th className="p-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                                                  Amount (PKR)
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {voucher.breakdown.map((item, index) => (
                                                <tr
                                                  key={index}
                                                  className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                                                >
                                                  <td className="p-3">{item.item}</td>
                                                  <td className="p-3 text-right">{item.amount.toLocaleString()}</td>
                                                </tr>
                                              ))}
                                              <tr className="bg-gray-50 font-medium dark:bg-gray-900">
                                                <td className="p-3">Total</td>
                                                <td className="p-3 text-right">{voucher.amount.toLocaleString()}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => handlePrint(voucher.id)}
                                      >
                                        <Printer className="h-4 w-4" />
                                        Print
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => handleDownload(voucher.id)}
                                      >
                                        <Download className="h-4 w-4" />
                                        Download
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                                      >
                                        <ArrowUpRight className="h-4 w-4" />
                                        View Full Details
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="rounded-lg border border-dashed p-8 text-center dark:border-gray-700"
                        >
                          <p className="text-gray-500 dark:text-gray-400">
                            No vouchers found matching your search criteria.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Track all your fee payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={handleExportHistory}
                    >
                      <Download className="h-4 w-4" />
                      Export History
                    </Button>
                  </div>

                  <div className="rounded-lg border dark:border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Voucher
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Description
                            </th>
                            <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Method
                            </th>
                            <th className="p-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeVoucherData
                            .filter((v) => v.status === "Paid")
                            .map((voucher) => (
                              <motion.tr
                                key={voucher.id}
                                className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <td className="p-3">{voucher.paidDate}</td>
                                <td className="p-3 font-medium">#{voucher.voucherNo}</td>
                                <td className="p-3">
                                  {voucher.feeType} - {voucher.session}
                                </td>
                                <td className="p-3 text-center">
                                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    {voucher.paymentMethod}
                                  </Badge>
                                </td>
                                <td className="p-3 text-right">PKR {voucher.paidAmount.toLocaleString()}</td>
                              </motion.tr>
                            ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-50 font-medium dark:bg-gray-900">
                            <td colSpan={4} className="p-3 text-right">
                              Total Paid:
                            </td>
                            <td className="p-3 text-right">PKR {totalPaid.toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Your preferred payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Online Banking</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Bank Alfalah</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Primary
                      </Badge>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Credit Card</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Visa ****4582</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900 dark:text-amber-400">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Bank Deposit</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">HBL Branch</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </motion.div>

                    <div className="flex justify-center">
                      <Button className="bg-green-600 hover:bg-green-700">Add Payment Method</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Analytics</CardTitle>
                  <CardDescription>Visualize your fee payments and expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Total Paid</h3>
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="mt-2 text-2xl font-bold">PKR {totalPaid.toLocaleString()}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Across all semesters</p>
                    </div>

                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Current Semester</h3>
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="mt-2 text-2xl font-bold">PKR 120,000</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Spring 2025</p>
                    </div>

                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Pending Payments</h3>
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <p className="mt-2 text-2xl font-bold">PKR 0</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No pending payments</p>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Fee Breakdown</h3>
                        <PieChart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                              <span className="text-sm">Tuition Fee</span>
                            </span>
                            <span className="text-sm font-medium">{Math.round((tuitionTotal / totalPaid) * 100)}%</span>
                          </div>
                          <Progress value={Math.round((tuitionTotal / totalPaid) * 100)} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-green-500"></div>
                              <span className="text-sm">Hostel Fee</span>
                            </span>
                            <span className="text-sm font-medium">{Math.round((hostelTotal / totalPaid) * 100)}%</span>
                          </div>
                          <Progress value={Math.round((hostelTotal / totalPaid) * 100)} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                              <span className="text-sm">Other Fees</span>
                            </span>
                            <span className="text-sm font-medium">{Math.round((otherTotal / totalPaid) * 100)}%</span>
                          </div>
                          <Progress value={Math.round((otherTotal / totalPaid) * 100)} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Payment Methods</h3>
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                              <span className="text-sm">Online Banking</span>
                            </span>
                            <span className="text-sm font-medium">50%</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                              <span className="text-sm">Credit Card</span>
                            </span>
                            <span className="text-sm font-medium">33%</span>
                          </div>
                          <Progress value={33} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                              <span className="text-sm">Bank Deposit</span>
                            </span>
                            <span className="text-sm font-medium">17%</span>
                          </div>
                          <Progress value={17} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Semester-wise Expenses</h3>
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Spring 2025</span>
                          <span className="text-sm font-medium">PKR 120,000</span>
                        </div>
                        <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-xs text-white"
                            style={{ width: "100%" }}
                          >
                            <div className="flex h-full items-center justify-center">PKR 120,000</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Fall 2024</span>
                          <span className="text-sm font-medium">PKR 120,000</span>
                        </div>
                        <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-xs text-white"
                            style={{ width: "100%" }}
                          >
                            <div className="flex h-full items-center justify-center">PKR 120,000</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Spring 2024</span>
                          <span className="text-sm font-medium">PKR 115,000</span>
                        </div>
                        <div className="h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-xs text-white"
                            style={{ width: "95.8%" }}
                          >
                            <div className="flex h-full items-center justify-center">PKR 115,000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Calendar</CardTitle>
                  <CardDescription>Important financial dates and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                      <Calendar className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-navy-900 dark:text-white">Fall 2025 Fee Submission</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">August 15 - September 5, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                      <Calendar className="mt-0.5 h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="font-medium text-navy-900 dark:text-white">Scholarship Application Deadline</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">July 30, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                      <Calendar className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-navy-900 dark:text-white">Financial Aid Application</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">June 1 - July 15, 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/30">
            <div className="flex items-start">
              <AlertCircle className="mr-3 mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-500" />
              <div>
                <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Late Fee Warning</h4>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                  A late fee of PKR 100 per day will be charged for payments made after the due date. Students with
                  outstanding dues may face restrictions in accessing university services and registration for exams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

