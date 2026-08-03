import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const values = [25, 50, 75, 100]

export default function ProgressPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Progress" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">Progress bars.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress Bars</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {values.map((v) => (
            <div key={v} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Progress {v}%</span>
                <span className="text-muted-foreground">{v}%</span>
              </div>
              <Progress value={v} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
