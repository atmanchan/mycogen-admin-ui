export interface Discount {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  usage: number
  maxUsage: number
  status: "active" | "expired" | "scheduled"
  expiresAt: string
}
