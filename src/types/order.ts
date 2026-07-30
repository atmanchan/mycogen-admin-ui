export interface Order {
  id: string
  customer: string
  email: string
  product: string
  category: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  thumb: string
}
