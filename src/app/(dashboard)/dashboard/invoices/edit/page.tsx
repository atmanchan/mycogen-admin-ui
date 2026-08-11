"use client"

import { useState, useEffect, Fragment } from "react"
import Link from "next/link"
import {
  DndContext, closestCorners, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus, Trash2, Eye, Send, Save, ArrowLeft, Building2, FolderKanban, Minus, SquareDashed, GripVertical, ChevronDown, Coins, CheckCircle2, Circle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogOverlay, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { formatMoney, invoiceSubtotal, invoiceTax, invoiceTotal, lineAmount, lineCost, lineProfit, lineMargin, lineUnitCost, lineSellingRate, invoiceCost, invoiceProfit, invoiceMargin, collectLines, groupSubtotalAt, convertCost, CURRENCIES, DEFAULT_MARGIN, DOC_FLOW, DOC_LABELS, type Invoice, type InvoiceRow, type InvoiceLine, type CostItem, type PricingMode, type DocType } from "@/data/invoices"
import { InvoicePreview } from "@/components/sections/invoice/invoice-preview"
import { SortableTableRow, type RowHandleProps } from "@/components/sections/invoice/sortable-table-row"
import { QtyUnit } from "@/components/ui/qty-unit"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ItemAutocomplete } from "@/components/sections/invoice/item-autocomplete"
import { AddItemsDialog } from "@/components/sections/invoice/add-items-dialog"
import type { CatalogItem } from "@/data/items"
import { cn } from "@/lib/utils"

let rowSeq = 100
const nextRowId = () => `row-${++rowSeq}`

const SIGNATORIES = [
  { name: "John Doe", role: "Owner" },
  { name: "Jane Smith", role: "Manager" },
  { name: "Alice Johnson", role: "Finance" },
]

const seed = (id: string): Invoice =>
  ({
    id,
    number: "INV-2026-005",
    currency: "USD",
    docType: "invoice",
    quoteNumber: "QTE-2026-005",
    signature: "John Doe",
    title: "Design system refresh",
    client: "Northwind Labs",
    email: "billing@northwindlabs.io",
    status: "draft",
    issuedDate: "2026-08-01",
    dueDate: "2026-08-15",
    poNumber: "PO-7714",
    billFrom: { company: "Mycogen Inc.", address: "88 Market Street, Suite 400", city: "San Francisco, CA 94105", country: "United States", email: "billing@mycogen.dev", taxId: "US-84-2104473" },
    billTo: { company: "Northwind Labs", address: "12 Harbor Drive", city: "Seattle, WA 98101", country: "United States", email: "billing@northwindlabs.io" },
    items: [
      { kind: "line", id: "row-1", sku: "DS-101", description: "Design system audit", qty: 12, unit: "hrs", rate: 140, remark: "Focus on tokens & components", costBreakdown: [{ label: "Design labor", amount: 900, currency: "USD" }, { label: "Tools", amount: 1500, currency: "CNY" }] },
      { kind: "line", id: "row-2", sku: "DEV-204", description: "Component library migration", qty: 6, unit: "hrs", rate: 180, costBreakdown: [{ label: "Dev labor", amount: 800, currency: "USD" }] },
      { kind: "line", id: "row-3", sku: "QA-330", description: "QA & accessibility pass", qty: 4, unit: "hrs", rate: 110, costBreakdown: [] },
    ],
    taxRate: 8,
    discount: 0,
    shipping: 0,
    notes: "Payment due within 14 days.",
  }) satisfies Invoice

const blankLine = (): InvoiceLine => ({ kind: "line", id: nextRowId(), sku: "", description: "", qty: 1, unit: "pcs", rate: 0, remark: "", costBreakdown: [], pricingMode: "manual", marginRate: DEFAULT_MARGIN })

export default function InvoiceEditorPage() {
  const [invoice, setInvoice] = useState<Invoice>(() => seed("inv-editing"))
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["row-1"]))
  const [itemColW, setItemColW] = useState(0)

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector('main [aria-label$="description"]')
      setItemColW(el ? Math.round(el.getBoundingClientRect().width) : 0)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const update = (patch: Partial<Invoice>) => setInvoice((prev) => ({ ...prev, ...patch }))
  const updateRow = (i: number, patch: Partial<InvoiceRow>) =>
    setInvoice((prev) => ({ ...prev, items: prev.items.map((r, idx): InvoiceRow => (idx === i ? ({ ...r, ...patch } as InvoiceRow) : r)) }))
  const updateLine = (i: number, patch: Partial<InvoiceLine>) =>
    setInvoice((prev) => ({ ...prev, items: prev.items.map((r, idx) => (idx === i && r.kind === "line" ? { ...r, ...patch } : r)) }))
  const updateGroupLabel = (gi: number, label: string) =>
    setInvoice((prev) => ({ ...prev, items: prev.items.map((r, idx) => (idx === gi && r.kind === "group" ? { ...r, label } : r)) }))

  const addCost = (li: number) =>
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((r, idx): InvoiceRow => {
        if (idx !== li || r.kind !== "line") return r
        return { ...r, costBreakdown: [...(r.costBreakdown ?? []), { label: "", amount: 0, currency: "USD" }] }
      }),
    }))
  const updateCost = (li: number, ci: number, patch: Partial<CostItem>) =>
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((r, idx): InvoiceRow => {
        if (idx !== li || r.kind !== "line") return r
        return {
          ...r,
          costBreakdown: (r.costBreakdown ?? []).map((c, j) => (j === ci ? { ...c, ...patch } : c)),
        }
      }),
    }))
  const removeCost = (li: number, ci: number) =>
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((r, idx): InvoiceRow => {
        if (idx !== li || r.kind !== "line") return r
        return { ...r, costBreakdown: (r.costBreakdown ?? []).filter((_, j) => j !== ci) }
      }),
    }))

  const addLine = () => setInvoice((prev) => ({ ...prev, items: [...prev.items, blankLine()] }))
  const addMultipleItems = (items: CatalogItem[]) =>
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        ...items.map((it) => ({
          kind: "line" as const,
          id: nextRowId(),
          sku: it.sku,
          description: it.name,
          qty: 1,
          unit: it.unit,
          rate: convertCost(it.rate, "USD", invoice.currency),
          pricingMode: "costPlus" as PricingMode,
          marginRate: it.cost > 0 ? ((it.rate - it.cost) / it.cost) * 100 : DEFAULT_MARGIN,
          costBreakdown: [{ label: it.name, amount: it.cost, currency: "USD" }],
          remark: "",
        })),
      ],
    }))
  const addDivider = () => setInvoice((prev) => ({ ...prev, items: [...prev.items, { kind: "divider", id: nextRowId() }] }))
  const addEmpty = () => setInvoice((prev) => ({ ...prev, items: [...prev.items, { kind: "empty", id: nextRowId(), text: "" }] }))
  const updateEmptyText = (i: number, text: string) =>
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((r, idx): InvoiceRow => (idx === i && r.kind === "empty" ? { ...r, text } : r)),
    }))
  const addGroup = () => setInvoice((prev) => ({ ...prev, items: [...prev.items, { kind: "group", id: nextRowId(), label: "" }] }))

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const advanceDoc = () =>
    setInvoice((prev) => {
      if (prev.docType === "quote") return { ...prev, docType: "invoice" }
      if (prev.docType === "invoice") {
        const rn = prev.receiptNumber ?? `RCP-${prev.number.replace(/^INV-/, "")}`
        return { ...prev, docType: "receipt", receiptNumber: rn }
      }
      return prev
    })

  const docNumberFor = (t: DocType) =>
    t === "quote" ? (invoice.quoteNumber ?? "—") : t === "invoice" ? invoice.number : (invoice.receiptNumber ?? "—")

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setInvoice((prev) => {
      const items = [...prev.items]
      const oldIndex = items.findIndex((r) => r.id === String(active.id))
      const newIndex = items.findIndex((r) => r.id === String(over.id))
      if (oldIndex < 0 || newIndex < 0) return prev
      const [moved] = items.splice(oldIndex, 1)
      items.splice(newIndex, 0, moved)
      return { ...prev, items }
    })
  }

  const rowIds = invoice.items.map((r) => r.id!).filter(Boolean)

  const removeRow = (i: number) =>
    setInvoice((prev) => ({ ...prev, items: prev.items.filter((_, idx) => idx !== i) }))

  const sub = invoiceSubtotal(invoice)
  const tax = invoiceTax(invoice)
  const total = invoiceTotal(invoice)
  const costTotal = invoiceCost(invoice)
  const grossProfit = invoiceProfit(invoice)
  const grossMargin = invoiceMargin(invoice)
  const itemCount = collectLines(invoice.items).length
  const cur = (n: number) => formatMoney(n, invoice.currency)

  const field = "space-y-1.5"
  const label = "text-sm font-medium block"

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-xs" render={<Link href="/dashboard/invoices" />} aria-label="Back to invoices">
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Edit Invoice</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Create or edit an invoice.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline"><Eye className="size-4" /> Preview</Button>} />
            <DialogOverlay />
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader className="border-b border-border/40 pb-3">
                <DialogTitle className="text-base font-semibold">Invoice Preview</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">Live preview of the current invoice.</DialogDescription>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-y-auto -mx-4 px-4">
                <InvoicePreview invoice={invoice} />
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => {}}><Save className="size-4" /> Save</Button>
          <Button onClick={() => {}}><Send className="size-4" /> Send</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bill To</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={field}>
                <label className={label} htmlFor="bt-company">Client</label>
                <Input id="bt-company" value={invoice.billTo.company} onChange={(e) => update({ billTo: { ...invoice.billTo, company: e.target.value } })} />
              </div>
              <div className={field}>
                <label className={label} htmlFor="bt-email">Email</label>
                <Input id="bt-email" value={invoice.billTo.email} onChange={(e) => update({ billTo: { ...invoice.billTo, email: e.target.value } })} />
              </div>
              <div className={field}>
                <label className={label} htmlFor="bt-address">Address</label>
                <Input id="bt-address" value={invoice.billTo.address} onChange={(e) => update({ billTo: { ...invoice.billTo, address: e.target.value } })} />
              </div>
              <div className={field}>
                <label className={label} htmlFor="bt-city">City / Country</label>
                <Input id="bt-city" value={invoice.billTo.city} onChange={(e) => update({ billTo: { ...invoice.billTo, city: e.target.value } })} />
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-3">
                <label className={label} htmlFor="inv-title">Title</label>
                <Input id="inv-title" value={invoice.title ?? ""} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Design system refresh" />
              </div>
              <div className={field}>
                <label className={label} htmlFor="inv-issued">Issued</label>
                <Input id="inv-issued" type="date" value={invoice.issuedDate} onChange={(e) => update({ issuedDate: e.target.value })} />
              </div>
              <div className={field}>
                <label className={label} htmlFor="inv-due">Due</label>
                <Input id="inv-due" type="date" value={invoice.dueDate} onChange={(e) => update({ dueDate: e.target.value })} />
              </div>
              <div className={field}>
                <label className={label} htmlFor="inv-po">PO Number</label>
                <Input id="inv-po" value={invoice.poNumber ?? ""} onChange={(e) => update({ poNumber: e.target.value })} />
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Line Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="px-2 py-3 w-8" />
                      <th className="px-2 py-3 font-medium min-w-56">Item</th>
                      <th className="px-2 py-3 font-medium w-32">Qty / Unit</th>
                      <th className="px-2 py-3 font-medium w-24">Price</th>
                      <th className="px-2 py-3 font-medium text-right w-24">Amount</th>
                      <th className="px-2 py-3 w-10" />
                    </tr>
                  </thead>
                  <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                  <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                  <tbody>
                    {invoice.items.map((row, i) => {
                      if (row.kind === "group") {
                        return (
                          <SortableTableRow key={i} id={row.id!} className="border-b border-border/20 bg-primary/5">
                            {(handleProps: RowHandleProps) => (
                              <td colSpan={6} className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    {...handleProps}
                                    className="cursor-grab active:cursor-grabbing p-0.5 rounded text-muted-foreground/50 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    aria-label="Drag to reorder"
                                  >
                                    <GripVertical className="size-3.5" />
                                  </button>
                                  <FolderKanban className="size-3.5 text-primary shrink-0" />
                                  <Input
                                    className="h-7 max-w-48 text-xs font-semibold"
                                    placeholder="Group name"
                                    value={row.label}
                                    onChange={(e) => updateGroupLabel(i, e.target.value)}
                                    aria-label={`Group ${i + 1} name`}
                                  />
                                  <span className="text-[11px] text-muted-foreground ml-auto shrink-0">
                                    Subtotal <span className="font-semibold text-foreground">{cur(groupSubtotalAt(invoice.items, i, invoice.currency))}</span>
                                  </span>
                                  <Button variant="ghost" size="icon-xs" aria-label={`Remove group ${i + 1}`} onClick={() => removeRow(i)}>
                                    <Trash2 className="size-3.5 text-destructive" />
                                  </Button>
                                </div>
                              </td>
                            )}
                          </SortableTableRow>
                        )
                      }
                      if (row.kind === "divider") {
                        return (
                          <SortableTableRow key={i} id={row.id!} className="border-b border-border/20">
                            {(handleProps: RowHandleProps) => (
                              <td colSpan={6} className="px-3 py-1">
                                <div className="flex items-center gap-2">
                                  <button
                                    {...handleProps}
                                    className="cursor-grab active:cursor-grabbing p-0.5 rounded text-muted-foreground/50 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    aria-label="Drag to reorder"
                                  >
                                    <GripVertical className="size-3" />
                                  </button>
                                  <div className="h-px bg-border/60 flex-1" />
                                  <Button variant="ghost" size="icon-xs" aria-label={`Remove divider ${i + 1}`} onClick={() => removeRow(i)}>
                                    <Trash2 className="size-3.5 text-destructive" />
                                  </Button>
                                </div>
                              </td>
                            )}
                          </SortableTableRow>
                        )
                      }
                      if (row.kind === "empty") {
                        return (
                          <SortableTableRow key={i} id={row.id!} className="border-b border-border/20">
                            {(handleProps: RowHandleProps) => (
                              <>
                                <td className="px-2 py-3">
                                  <button
                                    {...handleProps}
                                    className="cursor-grab active:cursor-grabbing p-0.5 rounded text-muted-foreground/50 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    aria-label="Drag to reorder"
                                  >
                                    <GripVertical className="size-3.5" />
                                  </button>
                                </td>
                                <td colSpan={4} className="px-2 py-3">
                                  <Input
                                    className="h-8"
                                    placeholder="Type here..."
                                    value={row.text ?? ""}
                                    onChange={(e) => updateEmptyText(i, e.target.value)}
                                    aria-label={`Empty row ${i + 1} text`}
                                  />
                                </td>
                                <td className="px-2 py-3">
                                  <Button variant="ghost" size="icon-xs" aria-label={`Remove empty row ${i + 1}`} onClick={() => removeRow(i)}>
                                    <Trash2 className="size-3.5 text-destructive" />
                                  </Button>
                                </td>
                              </>
                            )}
                          </SortableTableRow>
                        )
                      }
                      return (
                        <Fragment key={i}>
                          <SortableTableRow id={row.id!} className="border-b border-border/20 last:border-0 align-top hover:bg-muted/40">
                            {(handleProps: RowHandleProps) => (
                              <>
                                <td className="px-2 py-3">
                                  <button
                                    {...handleProps}
                                    className="cursor-grab active:cursor-grabbing p-0.5 rounded text-muted-foreground/50 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    aria-label="Drag to reorder"
                                  >
                                    <GripVertical className="size-3.5" />
                                  </button>
                                </td>
                                <td className="px-2 py-3">
                                  <div className="relative">
                                    <TooltipProvider delay={100}>
                                      <Tooltip>
                                        <TooltipTrigger
                                          render={
                                            <button
                                              onClick={() => toggleExpand(row.id!)}
                                              aria-expanded={expanded.has(row.id!)}
                                              aria-label={`Cost for item ${i + 1}`}
                                              className={cn(
                                                "absolute top-1 right-2 z-10 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold cursor-pointer transition-colors",
                                                (row.costBreakdown ?? []).length > 0
                                                  ? expanded.has(row.id!)
                                                    ? "bg-primary/10 text-primary border border-primary/30"
                                                    : "bg-muted text-muted-foreground border border-border/40 hover:text-foreground"
                                                  : "bg-muted/40 text-muted-foreground/70 border border-dashed border-border/60 hover:text-foreground"
                                              )}
                                            >
                                              <Coins className="size-3" />
                                              {(row.costBreakdown ?? []).length > 0 ? cur(lineCost(row, invoice.currency)) : "Cost"}
                                              <ChevronDown className={cn("size-3 transition-transform", expanded.has(row.id!) && "rotate-180")} />
                                            </button>
                                          }
                                        />
                                        <TooltipContent>Cost breakdown</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <ItemAutocomplete
                                      value={row.description}
                                      onChange={(v) => updateLine(i, { description: v })}
                                      onSelect={(item) => {
                                        const margin = item.cost > 0 ? ((item.rate - item.cost) / item.cost) * 100 : DEFAULT_MARGIN
                                        updateLine(i, {
                                          description: item.name,
                                          sku: item.sku,
                                          unit: item.unit,
                                          rate: convertCost(item.rate, "USD", invoice.currency),
                                          pricingMode: "costPlus",
                                          marginRate: margin,
                                          costBreakdown: [{ label: item.name, amount: item.cost * (row.qty || 1), currency: "USD" }],
                                        })
                                      }}
                                      ariaLabel={`Item ${i + 1} description`}
                                      className="pr-24"
                                    />
                                  </div>
                                  {(row.costBreakdown ?? []).length > 0 && (
                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                                      <span>
                                        Cost <span className="font-semibold text-foreground">{cur(lineCost(row, invoice.currency))}</span>
                                      </span>
                                      <span>
                                        Profit{" "}
                                        <span className={cn("font-semibold", lineProfit(row, invoice.currency) < 0 ? "text-destructive" : "text-foreground")}>
                                          {cur(lineProfit(row, invoice.currency))}
                                        </span>
                                      </span>
                                      <span>
                                        Margin{" "}
                                        <span className={cn("font-semibold", lineMargin(row, invoice.currency) != null && lineMargin(row, invoice.currency)! < 0 ? "text-destructive" : "text-foreground")}>
                                          {lineMargin(row, invoice.currency) == null ? "—" : `${lineMargin(row, invoice.currency)!.toFixed(1)}%`}
                                        </span>
                                      </span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-2 py-3">
                                  <QtyUnit
                                    qty={row.qty}
                                    onQtyChange={(v) => updateLine(i, { qty: v })}
                                    unit={row.unit}
                                    onUnitChange={(v) => updateLine(i, { unit: v })}
                                    name={`Item ${i + 1}`}
                                  />
                                </td>
                                <td className="px-2 py-3">
                                  <Input
                                    type="number"
                                    className="h-8"
                                    value={lineSellingRate(row, invoice.currency)}
                                    readOnly={row.pricingMode === "costPlus"}
                                    onChange={(e) => updateLine(i, { rate: Number(e.target.value) })}
                                    aria-label={`Item ${i + 1} rate`}
                                  />
                                </td>
                                <td className="px-2 py-3 text-right font-medium whitespace-nowrap">{cur(lineAmount(row, invoice.currency))}</td>
                                <td className="px-2 py-3">
                                  <Button variant="ghost" size="icon-xs" aria-label={`Remove item ${i + 1}`} onClick={() => removeRow(i)}>
                                    <Trash2 className="size-3.5 text-destructive" />
                                  </Button>
                                </td>
                              </>
                            )}
                          </SortableTableRow>
                          {expanded.has(row.id!) && (
                            <Fragment>
                              <tr className="border-b border-border/20 bg-muted/40">
                                <td className="px-2" />
                                <td colSpan={5} className="px-2 py-3">
                                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Cost Breakdown</div>
                                  <div className="space-y-2">
                                    {(row.costBreakdown ?? []).map((c, ci) => (
                                      <div key={ci} className="flex flex-wrap items-center gap-2">
                                        <Textarea
                                          rows={1}
                                          value={c.label}
                                          onChange={(e) => updateCost(i, ci, { label: e.target.value })}
                                          placeholder="Cost item"
                                          style={itemColW ? { width: itemColW } : undefined}
                                          className="min-h-8 shrink-0 resize-none py-1.5 text-xs"
                                          aria-label={`Item ${i + 1} cost ${ci + 1} label`}
                                        />
                                        <Input
                                          type="number"
                                          className="h-8 w-28"
                                          value={c.amount}
                                          onChange={(e) => updateCost(i, ci, { amount: Number(e.target.value) })}
                                          aria-label={`Item ${i + 1} cost ${ci + 1} amount`}
                                        />
                                        <Select value={c.currency} onValueChange={(v) => updateCost(i, ci, { currency: v ?? "USD" })}>
                                          <SelectTrigger className="h-8 w-24" aria-label={`Item ${i + 1} cost ${ci + 1} currency`}>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {CURRENCIES.map((cur) => (
                                              <SelectItem key={cur.code} value={cur.code}>{cur.code}</SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <span className="shrink-0 text-xs text-muted-foreground">
                                          ≈ {cur(convertCost(c.amount, c.currency, invoice.currency))}
                                        </span>
                                        <Button variant="ghost" size="icon-xs" aria-label={`Remove cost ${ci + 1}`} onClick={() => removeCost(i, ci)}>
                                          <Trash2 className="size-3.5 text-destructive" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                  <Button size="xs" variant="outline" onClick={() => addCost(i)}>
                                    <Plus className="size-3" /> Add cost
                                  </Button>

                                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/40 pt-2">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pricing</span>
                                    <div className="inline-flex items-center rounded-lg bg-muted p-0.5">
                                      <button
                                        onClick={() => updateLine(i, { pricingMode: "costPlus", rate: lineSellingRate(row, invoice.currency) })}
                                        className={cn(
                                          "rounded-md px-2 py-0.5 text-xs transition-colors",
                                          row.pricingMode !== "manual" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"
                                        )}
                                      >
                                        Cost-plus
                                      </button>
                                      <button
                                        onClick={() => updateLine(i, { pricingMode: "manual", rate: lineSellingRate(row, invoice.currency) })}
                                        className={cn(
                                          "rounded-md px-2 py-0.5 text-xs transition-colors",
                                          row.pricingMode === "manual" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"
                                        )}
                                      >
                                        Manual
                                      </button>
                                    </div>
                                    {row.pricingMode === "manual" ? (
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-muted-foreground">Unit price</span>
                                        <Input
                                          type="number"
                                          className="h-8 w-28"
                                          value={row.rate}
                                          onChange={(e) => updateLine(i, { rate: Number(e.target.value) })}
                                          aria-label={`Item ${i + 1} selling price`}
                                        />
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-muted-foreground">Margin %</span>
                                        <Input
                                          type="number"
                                          className="h-8 w-24"
                                          value={row.marginRate ?? DEFAULT_MARGIN}
                                          onChange={(e) => updateLine(i, { marginRate: Number(e.target.value) })}
                                          aria-label={`Item ${i + 1} margin rate`}
                                        />
                                        <span className="text-xs text-muted-foreground">
                                          → Unit price {cur(lineSellingRate(row, invoice.currency))}
                                        </span>
                                      </div>
                                    )}
                                    <span className="ml-auto text-xs text-muted-foreground">
                                      Unit cost {cur(lineUnitCost(row, invoice.currency))}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr className="border-b border-border/20 bg-muted/40">
                                <td className="px-2" />
                                <td colSpan={5} className="px-2 py-2">
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                                    <span className="text-muted-foreground">
                                      Cost <span className="font-semibold text-foreground">{cur(lineCost(row, invoice.currency))}</span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      Unit Cost{" "}
                                      <span className="font-semibold text-foreground">{cur(lineUnitCost(row, invoice.currency))}</span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      Revenue{" "}
                                      <span className="font-semibold text-foreground">{cur(lineAmount(row, invoice.currency))}</span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      Profit{" "}
                                      <span className={cn("font-semibold", lineProfit(row, invoice.currency) < 0 ? "text-destructive" : "text-foreground")}>
                                        {cur(lineProfit(row, invoice.currency))}
                                      </span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      Margin{" "}
                                      <span className={cn("font-semibold", lineMargin(row, invoice.currency) != null && lineMargin(row, invoice.currency)! < 0 ? "text-destructive" : "text-foreground")}>
                                        {lineMargin(row, invoice.currency) == null ? "—" : `${lineMargin(row, invoice.currency)!.toFixed(1)}%`}
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </Fragment>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                  </SortableContext>
                  </DndContext>
                </table>
              </div>

              {/* Add row actions — bottom left */}
              <div className="flex flex-wrap items-center gap-2 border-t border-border/40 bg-muted/20 px-4 py-2.5">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" size="sm"><Plus className="size-3.5" /> Add</Button>} />
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={addGroup}>
                      <FolderKanban className="size-3.5" /> Group
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={addDivider}>
                      <Minus className="size-3.5" /> Line
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={addEmpty}>
                      <SquareDashed className="size-3.5" /> Empty
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" onClick={addLine}><Plus className="size-3.5" /> Line Item</Button>
                <AddItemsDialog onAdd={addMultipleItems} />
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Totals</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className={field}>
                  <label className={label} htmlFor="tax">Tax rate (%)</label>
                  <Input id="tax" type="number" value={invoice.taxRate} onChange={(e) => update({ taxRate: Number(e.target.value) })} />
                </div>
                <div className={field}>
                  <label className={label} htmlFor="discount">Discount</label>
                  <Input id="discount" type="number" value={invoice.discount} onChange={(e) => update({ discount: Number(e.target.value) })} />
                </div>
                <div className={field}>
                  <label className={label} htmlFor="shipping">Shipping</label>
                  <Input id="shipping" type="number" value={invoice.shipping} onChange={(e) => update({ shipping: Number(e.target.value) })} />
                </div>
              </div>
              <div className="rounded-lg border border-border/40 p-4 space-y-1.5 text-sm self-start w-full">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{cur(sub)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Tax ({invoice.taxRate}%)</span><span>{cur(tax)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Discount</span><span>−{cur(invoice.discount)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{cur(invoice.shipping)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Cost</span><span>{cur(costTotal)}</span></div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Profit</span>
                  <span className={cn("font-medium", grossProfit < 0 ? "text-destructive" : "text-foreground")}>{cur(grossProfit)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Margin</span>
                  <span className={cn("font-medium", grossMargin != null && grossMargin < 0 ? "text-destructive" : "text-foreground")}>
                    {grossMargin == null ? "—" : `${grossMargin.toFixed(1)}%`}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-border/40 text-base"><span>Total</span><span>{cur(total)}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea rows={3} value={invoice.notes} onChange={(e) => update({ notes: e.target.value })} placeholder="Terms, payment instructions..." />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice Setting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={field}>
                <label className={label} htmlFor="invoice-status">Status</label>
                <Select
                  value={invoice.status}
                  onValueChange={(v) => update({ status: v as Invoice["status"] })}
                >
                  <SelectTrigger className="w-full" id="invoice-status" aria-label="Invoice status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["draft", "pending", "paid", "overdue", "cancelled"] as Invoice["status"][]).map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className={field}>
                <label className={label}>Invoice No.</label>
                <Input value={invoice.number} readOnly className="bg-muted/40 text-muted-foreground" aria-label="Invoice number (read only)" />
              </div>
              <div className={field}>
                <label className={label} htmlFor="invoice-currency">Currency</label>
                <Select
                  value={invoice.currency}
                  onValueChange={(v) => update({ currency: v ?? "USD" })}
                >
                  <SelectTrigger className="w-full" id="invoice-currency" aria-label="Invoice currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.code} ({c.symbol})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className={field}>
                <label className={label} htmlFor="invoice-signature">Signature</label>
                <Select
                  value={invoice.signature || undefined}
                  onValueChange={(v) => update({ signature: v ?? "" })}
                >
                  <SelectTrigger className="w-full" id="invoice-signature" aria-label="Invoice signature">
                    <SelectValue placeholder="Select signatory" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIGNATORIES.map((s) => (
                      <SelectItem key={s.name} value={s.name}>{s.name} — {s.role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bill From</CardTitle>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Building2 className="size-3" /> Auto-loaded from company settings
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-muted/20 p-4">
                <span className="size-10 rounded-lg bg-primary/12 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                  {invoice.billFrom.company.charAt(0)}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{invoice.billFrom.company}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {invoice.billFrom.address}<br />
                    {invoice.billFrom.city}<br />
                    {invoice.billFrom.email}
                    {invoice.billFrom.taxId && <><br />Tax ID: {invoice.billFrom.taxId}</>}
                  </div>
                </div>
                <Button variant="ghost" size="xs" className="ml-auto shrink-0" onClick={() => {}}>Change</Button>
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {DOC_FLOW.map((t, idx) => {
                const currentIdx = DOC_FLOW.indexOf(invoice.docType)
                const done = idx < currentIdx
                const current = idx === currentIdx
                const pending = idx > currentIdx
                return (
                  <div
                    key={t}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2.5",
                      current ? "border-primary/40 bg-primary/5" : pending ? "border-border/40 opacity-50" : "border-border/40 bg-muted/20"
                    )}
                  >
                    <span className={cn("shrink-0", done ? "text-success" : current ? "text-primary" : "text-muted-foreground")}>
                      {done ? <CheckCircle2 className="size-4" /> : current ? <Circle className="size-4 fill-primary/30" /> : <Circle className="size-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold capitalize">{DOC_LABELS[t]}</div>
                      <div className={cn("text-xs", pending ? "text-muted-foreground/70" : "text-muted-foreground")}>
                        {pending ? "Not issued" : docNumberFor(t)}
                      </div>
                    </div>
                    {current && t !== "receipt" && (
                      <Button size="xs" onClick={advanceDoc}>
                        {t === "quote" ? "Convert to Invoice" : "Convert to Receipt"} <ArrowRight className="size-3" />
                      </Button>
                    )}
                    {current && t === "receipt" && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Final</span>
                    )}
                    {pending && (
                      <span className="text-[10px] text-muted-foreground/70">{t === "invoice" ? "Issued after quote accepted" : "Generated after payment"}</span>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
