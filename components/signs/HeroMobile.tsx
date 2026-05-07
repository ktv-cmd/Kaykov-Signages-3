"use client";

import { Button } from "@/components/signs/ui/button";
import { MessageCircle } from "lucide-react";
import { useQuoteForm } from "@/components/signs/QuoteFormProvider";
import { trackCtaClick } from "@/lib/signs/analytics";
const heroImage = "/signs/assets/outdoor /hero-signage 14.30.46.jpg";
const heroImageOutdoor = "/signs/assets/outdoor /2d /awning signages/awning 1.jpg";
const heroImageIndoor = "/signs/assets/interiar /3d Letters Indoor/indoor no light.jpg";
interface HeroMobileProps {
  hideButtons?: boolean;
}

export default function HeroMobile({ hideButtons = false }: HeroMobileProps = {}) {
  const { openForm } = useQuoteForm();

  return (
    <>
      <section className="bg-white pt-8 pb-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/80">
              Made in NYC • Local Expertise
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight text-slate-900">
              Your Vision, Our Craft:{" "}
              <span className="text-primary">NYC's Premier</span> Signage Experts
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              From neon lights in Brooklyn to building wraps in Manhattan, we bring brands to life across the five boroughs.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="flex-1">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={heroImage}
                    alt="Custom storefront signage"
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={heroImageOutdoor}
                    alt="Outdoor business signage example"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={heroImageIndoor}
                    alt="Indoor office signage example"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 min-h-[48px] h-12 text-base font-semibold rounded-xl shadow-lg touch-manipulation"
                onClick={() =>
                  openForm({
                    ctaId: "hero_mobile_v2_quote",
                    ctaText: "Get a Free Quote",
                    location: "hero_mobile_v2",
                  })
                }
                style={{ touchAction: "manipulation" }}
              >
                Get a Free Quote
              </Button>
              <button
                className="w-12 h-12 rounded-xl bg-[#25D366] text-white shadow-lg flex items-center justify-center touch-manipulation"
                onClick={() => {
                  trackCtaClick({
                    ctaId: "hero_mobile_v2_whatsapp",
                    ctaText: "Chat on WhatsApp",
                    location: "hero_mobile_v2",
                    destination: "https://wa.me/19179033458",
                    ctaType: "whatsapp",
                  });
                  window.open("https://wa.me/19179033458", "_blank");
                }}
                style={{ touchAction: "manipulation" }}
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">Fast reply - No obligation</p>
            <p className="mt-1 text-xs text-slate-500">Licensed install - 3-year warranty</p>
          </div>
        </div>
      </section>

      {!hideButtons && (
        <section className="bg-slate-50 py-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center rounded-full bg-primary text-white px-4 py-2 text-xs font-semibold shadow-sm">
                City-wide projects completed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-2xl border border-primary/10 bg-white px-3 py-4 text-center shadow-sm">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Coverage</p>
                <p className="mt-1 text-base font-semibold text-slate-900">NYC + Nearby</p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white px-3 py-4 text-center shadow-sm">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Warranty</p>
                <p className="mt-1 text-base font-semibold text-slate-900">3-year</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-primary/10 p-4 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">What type of sign do you need?</h2>
              <p className="mt-1 text-sm text-slate-600">Tap to see examples & options</p>

              <div className="mt-4 space-y-3">
                <button
                  className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors hover:border-primary/30 min-h-[64px]"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "hero_mobile_v2_nav_outdoor",
                      ctaText: "Outdoor Business Signs",
                      location: "hero_mobile_v2",
                      ctaType: "scroll",
                    });
                    const element = document.getElementById("outdoor-premium-collection");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="block text-base font-semibold text-slate-900">Outdoor Business Signs</span>
                  <span className="block text-xs text-slate-600 mt-1">
                    Storefront, channel letters, awnings
                  </span>
                </button>
                <button
                  className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors hover:border-primary/30 min-h-[64px]"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "hero_mobile_v2_nav_indoor",
                      ctaText: "Indoor & Office Signs",
                      location: "hero_mobile_v2",
                      ctaType: "scroll",
                    });
                    const element = document.getElementById("interior-signages");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="block text-base font-semibold text-slate-900">Indoor &amp; Office Signs</span>
                  <span className="block text-xs text-slate-600 mt-1">
                    Lobby, wall logos, wayfinding
                  </span>
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-sm font-medium text-slate-900">Prefer a quick quote?</p>
                <Button
                  size="sm"
                  className="min-h-[44px] h-11 px-4 text-sm font-semibold"
                  onClick={() =>
                    openForm({
                      ctaId: "hero_mobile_v2_quick_quote",
                      ctaText: "Get a Free Quote",
                      location: "hero_mobile_v2_quick_quote",
                    })
                  }
                >
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

