"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const sizes = ["sm", "default", "lg"] as const

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
              <Tabs defaultValue="tab1">
                <TabsList size={s}>
                  <TabsTrigger size={s} value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger size={s} value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="text-sm text-muted-foreground mt-2">Tab 1 content</TabsContent>
                <TabsContent value="tab2" className="text-sm text-muted-foreground mt-2">Tab 2 content</TabsContent>
              </Tabs>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">default</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="default">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-sm text-muted-foreground mt-2">Default variant content</TabsContent>
              <TabsContent value="tab2" className="text-sm text-muted-foreground mt-2">Default variant content</TabsContent>
            </Tabs>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">line</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="line">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-sm text-muted-foreground mt-2">Line variant content</TabsContent>
              <TabsContent value="tab2" className="text-sm text-muted-foreground mt-2">Line variant content</TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
