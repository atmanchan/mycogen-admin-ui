"use client"

import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const alertTypes = [
  { key: "success", label: "Success Alert", icon: CheckCircle2, color: "text-emerald-500", btn: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" },
  { key: "info", label: "Info Alert", icon: Info, color: "text-blue-500", btn: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" },
  { key: "warning", label: "Warning Alert", icon: AlertTriangle, color: "text-amber-500", btn: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" },
  { key: "danger", label: "Danger Alert", icon: XCircle, color: "text-rose-500", btn: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20" },
]

export default function DialogsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Dialogs" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dialogs</h1>
        <p className="text-sm text-muted-foreground mt-1">Modal dialog variants.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
            <CardTitle className="text-sm font-semibold">Default Modal</CardTitle>
            <p className="text-sm text-muted-foreground">Standard dialog with title and actions.</p>
            <Dialog>
              <DialogTrigger render={<Button size="sm">Open Modal</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modal Title</DialogTitle>
                  <DialogDescription>This is a standard modal dialog with content.</DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">You can put any content here inside the modal body.</p>
                <DialogFooter>
                  <DialogTrigger render={<Button variant="outline" size="sm">Close</Button>} />
                  <Button size="sm">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
            <CardTitle className="text-sm font-semibold">Alert Dialog</CardTitle>
            <p className="text-sm text-muted-foreground">Confirmation dialog with destructive action.</p>
            <Dialog>
              <DialogTrigger render={<Button size="sm">Open Alert</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>This action cannot be undone. Do you want to proceed?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogTrigger render={<Button variant="outline" size="sm">Cancel</Button>} />
                  <Button variant="destructive" size="sm">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
            <CardTitle className="text-sm font-semibold">Form Dialog</CardTitle>
            <p className="text-sm text-muted-foreground">Dialog with form inputs.</p>
            <Dialog>
              <DialogTrigger render={<Button size="sm">Open Form</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Form</DialogTitle>
                  <DialogDescription>Fill in the details below.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Name</p>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger render={<Button variant="outline" size="sm">Cancel</Button>} />
                  <Button size="sm">Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Full Screen Modal */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
          <CardTitle className="text-sm font-semibold">Full Screen Modal</CardTitle>
          <p className="text-sm text-muted-foreground">Dialog that takes over the entire viewport.</p>
          <Dialog>
            <DialogTrigger render={<Button>Open Full Screen</Button>} />
            <DialogContent className="sm:max-w-none w-[calc(100%-2rem)] h-[calc(100%-2rem)] flex flex-col overflow-hidden">
              <DialogHeader>
                <DialogTitle>Full Screen Modal</DialogTitle>
                <DialogDescription>This dialog covers the whole viewport for immersive content.</DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto text-sm text-muted-foreground space-y-3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis
                  mauris lacinia pharetra. Sed a ligula ac odio condimentum aliquet a nec nulla.
                </p>
                <p>
                  Aliquam bibendum ex sit amet ipsum rutrum feugiat ultrices enim quam. Vivamus vel
                  tristique justo. Nulla facilisi.
                </p>
              </div>
              <DialogFooter className="mx-0 mb-0 shrink-0">
                <DialogTrigger render={<Button variant="outline">Close</Button>} />
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Modal Based Alerts */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Modal Based Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-4">Alerts displayed inside modal dialogs.</p>
          <div className="flex flex-wrap gap-2">
            {alertTypes.map((a) => (
              <Dialog key={a.key}>
                <DialogTrigger render={<Button className={a.btn}>{a.label}</Button>} />
                <DialogContent>
                  <DialogHeader>
                    <div className="flex flex-col items-center text-center gap-3 pt-4">
                      <div className={`p-3 rounded-full bg-current/10 ${a.color}`}>
                        <a.icon className="h-10 w-10" />
                      </div>
                      <DialogTitle>{a.label}</DialogTitle>
                      <DialogDescription>
                        Lorem ipsum dolor sit amet consectetur. Feugiat ipsum libero tempor felis risus nisi non.
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogTrigger render={<Button className="w-full">Okay, Got It</Button>} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
