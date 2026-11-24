"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/sections/shared/empty-state"
import { customers as seedCustomers } from "@/data/customers"
import type { Customer } from "@/types/customer"

const statusStyles: Record<string, string> = {
  vip: "bg-amber-500/10 text-amber-600",
  regular: "bg-primary/10 text-primary",
  new: "bg-success/10 text-success",
}

const toInitials = (name: string) =>
  name.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase()

const emptyDraft = { name: "", email: "", orders: 0, spent: 0, status: "new" as Customer["status"] }

export default function CustomersPage() {
  const [items, setItems] = useState<Customer[]>(seedCustomers)
  const [query, setQuery] = useState("")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState(emptyDraft)
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }, [items, query])

  const openAdd = () => {
    setEditId(null)
    setDraft(emptyDraft)
    setDialogOpen(true)
  }

  const openEdit = (c: Customer) => {
    setEditId(c.id)
    setDraft({ name: c.name, email: c.email, orders: c.orders, spent: c.spent, status: c.status })
    setDialogOpen(true)
  }

  const save = () => {
    if (!draft.name.trim() || !draft.email.trim()) return
    const initials = toInitials(draft.name)
    if (editId) {
      setItems((prev) => prev.map((c) => (c.id === editId ? { ...c, ...draft, initials } : c)))
      toast.success("Customer updated.")
    } else {
      const nextId = `C-${String(items.length + 1).padStart(3, "0")}`
      const joined = new Date().toISOString().slice(0, 10)
      setItems((prev) => [{ id: nextId, joined, initials, ...draft }, ...prev])
      toast.success("Customer created.")
    }
    setDialogOpen(false)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setItems((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    toast.success(`Deleted ${deleteTarget.name}.`)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage your customers.</p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="size-4" /> Add Customer
        </Button>
      </div>

      <Input
        placeholder="Search customers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-64 h-8"
      />

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            All Customers ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState title="No customers found" description="Try a different search or add a customer." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Orders</th>
                    <th className="px-4 py-3 font-medium">Spent</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">{c.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{c.orders}</td>
                      <td className="px-4 py-3 font-medium">${c.spent.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[c.status]}`}>
                          {c.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-xs" aria-label="Edit" onClick={() => openEdit(c)}>
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon-xs" aria-label="Delete" onClick={() => setDeleteTarget(c)}>
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Customer" : "Add Customer"}</DialogTitle>
            <DialogDescription>{editId ? "Update customer details." : "Create a new customer record."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Name</p>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Alice Chen" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="alice@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Orders</p>
                <Input type="number" min={0} value={draft.orders} onChange={(e) => setDraft({ ...draft, orders: Number(e.target.value) })} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Spent ($)</p>
                <Input type="number" min={0} value={draft.spent} onChange={(e) => setDraft({ ...draft, spent: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Status</p>
              <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: (status ?? draft.status) as Customer["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={save} disabled={!draft.name.trim() || !draft.email.trim()}>{editId ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete customer?</DialogTitle>
            <DialogDescription>
              This will remove &quot;{deleteTarget?.name}&quot;. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
