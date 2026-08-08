import { CheckCircle2, Clock, Mail, Store } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ResultSuccessPage() {
  return (
    <div className="max-w-xl mx-auto py-8">
      <Card size="sm" className="bg-card card-original shadow-sm text-center">
        <CardContent className="px-6 py-10 sm:px-10">
          <div className="size-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-9" />
          </div>
          <h1 className="text-xl font-bold tracking-tight mt-5">Order placed successfully</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Order #ORD-2026-8841 has been submitted and is being prepared.
            A confirmation email has been sent to alice@example.com.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Button>View Order</Button>
            <Button variant="outline">Back to Home</Button>
          </div>

          <div className="mt-8 text-left rounded-lg border border-border/40 p-4 space-y-3">
            <p className="text-sm font-semibold">What happens next?</p>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Clock className="size-3.5" /></span>
              <div className="text-sm">
                <p className="font-medium">Processing</p>
                <p className="text-xs text-muted-foreground mt-0.5">The warehouse is preparing your items for shipment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0"><Store className="size-3.5" /></span>
              <div className="text-sm">
                <p className="font-medium">Shipping</p>
                <p className="text-xs text-muted-foreground mt-0.5">A tracking number will be emailed within 24 hours.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0"><Mail className="size-3.5" /></span>
              <div className="text-sm">
                <p className="font-medium">Delivery</p>
                <p className="text-xs text-muted-foreground mt-0.5">Expected arrival within 2–4 business days.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
