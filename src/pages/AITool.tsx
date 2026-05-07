import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"
import { GenerateFlow } from "@/components/ai-tool/GenerateFlow"

const AITool = () => {
  useEffect(() => {
    trackPageView("/ai", "Design Your Sign with AI — Kaykov Media")
  }, [])

  return <GenerateFlow />
}

export default AITool
