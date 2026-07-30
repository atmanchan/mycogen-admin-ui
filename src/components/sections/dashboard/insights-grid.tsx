import { InsightCard } from "@/components/ui/insight-card"
import { PercentageRing } from "@/components/ui/percentage-ring"
import { insightData, ringsData } from "@/data/dashboard"

export function InsightsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InsightCard title={insightData.title} items={insightData.items} />
      {ringsData.map((ring, i) => (
        <PercentageRing key={i} {...ring} />
      ))}
    </div>
  )
}
