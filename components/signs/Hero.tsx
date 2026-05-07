"use client";

import { Button } from "@/components/signs/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import { useQuoteForm } from "@/components/signs/QuoteFormProvider";
import { trackCtaClick } from "@/lib/signs/analytics";

const heroImage = "/signs/assets/outdoor /hero-signage 14.30.46.jpg";
const heroVideo = "/signs/assets/video signages /2 KM SINGS VIDEO.mp4";

interface HeroProps {
  hideButtons?: boolean;
}

export default function Hero({ hideButtons = false }: HeroProps = {}) {
  const { openForm } = useQuoteForm();

  return (
    <>
      {/* ── MOBILE (unchanged) ── */}
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
            <source src={heroVideo} type="video/mp4" />
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
              className="w-full min-h-[48px] h-12 text-sm font-semibold rounded-lg border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => {
                trackCtaClick({
                  ctaId: "hero_mobile_ai",
                  ctaText: "Design Your Sign with AI",
                  location: "hero_mobile",
                  ctaType: "scroll",
                });
                document.getElementById("generate")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Design Your Sign with AI
            </Button>
          </div>

          {!hideButtons && (
            <div className="mt-6">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 font-medium">Browse by type</p>
              <div className="flex flex-row gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs px-4 py-2 rounded-lg border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                  onClick={() => {
                    trackCtaClick({ ctaId: "hero_mobile_nav_outdoor", ctaText: "Outdoor Signages", location: "hero_mobile", ctaType: "scroll" });
                    document.getElementById("outdoor-premium-collection")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Outdoor Signages
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs px-4 py-2 rounded-lg border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                  onClick={() => {
                    trackCtaClick({ ctaId: "hero_mobile_nav_indoor", ctaText: "Indoor Signages", location: "hero_mobile", ctaType: "scroll" });
                    document.getElementById("interior-signages")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Indoor Signages
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <h3 className="font-semibold text-sm text-slate-900 mb-1">Perfect Design</h3>
              <p className="text-slate-500 text-xs">You'll love it before we build it</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <h3 className="font-semibold text-sm text-slate-900 mb-1">Professional Installation</h3>
              <p className="text-slate-500 text-xs">Done right, every time</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <h3 className="font-semibold text-sm text-slate-900 mb-1">3-Year Warranty</h3>
              <p className="text-slate-500 text-xs">Professional quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESKTOP: Split layout ── */}
      <section className="hidden sm:flex min-h-screen items-center bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 flex items-center gap-12 lg:gap-20 py-16">

          {/* Left: content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              NYC Custom Sign Company
            </p>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-slate-900">
              Custom Signs<br />
              That Bring Your{" "}
              <span className="text-primary">Brand to Life</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-slate-500 leading-relaxed max-w-lg">
              Illuminated, non-illuminated, interior, and outdoor signage —
              designed, built, and installed to elevate your brand everywhere it appears.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-row gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-xl shadow-lg"
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
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  trackCtaClick({
                    ctaId: "hero_desktop_ai",
                    ctaText: "Design Your Sign with AI",
                    location: "hero_desktop",
                    ctaType: "scroll",
                  });
                  document.getElementById("generate")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Design My Sign with AI →
              </Button>
            </div>

            {/* Browse by type */}
            {!hideButtons && (
              <div className="mt-8">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 font-medium">
                  Browse by type
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm px-5 py-2.5 rounded-lg border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                    onClick={() => {
                      trackCtaClick({ ctaId: "hero_desktop_nav_outdoor", ctaText: "Outdoor Signages", location: "hero_desktop", ctaType: "scroll" });
                      document.getElementById("outdoor-premium-collection")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Outdoor Signages
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm px-5 py-2.5 rounded-lg border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                    onClick={() => {
                      trackCtaClick({ ctaId: "hero_desktop_nav_indoor", ctaText: "Indoor Signages", location: "hero_desktop", ctaType: "scroll" });
                      document.getElementById("interior-signages")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Indoor Signages
                  </Button>
                </div>
              </div>
            )}

            {/* Key benefits */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="font-semibold text-sm text-slate-900 mb-1">Perfect Design</h3>
                <p className="text-slate-500 text-xs">You'll love it before we build it</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="font-semibold text-sm text-slate-900 mb-1">Pro Installation</h3>
                <p className="text-slate-500 text-xs">Done right, every time</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="font-semibold text-sm text-slate-900 mb-1">3-Year Warranty</h3>
                <p className="text-slate-500 text-xs">Quality guaranteed</p>
              </div>
            </div>
          </div>

          {/* Right: Instagram-style video reel card */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5"
              style={{ height: "72vh", maxHeight: 680, aspectRatio: "9/16" }}
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroImage}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              {/* subtle gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <p className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium text-center pointer-events-none">
                Our work in NYC
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
