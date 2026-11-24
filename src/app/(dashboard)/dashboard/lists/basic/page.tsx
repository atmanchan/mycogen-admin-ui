"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Clock, Edit, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

type WorkItem = { title: string; desc: string; owner: string; tag: string; time: string }

const seedItems: WorkItem[] = [
  { title: "Design System Audit", desc: "Review token usage across the product and align spacing, type scale and color roles with the design spec.", owner: "AJ", tag: "Design", time: "Updated 2h ago" },
  { title: "Checkout Performance", desc: "Profile the checkout bundle, identify blocking resources and cut first-load time below 1.8s on 4G.", owner: "BS", tag: "Engineering", time: "Updated 5h ago" },
  { title: "Onboarding A/B Test", desc: "Run an A/B test on the new sign-up flow comparing conversion across three variants.", owner: "CW", tag: "Growth", time: "Updated 1d ago" },
  { title: "API Rate Limiting", desc: "Add per-key rate limiting to the public API and ship usage reporting to the dashboard.", owner: "DB", tag: "Engineering", time: "Updated 2d ago" },
  { title: "Brand Refresh", desc: "Update marketing collateral, logos and email templates to match the new brand guidelines.", owner: "ED", tag: "Design", time: "Updated 3d ago" },
  { title: "Customer NPS Survey", desc: "Design and launch a quarterly NPS survey to existing customers across all regions.", owner: "MK", tag: "Research", time: "Updated 5d ago" },
  { title: "Docs Site Migration", desc: "Move the documentation site to the new static generator and update all redirects.", owner: "LS", tag: "Content", time: "Updated 1w ago" },
]

const tagStyles: Record<string, string> = {
  Design: "bg-primary/10 text-primary",
  Engineering: "bg-sky-500/15 text-sky-500",
  Growth: "bg-emerald-500/15 text-emerald-500",
  Research: "bg-amber-500/15 text-amber-500",
  Content: "bg-rose-500/15 text-rose-500",
}

const tags = Object.keys(tagStyles)
const perPage = 3

const emptyDraft: WorkItem = { title: "", desc: "", owner: "", tag: "Design", time: "Updated just now" }

export default function BasicListPage() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<WorkItem[]>(seedItems)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState<WorkItem>(emptyDraft)

  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const pageItems = items.slice((page - 1) * perPage, page * perPage)

  const openAdd = () => {
    setEditIndex(null)
    setDraft(emptyDraft)
    setDialogOpen(true)
  }

  const openEdit = (index: number) => {
    setEditIndex(index)
    setDraft({ ...items[index] })
    setDialogOpen(true)
  }

  const saveDraft = () => {
    if (!draft.title.trim()) return
    const owner = draft.owner.trim().toUpperCase().slice(0, 2) || "NA"
    const next = { ...draft, owner, time: editIndex === null ? "Updated just now" : draft.time }
    if (editIndex === null) {
      setItems((prev) => [next, ...prev])
      setPage(1)
      toast.success("Item created.")
    } else {
      setItems((prev) => prev.map((it, i) => (i === editIndex ? next : it)))
      toast.success("Item updated.")
    }
    setDialogOpen(false)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Basic List</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Standard list rows with owner, description and inline actions.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Work Items
            </CardTitle>
            <Button size="sm" onClick={openAdd}>+ New Item</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {pageItems.map((item, i) => {
              const globalIndex = (page - 1) * perPage + i
              return (
                <div key={item.title + globalIndex} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 hover:bg-muted/30 transition-colors">
                  <Avatar className="size-10 shrink-0">
                    <AvatarFallback className="bg-primary/12 text-primary text-xs font-bold">{item.owner}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold">{item.title}</span>
                      <Badge className={`text-[10px] font-semibold px-1.5 py-0 rounded-full ${tagStyles[item.tag]}`}>
                        {item.tag}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{item.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="size-3" /> {item.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => toast(item.title, { description: item.desc })}>
                      <Eye className="size-3.5" /> View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(globalIndex)}>
                      <Edit className="size-3.5" /> Edit
                    </Button>
                  </div>
                </div>
              )
            })}
            {pageItems.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">No items yet.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Showing {items.length === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, items.length)} of {items.length}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)) }} text="Prev" />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => { e.preventDefault(); setPage(p) }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, page + 1)) }} text="Next" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editIndex === null ? "New Item" : "Edit Item"}</DialogTitle>
            <DialogDescription>
              {editIndex === null ? "Add a new work item to the list." : "Update this work item."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Title</p>
              <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Design System Audit" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Description</p>
              <Textarea rows={3} value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} placeholder="Describe the work item..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Owner</p>
                <Input value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} placeholder="AB" maxLength={2} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Tag</p>
                <Select value={draft.tag} onValueChange={(tag) => setDraft({ ...draft, tag: tag ?? draft.tag })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {tags.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={saveDraft} disabled={!draft.title.trim()}>
              {editIndex === null ? "Create" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
