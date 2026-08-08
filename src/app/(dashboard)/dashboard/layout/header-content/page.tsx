import { Bell, Search, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const navLinks = ["Dashboard", "Orders", "Products", "Customers"]

export default function HeaderContentLayout() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Header Content</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A top header bar sitting above a scrollable content area.
        </p>
      </div>

      <div className="rounded-xl border border-border/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border/40 bg-muted/30 px-4 py-2.5">
          <div className="flex items-center gap-6">
            <span className="text-base font-extrabold tracking-tight">
              Mycogen<span className="text-primary">.</span>
            </span>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              {navLinks.map((l) => (
                <span key={l} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {l}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden md:flex items-center gap-1.5 rounded-lg border border-border/40 px-2.5 py-1.5 text-xs text-muted-foreground">
              <Search className="size-3.5" /> Search...
            </span>
            <button className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors cursor-pointer" aria-label="Notifications">
              <Bell className="size-4" />
            </button>
            <span className="size-8 rounded-full bg-primary/12 text-primary flex items-center justify-center text-xs font-semibold">
              JD
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-background p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Revenue", "Orders", "Customers"].map((k) => (
              <div key={k} className="rounded-lg border border-border/40 p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{k}</div>
                <div className="text-xl font-bold mt-0.5">—</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/40 p-4">
              <div className="text-sm font-semibold mb-2">Content block</div>
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-2.5 rounded-full bg-muted w-full" style={{ width: `${100 - i * 25}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border/40 p-4 flex items-center justify-center text-sm text-muted-foreground">
              Placeholder area
            </div>
          </div>
        </div>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="text-sm text-muted-foreground flex items-start gap-2">
          <User className="size-4 text-primary shrink-0 mt-0.5" />
          <p>
            Layout structure: <code className="text-foreground font-mono text-xs">header (sticky top)</code> +
            <code className="text-foreground font-mono text-xs"> main content</code>. The header stays fixed while the
            content scrolls beneath it.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
