"use client"

import { createContext, useContext } from "react"
import type { KanbanCard } from "@/types/kanban"

export interface DragContextType {
  dragged: KanbanCard | null
  setDragged: (card: KanbanCard | null) => void
  moveCard: (fromCol: string, fromIdx: number, toCol: string, toIdx: number) => void
}

export const DragCtx = createContext<DragContextType>({
  dragged: null,
  setDragged: () => {},
  moveCard: () => {},
})

export const useDragCtx = () => useContext(DragCtx)
