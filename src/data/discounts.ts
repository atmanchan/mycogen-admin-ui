import type { Discount } from "@/types/discount"

export const discounts: Discount[] = [
  { id: "DSC-001", code: "SUMMER20", type: "percentage", value: 20, usage: 234, maxUsage: 500, status: "active", expiresAt: "2026-08-31" },
  { id: "DSC-002", code: "WELCOME10", type: "percentage", value: 10, usage: 89, maxUsage: 200, status: "active", expiresAt: "2026-09-15" },
  { id: "DSC-003", code: "FLASH50", type: "fixed", value: 50, usage: 45, maxUsage: 100, status: "active", expiresAt: "2026-08-01" },
  { id: "DSC-004", code: "VIP25", type: "percentage", value: 25, usage: 12, maxUsage: 50, status: "active", expiresAt: "2026-12-31" },
  { id: "DSC-005", code: "HOLIDAY15", type: "percentage", value: 15, usage: 567, maxUsage: 1000, status: "expired", expiresAt: "2026-07-01" },
  { id: "DSC-006", code: "EARLYBIRD", type: "fixed", value: 30, usage: 0, maxUsage: 300, status: "scheduled", expiresAt: "2026-10-01" },
]
