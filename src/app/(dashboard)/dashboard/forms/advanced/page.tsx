"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const sections = ["Task Info", "Pricing", "Approval"]

type Mode = "edit" | "readonly" | "disabled"

const initialTasks = [
  { name: "Migrate checkout service", price: "$8,400", members: ["AJ", "BS"], status: "In Progress" as const },
  { name: "Refactor auth flows", price: "$5,200", members: ["CW"], status: "In Progress" as const },
  { name: "Build analytics dashboard", price: "$12,000", members: ["MK", "DB"], status: "Done" as const },
]

export default function AdvancedFormPage() {
  const [mode, setMode] = useState<Mode>("edit")
  const [tasks, setTasks] = useState(initialTasks)

  const readonly = mode === "readonly"
  const disabled = mode === "disabled"

  const addTask = () => {
    setTasks((prev) => [...prev, { name: "New task", price: "$0", members: [], status: "In Progress" as const }])
  }

  const removeTask = (i: number) => {
    setTasks((prev) => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Advanced Form</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A complex multi-section form with dynamic lists and interaction modes.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Interaction Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(["edit", "readonly", "disabled"] as Mode[]).map((m) => (
              <Button
                key={m}
                variant={mode === m ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(m)}
                disabled={disabled}
              >
                {m === "edit" ? "Edit" : m === "readonly" ? "Readonly" : "Disabled"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-readonly={readonly || undefined}
        aria-disabled={disabled || undefined}
        className="space-y-4"
      >
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Task Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="adv-name" className="text-sm font-medium block mb-1.5">Task name</label>
                <Input id="adv-name" placeholder="e.g. Deploy checkout v2" readOnly={readonly} disabled={disabled} />
              </div>
              <div>
                <label htmlFor="adv-owner" className="text-sm font-medium block mb-1.5">Owner</label>
                <Select readOnly={readonly} disabled={disabled}>
                  <SelectTrigger id="adv-owner" className="w-full">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alice">Alice Johnson</SelectItem>
                    <SelectItem value="bob">Bob Smith</SelectItem>
                    <SelectItem value="carol">Carol White</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="adv-desc" className="text-sm font-medium block mb-1.5">Description</label>
                <Textarea
                  id="adv-desc"
                  rows={3}
                  placeholder="Describe the task scope and acceptance criteria..."
                  readOnly={readonly}
                  disabled={disabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="adv-price" className="text-sm font-medium block mb-1.5">Unit price</label>
                <InputGroup>
                  <InputGroupAddon align="inline-start"><span>$</span></InputGroupAddon>
                  <InputGroupInput id="adv-price" type="number" defaultValue="1200" readOnly={readonly} disabled={disabled} />
                </InputGroup>
              </div>
              <div>
                <label htmlFor="adv-qty" className="text-sm font-medium block mb-1.5">Quantity</label>
                <Input id="adv-qty" type="number" defaultValue="10" readOnly={readonly} disabled={disabled} />
              </div>
              <div>
                <label htmlFor="adv-discount" className="text-sm font-medium block mb-1.5">Discount (%)</label>
                <Input id="adv-discount" type="number" defaultValue="5" readOnly={readonly} disabled={disabled} />
              </div>
            </div>
            <div className="rounded-lg bg-muted/40 border border-border/40 px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total amount</span>
              <span className="font-bold text-lg">$11,400</span>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dynamic Task List
              </CardTitle>
              <Button size="sm" variant="outline" onClick={addTask} disabled={disabled}>
                <Plus className="size-3.5" /> Add row
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {tasks.map((t, i) => (
                <div key={i} className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                  <Input
                    defaultValue={t.name}
                    readOnly={readonly}
                    disabled={disabled}
                    className="flex-1 min-w-44"
                    aria-label={`Task name ${i + 1}`}
                  />
                  <Input
                    defaultValue={t.price}
                    readOnly={readonly}
                    disabled={disabled}
                    className="w-28"
                    aria-label={`Task price ${i + 1}`}
                  />
                  <Badge variant="outline" className="h-6">
                    {t.status}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    {t.members.map((m, mi) => (
                      <span key={mi} className="size-6 rounded-full bg-primary/12 text-primary text-[10px] font-bold flex items-center justify-center">
                        {m}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Remove task ${i + 1}`}
                    onClick={() => removeTask(i)}
                    disabled={disabled}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" disabled={disabled}>Cancel</Button>
          <Button type="submit" disabled={disabled}>Submit</Button>
        </div>
      </form>
    </div>
  )
}
