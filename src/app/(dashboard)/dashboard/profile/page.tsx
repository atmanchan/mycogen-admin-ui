"use client"

import {
  ArrowUpRight,
  Clock,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    icon: Globe,
    label: "Login from Chrome on macOS",
    time: "2 hours ago",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: User,
    label: "Updated profile information",
    time: "Yesterday",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Lock,
    label: "Changed password",
    time: "3 days ago",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Globe,
    label: "Login from Safari on iOS",
    time: "1 week ago",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
]

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings and view recent activity.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent>
          <div className="flex items-center gap-5 py-2">
            <Avatar size="lg" className="size-16">
              <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
            </div>
            <Button variant="outline" size="sm">
              <User className="size-3.5" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">First Name</label>
                <Input type="text" value="John" disabled />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Last Name</label>
                <Input type="text" value="Doe" disabled />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input type="email" value="john@mycogen.com" disabled />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                <Input type="tel" value="+1 (555) 123-4567" disabled />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Location</label>
                <Input type="text" value="San Francisco, CA" disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button type="submit" size="sm">
                <ShieldCheck className="size-3.5" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {activities.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="flex items-start gap-3 pb-4 last:pb-0 relative">
                  <div className="flex flex-col items-center">
                    <div className={`size-8 rounded-full ${a.bg} flex items-center justify-center ${a.color}`}>
                      <Icon className="size-4" />
                    </div>
                    {i < activities.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-medium">{a.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="size-3" />
                      {a.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon-xs" className="mt-0.5">
                    <ArrowUpRight className="size-3" />
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
