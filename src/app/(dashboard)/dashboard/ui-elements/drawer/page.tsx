"use client"

import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer, DrawerBackdrop, DrawerBody, DrawerClose, DrawerContent,
  DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DrawerPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Drawer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Slide-out panels for contextual actions.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Right Drawer
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Drawer>
            <DrawerTrigger render={<Button><Settings className="size-4" /> Open Settings</Button>} />
            <DrawerBackdrop />
            <DrawerContent side="right">
              <DrawerHeader className="border-b border-border/40">
                <div className="flex items-start justify-between">
                  <div>
                    <DrawerTitle className="text-base font-semibold">Settings</DrawerTitle>
                    <DrawerDescription className="text-sm text-muted-foreground mt-0.5">
                      Adjust your workspace preferences.
                    </DrawerDescription>
                  </div>
                  <DrawerClose render={<Button variant="ghost" size="icon-sm" aria-label="Close"><X className="size-4" /></Button>} />
                </div>
              </DrawerHeader>
              <DrawerBody className="space-y-3 text-sm text-muted-foreground">
                <p>Language: English (US)</p>
                <p>Timezone: Asia/Taipei</p>
                <p>Notifications: enabled</p>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose render={<Button className="w-full">Save changes</Button>} />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Left Drawer
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Drawer>
            <DrawerTrigger render={<Button variant="outline">Open Left Panel</Button>} />
            <DrawerBackdrop />
            <DrawerContent side="left">
              <DrawerHeader className="border-b border-border/40">
                <DrawerTitle className="text-base font-semibold">Navigation</DrawerTitle>
              </DrawerHeader>
              <DrawerBody className="space-y-2 text-sm">
                {["Dashboard", "Orders", "Products", "Customers"].map((l) => (
                  <div key={l} className="rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors cursor-pointer">
                    {l}
                  </div>
                ))}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    </div>
  )
}
