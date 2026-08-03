import { darkShadows, shadows } from "./defaults"
import type { BlobConfig, ThemeConfig } from "./types"

export function rgbToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export function applyShadow(preset: string, isDark: boolean) {
  const map = isDark ? darkShadows : shadows
  const s = map[preset]
  if (s) {
    document.documentElement.style.setProperty("--shadow-sm", s.sm)
    document.documentElement.style.setProperty("--shadow-md", s.md)
  }
}

export function applyMeshToBody(base: string, blobs: BlobConfig[]) {
  const body = document.body
  const parts = blobs.map(b => `radial-gradient(at ${b.x}% ${b.y}%, ${b.color} 0px, transparent ${b.size}%)`)
  body.style.cssText = `background: ${base}; background-image: ${parts.join(", ")}; background-attachment: fixed;`
}

export function applyBackground(config: ThemeConfig) {
  const body = document.body
  switch (config.bgPreset) {
    case "gradient":
      if (config.isDark) {
        body.style.background = "hsl(var(--background))"
        body.style.backgroundImage = "none"
      } else {
        body.style.background = "#fdf2f8"
        body.style.backgroundImage = "radial-gradient(at 18% 20%, #daf7fb 0px, transparent 66%), radial-gradient(at 82% 25%, #ffe5f4 0px, transparent 55%), radial-gradient(at 50% 85%, #d6deff 0px, transparent 58%)"
      }
      body.style.backgroundAttachment = "fixed"
      break
    case "custom":
      applyMeshToBody(config.meshBase, config.blobs)
      break
    case "light":
      body.style.background = config.solidColor
      body.style.backgroundImage = "none"
      break
    case "dark":
      body.style.background = "hsl(var(--background))"
      body.style.backgroundImage = "none"
      break
  }
}

export function applyTheme(config: ThemeConfig) {
  document.documentElement.classList.toggle("dark", config.isDark)

  // Radius
  const r = `${config.radius / 16}rem`
  document.documentElement.style.setProperty("--radius", r)
  document.documentElement.style.setProperty("--radius-md", r)

  // Primary color
  document.documentElement.style.setProperty("--primary", rgbToHsl(config.primaryColor))

  // Shadow
  applyShadow(config.shadowPreset, config.isDark)

  // Card style
  document.querySelectorAll<HTMLElement>("[data-slot='card'], [data-slot='button'], .rounded-lg, .rounded-xl, .rounded-\\[var\\(--radius\\)\\]").forEach(el => {
    el.style.borderRadius = r
  })
  document.querySelectorAll<HTMLElement>("[data-slot='card']").forEach(el => {
    el.style.background = `hsl(var(--card) / ${config.cardOpacity / 100})`
    el.style.backdropFilter = `blur(${config.cardBlur}px)`
  })

  // Background
  applyBackground(config)
}

export const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
export const randomBlob = (): BlobConfig => ({
  color: randomColor(),
  x: Math.round(Math.random() * 80 + 10),
  y: Math.round(Math.random() * 80 + 10),
  size: Math.round(40 + Math.random() * 40),
})

export function lockBodyScroll(open: boolean) {
  if (open) {
    const scrollY = window.scrollY
    document.documentElement.setAttribute("data-settings-open", "true")
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"
  } else {
    document.documentElement.removeAttribute("data-settings-open")
    const top = document.body.style.top
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""
    if (top) window.scrollTo(0, parseInt(top, 10) * -1)
  }
}
