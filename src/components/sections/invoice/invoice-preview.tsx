import Link from "next/link"
import { Download, PencilLine, Printer, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  formatMoney, invoiceSubtotal, invoiceTax, invoiceTotal, lineAmount, groupSubtotalAt,
  type Invoice, type InvoiceStatus,
} from "@/data/invoices"

export const invoiceStatusStyles: Record<InvoiceStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-warning/10 text-warning",
  paid: "bg-success/10 text-success",
  overdue: "bg-destructive/10 text-destructive",
  cancelled: "bg-muted text-muted-foreground",
}

interface InvoicePreviewProps {
  invoice: Invoice
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const sub = invoiceSubtotal(invoice)
  const tax = invoiceTax(invoice)
  const total = invoiceTotal(invoice)
  const cur = (n: number) => formatMoney(n, invoice.currency)

  return (
    <div className="rounded-xl border border-border/40 bg-background overflow-hidden">
      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/40 px-5 py-3.5 bg-muted/20">
        <Button
          size="sm"
          render={<Link href="/dashboard/invoices/edit" />}
        >
          <PencilLine className="size-3.5" /> Edit
        </Button>
        <Button size="sm" variant="outline" onClick={() => {}}>
          <Download className="size-3.5" /> Download
        </Button>
        <Button size="sm" variant="outline" onClick={() => {}}>
          <Send className="size-3.5" /> Send
        </Button>
        <Button size="sm" variant="ghost" onClick={() => {}}>
          <Printer className="size-3.5" /> Print
        </Button>
        <span className={cn("ml-auto text-xs text-muted-foreground")}>
          Total due: <span className="font-semibold text-foreground">{cur(total)}</span>
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/40 px-5 py-4">
        <div>
          <div className="text-lg font-extrabold tracking-tight">
            Mycogen<span className="text-primary">.</span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Billing Department</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold tracking-tight text-primary">{invoice.docType.toUpperCase()}</div>
          <div className="text-sm font-medium mt-1">{invoice.number}</div>
          {invoice.title && <div className="text-xs text-muted-foreground mt-0.5">{invoice.title}</div>}
          <Badge className={`mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${invoiceStatusStyles[invoice.status]}`}>
            {invoice.status}
          </Badge>
        </div>
      </div>

      {/* Bill from / to + meta */}
      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Bill From</div>
          <div className="text-sm font-semibold">{invoice.billFrom.company}</div>
          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {invoice.billFrom.address}<br />
            {invoice.billFrom.city}<br />
            {invoice.billFrom.email}
            {invoice.billFrom.taxId && <><br />Tax ID: {invoice.billFrom.taxId}</>}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Bill To</div>
          <div className="text-sm font-semibold">{invoice.billTo.company}</div>
          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {invoice.billTo.address}<br />
            {invoice.billTo.city}<br />
            {invoice.billTo.email}
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="px-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Invoice No.", value: invoice.number },
          { label: "Issued", value: invoice.issuedDate },
          { label: "Due", value: invoice.dueDate },
          { label: "PO No.", value: invoice.poNumber ?? "—" },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</div>
            <div className="text-sm font-medium mt-0.5">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Items */}
      <div className="px-5 pt-4">
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-3 py-2.5 font-medium">Item</th>
                <th className="px-3 py-2.5 font-medium text-right">Qty</th>
                <th className="px-3 py-2.5 font-medium text-right">Unit Price</th>
                <th className="px-3 py-2.5 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((row, i) => {
                if (row.kind === "group") {
                  return (
                    <tr key={i} className="border-b border-border/20 bg-primary/5">
                      <td colSpan={4} className="px-3 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {row.label || "Group"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Subtotal <span className="font-semibold text-foreground">{cur(groupSubtotalAt(invoice.items, i, invoice.currency))}</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                }
                if (row.kind === "divider") {
                  return (
                    <tr key={i} className="border-b border-border/20">
                      <td colSpan={4} className="px-3 py-1">
                        <div className="h-px bg-border/60" />
                      </td>
                    </tr>
                  )
                }
                if (row.kind === "empty") {
                  return (
                    <tr key={i} className="border-b border-border/20">
                      <td colSpan={4} className="px-3 py-2.5">
                        {row.text ? <span className="text-sm text-muted-foreground">{row.text}</span> : null}
                      </td>
                    </tr>
                  )
                }
                return (
                  <tr key={i} className="border-b border-border/20 last:border-0">
                    <td className="px-3 py-2.5">
                      <span className="font-medium">{row.description}</span>
                      {row.sku && <span className="text-xs text-muted-foreground ml-1.5">{row.sku}</span>}
                      {row.unit && <span className="text-xs text-muted-foreground ml-1.5">/ {row.unit}</span>}
                      {row.remark && <span className="block text-xs text-muted-foreground mt-0.5">{row.remark}</span>}
                    </td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">{row.qty}</td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">{cur(row.rate)}</td>
                    <td className="px-3 py-2.5 text-right font-medium">{cur(lineAmount(row, invoice.currency))}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="px-5 py-4 flex justify-end">
        <div className="w-full max-w-64 space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span><span>{cur(sub)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax ({invoice.taxRate}%)</span><span>{cur(tax)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Discount</span><span>−{cur(invoice.discount)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span><span>{cur(invoice.shipping)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-border/40 text-base">
            <span>Total</span><span>{cur(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mx-5 mb-4 rounded-lg bg-muted/30 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Notes: </span>
          {invoice.notes}
        </div>
      )}

      {/* Signature */}
      {invoice.signature && (
        <div className="mx-5 mb-4 flex items-end justify-between gap-4 border-t border-dashed border-border/40 pt-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Authorized signature</div>
            <div className="font-serif text-2xl italic text-primary">{invoice.signature}</div>
            <div className="mt-1 text-xs text-muted-foreground">{invoice.billFrom.company}</div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <div className="mb-6">Date</div>
            <div>{invoice.issuedDate}</div>
          </div>
        </div>
      )}
    </div>
  )
}
