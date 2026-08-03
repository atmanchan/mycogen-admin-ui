"use client"

import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  AreaChart, Area,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const monthlySales = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 4700 },
  { month: "May", sales: 5900 },
  { month: "Jun", sales: 6300 },
  { month: "Jul", sales: 5800 },
  { month: "Aug", sales: 6700 },
  { month: "Sep", sales: 7200 },
  { month: "Oct", sales: 6900 },
  { month: "Nov", sales: 8100 },
  { month: "Dec", sales: 9400 },
]

const productCategories = [
  { category: "Electronics", revenue: 28500, units: 420 },
  { category: "Clothing", revenue: 18200, units: 680 },
  { category: "Home & Garden", revenue: 12400, units: 310 },
  { category: "Books", revenue: 8700, units: 920 },
  { category: "Sports", revenue: 10500, units: 280 },
  { category: "Beauty", revenue: 14100, units: 530 },
]

const marketingChannels = [
  { name: "Organic Search", value: 35 },
  { name: "Social Media", value: 28 },
  { name: "Email", value: 18 },
  { name: "Paid Ads", value: 12 },
  { name: "Referral", value: 7 },
]

const CHART_COLORS = ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626"]

const productRatings = [
  { dimension: "Quality", productA: 4.5, productB: 3.8, productC: 4.2 },
  { dimension: "Price", productA: 3.5, productB: 4.5, productC: 3.2 },
  { dimension: "Design", productA: 4.2, productB: 3.2, productC: 4.8 },
  { dimension: "Support", productA: 3.8, productB: 4.0, productC: 3.5 },
  { dimension: "Features", productA: 4.8, productB: 3.5, productC: 4.0 },
  { dimension: "Durability", productA: 4.0, productB: 4.2, productC: 3.8 },
]

const quarterlyGoals = [
  { name: "Q1", target: 100, actual: 78 },
  { name: "Q2", target: 100, actual: 92 },
  { name: "Q3", target: 100, actual: 85 },
  { name: "Q4", target: 100, actual: 65 },
]

const userGrowth = [
  { month: "Jan", users: 1200, returning: 400 },
  { month: "Feb", users: 2100, returning: 750 },
  { month: "Mar", users: 3400, returning: 1300 },
  { month: "Apr", users: 4200, returning: 1800 },
  { month: "May", users: 5600, returning: 2500 },
  { month: "Jun", users: 7100, returning: 3300 },
  { month: "Jul", users: 8300, returning: 4100 },
  { month: "Aug", users: 9800, returning: 5000 },
  { month: "Sep", users: 11200, returning: 5900 },
  { month: "Oct", users: 12800, returning: 7100 },
  { month: "Nov", users: 14900, returning: 8600 },
  { month: "Dec", users: 17500, returning: 10500 },
]

export default function ChartsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Charts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visual analytics and metrics overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1 – Line Chart */}
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer role="img" aria-label="Chart: Monthly Sales" width="100%" height={240}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb", r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 1 – Bar Chart */}
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Category Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer role="img" aria-label="Chart: Product Category Comparison" width="100%" height={240}>
              <BarChart data={productCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="revenue" fill="#7c3aed" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="units" fill="#0891b2" name="Units Sold" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 2 – Pie Chart */}
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Marketing Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer role="img" aria-label="Chart: Marketing Channels" width="100%" height={240}>
              <PieChart>
                <Pie data={marketingChannels} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`} labelLine={false}>
                  {marketingChannels.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 2 – Radar Chart */}
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Rating Dimensions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer role="img" aria-label="Chart: Product Rating Dimensions" width="100%" height={240}>
              <RadarChart data={productRatings}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Radar name="Product A" dataKey="productA" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} />
                <Radar name="Product B" dataKey="productB" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} />
                <Radar name="Product C" dataKey="productC" stroke="#0891b2" fill="#0891b2" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 3 – Radial Bar Chart */}
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quarterly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer role="img" aria-label="Chart: Quarterly Goals" width="100%" height={240}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="15%" outerRadius="90%" barSize={18} data={quarterlyGoals}>
                <RadialBar dataKey="actual" label={{ position: "insideStart", fill: "#fff", fontSize: 11 }} background={{ fill: "hsl(var(--border))" }} fill="#059669" />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 3 – Area Chart */}
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cumulative User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer role="img" aria-label="Chart: Cumulative User Growth" width="100%" height={240}>
              <AreaChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="users" stroke="#d97706" fill="#d97706" fillOpacity={0.15} strokeWidth={2} name="Total Users" />
                <Area type="monotone" dataKey="returning" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} name="Returning" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
