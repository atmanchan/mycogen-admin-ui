"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, BarChart3, Columns3, ShoppingBag, Package, Users,
  Settings, User, CalendarDays, Table2,
  ClipboardList, PieChart, Palette, LogIn, ListChecks, ChevronDown,
  Cuboid, Bell, CreditCard, Grip, Loader2, MessageSquare, Info,
  Layers3, ListOrdered, ChevronsLeft, ChevronsRight, Activity,
  PanelsTopLeft, List, LayoutGrid, Search, BookOpen, FolderKanban,
  AppWindow, FileText, ShieldX, FileWarning, Bug, CircleCheck, CircleX,
  LayoutTemplate, PanelTop, PanelLeft, Columns2,
  CircleDot, SquareCheckBig, ToggleRight, SlidersHorizontal, PanelRightOpen, ListCollapse,
  UserPlus, KeyRound, Receipt, PencilLine,
} from "lucide-react"

type NavItem = { icon: typeof LayoutDashboard; label: string; href: string }
type NavTree = {
  icon: typeof LayoutDashboard
  label: string
  base: string
  overview?: string
  expandedKey: string
  children: NavItem[]
}
type NavGroup = { label: string; items?: NavItem[]; trees?: NavTree[] }

const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Columns3, label: "Kanban", href: "/dashboard/kanban" },
      { icon: Activity, label: "Monitor", href: "/dashboard/monitor" },
      { icon: PanelsTopLeft, label: "Workplace", href: "/dashboard/workplace" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
      { icon: Receipt, label: "Invoice List", href: "/dashboard/invoices" },
      { icon: PencilLine, label: "Invoice Editor", href: "/dashboard/invoices/edit" },
      { icon: Package, label: "Products", href: "/dashboard/products" },
      { icon: Users, label: "Customers", href: "/dashboard/customers" },
      { icon: ListChecks, label: "Tasks", href: "/dashboard/tasks" },
      { icon: List, label: "Basic List", href: "/dashboard/lists/basic" },
      { icon: LayoutGrid, label: "Card List", href: "/dashboard/lists/cards" },
    ],
    trees: [
      {
        icon: Search,
        label: "Search List",
        base: "/dashboard/lists/search",
        expandedKey: "search",
        children: [
          { icon: BookOpen, label: "Articles", href: "/dashboard/lists/search/articles" },
          { icon: FolderKanban, label: "Projects", href: "/dashboard/lists/search/projects" },
          { icon: AppWindow, label: "Applications", href: "/dashboard/lists/search/applications" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    items: [
      { icon: CalendarDays, label: "Calendar", href: "/dashboard/calendar" },
      { icon: PieChart, label: "Charts", href: "/dashboard/charts" },
      { icon: Table2, label: "Tables", href: "/dashboard/tables" },
    ],
    trees: [
      {
        icon: ClipboardList,
        label: "Forms",
        base: "/dashboard/forms",
        overview: "/dashboard/forms",
        expandedKey: "forms",
        children: [
          { icon: ClipboardList, label: "Overview", href: "/dashboard/forms" },
          { icon: ListOrdered, label: "Form Wizard", href: "/dashboard/forms/wizard" },
          { icon: FileText, label: "Advanced Form", href: "/dashboard/forms/advanced" },
        ],
      },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
      { icon: LogIn, label: "Sign In", href: "/sign-in" },
      { icon: UserPlus, label: "Sign Up", href: "/sign-up" },
      { icon: KeyRound, label: "Reset Password", href: "/reset-password" },
    ],
    trees: [
      {
        icon: User,
        label: "Profile",
        base: "/dashboard/profile",
        overview: "/dashboard/profile",
        expandedKey: "profile",
        children: [
          { icon: User, label: "Overview", href: "/dashboard/profile" },
          { icon: FileText, label: "Basic", href: "/dashboard/profile/basic" },
          { icon: Layers3, label: "Advanced", href: "/dashboard/profile/advanced" },
        ],
      },
    ],
  },
  {
    label: "Pages",
    items: [
      { icon: CircleCheck, label: "Success", href: "/dashboard/result/success" },
      { icon: CircleX, label: "Fail", href: "/dashboard/result/fail" },
      { icon: ShieldX, label: "403", href: "/dashboard/exception/403" },
      { icon: FileWarning, label: "404", href: "/dashboard/exception/404" },
      { icon: Bug, label: "500", href: "/dashboard/exception/500" },
    ],
  },
  {
    label: "Components",
    trees: [
      {
        icon: LayoutTemplate,
        label: "Layout",
        base: "/dashboard/layout",
        overview: "/dashboard/layout",
        expandedKey: "layout",
        children: [
          { icon: LayoutGrid, label: "Overview", href: "/dashboard/layout" },
          { icon: PanelTop, label: "Header Content", href: "/dashboard/layout/header-content" },
          { icon: PanelLeft, label: "Sidebar Content", href: "/dashboard/layout/sidebar-content" },
          { icon: Columns2, label: "Split", href: "/dashboard/layout/split" },
        ],
      },
      {
        icon: Palette,
        label: "UI Elements",
        base: "/dashboard/ui-elements",
        overview: "/dashboard/ui-elements",
        expandedKey: "ui",
        children: [
          { icon: Cuboid, label: "Overview", href: "/dashboard/ui-elements" },
          { icon: Layers3, label: "Buttons", href: "/dashboard/ui-elements/buttons" },
          { icon: Palette, label: "Badges", href: "/dashboard/ui-elements/badges" },
          { icon: ClipboardList, label: "Inputs", href: "/dashboard/ui-elements/inputs" },
          { icon: Table2, label: "Select", href: "/dashboard/ui-elements/select" },
          { icon: CircleDot, label: "Radio", href: "/dashboard/ui-elements/radio" },
          { icon: SquareCheckBig, label: "Checkbox", href: "/dashboard/ui-elements/checkbox" },
          { icon: ToggleRight, label: "Switch", href: "/dashboard/ui-elements/switch" },
          { icon: SlidersHorizontal, label: "Slider", href: "/dashboard/ui-elements/slider" },
          { icon: ListChecks, label: "Avatars", href: "/dashboard/ui-elements/avatars" },
          { icon: LayoutDashboard, label: "Progress", href: "/dashboard/ui-elements/progress" },
          { icon: Columns3, label: "Tabs", href: "/dashboard/ui-elements/tabs" },
          { icon: Bell, label: "Alerts", href: "/dashboard/ui-elements/alerts" },
          { icon: CreditCard, label: "Cards", href: "/dashboard/ui-elements/cards" },
          { icon: MessageSquare, label: "Dialogs", href: "/dashboard/ui-elements/dialogs" },
          { icon: PanelRightOpen, label: "Drawer", href: "/dashboard/ui-elements/drawer" },
          { icon: ListCollapse, label: "Accordion", href: "/dashboard/ui-elements/accordion" },
          { icon: Grip, label: "Dropdowns", href: "/dashboard/ui-elements/dropdowns" },
          { icon: Table2, label: "Pagination", href: "/dashboard/ui-elements/pagination" },
          { icon: Loader2, label: "Spinners", href: "/dashboard/ui-elements/spinners" },
          { icon: Info, label: "Toasts", href: "/dashboard/ui-elements/toasts" },
          { icon: MessageSquare, label: "Tooltips", href: "/dashboard/ui-elements/tooltips" },
        ],
      },
    ],
  },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    forms: pathname?.startsWith("/dashboard/forms") || false,
    profile: pathname?.startsWith("/dashboard/profile") || false,
    search: pathname?.startsWith("/dashboard/lists/search") || false,
    ui: pathname?.startsWith("/dashboard/ui-elements") || false,
    layout: pathname?.startsWith("/dashboard/layout") || false,
  })

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    if (href === "/dashboard/ui-elements") return pathname === "/dashboard/ui-elements"
    if (href === "/dashboard/forms") return pathname === "/dashboard/forms"
    if (href === "/dashboard/profile") return pathname === "/dashboard/profile"
    if (href === "/dashboard/layout") return pathname === "/dashboard/layout"
    if (href === "/dashboard/invoices") return pathname === "/dashboard/invoices"
    if (href.startsWith("/dashboard")) return pathname?.startsWith(href + "/") || pathname === href
    return pathname === href
  }

  const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 border-r border-border/40 bg-background overflow-y-auto p-3 flex flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 lg:border-r-0 lg:bg-transparent",
      open ? "translate-x-0" : "-translate-x-full",
      collapsed && "lg:w-[68px]"
    )}>
      {/* Brand + collapse toggle */}
      <div className={cn("flex items-center mb-6", collapsed ? "justify-center flex-col gap-3" : "justify-between px-1.5")}>
        <Link href="/dashboard" className="text-xl font-extrabold tracking-tight whitespace-nowrap overflow-hidden" onClick={onClose}>
          {collapsed ? "M" : (<><span>Mycogen</span><span className="text-primary">.</span></>)}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-col gap-5 flex-1">
        {navGroups.map((group) => {
          const trees = group.trees ?? []
          return (
          <div key={group.label}>
            {!collapsed && (
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-1.5">
                {group.label}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items?.map((item) => (
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
                  onClick={onClose}>
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && item.label}
                </Link>
              ))}
              {trees.map((tree) => (
                collapsed ? (
                  <Link
                    key={tree.expandedKey}
                    href={tree.overview ?? tree.children[0].href}
                    title={tree.label}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-center rounded-lg px-3 py-2 transition-all",
                      pathname?.startsWith(tree.base)
                        ? "bg-[hsl(var(--sidebar-text))] text-white"
                        : "text-[hsl(var(--sidebar-text))] hover:bg-card/80"
                    )}
                  >
                    <tree.icon className="h-[18px] w-[18px] shrink-0" />
                  </Link>
                ) : (
                  <div key={tree.expandedKey}>
                    <button
                      onClick={() => toggle(tree.expandedKey)}
                      className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium text-[hsl(var(--sidebar-text))] hover:bg-card/80 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <tree.icon className="h-[18px] w-[18px] shrink-0" />
                        {tree.label}
                      </span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded[tree.expandedKey] && "rotate-180")} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      expanded[tree.expandedKey] ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="flex flex-col gap-0.5 ml-2 mt-0.5 border-l border-border/30 pl-2">
                        {tree.children.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
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
                  </div>
                )
              ))}
            </div>
          </div>
          )
        })}
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
