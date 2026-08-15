"use client"

import { useState } from "react"
import { Calculator, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogOverlay, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { areaTotal, type AreaItem } from "@/data/invoices"
import { cn } from "@/lib/utils"

interface AreaCalculatorProps {
  items: AreaItem[]
  onChange: (items: AreaItem[]) => void
  name: string
  initialOpen?: boolean
}

export function AreaCalculator({ items, onChange, name, initialOpen }: AreaCalculatorProps) {
  const [open, setOpen] = useState(initialOpen ?? false)
  const [draft, setDraft] = useState<AreaItem[]>(() => items.map((a) => ({ ...a })))

  const openDialog = () => {
    setDraft(items.map((a) => ({ ...a })))
    setOpen(true)
  }

  const update = (i: number, patch: Partial<AreaItem>) =>
    setDraft((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)))
  const add = () => setDraft((prev) => [...prev, { label: "", length: 0, width: 0, pieces: 1 }])
  const remove = (i: number) => setDraft((prev) => prev.filter((_, idx) => idx !== i))

  const ok = () => {
    onChange(draft)
    setOpen(false)
  }

  const total = areaTotal(draft)

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) openDialog() }}>
      <DialogTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Area calculator for ${name}`}><Calculator className="size-3.5" /></Button>} />
      <DialogOverlay />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="border-b border-border/40 pb-3">
          <DialogTitle className="text-base font-semibold">Area Calculator</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Length × width × pieces per area row, summed into the quantity.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-64 overflow-y-auto rounded-lg border border-border/40 divide-y divide-border/20">
          {draft.map((a, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 px-3 py-2.5">
              <Input
                className="h-8 w-32 text-xs"
                placeholder="Label"
                value={a.label ?? ""}
                onChange={(e) => update(i, { label: e.target.value })}
                aria-label={`Area ${i + 1} label`}
              />
              <Input
                type="number"
                className="h-8 w-20"
                value={a.length}
                onChange={(e) => update(i, { length: Number(e.target.value) })}
                aria-label={`Area ${i + 1} length`}
              />
              <span className="text-xs text-muted-foreground">×</span>
              <Input
                type="number"
                className="h-8 w-20"
                value={a.width}
                onChange={(e) => update(i, { width: Number(e.target.value) })}
                aria-label={`Area ${i + 1} width`}
              />
              <span className="text-xs text-muted-foreground">×</span>
              <Input
                type="number"
                className="h-8 w-16"
                value={a.pieces}
                onChange={(e) => update(i, { pieces: Number(e.target.value) })}
                aria-label={`Area ${i + 1} pieces`}
              />
              <span className="text-xs text-muted-foreground">pcs</span>
              <span className="ml-auto shrink-0 text-sm font-medium tabular-nums">
                {((a.length || 0) * (a.width || 0) * (a.pieces || 0)).toFixed(1)} m²
              </span>
              <Button variant="ghost" size="icon-xs" aria-label={`Remove area ${i + 1}`} onClick={() => remove(i)}>
                <Trash2 className="size-3.5 text-destructive" />
              </Button>
            </div>
          ))}
          {draft.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">No areas yet.</div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button size="xs" variant="outline" onClick={add}><Plus className="size-3" /> Add area</Button>
          <div className="text-sm text-muted-foreground">
            Total area: <span className={cn("font-bold text-foreground tabular-nums")}>{total.toFixed(1)} m²</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={ok}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
