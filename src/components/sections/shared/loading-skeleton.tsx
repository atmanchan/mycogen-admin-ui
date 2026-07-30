import { Card, CardContent } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <Card size="sm" className="bg-card card-tight shadow-sm">
      <CardContent className="space-y-3 py-6">
        <div className="h-4 w-1/3 rounded bg-muted/60 animate-pulse" />
        <div className="h-8 w-1/2 rounded bg-muted/60 animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-muted/40 animate-pulse" />
      </CardContent>
    </Card>
  )
}
