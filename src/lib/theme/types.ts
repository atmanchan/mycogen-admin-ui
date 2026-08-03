export interface BlobConfig {
  color: string
  x: number
  y: number
  size: number
}

export interface MeshPreset {
  name: string
  base: string
  blobs: BlobConfig[]
}

export type ShadowPreset = "none" | "subtle" | "medium" | "strong"
export type BgPreset = "gradient" | "custom" | "light" | "dark"

export interface ThemeConfig {
  radius: number
  primaryColor: string
  shadowPreset: ShadowPreset
  bgPreset: BgPreset
  cardOpacity: number
  cardBlur: number
  meshBase: string
  blobs: BlobConfig[]
  solidColor: string
  isDark: boolean
}
