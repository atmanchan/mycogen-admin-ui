import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { reviews, reviewStats } from "@/data/reviews"

const statusStyles: Record<string, string> = {
  approved: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  rejected: "bg-destructive/10 text-destructive",
}

export default function ReviewsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">Customer reviews and ratings.</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Average Rating", value: reviewStats.average.toFixed(1), icon: Star, color: "text-amber-500" },
          { label: "Total Reviews", value: reviewStats.total.toString() },
          { label: "Approved", value: reviewStats.approved.toString(), color: "text-success" },
          { label: "Pending", value: reviewStats.pending.toString(), color: "text-warning" },
        ].map((s) => (
          <Card key={s.label} size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                {s.label}
                {s.icon && <s.icon className={`h-4 w-4 ${s.color}`} />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold tracking-tight ${s.color || ""}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Comment</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{r.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.product}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{r.comment}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[r.status]}`}>{r.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
