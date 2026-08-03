"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/layout/breadcrumb"

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
              <DialogTrigger>
                <Button size="sm">Open Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modal Title</DialogTitle>
                  <DialogDescription>This is a standard modal dialog with content.</DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">You can put any content here inside the modal body.</p>
                <DialogFooter>
                  <DialogTrigger>
                    <Button variant="outline" size="sm">Close</Button>
                  </DialogTrigger>
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
              <DialogTrigger>
                <Button size="sm">Open Alert</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>This action cannot be undone. Do you want to proceed?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogTrigger>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </DialogTrigger>
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
              <DialogTrigger>
                <Button size="sm">Open Form</Button>
              </DialogTrigger>
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
                  <DialogTrigger>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </DialogTrigger>
                  <Button size="sm">Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
