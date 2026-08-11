"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { invoices, invoiceTotal, formatMoney, type Invoice } from "@/data/invoices"
import { InvoicePreview, invoiceStatusStyles } from "@/components/sections/invoice/invoice-preview"

const statusOptions: { value: string; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
]

export default function InvoicesPage() {
  const [selectedId, setSelectedId] = useState(invoices[0].id)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")

  const filtered = invoices.filter((inv) => {
    if (status !== "all" && inv.status !== status) return false
    if (query) {
      const q = query.toLowerCase()
      const title = (inv.title ?? "").toLowerCase()
      if (!inv.number.toLowerCase().includes(q) && !inv.client.toLowerCase().includes(q) && !title.includes(q)) return false
    }
    return true
  })

  const selected: Invoice | undefined = invoices.find((i) => i.id === selectedId) ?? filtered[0]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Select an invoice to preview it.</p>
        </div>
        <Button render={<Link href="/dashboard/invoices/edit" />}>
          <Plus className="size-4" /> New Invoice
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: list */}
        <div className="lg:w-80 shrink-0 flex flex-col rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="p-3 space-y-2 border-b border-border/40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search invoices..."
                className="pl-9 h-9"
                aria-label="Search invoices"
              />
            </div>
            <Select value={status || undefined} onValueChange={(v) => setStatus(v ?? "all")}>
              <SelectTrigger className="w-full h-9" aria-label="Filter by status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[560px] lg:max-h-[640px]">
            {filtered.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">No invoices match.</div>
            ) : (
              filtered.map((inv) => {
                const active = inv.id === selected?.id
                return (
                  <button
                    key={inv.id}
                    onClick={() => setSelectedId(inv.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 border-b border-border/20 last:border-0 transition-colors cursor-pointer",
                      active ? "bg-primary/10" : "hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={cn("text-sm font-semibold leading-snug line-clamp-1", active && "text-primary")}>
                        {inv.title ?? inv.number}
                      </span>
                      <Badge className={cn("text-[10px] font-semibold px-1.5 py-0 rounded-full capitalize shrink-0", invoiceStatusStyles[inv.status])}>
                        {inv.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">
                      {inv.number} · {inv.client}
                    </div>
                    <div className="flex items-center justify-between mt-1.5 text-xs">
                      <span className="font-semibold">{formatMoney(invoiceTotal(inv), inv.currency)}</span>
                      <span className="text-muted-foreground">due {inv.dueDate}</span>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Right: preview */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <InvoicePreview invoice={selected} />
          ) : (
            <div className="rounded-xl border border-border/40 bg-card px-6 py-16 text-center text-sm text-muted-foreground">
              Select an invoice to preview.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
