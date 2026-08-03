import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const colors = [
  "bg-red-500/10 text-red-500",
  "bg-blue-500/10 text-blue-500",
  "bg-green-500/10 text-green-500",
  "bg-amber-500/10 text-amber-500",
  "bg-purple-500/10 text-purple-500",
  "bg-pink-500/10 text-pink-500",
]

export default function AvatarsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Avatars" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Avatars</h1>
        <p className="text-sm text-muted-foreground mt-1">Avatar sizes and fallback.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground mb-2">sm</p>
            <Avatar size="sm">
              <AvatarFallback className={colors[0]}>SM</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground mb-2">default</p>
            <Avatar>
              <AvatarFallback className={colors[1]}>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground mb-2">lg</p>
            <Avatar size="lg">
              <AvatarFallback className={colors[2]}>LG</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Fallback Colors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          {colors.map((c, i) => (
            <Avatar key={i}>
              <AvatarFallback className={c}>AB</AvatarFallback>
            </Avatar>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
