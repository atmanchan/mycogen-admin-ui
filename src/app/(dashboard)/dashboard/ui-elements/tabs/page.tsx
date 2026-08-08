"use client"

import { LayoutDashboard, Bell, BarChart3, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const sizes = ["sm", "default", "lg"] as const

const TAB_LABELS = ["Overview", "Notification", "Analytics", "Customers"]

function TabContent({ name }: { name: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {name} ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas
        donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a
        et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.
      </p>
    </div>
  )
}

function TabsContentGroup() {
  return (
    <>
      {TAB_LABELS.map((name) => (
        <TabsContent key={name} value={name} className="pt-4">
          <TabContent name={name} />
        </TabsContent>
      ))}
    </>
  )
}

export default function TabsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Tabs" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tabs</h1>
        <p className="text-sm text-muted-foreground mt-1">Tabs sizes and variants.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {sizes.map((s) => (
            <div key={s}>
              <p className="text-xs text-muted-foreground mb-2">{s}</p>
              <Tabs defaultValue="Overview">
                <TabsList size={s}>
                  {TAB_LABELS.map((name) => (
                    <TabsTrigger key={name} size={s} value={name}>{name}</TabsTrigger>
                  ))}
                </TabsList>
                <TabsContentGroup />
              </Tabs>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Default Tabs */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Default Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Overview">
            <TabsList>
              {TAB_LABELS.map((name) => (
                <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContentGroup />
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with underline */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Tabs with Underline</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Overview">
            <TabsList variant="line">
              {TAB_LABELS.map((name) => (
                <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContentGroup />
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with underline and icon */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Tabs with Underline and Icon</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Overview">
            <TabsList variant="line">
              <TabsTrigger value="Overview"><LayoutDashboard className="h-4 w-4" /> Overview</TabsTrigger>
              <TabsTrigger value="Notification"><Bell className="h-4 w-4" /> Notification</TabsTrigger>
              <TabsTrigger value="Analytics"><BarChart3 className="h-4 w-4" /> Analytics</TabsTrigger>
              <TabsTrigger value="Customers"><Users className="h-4 w-4" /> Customers</TabsTrigger>
            </TabsList>
            <TabsContentGroup />
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with badge */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Tabs with Badge</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Overview">
            <TabsList>
              <TabsTrigger value="Overview">
                Overview
                <Badge size="sm" className="bg-primary text-primary-foreground">8</Badge>
              </TabsTrigger>
              <TabsTrigger value="Notification">
                Notification
              </TabsTrigger>
              <TabsTrigger value="Analytics">
                Analytics
                <Badge size="sm" variant="secondary">4</Badge>
              </TabsTrigger>
              <TabsTrigger value="Customers">
                Customers
                <Badge size="sm" variant="destructive">12</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContentGroup />
          </Tabs>
        </CardContent>
      </Card>

      {/* Vertical Tabs */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Vertical Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs orientation="vertical" defaultValue="Overview">
            <TabsList variant="line" className="w-44">
              {TAB_LABELS.map((name) => (
                <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
              ))}
            </TabsList>
            <div className="flex-1">
              <TabsContentGroup />
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
