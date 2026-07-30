import { Card, CardContent } from "@/components/ui/card"
import { PackageOpen } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = "No data yet",
  description = "Content will appear here once available.",
}: EmptyStateProps) {
  return (
    <Card size="sm" className="bg-card card-tight shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <PackageOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground/60 mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
