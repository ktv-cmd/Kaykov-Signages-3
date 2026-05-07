import { Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuoteForm } from "@/components/QuoteFormProvider"
import { trackCtaClick } from "@/lib/analytics"

interface SectionCTAProps {
  location?: string
}

export default function SectionCTA({ location = "section_cta" }: SectionCTAProps) {
  const { openForm } = useQuoteForm()

  return (
    <div className="py-6 flex flex-col items-center justify-center gap-3 px-4">
      <Button
        variant="cta"
        size="lg"
        className="w-full sm:w-auto min-w-[220px] font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-200"
        onClick={() => {
          trackCtaClick({ ctaId: `${location}_quote`, ctaText: "Get a Custom Quote", location, ctaType: "quote_form" })
          openForm({ ctaId: `${location}_quote`, ctaText: "Get a Custom Quote", location })
        }}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Get a Custom Quote
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto min-w-[220px] font-semibold rounded-xl !bg-transparent border-2 border-primary text-primary hover:!bg-primary hover:text-white transition-all duration-200 hover:scale-105"
        onClick={() => {
          trackCtaClick({ ctaId: `${location}_ai`, ctaText: "Design My Sign with AI", location, ctaType: "navigate" })
          window.location.href = "/ai"
        }}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Design My Sign with AI →
      </Button>
    </div>
  )
}
