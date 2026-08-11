"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogOverlay, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { CATALOG, CATEGORIES, type CatalogItem } from "@/data/items"
import { formatMoney } from "@/data/invoices"

interface AddItemsDialogProps {
  onAdd: (items: CatalogItem[]) => void
}

export function AddItemsDialog({ onAdd }: AddItemsDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = CATALOG.filter((c) => {
    if (category !== "all" && c.category !== category) return false
    if (query) {
      const q = query.toLowerCase()
      if (!c.name.toLowerCase().includes(q) && !c.sku.toLowerCase().includes(q)) return false
    }
    return true
  })

  const toggle = (sku: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(sku)) next.delete(sku)
      else next.add(sku)
      return next
    })

  const allChecked = filtered.length > 0 && filtered.every((c) => selected.has(c.sku))

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allChecked) filtered.forEach((c) => next.delete(c.sku))
      else filtered.forEach((c) => next.add(c.sku))
      return next
    })
  }

  const handleAdd = () => {
    const items = CATALOG.filter((c) => selected.has(c.sku))
    onAdd(items)
    setSelected(new Set())
    setQuery("")
    setCategory("all")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm"><Plus className="size-3.5" /> Multiple Item</Button>} />
      <DialogOverlay />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="border-b border-border/40 pb-3">
          <DialogTitle className="text-base font-semibold">Add Multiple Items</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Select items to add to the invoice.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items..."
              className="h-9 pl-9"
              aria-label="Search items"
            />
          </div>
          <Select value={category || undefined} onValueChange={(v) => setCategory(v ?? "all")}>
            <SelectTrigger className="h-9 w-full" aria-label="Category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="max-h-72 overflow-y-auto rounded-lg border border-border/40 divide-y divide-border/20">
          <label className="flex items-center gap-2 bg-muted/30 px-3 py-2 text-sm font-medium cursor-pointer">
            <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="Select all" />
            Select all
          </label>
          {filtered.map((c) => (
            <label key={c.sku} className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted/30 transition-colors">
              <Checkbox checked={selected.has(c.sku)} onCheckedChange={() => toggle(c.sku)} aria-label={`Select ${c.name}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{c.category} · {c.sku}</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{c.unit} · {formatMoney(c.rate)}</span>
            </label>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">No items match.</div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={selected.size === 0}>
            {selected.size > 0 ? `Add ${selected.size} item${selected.size !== 1 ? "s" : ""}` : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
