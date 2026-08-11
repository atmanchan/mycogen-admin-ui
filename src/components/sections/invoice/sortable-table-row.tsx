"use client"

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { cn } from "@/lib/utils"

export type RowHandleProps = Record<string, unknown>

interface SortableTableRowProps extends Omit<React.ComponentProps<"tr">, "children"> {
  id: string
  children: (handleProps: RowHandleProps) => React.ReactNode
}

export function SortableTableRow({ id, className, style, children, ...props }: SortableTableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <tr
      ref={setNodeRef}
      className={cn(className, isDragging && "opacity-40")}
      style={{ transform: CSS.Transform.toString(transform), transition, ...style }}
      {...props}
    >
      {children({ ...attributes, ...listeners })}
    </tr>
  )
}
