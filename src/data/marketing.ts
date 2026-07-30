import type { Campaign } from "@/types/marketing"

export const campaigns: Campaign[] = [
  { id: "CAMP-001", name: "Summer Sale Launch", channel: "Email", reach: "45.2K", engagement: "12.3%", status: "live", startDate: "2026-07-15" },
  { id: "CAMP-002", name: "New Product Teaser", channel: "Social Media", reach: "128K", engagement: "8.7%", status: "live", startDate: "2026-07-20" },
  { id: "CAMP-003", name: "Holiday Campaign", channel: "Email", reach: "89K", engagement: "15.1%", status: "completed", startDate: "2026-06-01" },
  { id: "CAMP-004", name: "Brand Awareness", channel: "Google Ads", reach: "234K", engagement: "3.2%", status: "draft", startDate: "2026-08-01" },
  { id: "CAMP-005", name: "Influencer Partnership", channel: "Instagram", reach: "56K", engagement: "22.5%", status: "live", startDate: "2026-07-10" },
  { id: "CAMP-006", name: "Retargeting Campaign", channel: "Facebook", reach: "67K", engagement: "5.8%", status: "completed", startDate: "2026-05-15" },
]
