import type { Customer } from "@/types/customer"

export const customers: Customer[] = [
  { id: "C-001", name: "Alice Chen", email: "alice@example.com", orders: 12, spent: 1245.80, status: "vip", joined: "2025-03-15", initials: "AC" },
  { id: "C-002", name: "Bob Martinez", email: "bob@example.com", orders: 5, spent: 320.50, status: "regular", joined: "2025-06-22", initials: "BM" },
  { id: "C-003", name: "Carol Smith", email: "carol@example.com", orders: 8, spent: 890.00, status: "regular", joined: "2025-01-10", initials: "CS" },
  { id: "C-004", name: "David Kim", email: "david@example.com", orders: 3, spent: 145.00, status: "new", joined: "2026-06-01", initials: "DK" },
  { id: "C-005", name: "Eve Johnson", email: "eve@example.com", orders: 15, spent: 2340.00, status: "vip", joined: "2024-11-03", initials: "EJ" },
  { id: "C-006", name: "Frank Liu", email: "frank@example.com", orders: 7, spent: 670.00, status: "regular", joined: "2025-09-18", initials: "FL" },
  { id: "C-007", name: "Grace Patel", email: "grace@example.com", orders: 2, spent: 89.99, status: "new", joined: "2026-07-01", initials: "GP" },
  { id: "C-008", name: "Henry Wilson", email: "henry@example.com", orders: 10, spent: 1120.00, status: "vip", joined: "2025-04-28", initials: "HW" },
]
