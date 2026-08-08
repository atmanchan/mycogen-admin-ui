"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SliderPage() {
  const [price, setPrice] = useState(50)
  const [range, setRange] = useState<[number, number]>([20, 80])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Slider</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Range sliders for value selection.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Single Value
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={[price]} onValueChange={(v) => setPrice(typeof v === "number" ? v : v[0])} min={0} max={100} />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{price}%</span>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={range}
            onValueChange={(v) => {
              const arr = Array.isArray(v) ? v : [v, v]
              setRange([arr[0], arr[1]])
            }}
            min={0}
            max={100}
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget range</span>
            <span className="font-semibold">
              ${range[0]} — ${range[1]}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
