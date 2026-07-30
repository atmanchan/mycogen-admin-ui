"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FormsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Forms</h1>
        <p className="text-sm text-muted-foreground mt-1">
          UI components and form layout examples.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Input Fields
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Text</label>
              <Input type="text" placeholder="Enter text" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Number</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Disabled</label>
              <Input type="text" placeholder="Disabled input" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Select
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Default</label>
              <Select defaultValue="option-1">
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option-1">Option 1</SelectItem>
                  <SelectItem value="option-2">Option 2</SelectItem>
                  <SelectItem value="option-3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Disabled</label>
              <Select disabled>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Textarea
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Message</label>
            <Textarea placeholder="Write your message here..." />
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Checkboxes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-primary size-4 rounded" />
              Default
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-primary size-4 rounded" defaultChecked />
              Checked
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-primary size-4 rounded" disabled />
              Disabled
            </label>
            <label className="flex items-center gap-2 text-sm cursor-not-allowed text-muted-foreground">
              <input type="checkbox" className="accent-primary size-4 rounded" disabled defaultChecked />
              Checked Disabled
            </label>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Toggle Switches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="toggle-switch" />
              Notifications
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="toggle-switch" defaultChecked />
              Dark Mode
            </label>
            <label className="flex items-center gap-2 text-sm cursor-not-allowed text-muted-foreground">
              <input type="checkbox" className="toggle-switch" disabled />
              Disabled
            </label>
          </div>
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
            .toggle-switch:checked {
              background: hsl(var(--primary));
              border-color: hsl(var(--primary));
            }
            .toggle-switch:checked::after {
              transform: translateX(16px);
            }
            .toggle-switch:disabled {
              opacity: 0.4;
              cursor: not-allowed;
            }
          `}</style>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Form Layout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">First Name</label>
              <Input type="text" placeholder="John" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Last Name</label>
              <Input type="text" placeholder="Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Phone</label>
              <Input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Message</label>
              <Textarea placeholder="Your message..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Form Grid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Name</label>
                <Input type="text" placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Subject</label>
              <Input type="text" placeholder="Subject" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Message</label>
              <Textarea placeholder="Write your message..." />
            </div>
            <Button>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
