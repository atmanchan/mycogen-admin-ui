"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRe.test(email)) {
      setError("Enter a valid email address.")
      return
    }
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success("Reset link sent. Check your inbox.")
    }, 700)
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-primary">Mycogen</span>.
        </h1>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle className="size-10 text-success" />
              <p className="text-sm font-medium">Check your email</p>
              <p className="text-xs text-muted-foreground">
                We&apos;ve sent a password reset link to {email}.
              </p>
              <Button variant="outline" className="mt-2" onClick={() => setSent(false)}>
                Send again
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <p className="text-xs text-muted-foreground">
                Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} />
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/sign-in" className="text-primary hover:underline font-medium">
          Back to Sign In
        </Link>
      </p>
    </div>
  )
}
