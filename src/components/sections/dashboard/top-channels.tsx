import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const channels = [
  { name: "Google", visitors: "4,718", percentage: 42 },
  { name: "Facebook", visitors: "3,421", percentage: 31 },
  { name: "Threads", visitors: "2,876", percentage: 26 },
  { name: "Direct", visitors: "1,495", percentage: 14 },
]

export function TopChannels() {
  return (
    <Card size="sm" className="bg-card card-original shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Channels</CardTitle>
        <CardAction>
          <Button variant="ghost" size="xs"><ExternalLink className="h-3 w-3" /></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {channels.map((c) => (
            <div key={c.name} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.visitors}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/70 rounded-full" style={{ width: `${c.percentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" size="sm" className="mt-2 h-auto px-0 text-xs">Channels Report →</Button>
      </CardContent>
    </Card>
  )
}
