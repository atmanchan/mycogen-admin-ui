"use client"

import { useState } from "react"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogOverlay, DialogTitle,
} from "@/components/ui/dialog"
import { areaTotal, evalFormula, type InvoiceLine, type QtyVariant, type AreaItem } from "@/data/invoices"

const NO_SPIN = "[appearance:textfield] [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:[appearance:none] [&::-webkit-inner-spin-button]:[margin:0] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:[appearance:none] [&::-webkit-outer-spin-button]:[margin:0]"

const STANDARD_UNITS = ["pcs", "set", "month"]
const TIME_UNITS = ["hrs", "day"]

interface QtyUnitProps {
  line: Pick<InvoiceLine, "qty" | "unit" | "qtyVariant" | "areaItems" | "formula">
  onUpdate: (patch: Partial<InvoiceLine>) => void
  name: string
}

export function QtyUnit({ line, onUpdate, name }: QtyUnitProps) {
  const variant = line.qtyVariant ?? "standard"
  const areaQty = areaTotal(line.areaItems ?? [])
  const customResult = evalFormula(line.formula ?? "", [])

  const summary =
    variant === "area"
      ? `${areaQty.toFixed(1)} m²`
      : variant === "custom"
        ? `${Number.isNaN(customResult) ? line.qty : customResult}`
        : `${line.qty} ${line.unit || "pcs"}`

  const [open, setOpen] = useState(false)
  const [draftVariant, setDraftVariant] = useState<QtyVariant>(variant)
  const [draftQty, setDraftQty] = useState(line.qty)
  const [draftUnit, setDraftUnit] = useState(line.unit ?? "pcs")
  const [draftArea, setDraftArea] = useState<AreaItem[]>([])
  const [draftFormula, setDraftFormula] = useState("")

  const openPanel = () => {
    setDraftVariant(line.qtyVariant ?? "standard")
    setDraftQty(line.qty)
    setDraftUnit(line.unit ?? "pcs")
    setDraftArea((line.areaItems ?? []).map((a) => ({ ...a })))
    setDraftFormula(line.formula ?? "")
    setOpen(true)
  }

  const draftResult =
    draftVariant === "area"
      ? areaTotal(draftArea)
      : draftVariant === "custom"
        ? evalFormula(draftFormula, [])
        : draftQty

  const ok = () => {
    const patch: Partial<InvoiceLine> = { qtyVariant: draftVariant }
    if (draftVariant === "area") {
      patch.unit = "m²"
      patch.areaItems = draftArea
      patch.qty = areaTotal(draftArea)
    } else if (draftVariant === "custom") {
      patch.formula = draftFormula
      patch.qty = Number.isNaN(evalFormula(draftFormula, [])) ? line.qty : evalFormula(draftFormula, [])
    } else {
      patch.unit = draftUnit
      patch.qty = draftQty
    }
    onUpdate(patch)
    setOpen(false)
  }

  const handleVariant = (v: QtyVariant) => {
    setDraftVariant(v)
    if (v === "area" && draftArea.length === 0) setDraftArea([{ label: "", length: 0, width: 0, pieces: 1 }])
  }

  const updateArea = (i: number, patch: Partial<AreaItem>) =>
    setDraftArea((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)))
  const addArea = () => setDraftArea((prev) => [...prev, { label: "", length: 0, width: 0, pieces: 1 }])
  const removeArea = (i: number) => setDraftArea((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <>
      <button
        onClick={openPanel}
        className="flex h-8 w-full items-center justify-between gap-1 rounded-lg border border-input bg-transparent px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/40"
        aria-label={`${name} qty unit`}
      >
        <span className="min-w-0 truncate tabular-nums">{summary}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay />
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="border-b border-border/40 pb-3">
            <DialogTitle className="text-base font-semibold">Quantity</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">{name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Select value={draftVariant} onValueChange={(v) => handleVariant((v ?? "standard") as QtyVariant)}>
              <SelectTrigger className="h-9 w-full" aria-label="Quantity type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="time">Time</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {draftVariant === "area" ? (
              <div className="space-y-2">
                <div className="max-h-56 overflow-y-auto rounded-lg border border-border/40 divide-y divide-border/20">
                  {draftArea.map((a, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2 px-3 py-2">
                      <Input className="h-8 w-28 text-xs" placeholder="Label" value={a.label ?? ""} onChange={(e) => updateArea(i, { label: e.target.value })} aria-label={`Area ${i + 1} label`} />
                      <Input type="number" className={`h-8 w-16 text-xs ${NO_SPIN}`} value={a.length} onChange={(e) => updateArea(i, { length: Number(e.target.value) })} aria-label={`Area ${i + 1} length`} />
                      <span className="text-xs text-muted-foreground">×</span>
                      <Input type="number" className={`h-8 w-16 text-xs ${NO_SPIN}`} value={a.width} onChange={(e) => updateArea(i, { width: Number(e.target.value) })} aria-label={`Area ${i + 1} width`} />
                      <span className="text-xs text-muted-foreground">×</span>
                      <Input type="number" className={`h-8 w-14 text-xs ${NO_SPIN}`} value={a.pieces} onChange={(e) => updateArea(i, { pieces: Number(e.target.value) })} aria-label={`Area ${i + 1} pieces`} />
                      <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums">
                        {((a.length || 0) * (a.width || 0) * (a.pieces || 0)).toFixed(1)} m²
                      </span>
                      <Button variant="ghost" size="icon-xs" aria-label={`Remove area ${i + 1}`} onClick={() => removeArea(i)}>
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Button size="xs" variant="outline" onClick={addArea}><Plus className="size-3" /> Add area</Button>
                  <span className="text-sm text-muted-foreground">Total: <b className="tabular-nums">{areaTotal(draftArea).toFixed(1)} m²</b></span>
                </div>
              </div>
            ) : draftVariant === "custom" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium block">Formula</label>
                <Input value={draftFormula} onChange={(e) => setDraftFormula(e.target.value)} placeholder="e.g. 192*383+282" aria-label="Formula" />
                <div className="text-sm text-muted-foreground">
                  Result:{" "}
                  <b className="tabular-nums">{Number.isNaN(evalFormula(draftFormula, [])) ? "—" : evalFormula(draftFormula, [])}</b>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input type="number" className={`h-9 flex-1 ${NO_SPIN}`} value={draftQty} onChange={(e) => setDraftQty(Number(e.target.value))} aria-label="Quantity" />
                <Select value={draftUnit || undefined} onValueChange={(v) => setDraftUnit(v ?? "pcs")}>
                  <SelectTrigger className="h-9 w-28" aria-label="Unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(draftVariant === "time" ? TIME_UNITS : STANDARD_UNITS).map((u) => (
                      <SelectItem key={u} value={u}>{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={ok} disabled={draftVariant === "custom" && Number.isNaN(evalFormula(draftFormula, []))}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
