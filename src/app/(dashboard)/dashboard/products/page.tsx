"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/sections/shared/empty-state"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  draft: "bg-muted text-muted-foreground",
  archived: "bg-destructive/10 text-destructive",
}

const categories = ["Laptop", "Watch", "SmartPhone", "Electronics", "Accessories"]
const thumbColors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"]

const emptyDraft: Omit<Product, "id" | "sales"> = {
  name: "",
  category: "Laptop",
  price: 0,
  stock: 0,
  status: "active",
  thumb: thumbColors[0],
}

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>(products)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Product, "id" | "sales">>(emptyDraft)

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === "all" || p.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [items, query, statusFilter])

  const openAdd = () => {
    setEditId(null)
    setDraft(emptyDraft)
    setDialogOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditId(p.id)
    setDraft({ name: p.name, category: p.category, price: p.price, stock: p.stock, status: p.status, thumb: p.thumb })
    setDialogOpen(true)
  }

  const save = () => {
    if (!draft.name.trim()) return
    if (editId) {
      setItems((prev) => prev.map((p) => (p.id === editId ? { ...p, ...draft } : p)))
      toast.success("Product updated.")
    } else {
      const nextId = `PROD-${String(items.length + 1).padStart(3, "0")}`
      setItems((prev) => [{ id: nextId, sales: 0, ...draft }, ...prev])
      toast.success("Product created.")
    }
    setDialogOpen(false)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setItems((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    toast.success(`Deleted ${deleteTarget.name}.`)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your product catalog.</p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="size-4" /> Add Product
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-64 h-8"
        />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            All Products ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState title="No products found" description="Try a different search or add a new product." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium">Sales</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: p.thumb }}>
                            {p.name.split(" ")[0]}
                          </div>
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[11px] font-medium">{p.category}</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">${p.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 max-w-28">
                          <Progress value={Math.min(100, (p.stock / 200) * 100)} className="h-1.5" />
                          <span className={`text-xs shrink-0 ${p.stock === 0 ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                            {p.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{p.sales}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[p.status]}`}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-xs" aria-label="Edit" onClick={() => openEdit(p)}>
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon-xs" aria-label="Delete" onClick={() => setDeleteTarget(p)}>
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
            <DialogTitle>{editId ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>{editId ? "Update product details." : "Create a new product."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Name</p>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Macbook Pro 13&quot;" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Category</p>
                <Select value={draft.category} onValueChange={(category) => setDraft({ ...draft, category: category ?? draft.category })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: (status ?? draft.status) as Product["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Price ($)</p>
                <Input type="number" min={0} value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Stock</p>
                <Input type="number" min={0} value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Color</p>
              <div className="flex gap-2">
                {thumbColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Color ${c}`}
                    onClick={() => setDraft({ ...draft, thumb: c })}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${draft.thumb === c ? "border-foreground scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={save} disabled={!draft.name.trim()}>{editId ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              This will remove &quot;{deleteTarget?.name}&quot; from the catalog. This action cannot be undone.
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
