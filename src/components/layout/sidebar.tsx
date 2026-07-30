"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, BarChart3, Columns3, ShoppingBag, Package, Users,
  Star, Percent, Megaphone, Settings, User, CalendarDays, Table2,
  ClipboardList, PieChart, Palette, LogIn, ListChecks,
} from "lucide-react"

const groups = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Columns3, label: "Kanban", href: "/dashboard/kanban" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
      { icon: Package, label: "Products", href: "/dashboard/products" },
      { icon: Users, label: "Customers", href: "/dashboard/customers" },
      { icon: ListChecks, label: "Tasks", href: "/dashboard/tasks" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
      { icon: Percent, label: "Discounts", href: "/dashboard/discounts" },
      { icon: Megaphone, label: "Marketing", href: "/dashboard/marketing" },
    ],
  },
  {
    label: "Insights",
    items: [
      { icon: CalendarDays, label: "Calendar", href: "/dashboard/calendar" },
      { icon: PieChart, label: "Charts", href: "/dashboard/charts" },
      { icon: Table2, label: "Tables", href: "/dashboard/tables" },
      { icon: ClipboardList, label: "Forms", href: "/dashboard/forms" },
    ],
  },
  {
    label: "Components",
    items: [
      { icon: Palette, label: "UI Elements", href: "/dashboard/ui-elements" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: User, label: "Profile", href: "/dashboard/profile" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
      { icon: LogIn, label: "Sign In", href: "/sign-in" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r-0 bg-transparent h-screen sticky top-0 overflow-y-auto p-4 flex flex-col z-30">
      <div className="text-xl font-extrabold tracking-tight mb-6 px-3">
        Mycogen<span className="text-primary">.</span>
      </div>
      <nav className="flex flex-col gap-5 flex-1">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-1.5">
              {group.label}
            </div>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = item.href.startsWith("/dashboard")
                  ? item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname?.startsWith(item.href + "/") || pathname === item.href
                  : pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[hsl(215deg_14.39%_26.93%)] text-white"
                        : "text-[hsl(215deg_14.39%_26.93%)] hover:bg-card/80 hover:text-[hsl(215deg_14.39%_26.93%)]"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-2.5 px-3 pt-4 border-t border-border/50 mt-auto">
        <div className="w-8 h-8 rounded-full bg-primary/12 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
          JD
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">John Doe</div>
          <div className="text-xs text-muted-foreground">Admin</div>
        </div>
      </div>
    </aside>
  )
}
