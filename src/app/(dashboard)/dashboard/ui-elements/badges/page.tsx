import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const variants = ["default", "secondary", "outline", "destructive", "ghost"] as const
const sizes = ["sm", "default", "lg"] as const

export default function BadgesPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Badges" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Badges</h1>
        <p className="text-sm text-muted-foreground mt-1">Badge variants and sizes.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Badge key={v} variant={v}>{v}</Badge>
          ))}
          <Badge className="bg-success/10 text-success">success</Badge>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Badge key={s} size={s}>Size {s}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
