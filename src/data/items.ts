export type CatalogItem = {
  name: string
  sku: string
  unit: string
  rate: number
  category: string
  cost: number
}

export const CATEGORIES = ["Design", "Development", "Services", "Hardware", "Other"]

export const CATALOG: CatalogItem[] = [
  { name: "Design system audit", sku: "DS-101", unit: "hrs", rate: 140, category: "Design", cost: 75 },
  { name: "Brand guidelines", sku: "BRND-02", unit: "set", rate: 450, category: "Design", cost: 260 },
  { name: "Logo refresh", sku: "LOGO-01", unit: "set", rate: 950, category: "Design", cost: 520 },
  { name: "Component library migration", sku: "DEV-204", unit: "hrs", rate: 180, category: "Development", cost: 95 },
  { name: "Custom report builder", sku: "RPT-101", unit: "hrs", rate: 65, category: "Development", cost: 30 },
  { name: "API integration", sku: "API-510", unit: "hrs", rate: 160, category: "Development", cost: 85 },
  { name: "QA & accessibility pass", sku: "QA-330", unit: "hrs", rate: 110, category: "Services", cost: 60 },
  { name: "Platform subscription — Q3", sku: "SUB-Q3", unit: "month", rate: 800, category: "Services", cost: 480 },
  { name: "Consulting — data pipeline", sku: "CNS-010", unit: "hrs", rate: 150, category: "Services", cost: 80 },
  { name: "On-site workshop", sku: "WS-021", unit: "day", rate: 1200, category: "Services", cost: 720 },
  { name: "Maintenance retainer", sku: "MNT-001", unit: "month", rate: 600, category: "Services", cost: 360 },
  { name: "Setup workstation", sku: "HW-001", unit: "pcs", rate: 200, category: "Hardware", cost: 120 },
]
