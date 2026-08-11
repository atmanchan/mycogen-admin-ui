"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { CATALOG, type CatalogItem } from "@/data/items"
import { formatMoney } from "@/data/invoices"

interface ItemAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (item: CatalogItem) => void
  ariaLabel: string
  className?: string
}

export function ItemAutocomplete({ value, onChange, onSelect, ariaLabel, className }: ItemAutocompleteProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  const q = value.trim().toLowerCase()
  const suggestions = q
    ? CATALOG.filter((c) => c.name.toLowerCase().includes(q) || c.sku.toLowerCase().includes(q)).slice(0, 6)
    : CATALOG.slice(0, 6)
  const show = open && suggestions.length > 0

  const updatePos = () => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ top: r.bottom + 4, left: r.left, width: r.width })
  }

  useEffect(() => {
    if (!show) {
      setPos(null)
      return
    }
    updatePos()
    window.addEventListener("scroll", updatePos, true)
    window.addEventListener("resize", updatePos)
    return () => {
      window.removeEventListener("scroll", updatePos, true)
      window.removeEventListener("resize", updatePos)
    }
  }, [show, value])

  useEffect(
    () => () => {
      if (blurTimer.current) clearTimeout(blurTimer.current)
    },
    []
  )

  const pick = (item: CatalogItem) => {
    onSelect(item)
    setOpen(false)
  }

  return (
    <div ref={wrapRef} className="relative">
      <Textarea
        rows={1}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => {
          if (blurTimer.current) clearTimeout(blurTimer.current)
          setOpen(true)
        }}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setOpen(false), 150)
        }}
        onKeyDown={(e) => {
          if (!show) return
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setActive((a) => Math.min(a + 1, suggestions.length - 1))
          } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setActive((a) => Math.max(a - 1, 0))
          } else if (e.key === "Enter") {
            e.preventDefault()
            pick(suggestions[active])
          } else if (e.key === "Escape") {
            setOpen(false)
          }
        }}
        className={cn("min-h-8 resize-none py-1.5", className)}
        aria-label={ariaLabel}
      />
      {show && pos && typeof document !== "undefined" &&
        createPortal(
          <div
            style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width }}
            className="z-50 overflow-hidden rounded-lg border border-border/40 bg-popover shadow-md"
            role="listbox"
          >
            <ul className="max-h-60 overflow-y-auto py-1">
              {suggestions.map((c, i) => (
                <li key={c.sku}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      pick(c)
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-sm transition-colors",
                      i === active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-medium">{c.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{c.sku}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {c.unit} · {formatMoney(c.rate)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </div>
  )
}
