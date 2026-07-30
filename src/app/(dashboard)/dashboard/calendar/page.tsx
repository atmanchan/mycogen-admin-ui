"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const events: { date: number; label: string; color: string }[] = [
  { date: 3, label: "Team standup", color: "bg-primary" },
  { date: 12, label: "Design review", color: "bg-amber-500" },
  { date: 17, label: "Sprint planning", color: "bg-emerald-500" },
  { date: 25, label: "Launch party", color: "bg-rose-500" },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function isToday(year: number, month: number, day: number) {
  const t = new Date()
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day
}

export default function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7

  const days = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDay + 1
    return dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null
  })

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((m) => m + 1)
    }
  }

  function goToday() {
    setYear(today.getFullYear())
    setMonth(today.getMonth())
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monthly calendar view with events.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {MONTH_NAMES[month]} {year}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" onClick={prevMonth}>
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToday}>
                Today
              </Button>
              <Button variant="outline" size="icon-sm" onClick={nextMonth}>
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-border/40 rounded-lg overflow-hidden">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="bg-muted/30 px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
            {days.map((day, i) => {
              const dayEvents = day ? events.filter((e) => e.date === day) : []
              const highlight = day !== null && isToday(year, month, day)
              return (
                <div
                  key={i}
                  className={`min-h-[72px] bg-card px-1.5 py-1 text-sm transition-colors ${
                    highlight ? "bg-primary/5 ring-1 ring-inset ring-primary/30" : ""
                  }`}
                >
                  <span
                    className={`inline-flex size-5 items-center justify-center rounded-full text-xs ${
                      highlight ? "bg-primary text-primary-foreground font-semibold" : "text-foreground"
                    }`}
                  >
                    {day ?? ""}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.label}
                        className="flex items-center gap-1 truncate"
                      >
                        <span className={`inline-block size-1.5 rounded-full shrink-0 ${ev.color}`} />
                        <span className="text-[10px] text-muted-foreground truncate">{ev.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
