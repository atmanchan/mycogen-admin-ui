import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { campaigns } from "@/data/marketing"

const statusStyles: Record<string, string> = {
  live: "bg-success/10 text-success",
  draft: "bg-muted text-muted-foreground",
  completed: "bg-primary/10 text-primary",
}

const channelIcons: Record<string, string> = { Email: "📧", "Social Media": "📱", "Google Ads": "🎯", Instagram: "📸", Facebook: "👍" }

export default function MarketingPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Marketing</h1>
        <p className="text-sm text-muted-foreground mt-1">Campaign management and performance.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Campaigns", value: campaigns.filter(c => c.status === "live").length.toString() },
          { label: "Total Reach", value: "624K" },
          { label: "Avg Engagement", value: "11.2%" },
        ].map((s) => (
          <Card key={s.label} size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Campaign</th>
                  <th className="px-4 py-3 font-medium">Channel</th>
                  <th className="px-4 py-3 font-medium">Reach</th>
                  <th className="px-4 py-3 font-medium">Engagement</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Start Date</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs">{channelIcons[c.channel]} {c.channel}</span>
                    </td>
                    <td className="px-4 py-3">{c.reach}</td>
                    <td className="px-4 py-3 font-medium">{c.engagement}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[c.status]}`}>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.startDate}</td>
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
