import { XCircle, RefreshCw, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ResultFailPage() {
  return (
    <div className="max-w-xl mx-auto py-8">
      <Card size="sm" className="bg-card card-original shadow-sm text-center">
        <CardContent className="px-6 py-10 sm:px-10">
          <div className="size-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <XCircle className="size-9" />
          </div>
          <h1 className="text-xl font-bold tracking-tight mt-5">Payment failed</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            We couldn&apos;t process your payment for order #ORD-2026-8841.
            No charges have been made to your account.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Button><RefreshCw className="size-4" /> Try Again</Button>
            <Button variant="outline">Contact Support</Button>
          </div>

          <div className="mt-8 text-left rounded-lg border border-border/40 p-4">
            <p className="text-sm font-semibold flex items-center gap-1.5 mb-3">
              <FileText className="size-4 text-muted-foreground" /> Possible reasons
            </p>
            <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Your card was declined by the issuing bank.</li>
              <li>The card may have expired or be below its spending limit.</li>
              <li>The billing address did not match your card on file.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
