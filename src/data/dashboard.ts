export const kpiData = [
  { title: "Total Sales", value: "$54,890", change: 12.5, icon: "dollar", trend: "up" as const },
  { title: "Orders", value: "1,429", change: 8.2, icon: "bag", trend: "up" as const },
  { title: "Avg. Order Value", value: "$38.42", change: 3.1, icon: "card", trend: "up" as const },
  { title: "Product Views", value: "45,210", change: 15.3, icon: "eye", trend: "up" as const },
]

export const insightData = {
  title: "Customer Insights",
  items: [
    { label: "New Customers", value: 15, subtext: "This week" },
    { label: "VIP Customers", value: 12, subtext: "Active" },
    { label: "Total Customers", value: "2,847", subtext: "All time" },
  ],
}

export const ringsData = [
  { percentage: 82, label: "Retention Rate", change: 4.2 },
  { percentage: 65, label: "Engagement Rate", change: 2.1 },
]

export const salesData = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1800 },
  { name: "Wed", sales: 1500 },
  { name: "Thu", sales: 2200 },
  { name: "Fri", sales: 2800 },
  { name: "Sat", sales: 2400 },
  { name: "Sun", sales: 3100 },
]

export const retentionWeeks = [
  { label: "W1", dots: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
  { label: "W2", dots: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
  { label: "W3", dots: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
  { label: "W4", dots: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
]

export const promotionsData = [
  { id: 1, title: "Holiday Sale", description: "Discount code used 234 times", status: "Active" as const, icon: "gift" },
  { id: 2, title: "New Customer", description: "Email campaign: 89% open rate", status: "Live" as const, icon: "mail" },
  { id: 3, title: "Flash Deal", description: "Limited time: 40% off select items", status: "Active" as const, icon: "zap" },
  { id: 4, title: "Referral Bonus", description: "1,024 referrals this month", status: "Live" as const, icon: "users" },
]
