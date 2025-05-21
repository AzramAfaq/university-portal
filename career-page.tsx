"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Calendar,
  FileText,
  GraduationCap,
  MapPin,
  Search,
  Upload,
  Clock,
  Users,
  ChevronRight,
  Star,
  Briefcase,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Download,
  Bookmark,
  RefreshCw,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const jobListRef = useRef<HTMLDivElement>(null)

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      location: "New York, NY",
      type: "Full-time",
      posted: "2 days ago",
      deadline: "June 15, 2025",
      description:
        "We are looking for a Software Engineer to join our team to design, develop and implement software solutions that meet our company's needs. You will be working with a team of experienced developers on challenging projects.",
      requirements:
        "• Bachelor's degree in Computer Science, Engineering or related field\n• 2+ years of experience in software development\n• Proficiency in one or more programming languages (Java, Python, JavaScript)\n• Experience with web development frameworks\n• Strong problem-solving skills and attention to detail\n• Excellent communication and teamwork abilities",
      responsibilities:
        "• Design, develop, and maintain software applications\n• Collaborate with cross-functional teams\n• Write clean, scalable code\n• Test and debug programs\n• Improve existing software",
      salary: "$80,000 - $120,000",
      benefits: ["Health insurance", "401(k) matching", "Flexible work hours", "Professional development budget"],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      skills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
      applicationProcess: "2-stage interview process with technical assessment",
      remoteOption: "Hybrid (2 days in office required)",
      industry: "Technology",
      companySize: "50-200 employees",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Data Insights Co.",
      location: "Remote",
      type: "Contract",
      posted: "1 week ago",
      deadline: "June 30, 2025",
      description:
        "Join our data team to analyze and interpret complex data sets to drive business decisions. You will work closely with stakeholders to understand their needs and provide data-driven insights.",
      requirements:
        "• Bachelor's degree in Statistics, Mathematics, Economics, or related field\n• Strong SQL skills and experience with data visualization tools\n• Proficiency in Excel and statistical analysis\n• Experience with BI tools like Tableau or Power BI\n• Excellent analytical and problem-solving skills",
      responsibilities:
        "• Collect, process, and analyze data from various sources\n• Create reports and dashboards\n• Identify trends and patterns in data\n• Present findings to stakeholders\n• Recommend improvements based on data analysis",
      salary: "$70,000 - $90,000",
      benefits: ["Health insurance", "Remote work", "Flexible schedule", "Learning stipend"],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: false,
      skills: ["SQL", "Python", "Tableau", "Excel", "Statistics"],
      applicationProcess: "Take-home assignment followed by panel interview",
      remoteOption: "Fully remote",
      industry: "Business Intelligence",
      companySize: "20-50 employees",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Designs",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "3 days ago",
      deadline: "June 20, 2025",
      description:
        "Design intuitive user interfaces for web and mobile applications that provide exceptional user experiences. You will collaborate with product managers and developers to create visually appealing and functional designs.",
      requirements:
        "• Bachelor's degree in Design, HCI, or related field\n• Portfolio showcasing UX/UI projects\n• Proficiency in design tools like Figma, Sketch, or Adobe XD\n• Understanding of user-centered design principles\n• Experience with responsive design and accessibility standards",
      responsibilities:
        "• Create wireframes, prototypes, and high-fidelity mockups\n• Conduct user research and usability testing\n• Develop user flows and information architecture\n• Collaborate with development team on implementation\n• Maintain design systems and documentation",
      salary: "$85,000 - $110,000",
      benefits: ["Health and dental insurance", "Unlimited PTO", "Home office stipend", "Design conference budget"],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Interaction Design"],
      applicationProcess: "Portfolio review and design challenge",
      remoteOption: "Remote with quarterly on-site meetings",
      industry: "Design Agency",
      companySize: "10-50 employees",
    },
    {
      id: 4,
      title: "Marketing Intern",
      company: "Global Marketing Group",
      location: "Chicago, IL",
      type: "Internship",
      posted: "5 days ago",
      deadline: "June 10, 2025",
      description:
        "Assist the marketing team with campaigns and social media management. This internship provides hands-on experience in digital marketing strategies and content creation.",
      requirements:
        "• Currently pursuing a degree in Marketing, Communications, or related field\n• Strong written and verbal communication skills\n• Familiarity with social media platforms\n• Basic understanding of marketing principles\n• Creativity and attention to detail",
      responsibilities:
        "• Assist with social media content creation and scheduling\n• Help with email marketing campaigns\n• Conduct market research\n• Support event planning and execution\n• Track and report on marketing metrics",
      salary: "$20/hour",
      benefits: [
        "Academic credit",
        "Flexible schedule",
        "Networking opportunities",
        "Potential for full-time employment",
      ],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: false,
      skills: ["Social Media", "Content Creation", "Email Marketing", "Analytics", "SEO"],
      applicationProcess: "Resume submission and phone interview",
      remoteOption: "In-office with some remote flexibility",
      industry: "Marketing",
      companySize: "100-500 employees",
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Innovative Solutions",
      location: "Austin, TX",
      type: "Full-time",
      posted: "1 day ago",
      deadline: "July 5, 2025",
      description:
        "Lead project teams and ensure timely delivery of projects within scope and budget. You will be responsible for planning, executing, and closing projects while managing stakeholder expectations.",
      requirements:
        "• Bachelor's degree in Business, Engineering, or related field\n• PMP certification preferred\n• 5+ years of project management experience\n• Strong leadership and communication skills\n• Experience with project management tools and methodologies",
      responsibilities:
        "• Develop project plans and timelines\n• Coordinate team members and resources\n• Monitor project progress and make adjustments as needed\n• Communicate with stakeholders\n• Identify and mitigate risks",
      salary: "$90,000 - $130,000",
      benefits: [
        "Comprehensive health package",
        "401(k) with matching",
        "Professional development",
        "Performance bonuses",
      ],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      skills: ["Agile", "Scrum", "Jira", "Budgeting", "Risk Management"],
      applicationProcess: "Multiple rounds of interviews with team and leadership",
      remoteOption: "Hybrid (3 days in office)",
      industry: "Technology",
      companySize: "200-500 employees",
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebTech Solutions",
      location: "Boston, MA",
      type: "Full-time",
      posted: "4 days ago",
      deadline: "June 25, 2025",
      description:
        "Join our team to build responsive and interactive web applications. You'll work closely with designers and backend developers to create seamless user experiences.",
      requirements:
        "• Bachelor's degree in Computer Science or related field\n• 3+ years of frontend development experience\n• Strong proficiency in JavaScript, HTML, CSS\n• Experience with modern frontend frameworks (React, Vue, or Angular)\n• Knowledge of responsive design and cross-browser compatibility",
      responsibilities:
        "• Develop user interface components\n• Implement responsive designs\n• Optimize applications for maximum performance\n• Collaborate with UX designers and backend developers\n• Stay updated with emerging technologies",
      salary: "$85,000 - $115,000",
      benefits: ["Health and dental coverage", "Flexible work hours", "Remote work options", "Continuing education"],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: false,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
      applicationProcess: "Technical interview and coding challenge",
      remoteOption: "Hybrid (flexible)",
      industry: "Web Development",
      companySize: "50-100 employees",
    },
    {
      id: 7,
      title: "Cybersecurity Analyst",
      company: "SecureNet",
      location: "Washington, DC",
      type: "Full-time",
      posted: "2 days ago",
      deadline: "July 10, 2025",
      description:
        "Protect our organization's digital assets by monitoring, detecting, investigating, and responding to security threats and incidents.",
      requirements:
        "• Bachelor's degree in Cybersecurity, IT, or related field\n• Security certifications (CISSP, CEH, Security+) preferred\n• 2+ years of experience in cybersecurity\n• Knowledge of security frameworks and compliance standards\n• Experience with security tools and technologies",
      responsibilities:
        "• Monitor security systems and networks\n• Analyze security breaches and incidents\n• Implement security measures and controls\n• Conduct vulnerability assessments\n• Develop security documentation and training",
      salary: "$95,000 - $125,000",
      benefits: [
        "Comprehensive health insurance",
        "Professional certification reimbursement",
        "Gym membership",
        "Annual security conference attendance",
      ],
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      skills: ["Network Security", "Incident Response", "Vulnerability Assessment", "SIEM", "Threat Intelligence"],
      applicationProcess: "Background check and technical assessment",
      remoteOption: "Hybrid (some on-site work required)",
      industry: "Cybersecurity",
      companySize: "100-250 employees",
    },
  ]

  const internships = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "Tech Innovations",
      location: "Boston, MA",
      duration: "3 months",
      posted: "1 week ago",
      deadline: "June 5, 2025",
      stipend: "$25/hour",
      description:
        "Gain hands-on experience in software development working alongside experienced engineers. You'll contribute to real projects and learn modern development practices.",
      requirements:
        "• Currently pursuing a degree in Computer Science or related field\n• Knowledge of at least one programming language\n• Basic understanding of software development principles\n• Eagerness to learn and problem-solve",
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      mentorship: "1:1 mentoring with senior developer",
      projects: ["Mobile app feature development", "API integration", "Bug fixing"],
      technologies: ["JavaScript", "React Native", "Node.js"],
      workSchedule: "40 hours/week, flexible hours",
    },
    {
      id: 2,
      title: "Research Assistant",
      company: "University Research Lab",
      location: "On Campus",
      duration: "6 months",
      posted: "3 days ago",
      deadline: "June 12, 2025",
      stipend: "$20/hour",
      description:
        "Assist faculty researchers with data collection, analysis, and literature reviews. This position offers valuable research experience and potential for academic publication.",
      requirements:
        "• Currently enrolled student with good academic standing\n• Strong analytical and writing skills\n• Attention to detail and ability to follow protocols\n• Interest in academic research",
      companyLogo: "/images/university-logo.png",
      featured: false,
      mentorship: "Direct supervision by faculty researcher",
      projects: ["Literature review", "Data collection", "Statistical analysis"],
      technologies: ["SPSS", "R", "Research databases"],
      workSchedule: "20 hours/week, flexible schedule",
    },
    {
      id: 3,
      title: "Finance Intern",
      company: "Global Finance Corp",
      location: "New York, NY",
      duration: "Summer 2025",
      posted: "5 days ago",
      deadline: "June 20, 2025",
      stipend: "$22/hour",
      description:
        "Work with financial analysts to learn about financial modeling, market analysis, and investment strategies. This internship provides exposure to various aspects of corporate finance.",
      requirements:
        "• Pursuing a degree in Finance, Economics, or related field\n• Strong analytical and quantitative skills\n• Proficiency in Excel\n• Interest in financial markets and analysis",
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      mentorship: "Rotation program with exposure to different finance teams",
      projects: ["Financial modeling", "Market research", "Investment analysis"],
      technologies: ["Excel", "Bloomberg Terminal", "Financial modeling tools"],
      workSchedule: "40 hours/week, 9am-5pm",
    },
    {
      id: 4,
      title: "Marketing Content Creator",
      company: "Digital Media Agency",
      location: "Remote",
      duration: "4 months",
      posted: "2 days ago",
      deadline: "June 15, 2025",
      stipend: "$18/hour",
      description:
        "Create engaging content for social media platforms and assist with digital marketing campaigns. This internship offers practical experience in content creation and digital marketing strategies.",
      requirements:
        "• Pursuing a degree in Marketing, Communications, or related field\n• Creative writing skills\n• Familiarity with social media platforms\n• Basic graphic design knowledge is a plus",
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: false,
      mentorship: "Weekly feedback sessions with Marketing Director",
      projects: ["Social media campaign", "Blog writing", "Email newsletter design"],
      technologies: ["Canva", "Hootsuite", "Google Analytics"],
      workSchedule: "30 hours/week, flexible remote work",
    },
    {
      id: 5,
      title: "Data Science Intern",
      company: "Analytics Innovations",
      location: "Chicago, IL",
      duration: "6 months",
      posted: "1 week ago",
      deadline: "June 25, 2025",
      stipend: "$24/hour",
      description:
        "Apply data science techniques to real-world business problems. You'll work with large datasets to extract insights and build predictive models.",
      requirements:
        "• Pursuing a degree in Data Science, Statistics, or related field\n• Experience with Python or R\n• Knowledge of statistical methods\n• Familiarity with machine learning concepts",
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: true,
      mentorship: "Paired with senior data scientist",
      projects: ["Customer segmentation analysis", "Predictive modeling", "Data visualization"],
      technologies: ["Python", "Pandas", "Scikit-learn", "Tableau"],
      workSchedule: "40 hours/week, hybrid arrangement",
    },
    {
      id: 6,
      title: "Human Resources Intern",
      company: "Global Staffing Solutions",
      location: "Dallas, TX",
      duration: "3 months",
      posted: "4 days ago",
      deadline: "June 18, 2025",
      stipend: "$17/hour",
      description:
        "Gain practical experience in various HR functions including recruitment, onboarding, and employee relations. Learn how HR supports organizational goals and employee development.",
      requirements:
        "• Pursuing a degree in Human Resources, Business, or related field\n• Strong interpersonal and communication skills\n• Detail-oriented with good organizational abilities\n• Interest in HR practices and employee development",
      companyLogo: "/placeholder.svg?height=50&width=50",
      featured: false,
      mentorship: "Shadowing opportunities with different HR specialists",
      projects: ["Recruitment process improvement", "Onboarding materials development", "Employee engagement survey"],
      technologies: ["HRIS systems", "ATS platforms", "Microsoft Office Suite"],
      workSchedule: "25 hours/week, in-office experience",
    },
  ]

  const workshops = [
    {
      id: 1,
      title: "Resume Building Workshop",
      date: "May 25, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Student Center, Room 302",
      presenter: "Career Services Team",
      description:
        "Learn how to create a standout resume that highlights your skills and experiences effectively. This workshop covers resume formats, content optimization, and common mistakes to avoid.",
      registrationDeadline: "May 23, 2025",
      capacity: 30,
      registered: 18,
      materials: ["Resume templates", "Action verbs handout", "Sample resumes"],
      targetAudience: "All students, especially juniors and seniors",
      skillLevel: "Beginner to Intermediate",
      followUpResources: true,
    },
    {
      id: 2,
      title: "Interview Skills Masterclass",
      date: "June 2, 2025",
      time: "1:00 PM - 3:30 PM",
      location: "Business Building, Auditorium",
      presenter: "Prof. James Wilson & Industry Partners",
      description:
        "Prepare for job interviews with this comprehensive masterclass covering behavioral and technical interview questions, body language, and follow-up strategies.",
      registrationDeadline: "May 30, 2025",
      capacity: 50,
      registered: 35,
      materials: ["Interview question bank", "Mock interview guidelines", "Feedback forms"],
      targetAudience: "Students actively applying for jobs or internships",
      skillLevel: "All levels",
      followUpResources: true,
    },
    {
      id: 3,
      title: "Networking for Success",
      date: "June 10, 2025",
      time: "5:00 PM - 7:00 PM",
      location: "Virtual (Zoom)",
      presenter: "Alumni Association",
      description:
        "Develop effective networking skills to build professional relationships that can advance your career. Learn networking strategies for both in-person and virtual environments.",
      registrationDeadline: "June 8, 2025",
      capacity: 100,
      registered: 42,
      materials: ["Networking scripts", "Digital business card templates", "LinkedIn optimization guide"],
      targetAudience: "All students and recent graduates",
      skillLevel: "Beginner to Advanced",
      followUpResources: true,
    },
    {
      id: 4,
      title: "LinkedIn Profile Optimization",
      date: "June 15, 2025",
      time: "3:00 PM - 4:30 PM",
      location: "Computer Lab, Room 105",
      presenter: "Digital Career Specialists",
      description:
        "Create a compelling LinkedIn profile that attracts recruiters and showcases your professional brand. Bring your laptop for hands-on profile updates during the workshop.",
      registrationDeadline: "June 13, 2025",
      capacity: 25,
      registered: 20,
      materials: ["LinkedIn checklist", "Headline and summary templates", "Profile review rubric"],
      targetAudience: "All students with LinkedIn profiles",
      skillLevel: "Beginner to Intermediate",
      followUpResources: true,
    },
    {
      id: 5,
      title: "Salary Negotiation Workshop",
      date: "June 20, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Business Building, Room 204",
      presenter: "Dr. Emily Rodriguez, Negotiation Expert",
      description:
        "Learn effective strategies for negotiating job offers and compensation packages. This workshop includes role-playing exercises and practical scripts for different negotiation scenarios.",
      registrationDeadline: "June 18, 2025",
      capacity: 30,
      registered: 12,
      materials: ["Negotiation scripts", "Compensation research guide", "Benefits evaluation worksheet"],
      targetAudience: "Senior students and graduate students",
      skillLevel: "Intermediate",
      followUpResources: true,
    },
    {
      id: 6,
      title: "Tech Industry Career Panel",
      date: "June 25, 2025",
      time: "5:30 PM - 7:30 PM",
      location: "Engineering Building, Lecture Hall 1",
      presenter: "Panel of Tech Industry Professionals",
      description:
        "Hear from professionals working at leading tech companies about career paths, industry trends, and advice for breaking into the tech sector. Q&A session included.",
      registrationDeadline: "June 23, 2025",
      capacity: 75,
      registered: 48,
      materials: ["Speaker bios", "Company information packets", "Industry trend report"],
      targetAudience: "Computer Science, IT, and Engineering students",
      skillLevel: "All levels",
      followUpResources: false,
    },
    {
      id: 7,
      title: "Graduate School Application Workshop",
      date: "July 5, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "Library, Conference Room A",
      presenter: "Academic Advisors and Graduate School Alumni",
      description:
        "Navigate the graduate school application process with guidance on selecting programs, preparing application materials, and securing recommendations. Includes tips for writing compelling personal statements.",
      registrationDeadline: "July 3, 2025",
      capacity: 40,
      registered: 15,
      materials: ["Application timeline", "Personal statement examples", "Recommendation request templates"],
      targetAudience: "Junior and senior students considering graduate school",
      skillLevel: "Beginner",
      followUpResources: true,
    },
  ]

  const resources = [
    {
      id: 1,
      title: "Resume Templates",
      category: "Documents",
      description: "Professional resume templates for different career stages and industries",
      downloadable: true,
      featured: true,
      fileType: "DOCX, PDF",
      lastUpdated: "April 2025",
      usageInstructions: "Available in both Word and PDF formats with detailed customization instructions",
      relatedWorkshops: [1],
    },
    {
      id: 2,
      title: "Interview Question Database",
      category: "Preparation",
      description: "Comprehensive collection of common interview questions with sample answers",
      downloadable: false,
      featured: true,
      accessType: "Online database",
      lastUpdated: "May 2025",
      usageInstructions: "Searchable by industry, job level, and question type",
      relatedWorkshops: [2],
    },
    {
      id: 3,
      title: "Career Assessment Tools",
      category: "Self-Assessment",
      description: "Tools to help you identify your strengths, interests, and suitable career paths",
      downloadable: false,
      featured: false,
      accessType: "Online platform",
      lastUpdated: "March 2025",
      usageInstructions: "Complete assessments online and schedule follow-up with career advisor to discuss results",
      relatedWorkshops: [],
    },
    {
      id: 4,
      title: "Networking Email Templates",
      category: "Documents",
      description: "Professional email templates for networking and follow-ups",
      downloadable: true,
      featured: false,
      fileType: "DOCX, PDF",
      lastUpdated: "February 2025",
      usageInstructions: "Customizable templates for different networking scenarios",
      relatedWorkshops: [3],
    },
    {
      id: 5,
      title: "Salary Negotiation Guide",
      category: "Preparation",
      description: "Strategies and scripts for negotiating job offers and compensation packages",
      downloadable: true,
      featured: true,
      fileType: "PDF",
      lastUpdated: "April 2025",
      usageInstructions: "Includes industry-specific salary data and negotiation scripts",
      relatedWorkshops: [5],
    },
    {
      id: 6,
      title: "Industry Research Reports",
      category: "Research",
      description: "In-depth reports on job market trends and industry outlooks",
      downloadable: true,
      featured: false,
      fileType: "PDF",
      lastUpdated: "May 2025",
      usageInstructions: "Updated quarterly with the latest industry data and projections",
      relatedWorkshops: [6],
    },
    {
      id: 7,
      title: "LinkedIn Profile Checklist",
      category: "Documents",
      description: "Step-by-step guide to creating an optimized LinkedIn profile",
      downloadable: true,
      featured: true,
      fileType: "PDF",
      lastUpdated: "May 2025",
      usageInstructions: "Comprehensive checklist with examples of strong profiles",
      relatedWorkshops: [4],
    },
    {
      id: 8,
      title: "Cover Letter Guide",
      category: "Documents",
      description: "Templates and guidelines for writing effective cover letters",
      downloadable: true,
      featured: false,
      fileType: "DOCX, PDF",
      lastUpdated: "March 2025",
      usageInstructions: "Includes industry-specific examples and customizable templates",
      relatedWorkshops: [1],
    },
    {
      id: 9,
      title: "Graduate School Application Guide",
      category: "Preparation",
      description: "Comprehensive guide to applying for graduate programs",
      downloadable: true,
      featured: false,
      fileType: "PDF",
      lastUpdated: "April 2025",
      usageInstructions: "Includes timelines, personal statement tips, and application checklists",
      relatedWorkshops: [7],
    },
    {
      id: 10,
      title: "Job Search Strategy Workbook",
      category: "Self-Assessment",
      description: "Interactive workbook to develop a personalized job search strategy",
      downloadable: true,
      featured: true,
      fileType: "PDF",
      lastUpdated: "May 2025",
      usageInstructions: "Complete the exercises to create a tailored job search plan",
      relatedWorkshops: [],
    },
  ]

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesJobType = jobTypeFilter === "all" || job.type.toLowerCase() === jobTypeFilter.toLowerCase()
    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" && job.location.toLowerCase() === "remote") ||
      (locationFilter === "onsite" && job.location.toLowerCase() !== "remote")

    return matchesSearch && matchesJobType && matchesLocation
  })

  // Handle job application submission
  const handleApplySubmit = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsApplyDialogOpen(false)
      setShowSuccessMessage(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }, 1500)
  }

  // Toggle saved job
  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  // Scroll to top of job list when filters change
  useEffect(() => {
    if (jobListRef.current) {
      jobListRef.current.scrollTop = 0
    }
  }, [searchTerm, jobTypeFilter, locationFilter])

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-navy-50 dark:bg-navy-900 p-2 rounded-full">
            <Briefcase className="h-6 w-6 text-navy-600 dark:text-navy-300" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Career Center</h1>
        </div>
        <p className="text-muted-foreground">
          Explore job opportunities, internships, and career development resources
        </p>
      </div>

      <Tabs defaultValue="jobs" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6 md:mb-8">
          <TabsTrigger
            value="jobs"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            <Briefcase className="h-4 w-4 mr-2 hidden md:inline" />
            Jobs
          </TabsTrigger>
          <TabsTrigger
            value="internships"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            <GraduationCap className="h-4 w-4 mr-2 hidden md:inline" />
            Internships
          </TabsTrigger>
          <TabsTrigger
            value="workshops"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
            Workshops
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="data-[state=active]:bg-navy-100 data-[state=active]:text-navy-800 dark:data-[state=active]:bg-navy-800 dark:data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4 mr-2 hidden md:inline" />
            Resources
          </TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs by title, company, or skills..."
                className="pl-8 pr-4 border-navy-200 focus:border-navy-400 focus:ring-navy-400 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select defaultValue="all" onValueChange={setJobTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-navy-200 focus:border-navy-400 focus:ring-navy-400 transition-all duration-300">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all" onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-navy-200 focus:border-navy-400 focus:ring-navy-400 transition-all duration-300">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="border-navy-200 hover:border-navy-400 hover:bg-navy-50 dark:hover:bg-navy-900 transition-all duration-300"
                onClick={() => {
                  setSearchTerm("")
                  setJobTypeFilter("all")
                  setLocationFilter("all")
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4" ref={jobListRef}>
            <AnimatePresence>
              {filteredJobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="bg-muted rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                </motion.div>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${job.featured ? "border-navy-200 dark:border-navy-700" : ""}`}
                    >
                      {job.featured && (
                        <div className="bg-navy-100 dark:bg-navy-800 px-6 py-1 text-xs font-medium text-navy-800 dark:text-navy-200 flex items-center">
                          <Star className="h-3 w-3 mr-1 text-gold-500" />
                          Featured Opportunity
                        </div>
                      )}
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-6 flex-1">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <div className="hidden md:block w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                  <Image
                                    src={job.companyLogo || "/placeholder.svg"}
                                    alt={job.company}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    {job.title}
                                  </h3>
                                  <div className="flex items-center text-muted-foreground mt-1 flex-wrap gap-y-1">
                                    <Building2 className="h-4 w-4 mr-1" />
                                    <span>{job.company}</span>
                                    <span className="mx-2">•</span>
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{job.location}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge
                                variant={job.type === "Internship" ? "outline" : "default"}
                                className={
                                  job.type === "Full-time"
                                    ? "bg-navy-100 text-navy-800 hover:bg-navy-200 dark:bg-navy-800 dark:text-navy-200"
                                    : ""
                                }
                              >
                                {job.type}
                              </Badge>
                            </div>

                            <div className="mt-4 text-sm text-muted-foreground">
                              <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-xs md:text-sm">Posted: {job.posted}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-xs md:text-sm">Deadline: {job.deadline}</span>
                                </div>
                                <div className="flex items-center">
                                  <Award className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-xs md:text-sm">Salary: {job.salary}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 line-clamp-2 text-sm">{job.description}</div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button variant="outline" className="group" onClick={() => setSelectedJob(job)}>
                                View Details
                                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>

                              <Button
                                variant={savedJobs.includes(job.id) ? "secondary" : "ghost"}
                                className={
                                  savedJobs.includes(job.id)
                                    ? "bg-navy-100 text-navy-800 hover:bg-navy-200 dark:bg-navy-800 dark:text-navy-200"
                                    : ""
                                }
                                onClick={() => toggleSaveJob(job.id)}
                              >
                                {savedJobs.includes(job.id) ? (
                                  <>
                                    <CheckCircle2 className="mr-1 h-4 w-4" />
                                    Saved
                                  </>
                                ) : (
                                  "Save Job"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        {/* Internships Tab */}
        <TabsContent value="internships">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search internships..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="semester">Semester</SelectItem>
                  <SelectItem value="year">Year-long</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {internships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`h-full transition-all duration-200 hover:shadow-md ${internship.featured ? "border-navy-200 dark:border-navy-700" : ""}`}
                  >
                    {internship.featured && (
                      <div className="bg-navy-100 dark:bg-navy-800 px-6 py-1 text-xs font-medium text-navy-800 dark:text-navy-200 flex items-center">
                        <Star className="h-3 w-3 mr-1 text-gold-500" />
                        Featured Opportunity
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={internship.companyLogo || "/placeholder.svg"}
                              alt={internship.company}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{internship.title}</h3>
                            <div className="flex items-center text-muted-foreground mt-1 text-sm">
                              <Building2 className="h-4 w-4 mr-1" />
                              <span>{internship.company}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-navy-50 text-navy-800 dark:bg-navy-900 dark:text-navy-200"
                        >
                          {internship.duration}
                        </Badge>
                      </div>

                      <div className="mt-3 flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{internship.location}</span>
                      </div>

                      <div className="mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Posted: {internship.posted}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Deadline: {internship.deadline}</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Stipend: {internship.stipend}</span>
                        </div>
                      </div>

                      <div className="mt-4 line-clamp-2 text-sm">{internship.description}</div>

                      <div className="mt-4 pt-2 border-t">
                        <Button variant="outline" className="w-full group">
                          View Details
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        {/* Workshops Tab */}
        <TabsContent value="workshops">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                  <CardTitle>Upcoming Workshops & Events</CardTitle>
                </div>
                <CardDescription>Enhance your career skills with these workshops and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <AnimatePresence>
                    {workshops.map((workshop, index) => (
                      <motion.div
                        key={workshop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <div className="flex items-start p-4 border rounded-lg transition-all duration-200 hover:shadow-md hover:border-navy-200 dark:hover:border-navy-700 group-hover:bg-navy-50/30 dark:group-hover:bg-navy-900/30">
                          <div className="mr-4 bg-navy-100 dark:bg-navy-800 p-3 rounded-full">
                            <Calendar className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                              {workshop.title}
                            </h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{workshop.date}</span>
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{workshop.time}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{workshop.location}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <GraduationCap className="h-4 w-4 mr-1" />
                                <span>Presenter: {workshop.presenter}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm line-clamp-2">{workshop.description}</div>
                            <div className="mt-2 flex items-center text-xs text-muted-foreground">
                              <Users className="h-3 w-3 mr-1" />
                              <span>
                                {workshop.registered}/{workshop.capacity} registered
                              </span>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                  Register
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Registration deadline: {workshop.registrationDeadline}</p>
                                <p className="text-xs mt-1">
                                  {workshop.capacity - workshop.registered} spots remaining
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-500" />
                  <CardTitle>Career Fair</CardTitle>
                </div>
                <CardDescription>Annual University Career Fair - June 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="bg-gradient-to-r from-navy-50 to-navy-100 dark:from-navy-900 dark:to-navy-800 p-6 rounded-lg mb-4 border border-navy-200 dark:border-navy-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white dark:bg-navy-700 p-2 rounded-full">
                      <Image
                        src="/images/university-logo.png"
                        alt="University of Wah Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-navy-800 dark:text-navy-100">Spring 2025 Career Fair</h3>
                  </div>
                  <p className="mb-4 text-navy-700 dark:text-navy-200">
                    Connect with over 100 employers from various industries. Bring your resume and dress professionally!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-navy-700 dark:text-navy-200">
                        <Calendar className="h-4 w-4 mr-2 text-navy-600 dark:text-navy-300" />
                        <span>June 15, 2025</span>
                      </div>
                      <div className="flex items-center mt-2 text-navy-700 dark:text-navy-200">
                        <Clock className="h-4 w-4 mr-2 text-navy-600 dark:text-navy-300" />
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-navy-700 dark:text-navy-200">
                        <MapPin className="h-4 w-4 mr-2 text-navy-600 dark:text-navy-300" />
                        <span>University Convention Center</span>
                      </div>
                      <div className="flex items-center mt-2 text-navy-700 dark:text-navy-200">
                        <Users className="h-4 w-4 mr-2 text-navy-600 dark:text-navy-300" />
                        <span>Open to all students and alumni</span>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4 bg-navy-600 hover:bg-navy-700 text-white">
                    View Participating Companies
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                  <CardTitle>Resume & Cover Letter</CardTitle>
                </div>
                <CardDescription>Resources to help you create effective resumes and cover letters</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {resources
                    .filter((r) => r.category === "Documents")
                    .map((resource, index) => (
                      <motion.li
                        key={resource.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center group"
                      >
                        <div className="mr-3 p-2 rounded-full bg-navy-50 dark:bg-navy-900 group-hover:bg-navy-100 dark:group-hover:bg-navy-800 transition-colors">
                          <FileText className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="hover:underline font-medium group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors"
                            >
                              {resource.title}
                            </a>
                            {resource.featured && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-[10px] py-0 px-1.5 bg-gold-50 text-gold-800 border-gold-200 dark:bg-gold-900/20 dark:text-gold-300 dark:border-gold-800"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                        {resource.downloadable && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </motion.li>
                    ))}
                </ul>
                <Button variant="outline" className="w-full mt-4 group">
                  Schedule Resume Review
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                  <CardTitle>Interview Preparation</CardTitle>
                </div>
                <CardDescription>Resources to help you prepare for job interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {resources
                    .filter((r) => r.category === "Preparation")
                    .map((resource, index) => (
                      <motion.li
                        key={resource.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center group"
                      >
                        <div className="mr-3 p-2 rounded-full bg-navy-50 dark:bg-navy-900 group-hover:bg-navy-100 dark:group-hover:bg-navy-800 transition-colors">
                          <FileText className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="hover:underline font-medium group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors"
                            >
                              {resource.title}
                            </a>
                            {resource.featured && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-[10px] py-0 px-1.5 bg-gold-50 text-gold-800 border-gold-200 dark:bg-gold-900/20 dark:text-gold-300 dark:border-gold-800"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                        {resource.downloadable && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </motion.li>
                    ))}
                </ul>
                <Button variant="outline" className="w-full mt-4 group">
                  Schedule Mock Interview
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                  <CardTitle>Career Counseling</CardTitle>
                </div>
                <CardDescription>Schedule a meeting with a career counselor</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Our career counselors can help you with career exploration, job search strategies, interview
                  preparation, and more.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border rounded-lg p-4 hover:border-navy-300 dark:hover:border-navy-600 hover:shadow-sm transition-all group"
                  >
                    <div className="mb-3 p-2 w-fit rounded-full bg-navy-50 dark:bg-navy-900 group-hover:bg-navy-100 dark:group-hover:bg-navy-800 transition-colors">
                      <Sparkles className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                    <h4 className="font-medium mb-2 group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                      Career Exploration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover career paths aligned with your interests, skills, and values.
                    </p>
                    <Button size="sm" variant="outline" className="w-full group">
                      Book Appointment
                      <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="border rounded-lg p-4 hover:border-navy-300 dark:hover:border-navy-600 hover:shadow-sm transition-all group"
                  >
                    <div className="mb-3 p-2 w-fit rounded-full bg-navy-50 dark:bg-navy-900 group-hover:bg-navy-100 dark:group-hover:bg-navy-800 transition-colors">
                      <Briefcase className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                    <h4 className="font-medium mb-2 group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                      Job Search Strategy
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Develop effective strategies for finding and applying to jobs.
                    </p>
                    <Button size="sm" variant="outline" className="w-full group">
                      Book Appointment
                      <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border rounded-lg p-4 hover:border-navy-300 dark:hover:border-navy-600 hover:shadow-sm transition-all group"
                  >
                    <div className="mb-3 p-2 w-fit rounded-full bg-navy-50 dark:bg-navy-900 group-hover:bg-navy-100 dark:group-hover:bg-navy-800 transition-colors">
                      <GraduationCap className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                    <h4 className="font-medium mb-2 group-hover:text-navy-600 dark:group-hover:text-navy-300 transition-colors">
                      Graduate School Planning
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get guidance on graduate school applications and decisions.
                    </p>
                    <Button size="sm" variant="outline" className="w-full group">
                      Book Appointment
                      <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={!!selectedJob && !isApplyDialogOpen} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={selectedJob.companyLogo || "/placeholder.svg"}
                    alt={selectedJob.company}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <DialogTitle>{selectedJob.title}</DialogTitle>
                  <DialogDescription>
                    {selectedJob.company} • {selectedJob.location}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="grid gap-4 py-4 px-1">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-navy-50 text-navy-800 dark:bg-navy-900 dark:text-navy-200">
                    {selectedJob.type}
                  </Badge>
                  <Badge variant="outline" className="bg-navy-50 text-navy-800 dark:bg-navy-900 dark:text-navy-200">
                    {selectedJob.salary}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-navy-800 dark:text-navy-200">Job Description</h4>
                  <p className="text-sm whitespace-pre-line">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-navy-800 dark:text-navy-200">Responsibilities</h4>
                  <p className="text-sm whitespace-pre-line">{selectedJob.responsibilities}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-navy-800 dark:text-navy-200">Requirements</h4>
                  <p className="text-sm whitespace-pre-line">{selectedJob.requirements}</p>
                </div>

                {selectedJob.benefits && (
                  <div>
                    <h4 className="font-medium mb-2 text-navy-800 dark:text-navy-200">Benefits</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedJob.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm bg-muted p-3 rounded-md">
                  <div>
                    <span className="font-medium">Posted:</span> {selectedJob.posted}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span> {selectedJob.deadline}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant={savedJobs.includes(selectedJob.id) ? "secondary" : "outline"}
                className={
                  savedJobs.includes(selectedJob.id)
                    ? "bg-navy-100 text-navy-800 hover:bg-navy-200 dark:bg-navy-800 dark:text-navy-200 border-navy-300 dark:border-navy-600 transition-all duration-300"
                    : "border-navy-300 hover:border-navy-500 transition-all duration-300"
                }
                onClick={() => toggleSaveJob(selectedJob.id)}
              >
                {savedJobs.includes(selectedJob.id) ? (
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                    <span>Saved to Profile</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Bookmark className="mr-1 h-4 w-4" />
                    <span>Save Job</span>
                  </div>
                )}
              </Button>
              <Button
                onClick={() => setIsApplyDialogOpen(true)}
                className="bg-gradient-to-r from-navy-600 to-navy-800 hover:from-navy-700 hover:to-navy-900 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <div className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Apply Now</span>
                </div>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Apply Dialog */}
      {selectedJob && (
        <Dialog
          open={isApplyDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsApplyDialogOpen(false)
            }
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
              <DialogDescription>
                {selectedJob.company} • {selectedJob.location}
              </DialogDescription>
            </DialogHeader>
            <Form>
              <div className="grid gap-4 py-4">
                <FormField
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume/CV</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX (MAX. 5MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a brief cover letter explaining why you're a good fit for this position..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleApplySubmit}
                  disabled={isLoading}
                  className="bg-navy-600 hover:bg-navy-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 shadow-lg flex items-center gap-2 z-50 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium">Application Submitted!</p>
              <p className="text-sm">Your application has been successfully submitted.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
