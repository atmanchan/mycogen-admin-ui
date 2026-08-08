import { Columns2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function SplitLayout() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Split</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Content divided into resizable-style panels.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="space-y-3 p-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">50 / 50</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/40 bg-primary/5 p-4 min-h-32">
              <div className="text-sm font-semibold mb-1">Left panel</div>
              <p className="text-xs text-muted-foreground">Primary content, often a list, editor or detail view.</p>
            </div>
            <div className="rounded-lg border border-border/40 bg-muted/20 p-4 min-h-32">
              <div className="text-sm font-semibold mb-1">Right panel</div>
              <p className="text-xs text-muted-foreground">Supplementary info, inspector or activity feed.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="space-y-3 p-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">1 / 3 — 2 / 3</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="rounded-lg border border-border/40 bg-sky-500/5 p-4 min-h-32">
              <div className="text-sm font-semibold mb-1">Rail</div>
              <p className="text-xs text-muted-foreground">Narrow navigation or filters column.</p>
            </div>
            <div className="lg:col-span-2 rounded-lg border border-border/40 bg-muted/20 p-4 min-h-32">
              <div className="text-sm font-semibold mb-1">Main</div>
              <p className="text-xs text-muted-foreground">Wider area for the primary workspace.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="text-sm text-muted-foreground flex items-start gap-2">
          <Columns2 className="size-4 text-primary shrink-0 mt-0.5" />
          <p>
            Split layouts keep related views side by side. Use <code className="text-foreground font-mono text-xs">grid-cols-*</code> or
            a draggable divider when the ratio needs to be adjustable.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
