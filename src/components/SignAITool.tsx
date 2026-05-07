import { Sparkles } from "lucide-react"
import { GenerateFlow } from "@/components/ai-tool/GenerateFlow"

export default function SignAITool() {
  return (
    <section id="design-tool" className="py-16 sm:py-24 bg-gray-50">
      {/* Section header — same pattern as other site sections */}
      <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-5">
          <Sparkles size={14} className="text-accent" />
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">
            Free AI Design Tool
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          See Your Sign on Your{" "}
          <span className="text-accent">Storefront</span>{" "}
          Before We Build It
        </h2>

        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
          Upload a photo of your business, describe your sign style, and get a
          realistic AI mockup in seconds — completely free, no account needed.
        </p>
      </div>

      {/* Tool — rendered directly, same styles as the rest of the site */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GenerateFlow embedded />
        </div>
      </div>

      {/* Bottom note */}
      <p className="text-center text-gray-400 text-xs mt-8">
        No account needed · Results in under 30 seconds · Free forever
      </p>
    </section>
  )
}
