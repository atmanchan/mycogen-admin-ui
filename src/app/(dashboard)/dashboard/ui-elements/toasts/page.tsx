"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export default function ToastsPage() {
  return (
    <>
      <Toaster />
      <div className="space-y-5">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "UI Elements", href: "/dashboard/ui-elements" },
          { label: "Toasts" },
        ]} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Toasts</h1>
          <p className="text-sm text-muted-foreground mt-1">Toast notification triggers.</p>
        </div>
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="flex flex-wrap gap-3 p-4">
            <Button size="sm" onClick={() => toast.success("Operation completed successfully!")}>
              Show Success Toast
            </Button>
            <Button size="sm" variant="destructive" onClick={() => toast.error("Something went wrong.")}>
              Show Error Toast
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast("Here is some information.")}>
              Show Info Toast
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
