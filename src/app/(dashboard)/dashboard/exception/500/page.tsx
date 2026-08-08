import { Bug, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Exception500Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="relative">
        <span className="text-[9rem] leading-none font-extrabold tracking-tight text-primary/10 select-none">500</span>
        <Bug className="absolute inset-0 m-auto size-24 text-primary/60" />
      </div>
      <h1 className="text-xl font-bold tracking-tight mt-4">Internal server error</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
        Something went wrong on our end. The issue has been logged and our engineers are on it.
      </p>
      <div className="flex gap-3 mt-6">
        <Button render={<Link href="/dashboard" />}>
          <Home className="size-4" /> Back to Home
        </Button>
        <Button variant="outline">Report Issue</Button>
      </div>
    </div>
  )
}
