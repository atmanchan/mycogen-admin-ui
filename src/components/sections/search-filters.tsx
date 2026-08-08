import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SearchFiltersProps {
  categories: string[]
  selectedCategories: string[]
  onToggleCategory: (category: string) => void
  children?: React.ReactNode
}

export function SearchFilters({
  categories,
  selectedCategories,
  onToggleCategory,
  children,
}: SearchFiltersProps) {
  return (
    <Card size="sm" className="bg-card card-original shadow-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] items-start gap-2">
          <div className="text-sm font-semibold pt-1">Category</div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <Button
                key={c}
                size="xs"
                variant={selectedCategories.includes(c) ? "default" : "outline"}
                onClick={() => onToggleCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
        {children && (
          <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-1 md:grid-cols-[96px_1fr] items-start gap-2">
            <div className="text-sm font-semibold pt-1">Other</div>
            <div className="flex flex-wrap items-center gap-4 gap-y-2.5">{children}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
