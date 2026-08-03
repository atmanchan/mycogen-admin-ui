"use client"

import { useRef, useState } from "react"
import { Check, Copy, UploadCloud, Bold, Italic, Underline, List, AlignLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const multiOptions = ["Marketing", "Template", "Development", "Design"]
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "angular", label: "Angular" },
]

export default function FormsPage() {
  const [dropFiles, setDropFiles] = useState<string[]>([])
  const [dropOver, setDropOver] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const [framework, setFramework] = useState<string>("")
  const [editor, setEditor] = useState("Write your content here...")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [range1, setRange1] = useState(50)
  const [range2, setRange2] = useState(75)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const handleCopy = async (text: string) => {
    try { await navigator.clipboard.writeText(text) } catch { /* clipboard unavailable */ }
    setCopied(true)
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 1500)
  }

  const toggleMulti = (opt: string) => {
    setSelected(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDropOver(false)
    const files = Array.from(e.dataTransfer.files).map(f => f.name)
    if (files.length) setDropFiles(files)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Forms</h1>
        <p className="text-sm text-muted-foreground mt-1">
          UI components and form layout examples.
        </p>
      </div>

      {/* Input Fields */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Input Fields</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="text" className="text-xs font-medium text-muted-foreground">Text</label>
              <Input id="text" type="text" placeholder="Enter text" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email-1" className="text-xs font-medium text-muted-foreground">Email</label>
              <Input id="email-1" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground">Password</label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="number" className="text-xs font-medium text-muted-foreground">Number</label>
              <Input id="number" type="number" placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="disabled" className="text-xs font-medium text-muted-foreground">Disabled</label>
              <Input id="disabled" type="text" placeholder="Disabled input" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input States */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Input States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="email-2" className="text-xs font-medium text-muted-foreground">Email</label>
              <Input id="email-2" type="email" defaultValue="invalid@email" className="border-destructive focus-visible:ring-destructive/20" />
              <p className="text-xs text-destructive">This is an error message.</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email-3" className="text-xs font-medium text-muted-foreground">Email</label>
              <Input id="email-3" type="email" defaultValue="john@example.com" className="border-success focus-visible:ring-success/20" />
              <p className="text-xs text-success">This is a success message.</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email-4" className="text-xs font-medium text-muted-foreground">Email</label>
              <Input id="email-4" type="email" placeholder="disabled@email.com" disabled />
              <p className="text-xs text-muted-foreground">This is a disabled message.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Group */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Input Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="phone-1" className="text-xs font-medium text-muted-foreground">Phone</label>
              <div className="flex">
                <div className="flex items-center gap-1 px-3 rounded-l-lg border border-r-0 border-border bg-muted/50 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-success" /> +1
                </div>
                <Input id="phone-1" type="tel" placeholder="(555) 000-0000" className="rounded-l-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="url" className="text-xs font-medium text-muted-foreground">URL</label>
              <div className="flex">
                <div className="flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-muted/50 text-xs text-muted-foreground">http://</div>
                <Input id="url" type="text" placeholder="your-site.com" className="rounded-l-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="website" className="text-xs font-medium text-muted-foreground">Website</label>
              <div className="flex gap-2">
                <Input id="website" type="text" placeholder="https://example.com" />
                <Button size="sm" variant="outline" className="shrink-0" onClick={() => handleCopy("https://example.com")}>
                  {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1.5">
              <label htmlFor="default" className="text-xs font-medium text-muted-foreground">Default</label>
              <Select defaultValue="option-1">
                <SelectTrigger id="default" className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option-1">Option 1</SelectItem>
                  <SelectItem value="option-2">Option 2</SelectItem>
                  <SelectItem value="option-3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="disabled-1" className="text-xs font-medium text-muted-foreground">Disabled</label>
              <Select disabled>
                <SelectTrigger id="disabled-1" className="w-44">
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multiple Select */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Multiple Select</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {multiOptions.map(opt => (
                <button key={opt} onClick={() => toggleMulti(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    selected.includes(opt)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {selected.length ? selected.join(", ") : "None"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Textarea */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Textarea</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="description-1" className="text-xs font-medium text-muted-foreground">Description</label>
              <Textarea placeholder="Short description..." />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="description-2" className="text-xs font-medium text-muted-foreground">Description</label>
              <Textarea placeholder="Medium description..." className="min-h-24" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="message-1" className="text-xs font-medium text-muted-foreground">Message</label>
              <Textarea placeholder="Please enter a message..." className="min-h-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Input */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">File Input</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
                <UploadCloud className="h-4 w-4 text-muted-foreground" />
                Upload File
              </span>
              <input type="file" className="hidden" />
            </label>
            <p className="text-xs text-muted-foreground">Drag & drop or click to upload</p>
          </div>
        </CardContent>
      </Card>

      {/* Checkboxes */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Checkboxes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-primary size-4 rounded" />
              Default
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-primary size-4 rounded" defaultChecked />
              Checked
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-primary size-4 rounded" disabled />
              Disabled
            </label>
            <label className="flex items-center gap-2 text-sm cursor-not-allowed text-muted-foreground">
              <input type="checkbox" className="accent-primary size-4 rounded" disabled defaultChecked />
              Checked Disabled
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Radio Buttons */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Radio Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="radio" className="accent-primary size-4" />
              Default
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="radio" className="accent-primary size-4" defaultChecked />
              Checked
            </label>
            <label className="flex items-center gap-2 text-sm cursor-not-allowed text-muted-foreground">
              <input type="radio" name="radio" className="accent-primary size-4" disabled />
              Disabled
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Toggle Switches */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Toggle Switches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="toggle-switch" />
              Notifications
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="toggle-switch" defaultChecked />
              Dark Mode
            </label>
            <label className="flex items-center gap-2 text-sm cursor-not-allowed text-muted-foreground">
              <input type="checkbox" className="toggle-switch" disabled />
              Disabled
            </label>
          </div>
          <style>{`
            .toggle-switch {
              appearance: none;
              -webkit-appearance: none;
              width: 36px;
              height: 20px;
              border-radius: 999px;
              background: hsl(var(--border));
              border: 1px solid hsl(var(--border));
              cursor: pointer;
              position: relative;
              transition: background 0.2s, border-color 0.2s;
              flex-shrink: 0;
            }
            .toggle-switch::after {
              content: "";
              position: absolute;
              top: 1px;
              left: 1px;
              width: 16px;
              height: 16px;
              border-radius: 999px;
              background: hsl(var(--background));
              transition: transform 0.2s;
              box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            }
            .toggle-switch:checked {
              background: hsl(var(--primary));
              border-color: hsl(var(--primary));
            }
            .toggle-switch:checked::after {
              transform: translateX(16px);
            }
            .toggle-switch:disabled {
              opacity: 0.4;
              cursor: not-allowed;
            }
            .toggle-switch:focus-visible {
              outline: none;
              box-shadow: 0 0 0 2px hsl(var(--primary) / 0.5);
            }
          `}</style>
        </CardContent>
      </Card>

      {/* Dropzone */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dropzone</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={e => { e.preventDefault(); setDropOver(true) }}
            onDragLeave={() => setDropOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center py-10 rounded-lg border-2 border-dashed transition-colors ${
              dropOver ? "border-primary/60 bg-primary/5" : "border-border bg-muted/20"
            }`}
          >
            <UploadCloud className={`h-10 w-10 mb-3 ${dropOver ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium">Drag & Drop File Here</p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag and drop your PNG, JPG, WebP, SVG images here or browse
            </p>
            {dropFiles.length > 0 && (
              <div className="mt-3 space-y-1">
                {dropFiles.map((f, i) => (
                  <p key={i} className="text-xs text-primary flex items-center gap-1">
                    <Check className="h-3 w-3" /> {f}
                  </p>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Autocomplete */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Autocomplete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Framework</label>
            <Command className="rounded-lg border border-border shadow-sm">
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((fw) => (
                    <CommandItem key={fw.value} value={fw.value} onSelect={() => setFramework(fw.label)}>
                      <Check className={`h-4 w-4 mr-2 ${framework === fw.label ? "opacity-100 text-primary" : "opacity-0"}`} />
                      {fw.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <p className="text-xs text-muted-foreground mt-1.5">
              Selected: {framework || "None"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Date & Time Pickers */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date &amp; Time Pickers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="date" className="text-xs font-medium text-muted-foreground">Date</label>
              <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="time" className="text-xs font-medium text-muted-foreground">Time</label>
              <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="date-time" className="text-xs font-medium text-muted-foreground">Date &amp; Time</label>
              <Input id="date-time" type="datetime-local" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="flex items-center gap-1 border-b border-border bg-muted/30 px-2 py-1.5">
              {[
                { icon: Bold, label: "Bold" },
                { icon: Italic, label: "Italic" },
                { icon: Underline, label: "Underline" },
                { icon: List, label: "List" },
                { icon: AlignLeft, label: "Align" },
              ].map((t, i) => (
                <Button key={i} variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={t.label}>
                  <t.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
            <Textarea
              value={editor}
              onChange={e => setEditor(e.target.value)}
              className="border-0 rounded-none focus-visible:ring-0 min-h-40 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Slider */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Default Slider</span>
                <span className="font-medium">{range1}%</span>
              </div>
              <input type="range" min="0" max="100" value={range1} onChange={e => setRange1(Number(e.target.value))} className="w-full h-1.5 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:shadow-sm" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Success Slider</span>
                <span className="font-medium">{range2}%</span>
              </div>
              <input type="range" min="0" max="100" value={range2} onChange={e => setRange2(Number(e.target.value))} className="w-full h-1.5 appearance-none bg-border rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-success [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:shadow-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Layout */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Form Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="first-name" className="text-xs font-medium text-muted-foreground">First Name</label>
              <Input id="first-name" type="text" placeholder="John" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="last-name" className="text-xs font-medium text-muted-foreground">Last Name</label>
              <Input id="last-name" type="text" placeholder="Doe" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email-5" className="text-xs font-medium text-muted-foreground">Email</label>
              <Input id="email-5" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone-2" className="text-xs font-medium text-muted-foreground">Phone</label>
              <Input id="phone-2" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="message-2" className="text-xs font-medium text-muted-foreground">Message</label>
              <Textarea id="message-2" placeholder="Your message..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Grid */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Form Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-muted-foreground">Name</label>
                <Input id="name" type="text" placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email-6" className="text-xs font-medium text-muted-foreground">Email</label>
                <Input id="email-6" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-medium text-muted-foreground">Subject</label>
              <Input id="subject" type="text" placeholder="Subject" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="message-3" className="text-xs font-medium text-muted-foreground">Message</label>
              <Textarea id="message-3" placeholder="Write your message..." />
            </div>
            <Button>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
