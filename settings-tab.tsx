"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, User, Eye, EyeOff, Moon, Sun, Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { useThemeContext } from "@/components/theme-provider"

export default function SettingsTab() {
  // Keep existing state variables
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [language, setLanguage] = useState("english")
  const { toast } = useToast()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Add theme hooks
  const { setTheme, theme } = useTheme()
  const { themeOptions, setThemeOptions } = useThemeContext()
  const [darkMode, setDarkMode] = useState(theme === "dark")
  const [selectedTheme, setSelectedTheme] = useState(themeOptions.theme)
  const [fontScale, setFontScale] = useState([themeOptions.fontScale])

  // Update useEffect to handle theme changes
  useEffect(() => {
    if (theme) {
      setDarkMode(theme === "dark")
    }
    if (themeOptions) {
      setSelectedTheme(themeOptions.theme)
      setFontScale([themeOptions.fontScale])
    }
  }, [theme, themeOptions])

  // Update the dark mode toggle handler
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked)
    setTheme(checked ? "dark" : "light")
  }

  // Update the theme selection handler
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
    setThemeOptions((prev) => ({ ...prev, theme: value }))
  }

  // Update the font scale handler
  const handleFontScaleChange = (value: number[]) => {
    setFontScale(value)
    setThemeOptions((prev) => ({ ...prev, fontScale: value[0] }))
  }

  const handleSaveSettings = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
        variant: "success",
      })
    }, 1500)
  }

  const handlePasswordChange = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
      variant: "success",
    })
  }

  const handleResetSettings = () => {
    setDarkMode(false)
    setTheme("light")
    setSelectedTheme("default")
    setThemeOptions({ theme: "default", fontScale: 1 })
    setFontScale([1])
    setEmailNotifications(true)
    setSmsNotifications(false)
    setPushNotifications(true)
    setLanguage("english")

    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
      variant: "info",
    })
  }

  // Replace the dark mode toggle in the appearance tab with this updated version
  // Find the section with "Dark Mode" and replace it with:

  // In the appearance tab content, replace the dark mode section with:
  /*
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-medium">Dark Mode</h3>
      <p className="text-sm text-gray-500">Switch between light and dark themes</p>
    </div>
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-gray-500" />
      <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
      <Moon className="h-5 w-5 text-gray-500" />
    </div>
  </div>
  */

  // And replace the theme section with:
  /*
  <div>
    <h3 className="mb-4 text-lg font-medium">Theme</h3>
    <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-4">
      <div>
        <RadioGroupItem value="default" id="default" className="sr-only" />
        <Label
          htmlFor="default"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
            selectedTheme === "default" ? "border-blue-600" : ""
          }`}
        >
          <div className="mb-2 h-6 w-6 rounded-full bg-blue-600" />
          <span>Default</span>
        </Label>
      </div>
      <div>
        <RadioGroupItem value="purple" id="purple" className="sr-only" />
        <Label
          htmlFor="purple"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
            selectedTheme === "purple" ? "border-purple-600" : ""
          }`}
        >
          <div className="mb-2 h-6 w-6 rounded-full bg-purple-600" />
          <span>Purple</span>
        </Label>
      </div>
      <div>
        <RadioGroupItem value="green" id="green" className="sr-only" />
        <Label
          htmlFor="green"
          className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
            selectedTheme === "green" ? "border-green-600" : ""
          }`}
        >
          <div className="mb-2 h-6 w-6 rounded-full bg-green-600" />
          <span>Green</span>
        </Label>
      </div>
    </RadioGroup>
  </div>
  */

  // And replace the font size section with:
  /*
  <div>
    <h3 className="mb-2 text-lg font-medium">Font Size</h3>
    <p className="mb-4 text-sm text-gray-500">Adjust the text size for better readability</p>
    <div className="flex items-center space-x-2">
      <span className="text-sm">A</span>
      <Slider
        value={fontScale}
        min={0.8}
        max={1.4}
        step={0.1}
        onValueChange={handleFontScaleChange}
        className="flex-1"
      />
      <span className="text-lg">A</span>
    </div>
  </div>
  */

  return (
    // Keep the rest of the component as is
    <div key="settings-tab">
      <div className="mb-4 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center"
        >
          <Settings className="mr-2 h-6 w-6 text-navy-800" />
          <h1 className="text-2xl font-bold text-navy-900">Account Settings</h1>
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
          <span className="text-gray-700">Settings</span>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200 bg-gradient-to-r from-navy-800 to-navy-900 p-6 text-white dark:border-gray-700">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Settings className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Account Settings & Preferences</h2>
            </div>
            <p className="mb-4 text-white/80">
              Customize your account settings, notification preferences, and application appearance to enhance your
              experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <User className="h-4 w-4" />
                <span>Abdullah Khan (UW-22-AI-BS-014)</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Shield className="h-4 w-4" />
                <span>Last updated: March 31, 2025</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="mx-auto max-w-4xl p-6">
          <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Abdullah Khan" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="regNo">Registration Number</Label>
                    <Input id="regNo" defaultValue="UW-22-AI-BS-014" className="mt-1" disabled />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="abdullah.khan@uow.edu.pk" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input id="phone" defaultValue="+92 345 1234567" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <Input id="address" defaultValue="Quaid Avenue, Wah Cantt, Pakistan" className="mt-1" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Emergency Contact</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input id="emergencyName" defaultValue="Ahmed Khan" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select defaultValue="father">
                        <SelectTrigger id="relationship" className="mt-1">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="father">Father</SelectItem>
                          <SelectItem value="mother">Mother</SelectItem>
                          <SelectItem value="guardian">Guardian</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Contact Number</Label>
                      <Input id="emergencyPhone" defaultValue="+92 300 1234567" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="emergencyEmail">Email Address</Label>
                      <Input id="emergencyEmail" type="email" defaultValue="ahmed.khan@gmail.com" className="mt-1" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Social Media Profiles</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" defaultValue="linkedin.com/in/abdullah-khan" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input id="github" defaultValue="github.com/abdullah-khan" className="mt-1" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset
                  </Button>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="mt-1 flex items-center">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                          className="ml-2"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button onClick={handlePasswordChange} className="bg-blue-600 hover:bg-blue-700">
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Enhance your account security</p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">Enable 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Login History</h3>
                  <div className="rounded-lg border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Date & Time
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              IP Address
                            </th>
                            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Device
                            </th>
                            <th className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                            <td className="p-3">March 31, 2025 09:15 AM</td>
                            <td className="p-3">192.168.1.1</td>
                            <td className="p-3">Chrome on Windows</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Success
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
                            <td className="p-3">March 30, 2025 02:45 PM</td>
                            <td className="p-3">192.168.1.1</td>
                            <td className="p-3">Safari on iPhone</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Success
                              </Badge>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="p-3">March 29, 2025 11:30 AM</td>
                            <td className="p-3">203.0.113.1</td>
                            <td className="p-3">Firefox on MacOS</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                Failed
                              </Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications about important updates and activities
                    </p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>

                {notificationsEnabled && (
                  <>
                    <Separator />

                    <div>
                      <h3 className="mb-4 text-lg font-medium">Notification Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailNotif" className="font-medium">
                              Email Notifications
                            </Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="emailNotif"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="smsNotif" className="font-medium">
                              SMS Notifications
                            </Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
                          </div>
                          <Switch id="smsNotif" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="pushNotif" className="font-medium">
                              Push Notifications
                            </Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Receive notifications in the browser
                            </p>
                          </div>
                          <Switch id="pushNotif" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-4 text-lg font-medium">Notification Types</h3>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4 dark:border-gray-700">
                          <h4 className="mb-2 font-medium">Academic Notifications</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="grades" defaultChecked />
                              <Label htmlFor="grades">Grade Updates</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="assignments" defaultChecked />
                              <Label htmlFor="assignments">Assignment Deadlines</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="exams" defaultChecked />
                              <Label htmlFor="exams">Exam Schedules</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="attendance" defaultChecked />
                              <Label htmlFor="attendance">Attendance Alerts</Label>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 dark:border-gray-700">
                          <h4 className="mb-2 font-medium">Administrative Notifications</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="fees" defaultChecked />
                              <Label htmlFor="fees">Fee Reminders</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="registration" defaultChecked />
                              <Label htmlFor="registration">Course Registration</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="events" defaultChecked />
                              <Label htmlFor="events">Campus Events</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="announcements" defaultChecked />
                              <Label htmlFor="announcements">General Announcements</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset
                  </Button>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the portal looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                    <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Theme</h3>
                  <RadioGroup
                    value={selectedTheme}
                    onValueChange={handleThemeChange}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="default" id="default" className="sr-only" />
                      <Label
                        htmlFor="default"
                        className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                          selectedTheme === "default" ? "border-blue-600" : ""
                        }`}
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-blue-600" />
                        <span>Default</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="purple" id="purple" className="sr-only" />
                      <Label
                        htmlFor="purple"
                        className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                          selectedTheme === "purple" ? "border-purple-600" : ""
                        }`}
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-purple-600" />
                        <span>Purple</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="green" id="green" className="sr-only" />
                      <Label
                        htmlFor="green"
                        className={`flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                          selectedTheme === "green" ? "border-green-600" : ""
                        }`}
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-green-600" />
                        <span>Green</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-lg font-medium">Font Size</h3>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Adjust the text size for better readability
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">A</span>
                    <Slider
                      value={fontScale}
                      min={0.8}
                      max={1.4}
                      step={0.1}
                      onValueChange={handleFontScaleChange}
                      className="flex-1"
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-medium">Language</h3>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="urdu">Urdu</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset
                  </Button>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

