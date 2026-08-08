import { LayoutTemplate, PanelTop, PanelLeft, Columns2 } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const items = [
  { icon: LayoutTemplate, label: "Overview", desc: "Layout gallery overview", href: "/dashboard/layout" },
  { icon: PanelTop, label: "Header Content", desc: "Top header with content area", href: "/dashboard/layout/header-content" },
  { icon: PanelLeft, label: "Sidebar Content", desc: "Sidebar with main content", href: "/dashboard/layout/sidebar-content" },
  { icon: Columns2, label: "Split", desc: "Divided split panels", href: "/dashboard/layout/split" },
]

export default function LayoutOverview() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Layout</h1>
        <p className="text-sm text-muted-foreground mt-1">Common page layout patterns.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <Card size="sm" className="bg-card card-original shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="flex flex-col items-center text-center py-6">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <CardTitle className="text-sm font-semibold">{item.label}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
