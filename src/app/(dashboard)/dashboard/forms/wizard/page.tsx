"use client"

import { useState } from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/layout/breadcrumb"

const steps = ["Account", "Personal", "Social", "Review"]

export default function FormWizardPage() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    username: "johndoe",
    email: "john@example.com",
    password: "********",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 555 000 0000",
    twitter: "@johndoe",
    facebook: "john.doe",
    linkedin: "johndoe",
  })

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))
  const isLast = step === steps.length - 1

  const next = () => {
    if (isLast) { setDone(true); return }
    setStep(s => Math.min(s + 1, steps.length - 1))
  }
  const back = () => setStep(s => Math.max(s - 1, 0))
  const restart = () => { setStep(0); setDone(false) }

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
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${i < step ? "text-primary" : i === step ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                        ? "bg-muted text-foreground ring-2 ring-primary/60"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="text-sm font-medium hidden sm:inline">{label}</span>
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
                    <label htmlFor="username" className="text-xs font-medium text-muted-foreground">Username</label>
                    <Input id="username" type="text" placeholder="johndoe" value={form.username} onChange={e => update("username", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="password" className="text-xs font-medium text-muted-foreground">Password</label>
                    <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={e => update("password", e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 2: Personal */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="first-name" className="text-xs font-medium text-muted-foreground">First Name</label>
                    <Input id="first-name" type="text" placeholder="John" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="last-name" className="text-xs font-medium text-muted-foreground">Last Name</label>
                    <Input id="last-name" type="text" placeholder="Doe" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">Phone</label>
                    <Input id="phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={e => update("phone", e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 3: Social */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="twitter" className="text-xs font-medium text-muted-foreground">Twitter</label>
                    <Input id="twitter" type="text" placeholder="@johndoe" value={form.twitter} onChange={e => update("twitter", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="facebook" className="text-xs font-medium text-muted-foreground">Facebook</label>
                    <Input id="facebook" type="text" placeholder="john.doe" value={form.facebook} onChange={e => update("facebook", e.target.value)} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="linkedin" className="text-xs font-medium text-muted-foreground">LinkedIn</label>
                    <Input id="linkedin" type="text" placeholder="johndoe" value={form.linkedin} onChange={e => update("linkedin", e.target.value)} />
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
                    <div><span className="text-muted-foreground">Phone: </span>{form.phone}</div>
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
    </div>
  )
}
