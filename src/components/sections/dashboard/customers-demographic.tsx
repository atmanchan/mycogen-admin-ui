import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const countries = [
  { name: "USA", code: "US", customers: "2,379", percentage: 79 },
  { name: "France", code: "FR", customers: "589", percentage: 23 },
  { name: "Germany", code: "DE", customers: "412", percentage: 16 },
  { name: "UK", code: "GB", customers: "387", percentage: 15 },
]

export function CustomersDemographic() {
  return (
    <Card size="sm" className="bg-card card-original shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customers Demographic</CardTitle>
        <CardAction>
          <Button variant="ghost" size="xs"><ExternalLink className="h-3 w-3" /></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {countries.map((c) => (
            <div key={c.code} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {c.code}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.customers}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/70 rounded-full" style={{ width: `${c.percentage}%` }} />
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground shrink-0 w-8 text-right">{c.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
