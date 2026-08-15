export type CostItem = { label: string; amount: number; currency: string }

export type PricingMode = "manual" | "costPlus"

export type QtyVariant = "standard" | "area" | "time" | "custom"

export type AreaItem = { label?: string; length: number; width: number; pieces: number }

export type FormulaParam = { key: string; value: number }

export function areaTotal(items: AreaItem[]) {
  return (items ?? []).reduce((s, a) => s + (a.length || 0) * (a.width || 0) * (a.pieces || 0), 0)
}

function cellNameToIndex(name: string): { col: number; row: number } | null {
  const m = /^([A-Za-z]+)(\d+)$/.exec(name)
  if (!m) return null
  let col = 0
  for (const ch of m[1].toUpperCase()) col = col * 26 + (ch.charCodeAt(0) - 64)
  return { col, row: parseInt(m[2], 10) }
}

function execRange(fn: string, vals: number[]) {
  if (!vals.length) return "0"
  if (fn === "SUM") return String(vals.reduce((s, x) => s + x, 0))
  if (fn === "AVERAGE") return String(vals.reduce((s, x) => s + x, 0) / vals.length)
  if (fn === "MIN") return String(Math.min(...vals))
  return String(Math.max(...vals))
}

export function evalFormula(expr: string, params: FormulaParam[]) {
  let e = (expr || "").trim().replace(/^=/, "")
  const map = new Map<string, number>()
  for (const p of params ?? []) if (p.key) map.set(p.key.toUpperCase(), p.value || 0)

  // functions with cell ranges, e.g. SUM(A1:A3)
  e = e.replace(/(SUM|AVERAGE|MIN|MAX)\(([A-Za-z]+\d+):([A-Za-z]+\d+)\)/g, (_m, fn: string, a: string, b: string) => {
    const ia = cellNameToIndex(a)
    const ib = cellNameToIndex(b)
    if (!ia || !ib) return "0"
    const vals: number[] = []
    for (const [cell, v] of map) {
      const idx = cellNameToIndex(cell)
      if (!idx) continue
      if (
        idx.col >= Math.min(ia.col, ib.col) && idx.col <= Math.max(ia.col, ib.col) &&
        idx.row >= Math.min(ia.row, ib.row) && idx.row <= Math.max(ia.row, ib.row)
      ) {
        vals.push(v)
      }
    }
    return execRange(fn, vals)
  })

  // functions with plain args, e.g. SUM(1,2) or MAX(A1,2)
  e = e.replace(/(SUM|AVERAGE|MIN|MAX)\(([^()]*)\)/g, (_m, fn: string, args: string) => {
    const vals = args
      .split(",")
      .map((x) => {
        const t = x.trim().toUpperCase()
        return map.has(t) ? (map.get(t) as number) : Number(t)
      })
      .filter((x) => !Number.isNaN(x))
    return execRange(fn, vals)
  })

  // substitute remaining cell references
  for (const [cell, v] of map) {
    e = e.replace(new RegExp(`\\b${cell}\\b`, "g"), `(${v})`)
  }

  if (!/^[0-9+\-*/().\s]+$/.test(e)) return Number.NaN
  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return (${e})`)()
  } catch {
    return Number.NaN
  }
}

export type DocType = "quote" | "invoice" | "receipt"

export const DOC_FLOW: DocType[] = ["quote", "invoice", "receipt"]

export const DOC_LABELS: Record<DocType, string> = {
  quote: "Quote",
  invoice: "Invoice",
  receipt: "Receipt",
}

export const DEFAULT_MARGIN = 40

export const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "CNY", symbol: "¥", rate: 0.14 },
  { code: "EUR", symbol: "€", rate: 1.08 },
  { code: "TWD", symbol: "NT$", rate: 0.031 },
  { code: "JPY", symbol: "¥", rate: 0.0067 },
]

export function currencySymbol(code: string) {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? "$"
}

export function convertCost(amount: number, from: string, to = "USD") {
  const fromRate = CURRENCIES.find((c) => c.code === from)?.rate ?? 1
  const toRate = CURRENCIES.find((c) => c.code === to)?.rate ?? 1
  return (amount * fromRate) / toRate
}

export type InvoiceLine = {
  kind: "line"
  id?: string
  sku?: string
  description: string
  qty: number
  unit?: string
  rate: number
  remark?: string
  costBreakdown?: CostItem[]
  pricingMode?: PricingMode
  marginRate?: number
  qtyVariant?: QtyVariant
  areaItems?: AreaItem[]
  formula?: string
  formulaParams?: FormulaParam[]
}

export type InvoiceGroup = {
  kind: "group"
  id?: string
  label: string
}

export type InvoiceRow =
  | InvoiceLine
  | InvoiceGroup
  | ({ kind: "divider" } & { id?: string })
  | ({ kind: "empty" } & { id?: string; text?: string })

export const ITEM_UNITS = ["pcs", "hrs", "day", "set", "month"]

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled"

export interface Invoice {
  id: string
  number: string
  title?: string
  currency: string
  docType: DocType
  quoteNumber?: string
  receiptNumber?: string
  signature?: string
  client: string
  email: string
  status: InvoiceStatus
  issuedDate: string
  dueDate: string
  poNumber?: string
  billFrom: { company: string; address: string; city: string; country: string; email: string; taxId?: string }
  billTo: { company: string; address: string; city: string; country: string; email: string }
  items: InvoiceRow[]
  taxRate: number
  discount: number
  shipping: number
  notes: string
}

export const invoices: Invoice[] = [
  {
    id: "inv-004",
    title: "Design system refresh",
    number: "INV-2026-004",
    currency: "USD",
    docType: "invoice",
    quoteNumber: "QTE-2026-00X",
    client: "Northwind Labs",
    email: "billing@northwindlabs.io",
    status: "pending",
    issuedDate: "2026-07-28",
    dueDate: "2026-08-11",
    poNumber: "PO-7714",
    billFrom: { company: "Mycogen Inc.", address: "88 Market Street, Suite 400", city: "San Francisco, CA 94105", country: "United States", email: "billing@mycogen.dev", taxId: "US-84-2104473" },
    billTo: { company: "Northwind Labs", address: "12 Harbor Drive", city: "Seattle, WA 98101", country: "United States", email: "billing@northwindlabs.io" },
    items: [
      { kind: "group", label: "Design" },
      { kind: "line", sku: "DS-101", description: "Design system audit", qty: 12, unit: "hrs", rate: 140 },
      { kind: "line", sku: "BRND-02", description: "Brand guidelines", qty: 1, unit: "set", rate: 450 },
      { kind: "group", label: "Engineering" },
      { kind: "line", sku: "DEV-204", description: "Component library migration", qty: 6, unit: "hrs", rate: 180 },
      { kind: "line", sku: "QA-330", description: "QA & accessibility pass", qty: 4, unit: "hrs", rate: 110 },
    ],
    taxRate: 8,
    discount: 120,
    shipping: 0,
    notes: "Payment due within 14 days. Please reference the invoice number in your payment.",
  },
  {
    id: "inv-003",
    title: "Platform subscription — Q3",
    number: "INV-2026-003",
    currency: "USD",
    docType: "invoice",
    quoteNumber: "QTE-2026-00X",
    client: "Acme Corp",
    email: "ap@acmecorp.com",
    status: "paid",
    issuedDate: "2026-07-15",
    dueDate: "2026-07-29",
    poNumber: "PO-6631",
    billFrom: { company: "Mycogen Inc.", address: "88 Market Street, Suite 400", city: "San Francisco, CA 94105", country: "United States", email: "billing@mycogen.dev", taxId: "US-84-2104473" },
    billTo: { company: "Acme Corp", address: "500 Oak Avenue", city: "Austin, TX 78701", country: "United States", email: "ap@acmecorp.com" },
    items: [
      { kind: "line", sku: "SUB-Q3", description: "Platform subscription — Q3", qty: 3, unit: "month", rate: 800 },
      { kind: "line", sku: "RPT-101", description: "Custom report builder", qty: 8, unit: "hrs", rate: 65 },
    ],
    taxRate: 8,
    discount: 0,
    shipping: 0,
    notes: "Thank you for your business.",
  },
  {
    id: "inv-002",
    title: "Data pipeline consulting",
    number: "INV-2026-002",
    currency: "USD",
    docType: "invoice",
    quoteNumber: "QTE-2026-00X",
    client: "Globex GmbH",
    email: "finance@globex.de",
    status: "overdue",
    issuedDate: "2026-06-20",
    dueDate: "2026-07-04",
    poNumber: "PO-5540",
    billFrom: { company: "Mycogen Inc.", address: "88 Market Street, Suite 400", city: "San Francisco, CA 94105", country: "United States", email: "billing@mycogen.dev", taxId: "US-84-2104473" },
    billTo: { company: "Globex GmbH", address: "Konigsallee 12", city: "Dusseldorf 40212", country: "Germany", email: "finance@globex.de" },
    items: [
      { kind: "line", sku: "CNS-010", description: "Consulting — data pipeline", qty: 20, unit: "hrs", rate: 150 },
      { kind: "line", sku: "WS-021", description: "On-site workshop", qty: 2, unit: "day", rate: 1200 },
    ],
    taxRate: 19,
    discount: 200,
    shipping: 0,
    notes: "This invoice is past due. Please settle the balance at your earliest convenience.",
  },
  {
    id: "inv-001",
    title: "Brand refresh",
    number: "INV-2026-001",
    currency: "USD",
    docType: "invoice",
    quoteNumber: "QTE-2026-00X",
    client: "Initech",
    email: "accounts@initech.com",
    status: "draft",
    issuedDate: "2026-06-05",
    dueDate: "2026-06-19",
    poNumber: "PO-4401",
    billFrom: { company: "Mycogen Inc.", address: "88 Market Street, Suite 400", city: "San Francisco, CA 94105", country: "United States", email: "billing@mycogen.dev", taxId: "US-84-2104473" },
    billTo: { company: "Initech", address: "100 Corporate Way", city: "Chicago, IL 60601", country: "United States", email: "accounts@initech.com" },
    items: [
      { kind: "line", sku: "LOGO-01", description: "Logo refresh", qty: 1, unit: "set", rate: 950 },
      { kind: "line", sku: "BRND-02", description: "Brand guidelines", qty: 1, unit: "set", rate: 450 },
    ],
    taxRate: 8,
    discount: 0,
    shipping: 0,
    notes: "Draft — not yet sent to the client.",
  },
  {
    id: "inv-000",
    title: "Maintenance retainer",
    number: "INV-2025-011",
    currency: "USD",
    docType: "invoice",
    quoteNumber: "QTE-2026-00X",
    client: "Umbrella Co",
    email: "billing@umbrella.example",
    status: "cancelled",
    issuedDate: "2025-12-02",
    dueDate: "2025-12-16",
    poNumber: "PO-3310",
    billFrom: { company: "Mycogen Inc.", address: "88 Market Street, Suite 400", city: "San Francisco, CA 94105", country: "United States", email: "billing@mycogen.dev", taxId: "US-84-2104473" },
    billTo: { company: "Umbrella Co", address: "21 Skyline Blvd", city: "Portland, OR 97201", country: "United States", email: "billing@umbrella.example" },
    items: [
      { kind: "line", sku: "MNT-001", description: "Maintenance retainer", qty: 1, unit: "month", rate: 600 },
    ],
    taxRate: 8,
    discount: 0,
    shipping: 0,
    notes: "Cancelled at client request.",
  },
]

export function isLineRow(row: InvoiceRow): row is InvoiceLine {
  return row.kind === "line"
}

export function collectLines(rows: InvoiceRow[]): InvoiceLine[] {
  return rows.flatMap((r) => (r.kind === "line" ? [r] : []))
}

export function lineCost(line: InvoiceLine, to = "USD") {
  return (line.costBreakdown ?? []).reduce((sum, c) => sum + convertCost(c.amount, c.currency, to), 0)
}

export function lineUnitCost(line: InvoiceLine, to = "USD") {
  return line.qty > 0 ? lineCost(line, to) / line.qty : 0
}

export function lineSellingRate(line: InvoiceLine, to = "USD") {
  if (line.pricingMode === "costPlus") {
    return lineUnitCost(line, to) * (1 + (line.marginRate ?? DEFAULT_MARGIN) / 100)
  }
  return line.rate
}

export function lineAmount(line: InvoiceLine, to = "USD") {
  return lineSellingRate(line, to) * line.qty
}

export function lineProfit(line: InvoiceLine, to = "USD") {
  return lineAmount(line, to) - lineCost(line, to)
}

export function lineMargin(line: InvoiceLine, to = "USD") {
  const amt = lineAmount(line, to)
  return amt === 0 ? null : (lineProfit(line, to) / amt) * 100
}

export function invoiceCost(inv: Invoice) {
  return collectLines(inv.items).reduce((sum, l) => sum + lineCost(l, inv.currency), 0)
}

export function invoiceProfit(inv: Invoice) {
  return invoiceSubtotal(inv) - invoiceCost(inv)
}

export function invoiceMargin(inv: Invoice) {
  const sub = invoiceSubtotal(inv)
  return sub === 0 ? null : (invoiceProfit(inv) / sub) * 100
}

export function groupSubtotalAt(rows: InvoiceRow[], index: number, to = "USD") {
  let sum = 0
  for (let i = index + 1; i < rows.length; i++) {
    const r = rows[i]
    if (r.kind === "group") break
    if (r.kind === "line") sum += lineAmount(r, to)
  }
  return sum
}

export function invoiceSubtotal(inv: Invoice) {
  return collectLines(inv.items).reduce((sum, l) => sum + lineAmount(l, inv.currency), 0)
}

export function invoiceTax(inv: Invoice) {
  return invoiceSubtotal(inv) * (inv.taxRate / 100)
}

export function invoiceTotal(inv: Invoice) {
  return invoiceSubtotal(inv) + invoiceTax(inv) - inv.discount + inv.shipping
}

export function formatMoney(n: number, currency = "USD") {
  return `${currencySymbol(currency)}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
