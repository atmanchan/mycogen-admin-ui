"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Status = "Active" | "Inactive" | "Pending"
type BasicUser = { name: string; role: string; email: string; status: Status }

const initialUsers: BasicUser[] = [
  { name: "Alice Johnson", role: "Admin", email: "alice@example.com", status: "Active" },
  { name: "Bob Smith", role: "Editor", email: "bob@example.com", status: "Active" },
  { name: "Carol White", role: "Viewer", email: "carol@example.com", status: "Inactive" },
  { name: "Dan Brown", role: "Editor", email: "dan@example.com", status: "Pending" },
  { name: "Eve Davis", role: "Admin", email: "eve@example.com", status: "Active" },
]

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-warning/10 text-warning",
}

const employees = [
  { name: "James Wilson", department: "Engineering", age: 34, salary: 95000, joinDate: "2021-03-15" },
  { name: "Sophia Lee", department: "Design", age: 28, salary: 82000, joinDate: "2022-07-01" },
  { name: "Michael Chen", department: "Engineering", age: 42, salary: 120000, joinDate: "2019-11-20" },
  { name: "Emma Garcia", department: "Marketing", age: 31, salary: 78000, joinDate: "2020-05-10" },
  { name: "Liam Patel", department: "Sales", age: 29, salary: 88000, joinDate: "2023-01-08" },
  { name: "Olivia Kim", department: "HR", age: 37, salary: 72000, joinDate: "2018-09-25" },
  { name: "Noah Martinez", department: "Engineering", age: 26, salary: 91000, joinDate: "2023-06-12" },
  { name: "Ava Thompson", department: "Finance", age: 45, salary: 105000, joinDate: "2017-04-03" },
]

function formatSalary(n: number) {
  return "$" + n.toLocaleString("en-US")
}

export default function TablesPage() {
  const [users, setUsers] = useState(initialUsers)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState<BasicUser | null>(null)
  const [search, setSearch] = useState("")

  const openEdit = (index: number) => {
    setEditIndex(index)
    setDraft({ ...users[index] })
  }

  const closeEdit = () => {
    setEditIndex(null)
    setDraft(null)
  }

  const saveEdit = () => {
    if (editIndex === null || !draft) return
    setUsers((prev) => prev.map((u, i) => (i === editIndex ? draft : u)))
    toast.success(`Updated ${draft.name}.`)
    closeEdit()
  }

  const filteredEmployees = employees.filter((e) =>
    (e.name + " " + e.department).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tables</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Basic and data table examples.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Basic Table
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u.email} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[u.status]}`}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="outline" size="xs" onClick={() => openEdit(index)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Data Table
            </CardTitle>
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees..."
              className="max-w-56 h-7 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Age</th>
                  <th className="px-4 py-3 font-medium">Salary</th>
                  <th className="px-4 py-3 font-medium">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e) => (
                  <tr key={e.name} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.department}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.age}</td>
                    <td className="px-4 py-3 font-medium">{formatSalary(e.salary)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.joinDate}</td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No employees match “{search}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editIndex !== null} onOpenChange={(open) => { if (!open) closeEdit() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update this user&apos;s details.</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Name</p>
                <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Email</p>
                <Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Role</p>
                  <Select value={draft.role} onValueChange={(role) => setDraft({ ...draft, role: role ?? draft.role })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: (status ?? draft.status) as Status })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={closeEdit}>Cancel</Button>
            <Button size="sm" onClick={saveEdit} disabled={!draft?.name.trim() || !draft?.email.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
