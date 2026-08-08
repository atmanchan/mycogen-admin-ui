"use client"

import type { LucideIcon } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type MoreMenuItem = {
  label: string
  icon: LucideIcon
  variant?: "default" | "destructive"
  onClick?: () => void
}

interface MoreMenuProps {
  label?: string
  align?: "start" | "end" | "center"
  items: MoreMenuItem[]
}

export function MoreMenu({ label = "More actions", align = "end", items }: MoreMenuProps) {
  const firstDestructive = items.findIndex((i) => i.variant === "destructive")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={label}><MoreHorizontal className="size-4" /></Button>} />
      <DropdownMenuContent align={align} className="min-w-36">
        {items.map((item, i) => (
          <div key={item.label}>
            {firstDestructive > 0 && i === firstDestructive && <DropdownMenuSeparator />}
            <DropdownMenuItem variant={item.variant} onClick={item.onClick}>
              <item.icon className="size-3.5" />
              {item.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
