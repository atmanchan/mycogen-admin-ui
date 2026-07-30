import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InsightItemData {
  label: string
  value: string | number
  subtext: string
}

interface InsightCardProps {
  title: string
  items: InsightItemData[]
}

export function InsightCard({ title, items }: InsightCardProps) {
  return (
    <Card size="sm" className="bg-card card-tight shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.subtext}</span>
              </div>
              <span className="text-lg font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
