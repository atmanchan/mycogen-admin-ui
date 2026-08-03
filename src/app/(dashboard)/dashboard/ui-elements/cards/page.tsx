import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image, BookOpen, Layers } from "lucide-react"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export default function CardsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Cards" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cards</h1>
        <p className="text-sm text-muted-foreground mt-1">Card layout variants.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="p-0">
            <div className="w-full h-[120px] bg-muted flex items-center justify-center rounded-t-lg">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-2">
              <CardTitle className="text-sm font-semibold">Card with Image</CardTitle>
              <p className="text-sm text-muted-foreground">This is a description for the image card layout.</p>
              <Button variant="link" size="sm" className="px-0">Read more</Button>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="flex p-4 gap-4">
            <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <CardTitle className="text-sm font-semibold">Horizontal Card</CardTitle>
              <p className="text-sm text-muted-foreground">A horizontal card with image and text side by side.</p>
              <Button variant="link" size="sm" className="px-0">Read more</Button>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="p-4 space-y-2">
            <CardTitle className="text-sm font-semibold">Card with Link</CardTitle>
            <p className="text-sm text-muted-foreground">This card has a link at the bottom instead of a button.</p>
            <Button variant="link" size="sm" className="px-0">Card link</Button>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
            <Layers className="h-10 w-10 text-primary" />
            <CardTitle className="text-sm font-semibold">Card with Icon</CardTitle>
            <p className="text-sm text-muted-foreground">A card featuring a prominent icon at the top.</p>
            <Button size="sm">Read more</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
