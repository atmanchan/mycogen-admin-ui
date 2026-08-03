"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./card"
import type { KanbanColumn as KanbanColumnType } from "@/types/kanban"

interface Props {
  column: KanbanColumnType
  overlay?: boolean
}

export function KanbanColumn({ column, overlay }: Props) {
  const { attributes, listeners, setNodeRef: setColRef, transform, transition, isDragging } = useSortable({ id: column.id, disabled: overlay })
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: `${column.id}-drop`, disabled: overlay })

  const colStyle = overlay ? {} : {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  }

  const containerClass = `flex flex-col gap-3 min-w-0 ${overlay ? "" : "flex-1"}`
  const dropClass = `flex flex-col gap-2 p-2 rounded-xl min-h-0 flex-1 transition-colors glass-light ${
    isOver && !overlay ? "bg-primary/20 ring-2 ring-primary/40" : ""
  }`

  if (overlay) {
    return (
      <div className="flex-1 min-w-0 glass rounded-xl p-2 shadow-2xl rotate-2 ring-2 ring-primary/60 drag-glow">
        <div className={containerClass}>
          <div className="flex items-center justify-between px-1 mb-1">
            <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
            <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
              {column.items.length}
            </span>
          </div>
          <div className={dropClass}>
            {column.items.map((card, i) => (
              <KanbanCard key={card.id} card={card} index={i} overlay />
            ))}
            {column.items.length === 0 && (
              <div className="flex items-center justify-center h-20 text-xs text-muted-foreground/40">
                Drop cards here
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={setColRef} style={colStyle} className={containerClass}>
      <div {...attributes} {...listeners} className="flex items-center justify-between px-1 cursor-grab active:cursor-grabbing">
        <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
        <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
          {column.items.length}
        </span>
      </div>
      <div
        ref={setDropRef}
        className={dropClass}
      >
        <SortableContext items={column.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          {column.items.map((card, i) => (
            <KanbanCard key={card.id} card={card} index={i} />
          ))}
        </SortableContext>
        {column.items.length === 0 && (
          <div className="flex items-center justify-center h-20 text-xs text-muted-foreground/40">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  )
}
