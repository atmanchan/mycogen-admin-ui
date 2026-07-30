import type { KanbanColumn } from "@/types/kanban"

export const initialColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    items: [
      { id: "task-1", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated deployment", priority: "high", assignee: "John", dueDate: "2026-08-05", labels: ["DevOps"] },
      { id: "task-2", title: "Design new logo", description: "Create brand guideline and logo variants", priority: "medium", assignee: "Sarah", dueDate: "2026-08-10", labels: ["Design"] },
      { id: "task-3", title: "Write API documentation", description: "Document all REST endpoints with examples", priority: "low", assignee: "Mike", dueDate: "2026-08-15", labels: ["Docs"] },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [
      { id: "task-4", title: "Implement user auth", description: "OAuth2 integration with Google and GitHub", priority: "urgent", assignee: "John", dueDate: "2026-08-02", labels: ["Backend", "Security"] },
      { id: "task-5", title: "Dashboard charts", description: "Build interactive sales charts with filters", priority: "high", assignee: "Lisa", dueDate: "2026-08-04", labels: ["Frontend"] },
    ],
  },
  {
    id: "review",
    title: "Review",
    items: [
      { id: "task-6", title: "Refactor payment module", description: "Split monolithic payment into microservices", priority: "high", assignee: "Mike", dueDate: "2026-08-01", labels: ["Backend"] },
      { id: "task-7", title: "Mobile responsive fixes", description: "Fix layout issues on tablet and mobile", priority: "medium", assignee: "Lisa", dueDate: "2026-08-03", labels: ["Frontend", "CSS"] },
    ],
  },
  {
    id: "done",
    title: "Done",
    items: [
      { id: "task-8", title: "Database migration script", description: "Migrate from PostgreSQL to MySQL", priority: "urgent", assignee: "Mike", dueDate: "2026-07-28", labels: ["Backend", "DevOps"] },
      { id: "task-9", title: "Landing page redesign", description: "New hero section and CTA layout", priority: "medium", assignee: "Sarah", dueDate: "2026-07-25", labels: ["Design", "Frontend"] },
      { id: "task-10", title: "Email notification system", description: "Set up SendGrid integration and templates", priority: "low", assignee: "John", dueDate: "2026-07-20", labels: ["Backend"] },
    ],
  },
]
