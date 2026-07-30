"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type TaskStatus = "active" | "done"

interface Task {
  id: number
  title: string
  description: string
  priority: "Urgent" | "High" | "Medium" | "Low"
  labels: string[]
  dueDate: string
  assignee: string
  assigneeColor: string
  status: TaskStatus
  progress?: number
}

const priorityVariant: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
  Urgent: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Update user dashboard metrics",
    description: "Refresh the KPI calculations to include new churn rate data from the analytics pipeline.",
    priority: "Urgent",
    labels: ["dashboard", "analytics"],
    dueDate: "Today",
    assignee: "JD",
    assigneeColor: "bg-blue-500/10 text-blue-600",
    status: "active",
    progress: 75,
  },
  {
    id: 2,
    title: "Design system color tokens audit",
    description: "Review all semantic color tokens across light/dark mode for consistency.",
    priority: "High",
    labels: ["design", "frontend"],
    dueDate: "Tomorrow",
    assignee: "AK",
    assigneeColor: "bg-emerald-500/10 text-emerald-600",
    status: "active",
    progress: 40,
  },
  {
    id: 3,
    title: "Fix checkout form validation",
    description: "Credit card expiry field accepts invalid future dates. Add proper month/year constraints.",
    priority: "Urgent",
    labels: ["bug", "checkout"],
    dueDate: "Today",
    assignee: "MR",
    assigneeColor: "bg-amber-500/10 text-amber-600",
    status: "active",
    progress: 20,
  },
  {
    id: 4,
    title: "Migrate database to RDS",
    description: "Move from self-hosted Postgres to AWS RDS with read replicas.",
    priority: "High",
    labels: ["backend", "infra"],
    dueDate: "Next week",
    assignee: "CL",
    assigneeColor: "bg-purple-500/10 text-purple-600",
    status: "active",
    progress: 10,
  },
  {
    id: 5,
    title: "Write API integration tests",
    description: "Cover all v2 endpoints with integration tests before the next release.",
    priority: "Medium",
    labels: ["testing", "api"],
    dueDate: "Next week",
    assignee: "JD",
    assigneeColor: "bg-blue-500/10 text-blue-600",
    status: "active",
  },
  {
    id: 6,
    title: "Update onboarding flow copy",
    description: "Rewrite the welcome wizard steps based on UX research findings.",
    priority: "Medium",
    labels: ["ux", "copy"],
    dueDate: "Dec 12",
    assignee: "PM",
    assigneeColor: "bg-pink-500/10 text-pink-600",
    status: "active",
  },
  {
    id: 7,
    title: "Optimize image delivery",
    description: "Switch to WebP with AVIF fallback and implement responsive srcset.",
    priority: "Low",
    labels: ["performance", "frontend"],
    dueDate: "Dec 18",
    assignee: "AK",
    assigneeColor: "bg-emerald-500/10 text-emerald-600",
    status: "active",
  },
  {
    id: 8,
    title: "Implement dark mode toggle",
    description: "Persist user preference and sync with system theme.",
    priority: "Low",
    labels: ["feature", "ui"],
    dueDate: "Dec 20",
    assignee: "JD",
    assigneeColor: "bg-blue-500/10 text-blue-600",
    status: "active",
  },
  {
    id: 9,
    title: "Deploy v1.2 to staging",
    description: "Tag and deploy the latest build to the staging environment for QA.",
    priority: "High",
    labels: ["deploy", "devops"],
    dueDate: "Yesterday",
    assignee: "CL",
    assigneeColor: "bg-purple-500/10 text-purple-600",
    status: "done",
  },
  {
    id: 10,
    title: "Update team page photos",
    description: "Replace placeholder avatars with professional headshots.",
    priority: "Low",
    labels: ["content"],
    dueDate: "3 days ago",
    assignee: "PM",
    assigneeColor: "bg-pink-500/10 text-pink-600",
    status: "done",
  },
  {
    id: 11,
    title: "Fix pagination on search results",
    description: "Page numbers wrap incorrectly after page 20 on narrow viewports.",
    priority: "Medium",
    labels: ["bug", "ui"],
    dueDate: "5 days ago",
    assignee: "MR",
    assigneeColor: "bg-amber-500/10 text-amber-600",
    status: "done",
  },
  {
    id: 12,
    title: "Set up error tracking with Sentry",
    description: "Integrate Sentry SDK and configure alert rules for critical errors.",
    priority: "High",
    labels: ["monitoring", "infra"],
    dueDate: "1 week ago",
    assignee: "CL",
    assigneeColor: "bg-purple-500/10 text-purple-600",
    status: "done",
  },
]

const tabs = ["All", "Active", "Done"] as const

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All")
  const [search, setSearch] = useState("")

  const filtered = tasks.filter((t) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Active" && t.status === "active") ||
      (activeTab === "Done" && t.status === "done")
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track your team tasks.
          </p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button size="sm"><Plus className="size-3.5" />Add New Task</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">
              Task creation form would go here.
            </p>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((task) => (
          <Card key={task.id} size="sm" className="bg-card card-original shadow-sm">
            <CardContent>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.status === "done"}
                  readOnly
                  className="accent-primary size-4 rounded mt-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-medium ${
                        task.status === "done" ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                    {task.labels.map((label) => (
                      <Badge key={label} variant="ghost" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {task.description}
                  </p>
                  {task.progress !== undefined && (
                    <Progress value={task.progress} className="h-1.5 mt-2" />
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
                <Avatar size="sm">
                  <AvatarFallback className={task.assigneeColor}>
                    {task.assignee}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
