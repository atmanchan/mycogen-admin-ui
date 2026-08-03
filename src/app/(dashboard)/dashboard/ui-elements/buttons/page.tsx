import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const variants = ["default", "secondary", "outline", "ghost", "destructive"] as const
const sizes = ["xs", "sm", "default", "lg", "lg-xl", "lg-2xl", "icon"] as const

export default function ButtonsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Buttons" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Buttons</h1>
        <p className="text-sm text-muted-foreground mt-1">Button variants and sizes.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v}>{v}</Button>
          ))}
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Button key={s} size={s}>Size {s}</Button>
          ))}
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Large Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v} size="lg-xl">{v}</Button>
          ))}
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Extra Large Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v} size="lg-2xl">{v}</Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
