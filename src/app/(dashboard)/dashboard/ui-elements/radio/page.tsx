"use client"

import { useState } from "react"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RadioPage() {
  const [value, setValue] = useState("a")
  const [plan, setPlan] = useState("monthly")

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Radio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Single-choice radio groups.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Basic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={value} onValueChange={(v: string) => setValue(v ?? "")}>
            {[
              { v: "a", label: "Apple" },
              { v: "b", label: "Banana" },
              { v: "c", label: "Cherry" },
            ].map((o) => (
              <label key={o.v} className="flex items-center gap-2 text-sm cursor-pointer">
                <Radio value={o.v} />
                {o.label}
              </label>
            ))}
          </RadioGroup>
          <p className="text-xs text-muted-foreground mt-3">Selected: {value}</p>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Horizontal + Disabled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={plan} onValueChange={(v: string) => setPlan(v ?? "")} className="flex-row gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Radio value="monthly" /> Monthly
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Radio value="yearly" /> Yearly
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Radio value="lifetime" disabled /> Lifetime
            </label>
          </RadioGroup>
          <p className="text-xs text-muted-foreground mt-3">Selected: {plan}</p>
        </CardContent>
      </Card>
    </div>
  )
}
