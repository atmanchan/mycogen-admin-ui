import type { Product } from "@/types/product"

export const products: Product[] = [
  { id: "PROD-001", name: "Macbook Pro 13\"", category: "Laptop", price: 2399.00, stock: 45, status: "active", sales: 230, thumb: "#3B82F6" },
  { id: "PROD-002", name: "Apple Watch Ultra", category: "Watch", price: 879.00, stock: 120, status: "active", sales: 189, thumb: "#10B981" },
  { id: "PROD-003", name: "iPhone 15 Pro Max", category: "SmartPhone", price: 1869.00, stock: 32, status: "active", sales: 412, thumb: "#8B5CF6" },
  { id: "PROD-004", name: "iPad Pro 3rd Gen", category: "Electronics", price: 1699.00, stock: 78, status: "active", sales: 156, thumb: "#F59E0B" },
  { id: "PROD-005", name: "AirPods Pro 2nd Gen", category: "Accessories", price: 240.00, stock: 0, status: "archived", sales: 287, thumb: "#EF4444" },
  { id: "PROD-006", name: "Dell XPS 15", category: "Laptop", price: 1899.00, stock: 23, status: "active", sales: 201, thumb: "#3B82F6" },
  { id: "PROD-007", name: "Samsung Galaxy Watch", category: "Watch", price: 399.00, stock: 56, status: "active", sales: 178, thumb: "#10B981" },
  { id: "PROD-008", name: "Google Pixel 8", category: "SmartPhone", price: 799.00, stock: 200, status: "active", sales: 189, thumb: "#8B5CF6" },
  { id: "PROD-009", name: "Sony WH-1000XM5", category: "Accessories", price: 349.00, stock: 0, status: "draft", sales: 0, thumb: "#F59E0B" },
  { id: "PROD-010", name: "Logitech MX Master 3", category: "Accessories", price: 99.99, stock: 67, status: "active", sales: 124, thumb: "#EF4444" },
]
