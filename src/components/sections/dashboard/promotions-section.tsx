import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PromotionsCard } from "@/components/ui/promotions-card"
import { promotionsData } from "@/data/dashboard"

export function PromotionsSection() {
  return (
    <Card size="sm" className="bg-card card-tight shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Promotions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {promotionsData.map(p => (
            <PromotionsCard key={p.id} {...p} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
