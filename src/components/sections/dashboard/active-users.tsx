import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const stats = [
  { label: "Live visitors", value: "364" },
  { label: "Avg, Daily", value: "224" },
  { label: "Avg, Weekly", value: "1.4K" },
  { label: "Avg, Monthly", value: "22.1K" },
]

export function ActiveUsers() {
  return (
    <Card size="sm" className="bg-card card-tight shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Users</CardTitle>
        <CardAction>
          <Button variant="ghost" size="xs"><ExternalLink className="h-3 w-3" /></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
