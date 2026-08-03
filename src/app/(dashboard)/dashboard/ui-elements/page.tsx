import { Cuboid, Layers3, Palette, ClipboardList, Table2, ListChecks, LayoutDashboard, Columns3, Bell, CreditCard, MessageSquare, Grip, Loader2, Info, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const items = [
  { icon: Layers3, label: "Buttons", desc: "Button variants and sizes", href: "/dashboard/ui-elements/buttons" },
  { icon: Palette, label: "Badges", desc: "Badge variants and sizes", href: "/dashboard/ui-elements/badges" },
  { icon: ClipboardList, label: "Inputs", desc: "Text inputs and textareas", href: "/dashboard/ui-elements/inputs" },
  { icon: Table2, label: "Select", desc: "Select dropdowns", href: "/dashboard/ui-elements/select" },
  { icon: ListChecks, label: "Avatars", desc: "Avatar sizes and fallback", href: "/dashboard/ui-elements/avatars" },
  { icon: LayoutDashboard, label: "Progress", desc: "Progress bars", href: "/dashboard/ui-elements/progress" },
  { icon: Columns3, label: "Tabs", desc: "Tabs sizes and variants", href: "/dashboard/ui-elements/tabs" },
  { icon: Bell, label: "Alerts", desc: "Alert messages", href: "/dashboard/ui-elements/alerts" },
  { icon: CreditCard, label: "Cards", desc: "Card layouts", href: "/dashboard/ui-elements/cards" },
  { icon: MessageSquare, label: "Dialogs", desc: "Modal dialogs", href: "/dashboard/ui-elements/dialogs" },
  { icon: Grip, label: "Dropdowns", desc: "Dropdown menus", href: "/dashboard/ui-elements/dropdowns" },
  { icon: Table2, label: "Pagination", desc: "Page navigation", href: "/dashboard/ui-elements/pagination" },
  { icon: Loader2, label: "Spinners", desc: "Loading spinners", href: "/dashboard/ui-elements/spinners" },
  { icon: Info, label: "Toasts", desc: "Toast notifications", href: "/dashboard/ui-elements/toasts" },
  { icon: MessageSquare, label: "Tooltips", desc: "Hover tooltips", href: "/dashboard/ui-elements/tooltips" },
]

export default function UIElementsOverview() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">UI Elements</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse all available components.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
