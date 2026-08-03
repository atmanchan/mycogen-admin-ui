"use client"

import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Settings, X, Plus, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"
import { defaultSettingsConfig } from "@/config/settings"

export function SettingsPanel({ config = defaultSettingsConfig }: { config?: typeof defaultSettingsConfig }) {
  const theme = useTheme()
  const { settingsOpen: open, setSettingsOpen } = theme
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const updateBlob = (i: number, field: string, value: number | string) => {
    theme.update({ blobs: theme.blobs.map((b, idx) => idx === i ? { ...b, [field]: value } : b) })
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

  const rangeClass = "flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:shadow-sm"
  const smallRangeClass = "flex-1 h-1 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
  const selectClass = "flex-1 h-8 rounded-lg border border-border bg-background text-sm text-foreground px-2 outline-none focus:border-primary/50"

  return (
    <>
      <Button variant="ghost" size="icon-lg" onClick={() => setSettingsOpen(true)} aria-label="Settings">
        <Settings className="h-[18px] w-[18px]" />
      </Button>
      {typeof document !== "undefined" && createPortal(
        <>
          {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSettingsOpen(false)} />}
          <div className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border/30 z-50 flex flex-col p-5 transition-transform duration-250 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between mb-7">
          <span className="text-base font-bold">Settings</span>
          <Button variant="ghost" size="icon-lg" onClick={() => setSettingsOpen(false)}>
            <X className="h-[18px] w-[18px]" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col gap-6">
          {config.showBorderRadius && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Border Radius</div>
              <div className="flex items-center gap-3">
                <span className="text-sm min-w-14">Radius</span>
                <input type="range" min="0" max="20" value={theme.radius} step="2" onChange={e => theme.update({ radius: Number(e.target.value) })} className={rangeClass} />
                <span className="text-xs text-muted-foreground min-w-9 text-right">{theme.radius}px</span>
              </div>
            </div>
          )}

          {config.showButtonColor && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Button Color</div>
              <div className="flex items-center gap-3">
                <span className="text-sm min-w-14">Primary</span>
                <input type="color" value={theme.primaryColor} onChange={e => theme.update({ primaryColor: e.target.value })}
                  className="w-8 h-8 rounded-lg border border-border p-0 cursor-pointer bg-transparent" />
              </div>
            </div>
          )}

          {config.showBackground.enabled && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Background</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm min-w-14">Preset</span>
                <select value={theme.bgPreset} onChange={e => {
                  const val = e.target.value as typeof theme.bgPreset
                  if (val === "dark") theme.update({ bgPreset: val, isDark: true })
                  else if (val === "light") theme.update({ bgPreset: val, isDark: false })
                  else theme.update({ bgPreset: val })
                }} className={selectClass}>
                  <option value="gradient">Current Gradient</option>
                  <option value="custom">Custom Mesh</option>
                  <option value="light">Solid Light</option>
                  <option value="dark">Solid Dark</option>
                </select>
              </div>

              {config.showBackground.showSolid && theme.bgPreset === "light" && (
                <div className="flex items-center gap-3">
                  <span className="text-sm min-w-14">Color</span>
                  <input type="color" value={theme.solidColor} onChange={e => theme.update({ solidColor: e.target.value, bgPreset: "light" })}
                    className="w-8 h-8 rounded-lg border border-border p-0 cursor-pointer bg-transparent" />
                </div>
              )}

              {config.showBackground.showMesh && theme.bgPreset === "custom" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm min-w-14">Base</span>
                    <input type="color" value={theme.meshBase} onChange={e => theme.update({ meshBase: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-border p-0 cursor-pointer bg-transparent" />
                  </div>
                  {/* Preview box with draggable blobs */}
                  <div ref={previewRef} className="relative w-full h-28 rounded-lg border border-border/40 overflow-hidden cursor-crosshair"
                    style={{ background: theme.meshBase }}>
                    {theme.blobs.map((b, i) => (
                      <div key={i} onMouseDown={e => handlePreviewMouseDown(e, i)}
                        className={`absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white/60 shadow-md cursor-grab active:cursor-grabbing transition-shadow ${draggingIdx === i ? "shadow-lg ring-2 ring-white/40" : ""}`}
                        style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.color }} />
                    ))}
                  </div>
                  {/* Blob controls */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {theme.blobs.map((b, i) => (
                      <div key={i} className="p-2 rounded-lg border border-border/20 bg-muted/20">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium">Blob {i + 1}</span>
                          <button onClick={() => theme.update({ blobs: theme.blobs.filter((_, idx) => idx !== i) })} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors">✕ Remove</button>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <input type="color" value={b.color} onChange={e => updateBlob(i, "color", e.target.value)}
                            className="w-6 h-6 rounded border border-border p-0 cursor-pointer bg-transparent shrink-0" />
                          <span className="text-xs text-muted-foreground shrink-0">Size</span>
                          <input type="range" min="10" max="95" value={b.size} onChange={e => updateBlob(i, "size", Number(e.target.value))} className={smallRangeClass} />
                          <span className="text-[10px] text-muted-foreground w-6 text-right">{b.size}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground w-4">X</span>
                          <input type="range" min="0" max="100" value={b.x} onChange={e => updateBlob(i, "x", Number(e.target.value))} className={smallRangeClass} />
                          <span className="text-[10px] text-muted-foreground w-6 text-right">{b.x}%</span>
                          <span className="text-[10px] text-muted-foreground w-4 ml-1">Y</span>
                          <input type="range" min="0" max="100" value={b.y} onChange={e => updateBlob(i, "y", Number(e.target.value))} className={smallRangeClass} />
                          <span className="text-[10px] text-muted-foreground w-6 text-right">{b.y}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => theme.update({ blobs: [...theme.blobs, { color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`, x: Math.round(Math.random() * 80 + 10), y: Math.round(Math.random() * 80 + 10), size: Math.round(40 + Math.random() * 40) }] })} disabled={theme.blobs.length >= config.showBackground.maxBlobs}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground/40 transition-colors">
                      <Plus className="h-3 w-3" /> Add Blob
                    </button>
                    <button onClick={theme.randomizeMesh}
                      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto">
                      <Shuffle className="h-3 w-3" /> Randomize
                    </button>
                  </div>
                  {config.showBackground.showPresetGallery && (
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Preset Gallery</div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {theme.presets.map((p) => (
                          <button key={p.name} onClick={() => theme.applyPreset(p)} title={p.name}
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
                        {theme.presets.map((p) => (
                          <span key={p.name} className="text-[9px] text-center text-muted-foreground truncate">{p.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {config.showCardStyle && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Card Style</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm min-w-14">Opacity</span>
                  <input type="range" min="0" max="100" value={theme.cardOpacity} step="5" onChange={e => theme.update({ cardOpacity: Number(e.target.value) })} className={rangeClass} />
                  <span className="text-xs text-muted-foreground min-w-9 text-right">{theme.cardOpacity}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm min-w-14">Blur</span>
                  <input type="range" min="0" max="24" value={theme.cardBlur} step="2" onChange={e => theme.update({ cardBlur: Number(e.target.value) })} className={rangeClass} />
                  <span className="text-xs text-muted-foreground min-w-9 text-right">{theme.cardBlur}px</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm min-w-14">Shadow</span>
                  <select value={theme.shadowPreset} onChange={e => theme.update({ shadowPreset: e.target.value as typeof theme.shadowPreset })} className={selectClass}>
                    <option value="none">None</option>
                    <option value="subtle">Subtle</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </>,
      document.body
    )}
    </>
  )
}
