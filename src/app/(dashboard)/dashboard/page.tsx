import { WelcomeBanner } from "@/components/sections/dashboard/welcome-banner"
import { KPIGrid } from "@/components/sections/dashboard/kpi-grid"
import { InsightsGrid } from "@/components/sections/dashboard/insights-grid"
import { TopChannels } from "@/components/sections/dashboard/top-channels"
import { ActiveUsers } from "@/components/sections/dashboard/active-users"
import { CustomersDemographic } from "@/components/sections/dashboard/customers-demographic"
import { ChartsGrid } from "@/components/sections/dashboard/charts-grid"
import { PromotionsSection } from "@/components/sections/dashboard/promotions-section"

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <WelcomeBanner />
      <KPIGrid />
      <InsightsGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopChannels />
        <ActiveUsers />
      </div>
      <CustomersDemographic />
      <ChartsGrid />
      <PromotionsSection />
    </div>
  )
}
