import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import { useQuoteForm } from "@/components/QuoteFormProvider";
import { trackCtaClick } from "@/lib/analytics";
import heroImage from "@/assets/outdoor /hero-signage 14.30.46.jpg";
import heroVideoKm from "@/assets/video signages /2 KM SINGS VIDEO.mp4";

interface HeroProps {
  hideButtons?: boolean;
}

export default function Hero({ hideButtons = false }: HeroProps = {}) {
  const { openForm } = useQuoteForm();

  return (
    <>
      <section className="sm:hidden bg-white">
        <div className="w-full">
          <video
            className="w-full h-[52vh] max-h-[520px] object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
          >
            <source src={heroVideoKm} type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-4 pt-5 pb-10 text-left">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold leading-tight text-slate-900">
            Custom Signs That Bring Your{" "}
            <span className="text-primary">Brand to Life</span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Indoor &amp; outdoor signs designed, built, and installed to elevate your brand.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full min-h-[48px] h-12 text-sm font-semibold rounded-lg shadow-lg"
              onClick={() =>
                openForm({
                  ctaId: "hero_mobile_quote",
                  ctaText: "Get a Custom Quote",
                  location: "hero_mobile",
                })
              }
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get a Custom Quote
            </Button>
            <Button
              variant="cta"
              size="lg"
              className="w-full min-h-[48px] h-12 text-sm font-semibold rounded-lg shadow-lg"
              onClick={() => {
                trackCtaClick({
                  ctaId: "hero_mobile_whatsapp",
                  ctaText: "WhatsApp Us",
                  location: "hero_mobile",
                  destination: "https://wa.me/19179033458",
                  ctaType: "whatsapp",
                });
                window.open("https://wa.me/19179033458", "_blank");
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <section className="hidden sm:flex relative min-h-screen items-center justify-center overflow-hidden py-12 sm:py-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional custom signage and LED displays"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white w-full">
          <div className="max-w-4xl mx-auto">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 sm:px-4">
              Custom Signs That Bring Your{" "}
              <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
                Brand to Life
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
              Illuminated, non-illuminated, interior, and outdoor signage<span className="hidden sm:inline"><br /></span>{" "}
              designed, built, and installed<span className="hidden sm:inline"><br /></span>{" "}
              to elevate your brand's identity everywhere it appears.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12 px-4">
              <Button
                variant="hero"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-lg shadow-2xl shadow-black/30 hover:shadow-3xl hover:shadow-black/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm w-auto sm:w-auto min-w-[240px] justify-center"
                onClick={() =>
                  openForm({
                    ctaId: "hero_desktop_quote",
                    ctaText: "Get a Custom Quote",
                    location: "hero_desktop",
                  })
                }
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get a Custom Quote
              </Button>
              <Button
                variant="cta"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-lg shadow-2xl shadow-accent/30 hover:shadow-3xl hover:shadow-accent/40 hover:scale-105 transition-all duration-300 w-auto sm:w-auto min-w-[240px] justify-center"
                onClick={() => {
                  trackCtaClick({
                    ctaId: "hero_desktop_whatsapp",
                    ctaText: "WhatsApp Us",
                    location: "hero_desktop",
                    destination: "https://wa.me/19179033458",
                    ctaType: "whatsapp",
                  });
                  window.open('https://wa.me/19179033458', '_blank');
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </div>

            {/* Service Navigation Buttons */}
            {!hideButtons && (
            <div className="mb-6 sm:mb-8 md:mb-12 px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">Browse Our Signage Types</h2>
              <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg backdrop-blur-md transition-all duration-500 font-medium !bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-lg hover:shadow-black/30 hover:scale-105 w-auto sm:w-auto"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "hero_desktop_nav_outdoor",
                      ctaText: "Outdoor Signages",
                      location: "hero_desktop",
                      ctaType: "scroll",
                    });
                    const element = document.getElementById('outdoor-premium-collection');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Outdoor Signages
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg backdrop-blur-md transition-all duration-500 font-medium !bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-lg hover:shadow-black/30 hover:scale-105 w-auto sm:w-auto"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "hero_desktop_nav_indoor",
                      ctaText: "Indoor Signages",
                      location: "hero_desktop",
                      ctaType: "scroll",
                    });
                    const element = document.getElementById('interior-signages');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Indoor Signages
                </Button>
              </div>
            </div>
            )}
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center px-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 sm:h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
                <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">Perfect Design</h3>
                <p className="text-white/90 text-xs sm:text-sm group-hover:text-white/95 transition-colors duration-300">You'll love it before we build it</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 sm:h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
                <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">Professional Installation</h3>
                <p className="text-white/90 text-xs sm:text-sm group-hover:text-white/95 transition-colors duration-300">Done right, every time</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 sm:h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
                <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">3-Year Warranty</h3>
                <p className="text-white/90 text-xs sm:text-sm group-hover:text-white/95 transition-colors duration-300">Professional quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}