import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { discounts } from "@/data/discounts"
import { EmptyState } from "@/components/sections/shared/empty-state"

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  expired: "bg-destructive/10 text-destructive",
  scheduled: "bg-primary/10 text-primary",
}

export default function DiscountsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Discounts</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage promo codes and discounts.</p>
      </div>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Discount Codes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {discounts.length === 0 ? (
            <EmptyState title="No discount codes yet" description="Discount codes will appear here once available." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Code</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Value</th>
                    <th className="px-4 py-3 font-medium">Usage</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((d) => (
                    <tr key={d.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <code className="text-sm font-mono font-semibold bg-muted/50 px-2 py-0.5 rounded">{d.code}</code>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{d.type}</td>
                      <td className="px-4 py-3 font-medium">{d.type === "percentage" ? `${d.value}%` : `$${d.value}`}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 max-w-32">
                          <Progress value={(d.usage / d.maxUsage) * 100} className="h-1.5" />
                          <span className="text-xs text-muted-foreground shrink-0">{d.usage}/{d.maxUsage}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[d.status]}`}>{d.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{d.expiresAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
