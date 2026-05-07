"use client"

import { useEffect } from "react"
import { GenerateFlow } from "@/components/generate-flow"

// Reports the document height to a parent iframe so the embedding site
// can resize the iframe to fit the content without scrollbars.
function HeightReporter() {
  useEffect(() => {
    const report = () => {
      const h = document.documentElement.scrollHeight
      window.parent.postMessage({ type: "sign-ai-height", height: h }, "*")
    }

    report()

    const ro = new ResizeObserver(report)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [])

  return null
}

export default function GeneratePage() {
  return (
    <>
      <HeightReporter />
      <GenerateFlow />
    </>
  )
}
