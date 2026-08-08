import { LayoutDashboard, ShoppingBag, Package, Users, LayoutPanelLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Package, label: "Products" },
  { icon: Users, label: "Customers" },
]

export default function SidebarContentLayout() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sidebar Content</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A fixed left sidebar with navigation beside a main content area.
        </p>
      </div>

      <div className="rounded-xl border border-border/40 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-48 shrink-0 border-r border-border/40 bg-muted/30 p-3 hidden sm:block">
          <div className="text-base font-extrabold tracking-tight px-2 mb-4">
            Mycogen<span className="text-primary">.</span>
          </div>
          <nav className="space-y-1">
            {menu.map((m) => (
              <div
                key={m.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  m.active
                    ? "bg-[hsl(var(--sidebar-text))] text-white"
                    : "text-muted-foreground hover:bg-muted/30 hover:text-foreground cursor-pointer"
                }`}
              >
                <m.icon className="size-4 shrink-0" />
                {m.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 bg-background p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Overview</h3>
            <span className="text-xs text-muted-foreground">Last updated 5m ago</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-border/40 p-3">
                <div className="h-2.5 rounded-full bg-muted w-16 mb-2" />
                <div className="h-5 rounded-md bg-primary/10 w-12" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border/40 p-3">
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="size-6 rounded-full bg-primary/12 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
                    JD
                  </span>
                  <span className="flex-1 h-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-10 rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="text-sm text-muted-foreground flex items-start gap-2">
          <LayoutPanelLeft className="size-4 text-primary shrink-0 mt-0.5" />
          <p>
            Layout structure: <code className="text-foreground font-mono text-xs">aside (fixed sidebar)</code> +
            <code className="text-foreground font-mono text-xs"> main content</code>. On small screens the sidebar
            collapses into an off-canvas drawer.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
