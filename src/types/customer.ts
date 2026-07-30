export interface Customer {
  id: string
  name: string
  email: string
  orders: number
  spent: number
  status: "vip" | "regular" | "new"
  joined: string
  initials: string
}
