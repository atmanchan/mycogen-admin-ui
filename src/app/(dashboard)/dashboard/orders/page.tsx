"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Eye, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/sections/shared/empty-state"
import { orders as seedOrders } from "@/data/orders"
import type { Order } from "@/types/order"

const statusColor: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  processing: "bg-primary/10 text-primary",
  shipped: "bg-accent text-accent-foreground",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
}

const statuses: Order["status"][] = ["pending", "processing", "shipped", "delivered", "cancelled"]

export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>(seedOrders)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [detail, setDetail] = useState<Order | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null)

  const filtered = useMemo(() => {
    return items.filter((o) => {
      const q = query.toLowerCase()
      const matchesQuery =
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
      const matchesStatus = statusFilter === "all" || o.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [items, query, statusFilter])

  const updateStatus = (id: string, status: Order["status"]) => {
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    setDetail((d) => (d && d.id === id ? { ...d, status } : d))
    toast.success(`Order ${id} marked as ${status}.`)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setItems((prev) => prev.filter((o) => o.id !== deleteTarget.id))
    toast.success(`Deleted order ${deleteTarget.id}.`)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your orders and shipments.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search orders, customers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-64 h-8"
        />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            All Orders ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState title="No orders found" description="Try a different search or status filter." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Order</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: order.thumb }}>
                            {order.product.split(" ")[0]}
                          </div>
                          <span className="font-medium">{order.product}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{order.id}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[11px] font-medium">{order.category}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div>{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </td>
                      <td className="px-4 py-3 font-medium">${order.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-xs" aria-label="View" onClick={() => setDetail(order)}>
                            <Eye className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon-xs" aria-label="Delete" onClick={() => setDeleteTarget(order)}>
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

      <Dialog open={!!detail} onOpenChange={(open) => { if (!open) setDetail(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order {detail?.id}</DialogTitle>
            <DialogDescription>{detail?.date}</DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="space-y-3 py-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Product</span><span className="font-medium">{detail.product}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>{detail.category}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span>{detail.customer}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{detail.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-medium">${detail.amount.toFixed(2)}</span></div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Select value={detail.status} onValueChange={(s) => s && updateStatus(detail.id, s as Order["status"])}>
                  <SelectTrigger className="w-36 h-7"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDetail(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete order?</DialogTitle>
            <DialogDescription>
              This will delete order {deleteTarget?.id}. This action cannot be undone.
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
