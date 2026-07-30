export type Priority = "low" | "medium" | "high" | "urgent"
export type ColumnId = "todo" | "in-progress" | "review" | "done"

export interface KanbanCard {
  id: string
  title: string
  description: string
  priority: Priority
  assignee: string
  dueDate: string
  labels: string[]
}

export interface KanbanColumn {
  id: ColumnId
  title: string
  items: KanbanCard[]
}
