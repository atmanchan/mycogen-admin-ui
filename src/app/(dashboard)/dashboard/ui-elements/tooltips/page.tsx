"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export default function TooltipsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Tooltips" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tooltips</h1>
        <p className="text-sm text-muted-foreground mt-1">Hover tooltip variants.</p>
      </div>
      <TooltipProvider>
        <div className="grid md:grid-cols-3 gap-4">
          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <CardTitle className="text-sm font-semibold">Button Tooltip</CardTitle>
              <p className="text-sm text-muted-foreground">Tooltip appears on button hover.</p>
              <Tooltip>
                <TooltipTrigger>
                  <Button size="sm">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>This is a tooltip</TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <CardTitle className="text-sm font-semibold">Icon Tooltip</CardTitle>
              <p className="text-sm text-muted-foreground">Tooltip appears on icon hover.</p>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>More information</TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <CardTitle className="text-sm font-semibold">Custom Content</CardTitle>
              <p className="text-sm text-muted-foreground">Tooltip with multi-line content.</p>
              <Tooltip>
                <TooltipTrigger>
                  <Button size="sm" variant="outline">Hover for details</Button>
                </TooltipTrigger>
                <TooltipContent className="space-y-1">
                  <p className="font-medium">Details</p>
                  <p className="text-xs">This tooltip has</p>
                  <p className="text-xs">multiple lines</p>
                  <p className="text-xs">of content.</p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    </div>
  )
}
