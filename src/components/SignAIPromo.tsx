import { Sparkles, Upload, Paintbrush2, Wand2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackCtaClick } from "@/lib/analytics"

const STEPS = [
  { icon: Upload,      label: "Upload your storefront photo" },
  { icon: Paintbrush2, label: "Mark where the sign goes" },
  { icon: Wand2,       label: "Choose a style & generate" },
  { icon: Download,    label: "Download your mockup" },
]

export default function SignAIPromo() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/20 to-background overflow-hidden relative">
      <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-5">
              <Sparkles size={14} className="text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Free AI Design Tool</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
              See Your Sign on Your{" "}
              <span className="text-accent">Storefront</span>{" "}
              Before We Build It
            </h2>

            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Upload a photo of your business, describe your sign style, and get a realistic AI mockup in seconds —
              completely free, no account needed.
            </p>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-base px-10 py-6 rounded-xl shadow-xl shadow-black/10 hover:scale-105 transition-all duration-300 font-semibold"
              onClick={() => {
                trackCtaClick({
                  ctaId: "ai_promo_cta",
                  ctaText: "Design My Sign for Free",
                  location: "ai_promo_section",
                  ctaType: "navigate",
                })
                window.location.href = "/ai"
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Design My Sign for Free →
            </Button>

            <p className="text-gray-400 text-xs mt-4">No account · No credit card · Results in under 30 seconds</p>
          </div>

          {/* Right — steps */}
          <div className="flex-shrink-0 w-full max-w-sm">
            <div className="space-y-3">
              {STEPS.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-gray-300 text-sm font-bold w-5 shrink-0">{i + 1}</span>
                    <span className="text-sm text-gray-700 font-medium">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
