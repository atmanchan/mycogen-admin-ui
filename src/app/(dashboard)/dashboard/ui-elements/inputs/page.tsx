import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export default function InputsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Inputs" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inputs</h1>
        <p className="text-sm text-muted-foreground mt-1">Text inputs and textareas.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Input Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">Text</p>
            <Input type="text" placeholder="Enter text..." />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">Email</p>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">Password</p>
            <Input type="password" placeholder="Enter password..." />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">Number</p>
            <Input type="number" placeholder="0" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">Disabled</p>
            <Input type="text" placeholder="Disabled input..." disabled />
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-xs text-muted-foreground mb-2">Message</p>
          <Textarea placeholder="Write your message here..." />
        </CardContent>
      </Card>
    </div>
  )
}
