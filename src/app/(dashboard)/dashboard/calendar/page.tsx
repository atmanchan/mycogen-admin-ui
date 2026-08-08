"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeftIcon, ChevronRightIcon, X, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
const BUSINESS_OPTIONS = ["Work", "Personal", "Client", "Team"]
const GUEST_OPTIONS = ["JD", "AK", "MR", "CL", "PM", "JS"]

interface CalendarEvent {
  id: string
  title: string
  business: string
  color: string
  start: string
  end?: string
  allDay: boolean
  url?: string
  guests: string[]
  description?: string
}

const initialEvents: CalendarEvent[] = [
  { id: "ev-1", title: "Team standup", business: "Work", color: "primary", start: "2026-08-03T09:00", allDay: false, guests: ["JD", "AK"], description: "Daily sync" },
  { id: "ev-2", title: "Design review", business: "Client", color: "amber", start: "2026-08-05T14:00", end: "2026-08-05T15:30", allDay: false, guests: ["CL"], url: "https://meet.example.com/review" },
  { id: "ev-3", title: "Sprint planning", business: "Team", color: "emerald", start: "2026-08-10T10:00", allDay: true, guests: ["MR", "PM", "CL"] },
  { id: "ev-4", title: "Launch party", business: "Personal", color: "rose", start: "2026-08-22T19:00", allDay: false, guests: [], description: "Celebrate the launch!" },
]

function parseDate(iso: string): { year: number; month: number; day: number } {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return { year: y, month: m - 1, day: d }
}
function toDateInput(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay() } // 0=Sun
function isSameDate(a: { y: number; m: number; d: number }, b: { y: number; m: number; d: number }) {
  return a.y === b.y && a.m === b.m && a.d === b.d
}
function startOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay() // 0=Sun
  const diff = (day === 0 ? -6 : 1 - day) // Monday start
  d.setDate(d.getDate() + diff)
  return d
}
function addDays(date: Date, n: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

type View = "month" | "week" | "day" | "list"

export default function CalendarPage() {
  const today = new Date()
  const [view, setView] = useState<View>("month")
  const [cursor, setCursor] = useState<Date>(today)
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date>(today)

  // modal form state
  const [fTitle, setFTitle] = useState("")
  const [fBusiness, setFBusiness] = useState("Work")
  const [fColor, setFColor] = useState("primary")
  const [fStart, setFStart] = useState("")
  const [fEnd, setFEnd] = useState("")
  const [fAllDay, setFAllDay] = useState(false)
  const [fUrl, setFUrl] = useState("")
  const [fGuests, setFGuests] = useState<string[]>([])
  const [fDesc, setFDesc] = useState("")

  const cy = cursor.getFullYear()
  const cm = cursor.getMonth()

  const monthEvents = useMemo(() => events.filter(e => {
    const p = parseDate(e.start)
    return p.year === cy && p.month === cm
  }), [events, cy, cm])

  function eventForDay(y: number, m: number, d: number) {
    return events.filter(e => {
      const p = parseDate(e.start)
      return p.year === y && p.month === m && p.day === d
    })
  }

  function nav(dir: 1 | -1) {
    setCursor(c => {
      const d = new Date(c)
      if (view === "month") d.setMonth(d.getMonth() + dir)
      else if (view === "week") d.setDate(d.getDate() + 7 * dir)
      else if (view === "day") d.setDate(d.getDate() + dir)
      else d.setMonth(d.getMonth() + dir)
      return d
    })
  }
  function goToday() { setCursor(new Date()) }

  function openAdd(date: Date) {
    setEditingId(null)
    setSelectedDay(date)
    setFTitle(""); setFBusiness("Work"); setFColor("primary")
    setFStart(`${toDateInput(date.getFullYear(), date.getMonth(), date.getDate())}T09:00`)
    setFEnd(""); setFAllDay(false); setFUrl(""); setFGuests([]); setFDesc("")
    setDialogOpen(true)
  }
  function openEdit(ev: CalendarEvent) {
    setEditingId(ev.id)
    const p = parseDate(ev.start)
    setSelectedDay(new Date(p.year, p.month, p.day))
    setFTitle(ev.title); setFBusiness(ev.business); setFColor(ev.color)
    setFStart(ev.start); setFEnd(ev.end ?? ""); setFAllDay(ev.allDay)
    setFUrl(ev.url ?? ""); setFGuests(ev.guests ?? []); setFDesc(ev.description ?? "")
    setDialogOpen(true)
  }

  function toggleGuest(g: string) {
    setFGuests(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  function saveEvent() {
    if (!fTitle.trim() || !fStart) return
    const p = parseDate(fStart)
    const base = { title: fTitle.trim(), business: fBusiness, color: fColor, start: fStart, allDay: fAllDay }
    if (editingId) {
      setEvents(prev => prev.map(e => e.id === editingId
        ? { ...e, ...base, end: fEnd || undefined, url: fUrl || undefined, guests: fGuests, description: fDesc || undefined }
        : e))
    } else {
      setEvents(prev => [...prev, {
        id: `ev-${Date.now()}`, ...base, end: fEnd || undefined, url: fUrl || undefined, guests: fGuests, description: fDesc || undefined,
      }])
    }
    setDialogOpen(false)
  }
  function deleteEvent(id: string) {
    setEvents(prev => prev.filter(e => e.id !== id))
    setDialogOpen(false)
  }

  const renderEvent = (ev: CalendarEvent) => {
    const c = COLORS.find(x => x.key === ev.color)
    return (
      <div key={ev.id} onClick={e => { e.stopPropagation(); openEdit(ev) }}
        className="group flex items-center gap-1.5 truncate rounded px-1 py-0.5 cursor-pointer hover:bg-muted/30">
        <span className={cn("inline-block size-1.5 rounded-full shrink-0", c?.dot)} />
        <span className="text-[10px] text-muted-foreground truncate">{ev.title}</span>
        {ev.allDay && <Badge className="text-[8px] px-1 h-auto shrink-0 bg-muted/60 text-muted-foreground">all-day</Badge>}
      </div>
    )
  }

  const viewLabel = view === "month" ? `${MONTH_NAMES[cm]} ${cy}` : view === "week"
    ? `Week of ${startOfWeek(cursor).toLocaleDateString()}`
    : view === "day" ? cursor.toDateString() : `${MONTH_NAMES[cm]} ${cy}`

  // Week view columns
  const weekStart = startOfWeek(cursor)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  // Day view
  const dayEvents = eventForDay(cursor.getFullYear(), cursor.getMonth(), cursor.getDate())
  // List view sorted
  const sortedMonth = [...monthEvents].sort((a, b) => a.start.localeCompare(b.start))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">Plan your schedule across month, week, day and list views.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: navigation group */}
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" aria-label="Previous day" onClick={() => nav(-1)}><ChevronLeftIcon className="size-4" /></Button>
              <Button variant="outline" size="icon-sm" aria-label="Next day" onClick={() => nav(1)}><ChevronRightIcon className="size-4" /></Button>
              <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
            </div>
            {/* Center: title */}
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{viewLabel}</CardTitle>
            {/* Right: view switcher pill */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
              {(["month", "week", "day", "list"] as View[]).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={cn("px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer",
                    view === v ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* MONTH VIEW */}
          {view === "month" && (
            <div className="grid grid-cols-7 gap-px bg-border/40 rounded-lg overflow-hidden">
              {WEEKDAYS.map(d => (
                <div key={d} className="bg-muted/30 px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{d}</div>
              ))}
              {(() => {
                const first = firstDayOfMonth(cy, cm)
                const daysInM = daysInMonth(cy, cm)
                const leading = first === 0 ? 6 : first - 1
                const total = Math.ceil((leading + daysInM) / 7) * 7
                return Array.from({ length: total }, (_, i) => {
                  const dayNum = i - leading + 1
                  if (dayNum < 1 || dayNum > daysInM) return <div key={i} className="min-h-[72px] bg-card" />
                  const dEv = eventForDay(cy, cm, dayNum)
                  const highlight = isSameDate({ y: cy, m: cm, d: dayNum }, { y: today.getFullYear(), m: today.getMonth(), d: today.getDate() })
                  return (
                    <div key={i} onClick={() => openAdd(new Date(cy, cm, dayNum))} tabIndex={0}
                      className={cn("min-h-[72px] bg-card px-1.5 py-1 text-sm transition-colors cursor-pointer hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
                        highlight && "bg-primary/5 ring-1 ring-inset ring-primary/30")}>
                      <span className={cn("inline-flex size-5 items-center justify-center rounded-full text-xs",
                        highlight ? "bg-primary text-primary-foreground font-semibold" : "text-foreground")}>{dayNum}</span>
                      <div className="mt-0.5 space-y-0.5">{dEv.map(renderEvent)}</div>
                    </div>
                  )
                })
              })()}
            </div>
          )}

          {/* WEEK VIEW */}
          {view === "week" && (
            <div className="grid grid-cols-7 gap-px bg-border/40 rounded-lg overflow-hidden">
              {weekDays.map((d, i) => {
                const isToday = d.toDateString() === today.toDateString()
                const dEv = eventForDay(d.getFullYear(), d.getMonth(), d.getDate())
                return (
                  <div key={i} className="flex flex-col">
                    <div className={cn("px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wider",
                      isToday ? "text-primary" : "text-muted-foreground")}>
                      <div>{WEEKDAYS[i].slice(0, 2)}</div>
                      <div className={cn("mx-auto mt-0.5 inline-flex size-6 items-center justify-center rounded-full",
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground")}>{d.getDate()}</div>
                    </div>
                    <div onClick={() => openAdd(d)} tabIndex={0}
                      className={cn("min-h-[100px] bg-card px-1 py-1 transition-colors cursor-pointer hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50")}>
                      <div className="space-y-0.5">{dEv.map(renderEvent)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* DAY VIEW */}
          {view === "day" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{cursor.toDateString()}</div>
                  <div className="text-xs text-muted-foreground">{dayEvents.length} events</div>
                </div>
                <Button size="sm" onClick={() => openAdd(cursor)}>Add Event</Button>
              </div>
              {dayEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">No events for this day</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Click Add Event to schedule something.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {dayEvents.map(ev => {
                    const c = COLORS.find(x => x.key === ev.color)
                    return (
                      <div key={ev.id} onClick={() => openEdit(ev)}
                        className="flex items-start gap-3 rounded-lg border border-border/30 bg-muted/20 p-3 cursor-pointer hover:bg-muted/30 transition-colors">
                        <span className={cn("mt-1.5 size-2.5 rounded-full shrink-0", c?.dot)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">{ev.title}</span>
                            <Badge size="sm" className="bg-muted/50 text-muted-foreground">{ev.business}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {ev.allDay ? "All day" : new Date(ev.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            {ev.end ? ` – ${new Date(ev.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
                          </p>
                          {ev.description && <p className="text-xs text-muted-foreground mt-1">{ev.description}</p>}
                          <div className="flex items-center gap-2 mt-2">
                            {ev.guests?.map(g => (
                              <span key={g} className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold">{g}</span>
                            ))}
                            {ev.url && <a href={ev.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline"><ExternalLink className="size-3" />Link</a>}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* LIST VIEW */}
          {view === "list" && (
            sortedMonth.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg">
                <p className="text-sm text-muted-foreground">No events this month</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Click a day to add an event.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {sortedMonth.map(ev => {
                  const p = parseDate(ev.start)
                  const c = COLORS.find(x => x.key === ev.color)
                  return (
                    <div key={ev.id} onClick={() => openEdit(ev)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/30 cursor-pointer transition-colors border-b border-border/30 last:border-0">
                      <div className="w-10 shrink-0 text-center">
                        <div className="text-sm font-bold">{p.day}</div>
                        <div className="text-[10px] uppercase text-muted-foreground">{MONTH_NAMES[p.month].slice(0, 3)}</div>
                      </div>
                      <span className={cn("size-2.5 rounded-full shrink-0", c?.dot)} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{ev.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {ev.allDay ? "All day" : new Date(ev.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {ev.business !== "Work" ? ` · ${ev.business}` : ""}
                        </div>
                      </div>
                      {ev.guests?.length > 0 && (
                        <div className="flex -space-x-1.5 shrink-0">
                          {ev.guests.slice(0, 3).map(g => (
                            <span key={g} className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold ring-2 ring-card">{g}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Event dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="ev-title" className="text-xs font-medium text-muted-foreground">Title</label>
              <Input id="ev-title" placeholder="Event title" value={fTitle} onChange={e => setFTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="ev-business" className="text-xs font-medium text-muted-foreground">Business</label>
                <Select value={fBusiness} onValueChange={v => v && setFBusiness(v)}>
                  <SelectTrigger id="ev-business" className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BUSINESS_OPTIONS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Calendar</label>
                <div className="flex gap-2 h-8 items-center">
                  {COLORS.map(c => (
                    <button key={c.key} onClick={() => setFColor(c.key)}
                      className={cn("size-6 rounded-full transition-all ring-2 ring-offset-2 ring-offset-card cursor-pointer", c.dot, fColor === c.key ? c.ring : "ring-transparent")}
                      aria-label={c.label} title={c.label} />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="ev-start" className="text-xs font-medium text-muted-foreground">Start Date</label>
                <Input id="ev-start" type="datetime-local" value={fStart} onChange={e => setFStart(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="ev-end" className="text-xs font-medium text-muted-foreground">End Date</label>
                <Input id="ev-end" type="datetime-local" value={fEnd} onChange={e => setFEnd(e.target.value)} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="toggle-switch" checked={fAllDay} onChange={e => setFAllDay(e.target.checked)} />
              All Day
            </label>
            <div className="space-y-1.5">
              <label htmlFor="ev-url" className="text-xs font-medium text-muted-foreground">Event URL</label>
              <Input id="ev-url" type="url" placeholder="https://" value={fUrl} onChange={e => setFUrl(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Guests</label>
              <div className="flex flex-wrap gap-2">
                {GUEST_OPTIONS.map(g => (
                  <button key={g} onClick={() => toggleGuest(g)}
                    className={cn("inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-all cursor-pointer",
                      fGuests.includes(g)
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/40"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted")}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="ev-desc" className="text-xs font-medium text-muted-foreground">Description</label>
              <Textarea id="ev-desc" placeholder="Add details..." value={fDesc} onChange={e => setFDesc(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            {editingId && <Button variant="destructive" onClick={() => deleteEvent(editingId)}>Delete</Button>}
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveEvent} disabled={!fTitle.trim() || !fStart}>{editingId ? "Update" : "Add Event"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style>{`
        .toggle-switch {
          appearance: none;
          -webkit-appearance: none;
          width: 36px;
          height: 20px;
          border-radius: 999px;
          background: hsl(var(--border));
          border: 1px solid hsl(var(--border));
          cursor: pointer;
          position: relative;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .toggle-switch::after {
          content: "";
          position: absolute;
          top: 1px;
          left: 1px;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: hsl(var(--background));
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .toggle-switch:checked { background: hsl(var(--primary)); border-color: hsl(var(--primary)); }
        .toggle-switch:checked::after { transform: translateX(16px); }
        .toggle-switch:focus-visible { outline: none; box-shadow: 0 0 0 2px hsl(var(--primary) / 0.5); }
      `}</style>
    </div>
  )
}
