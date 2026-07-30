export interface Notification {
  id: number
  user: string
  avatar: string
  message: string
  time: string
}

export const notifications: Notification[] = [
  { id: 1, user: "Terry Franci", avatar: "TF", message: "requests permission to change Project - Nganter App Project", time: "5 min ago" },
  { id: 2, user: "Alena Franci", avatar: "AF", message: "requests permission to change Project - Nganter App Project", time: "8 min ago" },
  { id: 3, user: "Jocelyn Kenter", avatar: "JK", message: "requests permission to change Project - Nganter App Project", time: "15 min ago" },
  { id: 4, user: "Brandon Philips", avatar: "BP", message: "requests permission to change Project - Nganter App Project", time: "1 hr ago" },
  { id: 5, user: "Terry Franci", avatar: "TF", message: "requests permission to change Project - Nganter App Project", time: "5 min ago" },
]
