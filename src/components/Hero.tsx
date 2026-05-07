import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Sparkles, X } from "lucide-react";
import { useQuoteForm } from "@/components/QuoteFormProvider";
import { trackCtaClick } from "@/lib/analytics";
import heroImage from "@/assets/outdoor /hero-signage 14.30.46.jpg";
import heroVideoKm from "@/assets/video signages /2 KM SINGS VIDEO.mp4";

// Outdoor gallery
import out1 from "@/assets/outdoor /3d signages /Front lid /TOV Front .JPG";
import out2 from "@/assets/outdoor /3d signages /Front lid /LVL UP.JPG";
import out3 from "@/assets/outdoor /3d signages /Front lid /Red Mango.JPG";
import out4 from "@/assets/outdoor /3d signages /Front lid /Sweetlab.JPG";
import out5 from "@/assets/outdoor /3d signages /Front lid /RGF home decore.JPG";
import out6 from "@/assets/outdoor /3d signages /back Lid /K2 letter.JPG";

// Indoor gallery
import ind1 from "@/assets/interiar /3d Letters Indoor/1 tov.JPG";
import ind2 from "@/assets/interiar /3d Letters Indoor/watch.JPG";
import ind3 from "@/assets/interiar /3d Letters Indoor/simply.JPG";
import ind4 from "@/assets/interiar /3d Letters Indoor/jlgs.JPG";
import ind5 from "@/assets/interiar /3d Letters Indoor/mass.JPG";
import ind6 from "@/assets/interiar /3d Letters Indoor/shimonov law.JPG";

const galleryData = {
  outdoor: [
    { src: out1, label: "TOV Front Lit" },
    { src: out2, label: "LVL UP" },
    { src: out3, label: "Red Mango" },
    { src: out4, label: "Sweetlab" },
    { src: out5, label: "RGF Home Decor" },
    { src: out6, label: "K2 Letter" },
  ],
  indoor: [
    { src: ind1, label: "TOV Indoor" },
    { src: ind2, label: "Watch Store" },
    { src: ind3, label: "Simply" },
    { src: ind4, label: "JLGS" },
    { src: ind5, label: "Mass" },
    { src: ind6, label: "Shimonov Law" },
  ],
};

interface HeroProps {
  hideButtons?: boolean;
}

export default function Hero({ hideButtons = false }: HeroProps = {}) {
  const { openForm } = useQuoteForm();
  const [activeCategory, setActiveCategory] = useState<"outdoor" | "indoor">("outdoor");
  const [lightbox, setLightbox] = useState<string | null>(null);

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
              variant="outline"
              size="lg"
              className="w-full min-h-[48px] h-12 text-sm font-semibold rounded-lg shadow-lg border-2 !bg-transparent border-primary text-primary hover:!bg-primary hover:text-white transition-all"
              onClick={() => {
                trackCtaClick({
                  ctaId: "hero_mobile_design_ai",
                  ctaText: "Design Your Sign with AI",
                  location: "hero_mobile",
                  ctaType: "navigate",
                });
                window.location.href = "/ai";
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Design Your Sign with AI →
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

          {/* Gallery section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900">Our Work</h2>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-semibold">
                <button
                  className={`px-3 py-1.5 transition-colors ${activeCategory === "outdoor" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
                  onClick={() => setActiveCategory("outdoor")}
                >
                  Outdoor
                </button>
                <button
                  className={`px-3 py-1.5 transition-colors ${activeCategory === "indoor" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
                  onClick={() => setActiveCategory("indoor")}
                >
                  Indoor
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              {activeCategory === "outdoor"
                ? "Illuminated 3D channel letters, front-lit and back-lit signs for storefronts."
                : "Interior 3D letters and dimensional signs for offices, retail, and lobbies."}
            </p>

            {/* Horizontal scroll grid */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {galleryData[activeCategory].map((item, i) => (
                <button
                  key={i}
                  className="flex-shrink-0 w-36 h-28 rounded-xl overflow-hidden relative group"
                  onClick={() => setLightbox(item.src)}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover group-active:scale-95 transition-transform duration-150"
                  />
                  <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                  <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white font-medium text-center leading-tight drop-shadow-md truncate px-1">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:hidden"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt="Sign gallery"
            className="max-w-full max-h-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <section className="hidden sm:flex relative min-h-screen items-end overflow-hidden">
        {/* Full-bleed video — no overlay on top, gradient only at bottom */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
          >
            <source src={heroVideoKm} type="video/mp4" />
          </video>
          {/* strong gradient at bottom, lighter fade at top */}
          <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black via-black/75 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Content — pushed to very bottom */}
        <div className="relative z-10 w-full text-center text-white pb-10 px-6">

          {/* Headline — original colors */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4">
            <span style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)' }}>
              Custom Signs That Bring Your{" "}
            </span>
            <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
              Brand to Life
            </span>
          </h1>

          {/* Subheadline — original */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
            Illuminated, non-illuminated, interior, and outdoor signage —
            designed, built, and installed to elevate your brand's identity everywhere it appears.
          </p>

          {/* 2 pill buttons — centered */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              className="px-8 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all duration-200"
              onClick={() => openForm({ ctaId: "hero_desktop_quote", ctaText: "Get a Custom Quote", location: "hero_desktop" })}
            >
              Get a Quote
            </button>
            <button
              className="px-8 py-3 rounded-full bg-white/15 border border-white/30 text-white text-sm font-semibold hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
              onClick={() => { window.location.href = "/ai"; }}
            >
              Design with AI →
            </button>
          </div>

          {/* Browse links — minimal */}
          {!hideButtons && (
            <div className="flex items-center justify-center gap-6 text-xs text-white/40">
              <button className="hover:text-white/70 transition-colors"
                onClick={() => document.getElementById('outdoor-premium-collection')?.scrollIntoView({ behavior: 'smooth' })}>
                Outdoor Signs
              </button>
              <span>·</span>
              <button className="hover:text-white/70 transition-colors"
                onClick={() => document.getElementById('interior-signages')?.scrollIntoView({ behavior: 'smooth' })}>
                Indoor Signs
              </button>
              <span>·</span>
              <span>3-Year Warranty</span>
              <span>·</span>
              <span>NYC Installation</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}