import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const spinners = [
  {
    label: "Default",
    element: <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />,
  },
  {
    label: "Large",
    element: <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />,
  },
  {
    label: "Small",
    element: <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />,
  },
  {
    label: "Loading Text",
    element: <span className="animate-pulse text-sm text-muted-foreground">Loading...</span>,
  },
]

export default function SpinnersPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Spinners" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Spinners</h1>
        <p className="text-sm text-muted-foreground mt-1">Loading indicators.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {spinners.map((spinner) => (
          <Card key={spinner.label} size="sm" className="bg-card card-original shadow-sm">
            <CardContent className="flex flex-col items-center py-8 space-y-3">
              {spinner.element}
              <p className="text-xs text-muted-foreground">{spinner.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
