"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SwitchPage() {
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(false)
  const [sms, setSms] = useState(false)

  const rows = [
    { label: "Email notifications", desc: "Order updates and receipts", on: email, set: setEmail },
    { label: "Push notifications", desc: "Real-time alerts on device", on: push, set: setPush },
    { label: "SMS alerts", desc: "Critical account events", on: sms, set: setSms },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Switch</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Toggle switches for settings.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium">{r.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                </div>
                <Switch checked={r.on} onCheckedChange={(v) => r.set(v === true)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Sizes & States
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Switch defaultChecked />
          <Switch disabled />
          <span className="text-xs text-muted-foreground">Default · Disabled</span>
        </CardContent>
      </Card>
    </div>
  )
}
