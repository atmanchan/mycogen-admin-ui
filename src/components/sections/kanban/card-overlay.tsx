"use client"

import { GripVertical, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { KanbanCard as KanbanCardType } from "@/types/kanban"

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/10 text-primary",
  high: "bg-amber-500/10 text-amber-600",
  urgent: "bg-destructive/10 text-destructive",
}

interface Props {
  card: KanbanCardType
}

export function KanbanCardOverlay({ card }: Props) {
  return (
    <div className="glass rounded-lg p-3 relative shadow-2xl rotate-3 scale-110 ring-2 ring-primary/60 drag-glow">
      <span className={`absolute top-0 right-3 z-10 text-[11px] font-semibold px-1.5 py-0.5 rounded-bl-md rounded-br-md ${priorityColors[card.priority]}`}>
        {card.priority}
      </span>
      <div className="flex items-start gap-2 pr-8">
        <div className="mt-0.5">
          <GripVertical className="h-4 w-4 text-muted-foreground/40" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold">{card.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{card.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {card.labels.map(label => (
              <Badge key={label} variant="outline" className="text-[10px] px-1.5 py-0 h-auto">{label}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {card.assignee}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {card.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
