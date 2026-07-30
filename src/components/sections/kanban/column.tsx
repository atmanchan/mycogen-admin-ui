"use client"

import { type DragEvent, useState } from "react"
import { KanbanCard } from "./card"
import { useDragCtx } from "./drag-context"
import type { KanbanColumn as KanbanColumnType } from "@/types/kanban"

interface Props {
  column: KanbanColumnType
}

export function KanbanColumn({ column }: Props) {
  const { moveCard, dragged } = useDragCtx()
  const [over, setOver] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setOver(true)
  }

  const handleDragLeave = () => setOver(false)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setOver(false)
    const data = e.dataTransfer.getData("text/plain")
    if (!data) return
    const { colId, idx } = JSON.parse(data)
    if (colId === column.id) return
    moveCard(colId, idx, column.id, column.items.length)
  }

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
        <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
          {column.items.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col gap-2 p-2 rounded-xl min-h-0 flex-1 transition-colors glass-light ${
          over && dragged ? "bg-primary/15 ring-1 ring-primary/30" : ""
        }`}
      >
        {column.items.map((card, i) => (
          <KanbanCard key={card.id} card={card} index={i} colId={column.id} />
        ))}
        {column.items.length === 0 && (
          <div className="flex items-center justify-center h-20 text-xs text-muted-foreground/40">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  )
}
