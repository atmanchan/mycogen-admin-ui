"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const COLORS = [
  { key: "primary", label: "Primary", dot: "bg-primary", ring: "ring-primary/40" },
  { key: "amber", label: "Warning", dot: "bg-amber-500", ring: "ring-amber-500/40" },
  { key: "emerald", label: "Success", dot: "bg-emerald-500", ring: "ring-emerald-500/40" },
  { key: "rose", label: "Danger", dot: "bg-rose-500", ring: "ring-rose-500/40" },
] as const

interface CalendarEvent {
  id: string
  day: number
  month: number
  year: number
  title: string
  color: string
}

const initialEvents: CalendarEvent[] = [
  { id: "ev-1", day: 3, month: 7, year: 2026, title: "Team standup", color: "primary" },
  { id: "ev-2", day: 12, month: 7, year: 2026, title: "Design review", color: "amber" },
  { id: "ev-3", day: 17, month: 7, year: 2026, title: "Sprint planning", color: "emerald" },
  { id: "ev-4", day: 25, month: 7, year: 2026, title: "Launch party", color: "rose" },
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
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [color, setColor] = useState<string>("primary")

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const days = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDay + 1
    return dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null
  })

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
  }
  function goToday() {
    setYear(today.getFullYear()); setMonth(today.getMonth())
  }

  function openAdd(day: number) {
    setEditingId(null)
    setSelectedDay(day)
    setTitle("")
    setColor("primary")
    setDialogOpen(true)
  }

  function openEdit(ev: CalendarEvent) {
    setEditingId(ev.id)
    setSelectedDay(ev.day)
    setTitle(ev.title)
    setColor(ev.color)
    setDialogOpen(true)
  }

  function saveEvent() {
    if (!title.trim() || selectedDay === null) return
    if (editingId) {
      setEvents(prev => prev.map(e => e.id === editingId ? { ...e, day: selectedDay, title: title.trim(), color } : e))
    } else {
      setEvents(prev => [...prev, {
        id: `ev-${Date.now()}`, day: selectedDay, month, year, title: title.trim(), color,
      }])
    }
    setDialogOpen(false)
  }

  function deleteEvent(id: string) {
    setEvents(prev => prev.filter(e => e.id !== id))
    setDialogOpen(false)
  }

  const monthEvents = events.filter(e => e.month === month && e.year === year)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click a day to add an event. Click an event to edit it.
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
              <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
              <Button variant="outline" size="icon-sm" onClick={nextMonth}>
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-border/40 rounded-lg overflow-hidden">
            {WEEKDAYS.map(d => (
              <div key={d} className="bg-muted/30 px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {d}
              </div>
            ))}
            {days.map((day, i) => {
              const dayEvents = day ? monthEvents.filter(e => e.day === day) : []
              const highlight = day !== null && isToday(year, month, day)
              return (
                <div
                  key={i}
                  onClick={() => day && openAdd(day)}
                  className={cn(
                    "min-h-[72px] bg-card px-1.5 py-1 text-sm transition-colors cursor-pointer hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
                    highlight && "bg-primary/5 ring-1 ring-inset ring-primary/30"
                  )}
                  tabIndex={0}
                >
                  <span className={cn(
                    "inline-flex size-5 items-center justify-center rounded-full text-xs",
                    highlight ? "bg-primary text-primary-foreground font-semibold" : "text-foreground"
                  )}>
                    {day ?? ""}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {dayEvents.map(ev => {
                      const c = COLORS.find(x => x.key === ev.color)
                      return (
                        <div
                          key={ev.id}
                          onClick={e => { e.stopPropagation(); openEdit(ev) }}
                          className="group flex items-center gap-1 truncate rounded px-0.5 hover:bg-muted/40 cursor-pointer"
                        >
                          <span className={cn("inline-block size-1.5 rounded-full shrink-0", c?.dot)} />
                          <span className="text-[10px] text-muted-foreground truncate">{ev.title}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Event Title</label>
              <Input type="text" placeholder="Event title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Event Color</label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button key={c.key} onClick={() => setColor(c.key)}
                    className={cn("size-8 rounded-full transition-all ring-2 ring-offset-2 ring-offset-card", c.dot, color === c.key ? c.ring : "ring-transparent")}
                    aria-label={c.label} title={c.label} />
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Day</label>
              <Input type="number" min={1} max={daysInMonth} value={selectedDay ?? ""} onChange={e => setSelectedDay(Number(e.target.value))} />
            </div>
          </div>
          <DialogFooter>
            {editingId && (
              <Button variant="destructive" onClick={() => deleteEvent(editingId)}>
                Delete
              </Button>
            )}
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveEvent} disabled={!title.trim()}>
              {editingId ? "Update" : "Add Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
