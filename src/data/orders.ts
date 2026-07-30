import type { Order } from "@/types/order"

export const orders: Order[] = [
  { id: "ORD-001", customer: "Alice Chen", email: "alice@example.com", product: "Macbook Pro 13\"", category: "Laptop", amount: 2399.00, status: "delivered", date: "2026-07-28", thumb: "#3B82F6" },
  { id: "ORD-002", customer: "Bob Martinez", email: "bob@example.com", product: "Apple Watch Ultra", category: "Watch", amount: 879.00, status: "pending", date: "2026-07-27", thumb: "#10B981" },
  { id: "ORD-003", customer: "Carol Smith", email: "carol@example.com", product: "iPhone 15 Pro Max", category: "SmartPhone", amount: 1869.00, status: "processing", date: "2026-07-26", thumb: "#8B5CF6" },
  { id: "ORD-004", customer: "David Kim", email: "david@example.com", product: "iPad Pro 3rd Gen", category: "Electronics", amount: 1699.00, status: "pending", date: "2026-07-26", thumb: "#F59E0B" },
  { id: "ORD-005", customer: "Eve Johnson", email: "eve@example.com", product: "AirPods Pro 2nd Gen", category: "Accessories", amount: 240.00, status: "cancelled", date: "2026-07-25", thumb: "#EF4444" },
  { id: "ORD-006", customer: "Frank Liu", email: "frank@example.com", product: "Dell XPS 15", category: "Laptop", amount: 1899.00, status: "delivered", date: "2026-07-25", thumb: "#3B82F6" },
  { id: "ORD-007", customer: "Grace Patel", email: "grace@example.com", product: "Samsung Galaxy Watch", category: "Watch", amount: 399.00, status: "shipped", date: "2026-07-24", thumb: "#10B981" },
  { id: "ORD-008", customer: "Henry Wilson", email: "henry@example.com", product: "Google Pixel 8", category: "SmartPhone", amount: 799.00, status: "processing", date: "2026-07-24", thumb: "#8B5CF6" },
  { id: "ORD-009", customer: "Iris Tanaka", email: "iris@example.com", product: "Sony WH-1000XM5", category: "Accessories", amount: 349.00, status: "delivered", date: "2026-07-23", thumb: "#F59E0B" },
  { id: "ORD-010", customer: "Jack Brown", email: "jack@example.com", product: "Logitech MX Master 3", category: "Accessories", amount: 99.99, status: "pending", date: "2026-07-23", thumb: "#EF4444" },
]
