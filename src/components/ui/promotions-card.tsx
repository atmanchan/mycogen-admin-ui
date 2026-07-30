import { Gift, Mail, Zap, Users, type LucideIcon } from "lucide-react"

interface PromotionsCardProps {
  title: string
  description: string
  status: "Active" | "Live"
  icon: string
}

const iconMap: Record<string, LucideIcon> = { gift: Gift, mail: Mail, zap: Zap, users: Users }

export function PromotionsCard({ title, description, status, icon }: PromotionsCardProps) {
  const Icon = iconMap[icon] || Gift
  const isLive = status === "Live"
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border/30 hover:border-primary/40 transition-colors glass">
      <div className="w-9 h-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 self-start ${
        isLive ? "bg-success/12 text-success" : "bg-primary/12 text-primary"
      }`}>
        {status}
      </span>
    </div>
  )
}
