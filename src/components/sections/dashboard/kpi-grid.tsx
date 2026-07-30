import { DollarSign, ShoppingBag, CreditCard, Eye, type LucideIcon } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { kpiData } from "@/data/dashboard"

const iconMap: Record<string, LucideIcon> = {
  dollar: DollarSign, bag: ShoppingBag, card: CreditCard, eye: Eye,
}

export function KPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, i) => (
        <MetricCard key={i} {...kpi} icon={iconMap[kpi.icon]} />
      ))}
    </div>
  )
}
