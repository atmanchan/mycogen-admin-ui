"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckboxPage() {
  const [checked, setChecked] = useState(true)
  const [team, setTeam] = useState<string[]>(["design"])

  const toggleTeam = (id: string) =>
    setTeam((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const members = [
    { id: "design", label: "Design team" },
    { id: "eng", label: "Engineering" },
    { id: "qa", label: "QA" },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Checkbox</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Multi-select checkboxes.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Basic
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
          <span className="text-sm">Receive product updates ({checked ? "on" : "off"})</span>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Group
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {members.map((m) => (
            <label key={m.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={team.includes(m.id)}
                onCheckedChange={() => toggleTeam(m.id)}
              />
              {m.label}
            </label>
          ))}
          <p className="text-xs text-muted-foreground pt-1">
            Selected: {team.join(", ") || "none"}
          </p>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Disabled
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Checkbox disabled />
          <span className="text-sm text-muted-foreground">Unavailable option</span>
        </CardContent>
      </Card>
    </div>
  )
}
