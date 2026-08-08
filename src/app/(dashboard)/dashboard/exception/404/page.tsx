import { FileQuestion, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Exception404Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="relative">
        <span className="text-[9rem] leading-none font-extrabold tracking-tight text-primary/10 select-none">404</span>
        <FileQuestion className="absolute inset-0 m-auto size-24 text-primary/60" />
      </div>
      <h1 className="text-xl font-bold tracking-tight mt-4">Page not found</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Check the URL or head back home.
      </p>
      <Button render={<Link href="/dashboard" />} className="mt-6">
        <Home className="size-4" /> Back to Home
      </Button>
    </div>
  )
}
