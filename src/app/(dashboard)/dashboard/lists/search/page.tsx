"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SearchListPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/lists/search/articles")
  }, [router])

  return null
}
