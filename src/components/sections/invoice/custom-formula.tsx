"use client"

import { useState } from "react"
import { FunctionSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogOverlay, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { evalFormula } from "@/data/invoices"
import { cn } from "@/lib/utils"

interface CustomFormulaProps {
  formula?: string
  onChange: (formula: string) => void
  name: string
  initialOpen?: boolean
}

export function CustomFormula({ formula, onChange, name, initialOpen }: CustomFormulaProps) {
  const [open, setOpen] = useState(initialOpen ?? false)
  const [draft, setDraft] = useState(formula ?? "")

  const result = evalFormula(draft, [])

  const ok = () => {
    onChange(draft)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (v) setDraft(formula ?? "")
      }}
    >
      <DialogTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Formula for ${name}`}><FunctionSquare className="size-3.5" /></Button>} />
      <DialogOverlay />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="border-b border-border/40 pb-3">
          <DialogTitle className="text-base font-semibold">Custom Formula</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter a simple calculation for the quantity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1.5">Formula</label>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="e.g. 192*383+282"
              aria-label="Formula"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
            <span className="text-sm text-muted-foreground">Result (quantity)</span>
            <span className={cn("text-lg font-bold tabular-nums", Number.isNaN(result) ? "text-muted-foreground" : "text-foreground")}>
              {Number.isNaN(result) ? "—" : result}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={ok} disabled={Number.isNaN(result)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
