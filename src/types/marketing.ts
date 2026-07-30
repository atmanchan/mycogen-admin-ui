export interface Campaign {
  id: string
  name: string
  channel: string
  reach: string
  engagement: string
  status: "live" | "draft" | "completed"
  startDate: string
}
