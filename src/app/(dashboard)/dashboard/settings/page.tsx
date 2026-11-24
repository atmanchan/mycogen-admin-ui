"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  role: "admin",
}

export default function SettingsPage() {
  const [profile, setProfile] = useState(initialProfile)
  const [saved, setSaved] = useState(initialProfile)

  const update = (patch: Partial<typeof initialProfile>) => setProfile((p) => ({ ...p, ...patch }))

  const handleSave = () => {
    setSaved(profile)
    toast.success("Settings saved successfully.")
  }

  const handleCancel = () => {
    setProfile(saved)
    toast("Changes discarded.")
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account settings.</p>
      </div>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">First Name</label>
              <Input value={profile.firstName} onChange={(e) => update({ firstName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Last Name</label>
              <Input value={profile.lastName} onChange={(e) => update({ lastName: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input value={profile.email} onChange={(e) => update({ email: e.target.value })} type="email" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Role</label>
            <Select value={profile.role} onValueChange={(role) => update({ role: role ?? profile.role })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Email notifications", "Push notifications", "Weekly digest"].map(item => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
