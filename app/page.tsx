"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { GenerateFlow } from "@/components/generate-flow";
import Hero from "@/components/signs/Hero";
import Services from "@/components/signs/Services";
import GoogleReviews from "@/components/signs/GoogleReviews";
import InstagramVideoGrid from "@/components/signs/InstagramVideoGrid";
import { signagesVideos } from "@/data/signagesVideos";
import WhyChooseUs from "@/components/signs/WhyChooseUs";
import OfficeShowroom from "@/components/signs/OfficeShowroom";
import Process from "@/components/signs/Process";
import OurPromise from "@/components/signs/OurPromise";
import Contact from "@/components/signs/Contact";
import FloatingContactButtons from "@/components/signs/FloatingContactButtons";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo Kaykov Media_C.PNG"
              alt="Kaykov Media"
              width={140}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </header>

      {/* Hero — full-screen background image/video with CTAs */}
      <Hero />

      {/* AI Sign Designer Section */}
      <section
        id="generate"
        className="relative py-16 sm:py-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Section label */}
        <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-yellow-400" />
            <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
              AI-Powered Design Tool
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            See Your Sign on Your{" "}
            <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
              Storefront
            </span>{" "}
            Before We Build It
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Upload a photo of your business, choose a style, and get a
            realistic AI mockup in seconds — completely free.
          </p>
        </div>

        {/* Tool */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <GenerateFlow embedded />
          </div>
        </div>
      </section>

      {/* Marketing sections */}
      <Services />
      <GoogleReviews />
      <InstagramVideoGrid items={signagesVideos} showHeader />
      <WhyChooseUs />
      <OfficeShowroom />
      <Process />
      <OurPromise />
      <Contact />

      <FloatingContactButtons />
    </div>
  );
}
