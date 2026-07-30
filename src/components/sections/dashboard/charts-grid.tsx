"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { salesData, retentionWeeks } from "@/data/dashboard"

export function ChartsGrid() {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)
  const maxVal = Math.max(...salesData.map(d => d.sales))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Sales Chart */}
      <Card size="sm" className="bg-card card-original shadow-sm lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48">
            <svg viewBox="0 0 600 180" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
              {[0, 1, 2, 3].map(i => {
                const y = 15 + (150 / 4) * i
                return (
                  <g key={i}>
                    <line x1="50" y1={y} x2="580" y2={y} className="stroke-border/40" strokeWidth="1" />
                    <text x="44" y={y + 4} textAnchor="end" className="fill-muted-foreground" fontSize="11">
                      ${Math.round((maxVal / 4) * (4 - i) / 1000)}k
                    </text>
                  </g>
                )
              })}
              {salesData.map((d, i) => {
                const x = 50 + (530 / salesData.length) * i + 8
                const bh = (d.sales / maxVal) * 150
                const y = 15 + 150 - bh
                return (
                  <g key={d.name}>
                    <rect
                      x={x} y={y} width={530 / salesData.length - 16} height={bh} rx="3"
                      className="fill-primary/70 hover:fill-primary cursor-pointer transition-colors"
                      onMouseEnter={(e) => {
                        const rect = (e.target as SVGElement).closest("svg")!.getBoundingClientRect()
                        setTooltip({ x: rect.left + x + 40, y: rect.top + y - 8, text: `${d.name}: $${d.sales.toLocaleString()}` })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                    <text x={x + (530 / salesData.length - 16) / 2} y={178} textAnchor="middle"
                      className="fill-muted-foreground" fontSize="11">
                      {d.name}
                    </text>
                  </g>
                )
              })}
            </svg>
            {tooltip && (
              <div className="absolute pointer-events-none bg-card border border-border rounded-lg px-3 py-1.5 text-sm shadow-md z-10"
                style={{ left: tooltip.x - 80, top: tooltip.y - 36 }}>
                {tooltip.text}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Retention Chart */}
      <Card size="sm" className="bg-card card-tight shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Retention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-40 px-2">
            {retentionWeeks.map(w => (
              <div key={w.label} className="flex flex-col items-center gap-1 flex-1">
                <div className="flex flex-col-reverse items-center gap-[3px] h-28">
                  {w.dots.map((d, j) => (
                    <div key={j} className={`w-2 h-2 rounded-full ${d ? "bg-primary" : "bg-muted/50"}`} />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">{w.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
