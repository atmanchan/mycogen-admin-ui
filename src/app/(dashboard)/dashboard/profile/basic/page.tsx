import { CheckCircle2, Clock, Copy, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const description = [
  { label: "Order No.", value: "#ORD-2026-8841" },
  { label: "Customer", value: "Alice Johnson" },
  { label: "Email", value: "alice@example.com" },
  { label: "Phone", value: "+1 (555) 010-3321" },
  { label: "Created", value: "Aug 4, 2026 · 14:22" },
  { label: "Payment", value: "Visa ending 4242" },
  { label: "Shipping", value: "Express · $12.00" },
  { label: "Discount", value: "WELCOME10 (−10%)" },
]

const steps = [
  { label: "Order submitted", desc: "Aug 4 · 14:22", done: true },
  { label: "Payment confirmed", desc: "Aug 4 · 14:25", done: true },
  { label: "Processing", desc: "Aug 4 · 15:02", done: true },
  { label: "Shipped", desc: "Aug 5 · 09:47", done: false },
  { label: "Delivered", desc: "Pending", done: false },
]

const items = [
  { name: "Wireless Headphones Pro", sku: "SKU-1042", qty: 1, price: "$249.00" },
  { name: "USB-C Charging Dock", sku: "SKU-2210", qty: 2, price: "$89.00" },
  { name: "Braided Cable 2m", sku: "SKU-0087", qty: 3, price: "$19.00" },
]

export default function ProfileBasicPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Basic Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A detailed order view with a fulfillment timeline.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                Order #ORD-2026-8841
                <Button variant="ghost" size="icon-xs" aria-label="Copy order number">
                  <Copy className="size-3.5" />
                </Button>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Placed Aug 4, 2026</p>
            </div>
            <Badge className="bg-warning/15 text-warning">Processing</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
            {description.map((d) => (
              <div key={d.label}>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{d.label}</div>
                <div className="text-sm font-medium mt-0.5">{d.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Fulfillment Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col sm:flex-row gap-0 sm:gap-2">
            {steps.map((s, i) => (
              <li key={s.label} className="flex-1 relative flex sm:block gap-3">
                {i < steps.length - 1 && (
                  <span className={`absolute left-4 sm:left-4 sm:right-0 sm:top-4 sm:left-4 h-full sm:h-0.5 w-0.5 sm:w-auto ${s.done ? "bg-primary/40" : "bg-border"}`} />
                )}
                <div className="flex sm:flex-col items-start sm:items-center gap-3 relative">
                  <span className={`size-8 rounded-full flex items-center justify-center shrink-0 ${
                    s.done ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {s.done ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                  </span>
                  <div className="sm:text-center pb-4 sm:pb-0">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Qty</th>
                    <th className="px-4 py-3 text-right font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.sku} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-muted-foreground">{it.sku}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{it.qty}</td>
                      <td className="px-4 py-3 text-right font-medium">{it.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipping</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-2.5 text-sm">
              <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Alice Johnson</p>
                <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">
                  120 Market Street, Apt 4B<br />San Francisco, CA 94105
                </p>
              </div>
            </CardContent>
          </Card>
          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>$465.00</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>$12.00</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Discount</span><span>−$47.70</span></div>
              <div className="flex justify-between font-semibold pt-2 border-t border-border/40"><span>Total</span><span>$429.30</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
