import type { MeshPreset, ThemeConfig } from "./types"

export const shadows: Record<string, { sm: string; md: string }> = {
  none:   { sm: "0 0 #000", md: "0 0 #000" },
  subtle: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.04)", md: "0 4px 6px -1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.05)" },
  medium: { sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 5px 0 rgb(0 0 0 / 0.08)", md: "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 3px 8px -2px rgb(0 0 0 / 0.1)" },
  strong: { sm: "0 4px 8px 0 rgb(0 0 0 / 0.08), 0 2px 6px 0 rgb(0 0 0 / 0.1)", md: "0 10px 24px -4px rgb(0 0 0 / 0.12), 0 6px 16px -4px rgb(0 0 0 / 0.14)" },
}

export const darkShadows: Record<string, { sm: string; md: string }> = {
  none:   { sm: "0 0 #000", md: "0 0 #000" },
  subtle: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.2), 0 1px 3px 0 rgb(0 0 0 / 0.3)", md: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)" },
  medium: { sm: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 5px 0 rgb(0 0 0 / 0.35)", md: "0 4px 12px -2px rgb(0 0 0 / 0.35), 0 3px 8px -2px rgb(0 0 0 / 0.4)" },
  strong: { sm: "0 4px 8px 0 rgb(0 0 0 / 0.4), 0 2px 6px 0 rgb(0 0 0 / 0.45)", md: "0 10px 24px -4px rgb(0 0 0 / 0.5), 0 6px 16px -4px rgb(0 0 0 / 0.5)" },
}

export const meshPresets: MeshPreset[] = [
  { name: "Nebula", base: "#ffffff", blobs: [{ color: "#f472b6", x: 22, y: 18, size: 55 }, { color: "#8b5cf6", x: 75, y: 30, size: 60 }, { color: "#06b6d4", x: 50, y: 82, size: 50 }] },
  { name: "Biosphere", base: "#ffffff", blobs: [{ color: "#10b981", x: 20, y: 25, size: 55 }, { color: "#2dd4bf", x: 80, y: 35, size: 50 }, { color: "#065f46", x: 45, y: 80, size: 60 }] },
  { name: "Glass Peach", base: "#ffffff", blobs: [{ color: "#fca5a5", x: 25, y: 20, size: 50 }, { color: "#fdba74", x: 72, y: 65, size: 55 }, { color: "#fde68a", x: 50, y: 85, size: 45 }] },
  { name: "Deep Space", base: "#ffffff", blobs: [{ color: "#1e3a5f", x: 18, y: 30, size: 60 }, { color: "#7c3aed", x: 78, y: 25, size: 50 }, { color: "#0ea5e9", x: 45, y: 80, size: 55 }] },
  { name: "Candy Foil", base: "#ffffff", blobs: [{ color: "#ec4899", x: 20, y: 22, size: 50 }, { color: "#a855f7", x: 80, y: 28, size: 45 }, { color: "#eab308", x: 50, y: 85, size: 55 }] },
  { name: "Ember Mist", base: "#ffffff", blobs: [{ color: "#ef4444", x: 30, y: 20, size: 50 }, { color: "#f97316", x: 70, y: 35, size: 55 }, { color: "#f59e0b", x: 50, y: 82, size: 50 }] },
  { name: "Aqua Sorbet", base: "#ffffff", blobs: [{ color: "#2dd4bf", x: 22, y: 25, size: 50 }, { color: "#06b6d4", x: 78, y: 30, size: 55 }, { color: "#3b82f6", x: 45, y: 80, size: 50 }] },
  { name: "Noir Bloom", base: "#ffffff", blobs: [{ color: "#831843", x: 20, y: 20, size: 55 }, { color: "#4c1d95", x: 80, y: 30, size: 50 }, { color: "#1e1b4b", x: 50, y: 85, size: 60 }] },
]

export const DEFAULT_THEME: ThemeConfig = {
  radius: 8,
  primaryColor: "#7C5CFC",
  shadowPreset: "subtle",
  bgPreset: "gradient",
  cardOpacity: 85,
  cardBlur: 8,
  meshBase: "#ffffff",
  blobs: [
    { color: "#f472b6", x: 18, y: 22, size: 55 },
    { color: "#8b5cf6", x: 82, y: 30, size: 60 },
    { color: "#06b6d4", x: 50, y: 85, size: 55 },
  ],
  solidColor: "#f8fafc",
  isDark: false,
}
