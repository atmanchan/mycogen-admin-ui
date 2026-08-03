"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, BarChart3, Columns3, ShoppingBag, Package, Users,
  Star, Percent, Megaphone, Settings, User, CalendarDays, Table2,
  ClipboardList, PieChart, Palette, LogIn, ListChecks, ChevronDown,
  Cuboid, Bell, CreditCard, Grip, Loader2, MessageSquare, Info,
  Layers3, ListOrdered, ChevronsLeft, ChevronsRight,
} from "lucide-react"

const uiElements = [
  { icon: Cuboid, label: "Overview", href: "/dashboard/ui-elements" },
  { icon: Layers3, label: "Buttons", href: "/dashboard/ui-elements/buttons" },
  { icon: Palette, label: "Badges", href: "/dashboard/ui-elements/badges" },
  { icon: ClipboardList, label: "Inputs", href: "/dashboard/ui-elements/inputs" },
  { icon: Table2, label: "Select", href: "/dashboard/ui-elements/select" },
  { icon: ListChecks, label: "Avatars", href: "/dashboard/ui-elements/avatars" },
  { icon: LayoutDashboard, label: "Progress", href: "/dashboard/ui-elements/progress" },
  { icon: Columns3, label: "Tabs", href: "/dashboard/ui-elements/tabs" },
  { icon: Bell, label: "Alerts", href: "/dashboard/ui-elements/alerts" },
  { icon: CreditCard, label: "Cards", href: "/dashboard/ui-elements/cards" },
  { icon: MessageSquare, label: "Dialogs", href: "/dashboard/ui-elements/dialogs" },
  { icon: Grip, label: "Dropdowns", href: "/dashboard/ui-elements/dropdowns" },
  { icon: Table2, label: "Pagination", href: "/dashboard/ui-elements/pagination" },
  { icon: Loader2, label: "Spinners", href: "/dashboard/ui-elements/spinners" },
  { icon: Info, label: "Toasts", href: "/dashboard/ui-elements/toasts" },
  { icon: MessageSquare, label: "Tooltips", href: "/dashboard/ui-elements/tooltips" },
]

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
      { icon: ListOrdered, label: "Form Wizard", href: "/dashboard/forms/wizard" },
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
  const [collapsed, setCollapsed] = useState(false)
  const [uiExpanded, setUiExpanded] = useState(pathname?.startsWith("/dashboard/ui-elements") || false)

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    if (href === "/dashboard/ui-elements") return pathname === "/dashboard/ui-elements"
    if (href.startsWith("/dashboard")) return pathname?.startsWith(href + "/") || pathname === href
    return pathname === href
  }

  return (
    <aside className={cn(
      "border-r-0 bg-transparent h-screen sticky top-0 overflow-y-auto p-3 flex flex-col z-30 transition-all duration-300",
      collapsed ? "w-[68px]" : "w-64"
    )}>
      {/* Brand + collapse toggle */}
      <div className={cn("flex items-center mb-6", collapsed ? "justify-center flex-col gap-3" : "justify-between px-1.5")}>
        <Link href="/dashboard" className="text-xl font-extrabold tracking-tight whitespace-nowrap overflow-hidden">
          {collapsed ? "M" : (<><span>Mycogen</span><span className="text-primary">.</span></>)}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-col gap-5 flex-1">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-1.5">
                {group.label}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    collapsed && "justify-center px-0",
                    isActive(item.href)
                      ? "bg-[hsl(var(--sidebar-text))] text-white"
                      : "text-[hsl(var(--sidebar-text))] hover:bg-card/80 hover:text-[hsl(var(--sidebar-text))]"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Components group */}
        <div>
          {!collapsed && (
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-1.5">
              Components
            </div>
          )}
          {collapsed ? (
            <Link
              href="/dashboard/ui-elements"
              title="UI Elements"
              className={cn(
                "flex items-center justify-center rounded-lg px-3 py-2 transition-all",
                pathname?.startsWith("/dashboard/ui-elements")
                  ? "bg-[hsl(var(--sidebar-text))] text-white"
                  : "text-[hsl(var(--sidebar-text))] hover:bg-card/80"
              )}
            >
              <Palette className="h-[18px] w-[18px] shrink-0" />
            </Link>
          ) : (
            <>
              <button
                onClick={() => setUiExpanded(!uiExpanded)}
                className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium text-[hsl(var(--sidebar-text))] hover:bg-card/80 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Palette className="h-[18px] w-[18px] shrink-0" />
                  UI Elements
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", uiExpanded && "rotate-180")} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                uiExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="flex flex-col gap-0.5 ml-2 mt-0.5 border-l border-border/30 pl-2">
                  {uiElements.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                        isActive(item.href)
                          ? "bg-[hsl(var(--sidebar-text))] text-white"
                          : "text-[hsl(var(--sidebar-text))] hover:bg-card/80"
                      )}
                    >
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* User footer */}
      <div className={cn("flex items-center gap-2.5 pt-4 border-t border-border/50 mt-auto", collapsed && "justify-center")}>
        <div className="w-8 h-8 rounded-full bg-primary/12 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
          JD
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">John Doe</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        )}
      </div>
    </aside>
  )
}
