import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const alerts = [
  {
    title: "Success Message",
    description: "You can insert a description for the message here.",
    icon: CheckCircle2,
    iconClass: "text-green-500",
    buttonVariant: "default" as const,
  },
  {
    title: "Warning Message",
    description: "You can insert a description for the message here.",
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    buttonVariant: "default" as const,
  },
  {
    title: "Error Message",
    description: "You can insert a description for the message here.",
    icon: XCircle,
    iconClass: "text-red-500",
    buttonVariant: "destructive" as const,
  },
  {
    title: "Info Message",
    description: "You can insert a description for the message here.",
    icon: Info,
    iconClass: "text-blue-500",
    buttonVariant: "default" as const,
  },
]

export default function AlertsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Alerts" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="text-sm text-muted-foreground mt-1">Alert message variants.</p>
      </div>
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.title} size="sm" className="bg-card card-original shadow-sm">
            <CardContent className="flex items-start gap-3 py-4">
              <alert.icon className={`h-5 w-5 mt-0.5 ${alert.iconClass}`} />
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm font-semibold">{alert.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
              </div>
              <Button variant={alert.buttonVariant} size="sm">Learn more</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
