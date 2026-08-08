import { ShieldX, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Exception403Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="relative">
        <span className="text-[9rem] leading-none font-extrabold tracking-tight text-primary/10 select-none">403</span>
        <ShieldX className="absolute inset-0 m-auto size-24 text-primary/60" />
      </div>
      <h1 className="text-xl font-bold tracking-tight mt-4">Access denied</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
        Sorry, you don&apos;t have permission to access this page. Contact an administrator if you believe this is a mistake.
      </p>
      <Button render={<Link href="/dashboard" />} className="mt-6">
        <Home className="size-4" /> Back to Home
      </Button>
    </div>
  )
}
