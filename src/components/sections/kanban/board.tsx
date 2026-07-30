"use client"

import { useState, useCallback } from "react"
import { KanbanColumn } from "./column"
import { DragCtx } from "./drag-context"
import { initialColumns } from "@/data/kanban"
import type { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from "@/types/kanban"

export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumnType[]>(initialColumns)
  const [dragged, setDragged] = useState<KanbanCardType | null>(null)

  const moveCard = useCallback((fromCol: string, fromIdx: number, toCol: string, toIdx: number) => {
    setColumns(prev => {
      const next = prev.map(c => ({ ...c, items: [...c.items] }))
      const src = next.find(c => c.id === fromCol)
      const dst = next.find(c => c.id === toCol)
      if (!src || !dst) return prev
      const [moved] = src.items.splice(fromIdx, 1)
      dst.items.splice(toIdx, 0, moved)
      return next
    })
  }, [])

  return (
    <DragCtx.Provider value={{ dragged, setDragged, moveCard }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-0 flex-1">
        {columns.map(col => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </DragCtx.Provider>
  )
}
