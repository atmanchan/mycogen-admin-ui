"use client"

import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, User, FileText, Share2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { cn } from "@/lib/utils"

const steps = [
  { label: "Account Details", icon: User },
  { label: "Personal Info", icon: FileText },
  { label: "Social Links", icon: Share2 },
  { label: "Review", icon: CheckCircle2 },
]

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan"]
const LANGUAGES = ["English", "Chinese", "Spanish", "French", "German", "Japanese"]

export default function FormWizardPage() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [altStep, setAltStep] = useState(0)
  const [vNumStep, setVNumStep] = useState(0)
  const [vIconStep, setVIconStep] = useState(0)
  const [form, setForm] = useState({
    username: "johndoe",
    email: "john@example.com",
    password: "********",
    firstName: "John",
    lastName: "Doe",
    country: "United States",
    language: "English",
    twitter: "@johndoe",
    facebook: "john.doe",
    linkedin: "johndoe",
  })

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))
  const isLast = step === steps.length - 1

  const passwordScore = (p: string) => {
    let s = 0
    if (p.length >= 8) s++
    if (/[0-9]/.test(p)) s++
    if (/[A-Z]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }
  const score = passwordScore(form.password)
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"]
  const strengthColors = ["bg-rose-500", "bg-amber-500", "bg-yellow-500", "bg-emerald-500", "bg-success"]

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, boolean> = {}
    if (s === 0) {
      if (!form.username.trim()) newErrors.username = true
      if (!form.email.includes("@")) newErrors.email = true
      if (form.password.length < 6) newErrors.password = true
    }
    if (s === 1) {
      if (!form.firstName.trim()) newErrors.firstName = true
      if (!form.lastName.trim()) newErrors.lastName = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (!validateStep(step)) return
    if (isLast) { setDone(true); toast.success("Form submitted successfully."); return }
    setStep(s => Math.min(s + 1, steps.length - 1))
  }
  const back = () => { setErrors({}); setStep(s => Math.max(s - 1, 0)) }
  const restart = () => { setStep(0); setDone(false); setErrors({}) }

  return (
    <div className="space-y-5 max-w-3xl">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Forms", href: "/dashboard/forms" },
        { label: "Form Wizard" },
      ]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Form Wizard</h1>
        <p className="text-sm text-muted-foreground mt-1">Multi-step form with progress indication.</p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent>
          {/* Step indicator with icons */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((st, i) => (
              <div key={st.label} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${i < step ? "text-primary" : i === step ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                        ? "bg-muted text-foreground ring-2 ring-primary/60"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? <Check className="h-4 w-4" /> : <st.icon className="h-4 w-4" />}
                  </span>
                  <span className="text-sm font-medium hidden md:inline">{st.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Success state */}
          {done ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold">Form Submitted!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your account has been created successfully.
              </p>
              <Button variant="outline" className="mt-6" onClick={restart}>Start Over</Button>
            </div>
          ) : (
            <>
              {/* Step 1: Account */}
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="username" className="text-xs font-medium text-muted-foreground">Username *</label>
                    <Input id="username" className={cn(errors.username && "border-destructive focus-visible:ring-destructive/20")}
                      value={form.username} onChange={e => update("username", e.target.value)} />
                    {errors.username && <p className="text-xs text-destructive">Username is required.</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email *</label>
                    <Input id="email" type="email" className={cn(errors.email && "border-destructive focus-visible:ring-destructive/20")}
                      value={form.email} onChange={e => update("email", e.target.value)} />
                    {errors.email && <p className="text-xs text-destructive">Enter a valid email.</p>}
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="password" className="text-xs font-medium text-muted-foreground">Password *</label>
                    <Input id="password" type="password" className={cn(errors.password && "border-destructive focus-visible:ring-destructive/20")}
                      value={form.password} onChange={e => update("password", e.target.value)} />
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i < score ? strengthColors[score] : "bg-border")} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground w-20 text-right">{strengthLabels[score]}</span>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">Password must be at least 6 characters.</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Personal */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="first-name" className="text-xs font-medium text-muted-foreground">First Name *</label>
                    <Input id="first-name" className={cn(errors.firstName && "border-destructive focus-visible:ring-destructive/20")}
                      value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                    {errors.firstName && <p className="text-xs text-destructive">First name is required.</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="last-name" className="text-xs font-medium text-muted-foreground">Last Name *</label>
                    <Input id="last-name" className={cn(errors.lastName && "border-destructive focus-visible:ring-destructive/20")}
                      value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                    {errors.lastName && <p className="text-xs text-destructive">Last name is required.</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Country</label>
                    <Select value={form.country} onValueChange={v => v && update("country", v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Language</label>
                    <Select value={form.language} onValueChange={v => v && update("language", v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Social */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="twitter" className="text-xs font-medium text-muted-foreground">Twitter</label>
                    <Input id="twitter" value={form.twitter} onChange={e => update("twitter", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="facebook" className="text-xs font-medium text-muted-foreground">Facebook</label>
                    <Input id="facebook" value={form.facebook} onChange={e => update("facebook", e.target.value)} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="linkedin" className="text-xs font-medium text-muted-foreground">LinkedIn</label>
                    <Input id="linkedin" value={form.linkedin} onChange={e => update("linkedin", e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 3 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Details</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Username: </span>{form.username}</div>
                    <div><span className="text-muted-foreground">Email: </span>{form.email}</div>
                    <div><span className="text-muted-foreground">Password: </span>{form.password}</div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">Personal Info</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Name: </span>{form.firstName} {form.lastName}</div>
                    <div><span className="text-muted-foreground">Country: </span>{form.country}</div>
                    <div><span className="text-muted-foreground">Language: </span>{form.language}</div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">Social Links</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Twitter: </span>{form.twitter}</div>
                    <div><span className="text-muted-foreground">Facebook: </span>{form.facebook}</div>
                    <div><span className="text-muted-foreground">LinkedIn: </span>{form.linkedin}</div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-border/30">
                <Button variant="outline" onClick={back} disabled={step === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <div className="flex items-center gap-2">
                  {steps.map((_, i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-1.5 bg-border"}`} />
                  ))}
                </div>
                <Button onClick={next}>
                  {isLast ? "Submit" : "Next"} <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Alternative Label Stepper */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Stepper with Alternative Label</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-6">Labels alternate above and below the step indicators.</p>
          <div className="relative flex items-start justify-between mb-10">
            {steps.map((st, i) => (
              <div key={st.label} className="flex flex-col items-center flex-1 relative">
                {i < steps.length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < altStep ? "bg-primary" : "bg-border"}`} />
                )}
                <button onClick={() => setAltStep(i)} aria-label={st.label}
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                    i < altStep ? "bg-primary text-primary-foreground" : i === altStep ? "bg-muted text-foreground ring-2 ring-primary/60" : "bg-muted text-muted-foreground"
                  }`}>
                  {i < altStep ? <Check className="h-4 w-4" /> : <st.icon className="h-4 w-4" />}
                </button>
                {/* Alternative label: odd steps above, even steps below */}
                <span className={`absolute left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap ${
                  i % 2 === 0 ? "-top-5 text-center" : "top-10 text-center"
                } ${i === altStep ? "text-foreground" : "text-muted-foreground"}`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border/30 bg-muted/20 p-4 min-h-20">
            <h3 className="text-sm font-semibold">{steps[altStep].label}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {steps[altStep].label} ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae est eget odio.
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Button variant="outline" size="sm" onClick={() => setAltStep(s => Math.max(0, s - 1))} disabled={altStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button size="sm" onClick={() => setAltStep(s => Math.min(steps.length - 1, s + 1))} disabled={altStep === steps.length - 1}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vertical Stepper with Numbers */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Vertical Stepper with Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6">
            <div className="flex sm:flex-col gap-0">
              {steps.map((st, i) => (
                <div key={st.label} className="flex items-center gap-3 flex-1 sm:flex-none">
                  <div className="flex flex-col items-center">
                    <button onClick={() => setVNumStep(i)} aria-label={st.label}
                      className={`flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer shrink-0 ${
                        i < vNumStep ? "bg-primary text-primary-foreground" : i === vNumStep ? "bg-muted text-foreground ring-2 ring-primary/60" : "bg-muted text-muted-foreground"
                      }`}>
                      {i < vNumStep ? <Check className="h-4 w-4" /> : i + 1}
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-8 sm:h-10 ${i < vNumStep ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${i === vNumStep ? "text-foreground" : "text-muted-foreground"} hidden sm:inline`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
              <h3 className="text-sm font-semibold">{steps[vNumStep].label}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Content for {steps[vNumStep].label}. Vestibulum ante ipsum primis in faucibus orci luctus.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Button variant="outline" size="sm" onClick={() => setVNumStep(s => Math.max(0, s - 1))} disabled={vNumStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button size="sm" onClick={() => setVNumStep(s => Math.min(steps.length - 1, s + 1))} disabled={vNumStep === steps.length - 1}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vertical Stepper without Numbers */}
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle>Vertical Stepper without Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6">
            <div className="flex sm:flex-col gap-0">
              {steps.map((st, i) => (
                <div key={st.label} className="flex items-center gap-3 flex-1 sm:flex-none">
                  <div className="flex flex-col items-center">
                    <button onClick={() => setVIconStep(i)} aria-label={st.label}
                      className={`flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer shrink-0 ${
                        i < vIconStep ? "bg-primary text-primary-foreground" : i === vIconStep ? "bg-muted text-foreground ring-2 ring-primary/60" : "bg-muted text-muted-foreground"
                      }`}>
                      <st.icon className="h-4 w-4" />
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-8 sm:h-10 ${i < vIconStep ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${i === vIconStep ? "text-foreground" : "text-muted-foreground"} hidden sm:inline`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
              <h3 className="text-sm font-semibold">{steps[vIconStep].label}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Content for {steps[vIconStep].label}. Praesent commodo cursus magna vel scelerisque.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Button variant="outline" size="sm" onClick={() => setVIconStep(s => Math.max(0, s - 1))} disabled={vIconStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button size="sm" onClick={() => setVIconStep(s => Math.min(steps.length - 1, s + 1))} disabled={vIconStep === steps.length - 1}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
