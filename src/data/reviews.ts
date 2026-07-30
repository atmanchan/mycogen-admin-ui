import type { Review } from "@/types/review"

export const reviews: Review[] = [
  { id: "REV-001", customer: "Alice Chen", product: "Macbook Pro 13\"", rating: 5, comment: "Amazing laptop, fast delivery!", date: "2026-07-28", status: "approved" },
  { id: "REV-002", customer: "Bob Martinez", product: "Apple Watch Ultra", rating: 4, comment: "Great watch but battery could be better.", date: "2026-07-27", status: "approved" },
  { id: "REV-003", customer: "Carol Smith", product: "iPhone 15 Pro Max", rating: 5, comment: "Best iPhone ever!", date: "2026-07-26", status: "approved" },
  { id: "REV-004", customer: "David Kim", product: "iPad Pro 3rd Gen", rating: 3, comment: "Good but overpriced.", date: "2026-07-25", status: "pending" },
  { id: "REV-005", customer: "Eve Johnson", product: "AirPods Pro 2nd Gen", rating: 4, comment: "Sound quality is excellent.", date: "2026-07-24", status: "approved" },
  { id: "REV-006", customer: "Frank Liu", product: "Dell XPS 15", rating: 2, comment: "Keyboard issues after a week.", date: "2026-07-23", status: "rejected" },
  { id: "REV-007", customer: "Grace Patel", product: "Samsung Galaxy Watch", rating: 5, comment: "Perfect fitness companion.", date: "2026-07-22", status: "approved" },
  { id: "REV-008", customer: "Henry Wilson", product: "Google Pixel 8", rating: 4, comment: "Camera is incredible.", date: "2026-07-21", status: "pending" },
]

export const reviewStats = {
  average: 4.0,
  total: 128,
  pending: 6,
  approved: 118,
}
