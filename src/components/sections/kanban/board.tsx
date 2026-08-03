"use client"

import { useState, useCallback } from "react"
import { DndContext, DragOverlay, pointerWithin, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent, type DragOverEvent } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanColumn } from "./column"
import { KanbanCard } from "./card"
import { KanbanCardOverlay } from "./card-overlay"
import { initialColumns } from "@/data/kanban"
import type { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from "@/types/kanban"

const columnIds = initialColumns.map(c => c.id)

export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumnType[]>(initialColumns)
  const [activeCard, setActiveCard] = useState<KanbanCardType | null>(null)
  const [activeCol, setActiveCol] = useState<KanbanColumnType | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const findColumn = (id: string) => columns.find(c => c.id === id || c.items.some(i => i.id === id))
  const isColumnId = (id: unknown): id is string => typeof id === "string" && columnIds.includes(id as any)
  const resolveColumnId = (id: string): string | null => {
    if (columnIds.includes(id as any)) return id
    if (id.endsWith("-drop")) return id.slice(0, -5)
    return findColumn(id)?.id ?? null
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    if (isColumnId(active.id as string)) {
      setActiveCol(columns.find(c => c.id === active.id) || null)
    } else {
      for (const col of columns) {
        const card = col.items.find(i => i.id === active.id)
        if (card) { setActiveCard(card); return }
      }
    }
  }, [columns])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    if (isColumnId(active.id as string)) {
      const targetCol = resolveColumnId(over.id as string)
      if (!targetCol || targetCol === active.id) return
      setColumns(prev => {
        const next = [...prev]
        const oldIdx = next.findIndex(c => c.id === active.id)
        const newIdx = next.findIndex(c => c.id === targetCol)
        if (oldIdx === -1 || newIdx === -1) return prev
        const [moved] = next.splice(oldIdx, 1)
        next.splice(newIdx, 0, moved)
        return next
      })
      return
    }

    const activeCol = findColumn(active.id as string)
    const overColId = resolveColumnId(over.id as string)
    const overCol = overColId ? findColumn(overColId) : undefined
    if (!activeCol || !overCol) return
    if (activeCol.id === overCol.id) return

    setColumns(prev => {
      const next = prev.map(c => ({ ...c, items: [...c.items] }))
      const srcCol = next.find(c => c.id === activeCol.id)
      const dstCol = next.find(c => c.id === overCol.id)
      if (!srcCol || !dstCol) return prev
      const srcIdx = srcCol.items.findIndex(i => i.id === active.id)
      if (srcIdx === -1) return prev
      const [moved] = srcCol.items.splice(srcIdx, 1)
      const overIdx = dstCol.items.findIndex(i => i.id === over.id)
      dstCol.items.splice(overIdx >= 0 ? overIdx : dstCol.items.length, 0, moved)
      return next
    })
  }, [findColumn, resolveColumnId])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)
    setActiveCol(null)
    if (!over || active.id === over.id) return

    if (isColumnId(active.id as string)) return

    const activeCol = findColumn(active.id as string)
    const overColId = resolveColumnId(over.id as string)
    const overCol = overColId ? findColumn(overColId) : undefined
    if (!activeCol || !overCol) return

    if (activeCol.id === overCol.id) {
      setColumns(prev => {
        const next = prev.map(c => ({ ...c, items: [...c.items] }))
        const col = next.find(c => c.id === activeCol.id)
        if (!col) return prev
        const items = col.items
        const oldIdx = items.findIndex(i => i.id === active.id)
        const newIdx = items.findIndex(i => i.id === over.id)
        if (oldIdx === -1 || newIdx === -1) return prev
        const [moved] = items.splice(oldIdx, 1)
        items.splice(oldIdx < newIdx ? newIdx - 1 : newIdx, 0, moved)
        return next
      })
    }
  }, [findColumn, resolveColumnId])

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <SortableContext items={columns.map(c => c.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-col sm:flex-row gap-4 min-h-0 flex-1">
          {columns.map(col => (
            <KanbanColumn key={col.id} column={col} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeCard ? <KanbanCardOverlay card={activeCard} /> : null}
        {activeCol && !activeCard ? <KanbanColumn column={activeCol} overlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
