import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export default function PaginationPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "UI Elements", href: "/dashboard/ui-elements" },
        { label: "Pagination" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pagination</h1>
        <p className="text-sm text-muted-foreground mt-1">Page navigation controls.</p>
      </div>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="flex flex-col items-center py-8">
          <p className="text-xs text-muted-foreground mb-4">Default Pagination</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {[1, 2, 3, 4, 5].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink href="#" isActive={page === 1}>{page}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}
