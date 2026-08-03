"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { DEFAULT_THEME, meshPresets } from "@/lib/theme/defaults"
import { applyBackground, applyTheme, lockBodyScroll, randomBlob, randomColor } from "@/lib/theme/tokens"
import type { MeshPreset, ThemeConfig } from "@/lib/theme/types"

interface ThemeContextValue extends ThemeConfig {
  settingsOpen: boolean
  setSettingsOpen: (v: boolean) => void
  update: (patch: Partial<ThemeConfig>) => void
  applyPreset: (preset: MeshPreset) => void
  randomizeMesh: () => void
  presets: MeshPreset[]
}

const STORAGE_KEY = "mycogen-theme"

const ThemeContext = createContext<ThemeContextValue | null>(null)

function loadInitial(): ThemeConfig {
  if (typeof window === "undefined") return DEFAULT_THEME
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_THEME, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  // No saved config — sync isDark from the .dark class set by the head script
  return { ...DEFAULT_THEME, isDark: document.documentElement.classList.contains("dark") }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(loadInitial)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    applyTheme(config)
  }, [config])

  useEffect(() => {
    lockBodyScroll(settingsOpen)
    return () => lockBodyScroll(false)
  }, [settingsOpen])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch { /* ignore */ }
  }, [config])

  const update = useCallback((patch: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...patch }))
  }, [])

  const applyPreset = useCallback((preset: MeshPreset) => {
    setConfig(prev => ({
      ...prev,
      bgPreset: "custom",
      meshBase: preset.base,
      blobs: preset.blobs,
    }))
  }, [])

  const randomizeMesh = useCallback(() => {
    const newBlobs = Array.from({ length: config.blobs.length }, () => randomBlob())
    const base = randomColor()
    const next = { ...config, bgPreset: "custom" as const, meshBase: base, blobs: newBlobs }
    applyBackground(next)
    setConfig(next)
  }, [config])

  const value: ThemeContextValue = {
    ...config,
    settingsOpen,
    setSettingsOpen,
    update,
    applyPreset,
    randomizeMesh,
    presets: meshPresets,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
