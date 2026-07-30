"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Settings, X, Plus, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"

const shadows = {
  none:   { sm: "0 0 #000", md: "0 0 #000" },
  subtle: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.04)", md: "0 4px 6px -1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.05)" },
  medium: { sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 5px 0 rgb(0 0 0 / 0.08)", md: "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 3px 8px -2px rgb(0 0 0 / 0.1)" },
  strong: { sm: "0 4px 8px 0 rgb(0 0 0 / 0.08), 0 2px 6px 0 rgb(0 0 0 / 0.1)", md: "0 10px 24px -4px rgb(0 0 0 / 0.12), 0 6px 16px -4px rgb(0 0 0 / 0.14)" },
}

const darkShadows = {
  none:   { sm: "0 0 #000", md: "0 0 #000" },
  subtle: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.2), 0 1px 3px 0 rgb(0 0 0 / 0.3)", md: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)" },
  medium: { sm: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 5px 0 rgb(0 0 0 / 0.35)", md: "0 4px 12px -2px rgb(0 0 0 / 0.35), 0 3px 8px -2px rgb(0 0 0 / 0.4)" },
  strong: { sm: "0 4px 8px 0 rgb(0 0 0 / 0.4), 0 2px 6px 0 rgb(0 0 0 / 0.45)", md: "0 10px 24px -4px rgb(0 0 0 / 0.5), 0 6px 16px -4px rgb(0 0 0 / 0.5)" },
}

const meshPresets = [
  { name: "Nebula", base: "#0f0c29", blobs: [{ color: "#f472b6", x: 22, y: 18, size: 55 }, { color: "#8b5cf6", x: 75, y: 30, size: 60 }, { color: "#06b6d4", x: 50, y: 82, size: 50 }] },
  { name: "Biosphere", base: "#022c22", blobs: [{ color: "#10b981", x: 20, y: 25, size: 55 }, { color: "#2dd4bf", x: 80, y: 35, size: 50 }, { color: "#065f46", x: 45, y: 80, size: 60 }] },
  { name: "Glass Peach", base: "#fef3c7", blobs: [{ color: "#fca5a5", x: 25, y: 20, size: 50 }, { color: "#fdba74", x: 72, y: 65, size: 55 }, { color: "#fde68a", x: 50, y: 85, size: 45 }] },
  { name: "Deep Space", base: "#020617", blobs: [{ color: "#1e3a5f", x: 18, y: 30, size: 60 }, { color: "#7c3aed", x: 78, y: 25, size: 50 }, { color: "#0ea5e9", x: 45, y: 80, size: 55 }] },
  { name: "Candy Foil", base: "#1a0520", blobs: [{ color: "#ec4899", x: 20, y: 22, size: 50 }, { color: "#a855f7", x: 80, y: 28, size: 45 }, { color: "#eab308", x: 50, y: 85, size: 55 }] },
  { name: "Ember Mist", base: "#1c0a02", blobs: [{ color: "#ef4444", x: 30, y: 20, size: 50 }, { color: "#f97316", x: 70, y: 35, size: 55 }, { color: "#f59e0b", x: 50, y: 82, size: 50 }] },
  { name: "Aqua Sorbet", base: "#042f2e", blobs: [{ color: "#2dd4bf", x: 22, y: 25, size: 50 }, { color: "#06b6d4", x: 78, y: 30, size: 55 }, { color: "#3b82f6", x: 45, y: 80, size: 50 }] },
  { name: "Noir Bloom", base: "#0a0a0a", blobs: [{ color: "#831843", x: 20, y: 20, size: 55 }, { color: "#4c1d95", x: 80, y: 30, size: 50 }, { color: "#1e1b4b", x: 50, y: 85, size: 60 }] },
]

const defaultMesh = { base: "#07051a", blobs: [{ color: "#f472b6", x: 18, y: 22, size: 55 }, { color: "#8b5cf6", x: 82, y: 30, size: 60 }, { color: "#06b6d4", x: 50, y: 85, size: 55 }] }

function rgbToHsl(hex: string) {
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

function applyMeshToBody(base: string, blobs: { color: string; x: number; y: number; size: number }[]) {
  const body = document.body
  const parts = blobs.map(b => `radial-gradient(at ${b.x}% ${b.y}%, ${b.color} 0px, transparent ${b.size}%)`)
  body.style.cssText = `background: ${base}; background-image: ${parts.join(", ")}; background-attachment: fixed;`
}

const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
const randomBlob = () => ({ color: randomColor(), x: Math.round(Math.random() * 80 + 10), y: Math.round(Math.random() * 80 + 10), size: Math.round(40 + Math.random() * 40) })

export function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const [radius, setRadius] = useState("8")
  const [primaryColor, setPrimaryColor] = useState("#7C5CFC")
  const [shadowPreset, setShadowPreset] = useState("subtle")
  const [bgPreset, setBgPreset] = useState("gradient")
  const [cardOpacity, setCardOpacity] = useState("85")
  const [cardBlur, setCardBlur] = useState("8")
  const [meshBase, setMeshBase] = useState(defaultMesh.base)
  const [blobs, setBlobs] = useState(defaultMesh.blobs)
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const applyShadow = useCallback((preset: string) => {
    const isDark = document.documentElement.classList.contains("dark")
    const map = isDark ? darkShadows : shadows
    const s = map[preset as keyof typeof map]
    if (s) {
      document.documentElement.style.setProperty("--shadow-sm", s.sm)
      document.documentElement.style.setProperty("--shadow-md", s.md)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const r = `${Number(radius) / 16}rem`
    document.documentElement.style.setProperty("--radius", r)
    document.documentElement.style.setProperty("--radius-md", r)
    document.querySelectorAll<HTMLElement>("[data-slot='card'], [data-slot='button'], .rounded-lg, .rounded-xl, .rounded-\\[var\\(--radius\\)\\]").forEach(el => {
      el.style.borderRadius = r
    })
    document.querySelectorAll<HTMLElement>("[data-slot='card']").forEach(el => {
      el.style.background = `hsl(var(--card) / ${Number(cardOpacity) / 100})`
      el.style.backdropFilter = `blur(${cardBlur}px)`
    })
    applyShadow(shadowPreset)
  }, [radius, cardOpacity, cardBlur, shadowPreset, open])

  const applyMesh = useCallback((base: string, bs: typeof blobs) => {
    applyMeshToBody(base, bs)
  }, [])

  useEffect(() => {
    if (bgPreset === "custom") {
      applyMesh(meshBase, blobs)
    }
  }, [meshBase, blobs, bgPreset, applyMesh])

  const handlePrimaryChange = (hex: string) => {
    setPrimaryColor(hex)
    document.documentElement.style.setProperty("--primary", rgbToHsl(hex))
  }

  const handleBgChange = (val: string) => {
    setBgPreset(val)
    const body = document.body
    document.documentElement.classList.remove("dark")
    if (val === "gradient") {
      body.style.background = "#fdf2f8"
      body.style.backgroundImage = "radial-gradient(at 18% 20%, #daf7fb 0px, transparent 66%), radial-gradient(at 82% 25%, #ffe5f4 0px, transparent 55%), radial-gradient(at 50% 85%, #d6deff 0px, transparent 58%)"
      body.style.backgroundAttachment = "fixed"
    } else if (val === "custom") {
      applyMesh(meshBase, blobs)
    } else if (val === "light") {
      body.style.background = "#f8fafc"
      body.style.backgroundImage = "none"
    } else if (val === "dark") {
      document.documentElement.classList.add("dark")
      body.style.background = ""
      body.style.backgroundImage = "none"
    }
  }

  const addBlob = () => {
    if (blobs.length >= 6) return
    setBlobs(prev => [...prev, randomBlob()])
  }
  const removeBlob = (i: number) => {
    if (blobs.length <= 1) return
    setBlobs(prev => prev.filter((_, idx) => idx !== i))
  }
  const randomize = () => {
    const newBlobs = Array.from({ length: blobs.length }, () => randomBlob())
    setMeshBase(randomColor())
    setBlobs(newBlobs)
    setBgPreset("custom")
    applyMeshToBody(randomColor(), newBlobs)
  }

  const updateBlob = (i: number, field: string, value: number | string) => {
    setBlobs(prev => prev.map((b, idx) => idx === i ? { ...b, [field]: value } : b))
  }

  const handlePreviewMouseDown = (e: React.MouseEvent, idx: number) => {
    setDraggingIdx(idx)
    const preview = previewRef.current
    if (!preview) return
    const rect = preview.getBoundingClientRect()
    const onMove = (e: MouseEvent) => {
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)
      updateBlob(idx, "x", Math.max(0, Math.min(100, x)))
      updateBlob(idx, "y", Math.max(0, Math.min(100, y)))
    }
    const onUp = () => { setDraggingIdx(null); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  const applyPreset = (p: typeof meshPresets[number]) => {
    setBgPreset("custom")
    setMeshBase(p.base)
    setBlobs(p.blobs)
    applyMeshToBody(p.base, p.blobs)
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Settings">
        <Settings className="h-[18px] w-[18px]" />
      </Button>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border/30 z-50 flex flex-col p-5 transition-transform duration-250 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between mb-7">
          <span className="text-base font-bold">Settings</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-[18px] w-[18px]" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Border Radius */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Border Radius</div>
            <div className="flex items-center gap-3">
              <span className="text-sm min-w-14">Radius</span>
              <input type="range" min="0" max="20" value={radius} step="2" onChange={e => setRadius(e.target.value)}
                className="flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:shadow-sm" />
              <span className="text-xs text-muted-foreground min-w-9 text-right">{radius}px</span>
            </div>
          </div>
          {/* Button Color */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Button Color</div>
            <div className="flex items-center gap-3">
              <span className="text-sm min-w-14">Primary</span>
              <input type="color" value={primaryColor} onChange={e => handlePrimaryChange(e.target.value)}
                className="w-8 h-8 rounded-lg border border-border p-0 cursor-pointer bg-transparent" />
            </div>
          </div>
          {/* Background - Mesh Builder */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Background</div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm min-w-14">Preset</span>
              <select value={bgPreset} onChange={e => handleBgChange(e.target.value)}
                className="flex-1 h-8 rounded-lg border border-border bg-background text-sm text-foreground px-2 outline-none focus:border-primary/50">
                <option value="gradient">Current Gradient</option>
                <option value="custom">Custom Mesh</option>
                <option value="light">Solid Light</option>
                <option value="dark">Solid Dark</option>
              </select>
            </div>
            {bgPreset === "custom" && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm min-w-14">Base</span>
                  <input type="color" value={meshBase} onChange={e => { setMeshBase(e.target.value) }}
                    className="w-8 h-8 rounded-lg border border-border p-0 cursor-pointer bg-transparent" />
                </div>
                {/* Preview box with draggable blobs */}
                <div ref={previewRef} className="relative w-full h-28 rounded-lg border border-border/40 overflow-hidden cursor-crosshair"
                  style={{ background: meshBase }}>
                  {blobs.map((b, i) => (
                    <div key={i} onMouseDown={e => handlePreviewMouseDown(e, i)}
                      className={`absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white/60 shadow-md cursor-grab active:cursor-grabbing transition-shadow ${draggingIdx === i ? "shadow-lg ring-2 ring-white/40" : ""}`}
                      style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.color }} />
                  ))}
                </div>
                {/* Blob controls */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {blobs.map((b, i) => (
                    <div key={i} className="p-2 rounded-lg border border-border/20 bg-muted/20">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium">Blob {i + 1}</span>
                        <button onClick={() => removeBlob(i)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors">✕ Remove</button>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <input type="color" value={b.color} onChange={e => updateBlob(i, "color", e.target.value)}
                          className="w-6 h-6 rounded border border-border p-0 cursor-pointer bg-transparent shrink-0" />
                        <span className="text-xs text-muted-foreground shrink-0">Size</span>
                        <input type="range" min="10" max="95" value={b.size} onChange={e => updateBlob(i, "size", Number(e.target.value))}
                          className="flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer" />
                        <span className="text-[10px] text-muted-foreground w-6 text-right">{b.size}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground w-4">X</span>
                        <input type="range" min="0" max="100" value={b.x} onChange={e => updateBlob(i, "x", Number(e.target.value))}
                          className="flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer" />
                        <span className="text-[10px] text-muted-foreground w-6 text-right">{b.x}%</span>
                        <span className="text-[10px] text-muted-foreground w-4 ml-1">Y</span>
                        <input type="range" min="0" max="100" value={b.y} onChange={e => updateBlob(i, "y", Number(e.target.value))}
                          className="flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer" />
                        <span className="text-[10px] text-muted-foreground w-6 text-right">{b.y}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={addBlob} disabled={blobs.length >= 6}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground/40 transition-colors">
                    <Plus className="h-3 w-3" /> Add Blob
                  </button>
                  <button onClick={randomize}
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto">
                    <Shuffle className="h-3 w-3" /> Randomize
                  </button>
                </div>
                {/* Preset Gallery */}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Preset Gallery</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {meshPresets.map((p) => (
                      <button key={p.name} onClick={() => applyPreset(p)} title={p.name}
                        className="w-full aspect-square rounded-lg border border-border/30 hover:ring-2 hover:ring-primary/40 transition-all overflow-hidden"
                        style={{ background: p.base }}>
                        {p.blobs.map((b, i) => (
                          <span key={i} className="block w-full h-full"
                            style={{ background: `radial-gradient(at ${b.x}% ${b.y}%, ${b.color} 0px, transparent ${b.size}%)` }} />
                        ))}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mt-1">
                    {meshPresets.map((p) => (
                      <span key={p.name} className="text-[9px] text-center text-muted-foreground truncate">{p.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Card Style */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Card Style</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm min-w-14">Opacity</span>
                <input type="range" min="0" max="100" value={cardOpacity} step="5" onChange={e => setCardOpacity(e.target.value)}
                  className="flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:shadow-sm" />
                <span className="text-xs text-muted-foreground min-w-9 text-right">{cardOpacity}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm min-w-14">Blur</span>
                <input type="range" min="0" max="24" value={cardBlur} step="2" onChange={e => setCardBlur(e.target.value)}
                  className="flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:shadow-sm" />
                <span className="text-xs text-muted-foreground min-w-9 text-right">{cardBlur}px</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm min-w-14">Shadow</span>
                <select value={shadowPreset} onChange={e => { setShadowPreset(e.target.value); applyShadow(e.target.value) }}
                  className="flex-1 h-8 rounded-lg border border-border bg-background text-sm text-foreground px-2 outline-none focus:border-primary/50">
                  <option value="none">None</option>
                  <option value="subtle">Subtle</option>
                  <option value="medium">Medium</option>
                  <option value="strong">Strong</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
