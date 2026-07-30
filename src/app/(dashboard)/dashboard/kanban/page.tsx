import { KanbanBoard } from "@/components/sections/kanban/board"

export default function KanbanPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">Kanban</h1>
        <p className="text-sm text-muted-foreground mt-1">Drag and drop tasks between columns.</p>
      </div>
      <KanbanBoard />
    </div>
  )
}
