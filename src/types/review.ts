export interface Review {
  id: string
  customer: string
  product: string
  rating: number
  comment: string
  date: string
  status: "approved" | "pending" | "rejected"
}
