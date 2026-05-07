import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { trackPageView } from "@/lib/analytics";
import Hero from "@/components/Hero";
import SignAIPromo from "@/components/SignAIPromo";
import SectionCTA from "@/components/SectionCTA";
import Services from "@/components/Services";
import GoogleReviews from "@/components/GoogleReviews";
import InstagramVideoGrid from "@/components/InstagramVideoGrid";
import { signagesVideos } from "@/data/signagesVideos";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import OurPromise from "@/components/OurPromise";
import Contact from "@/components/Contact";
import OfficeShowroom from "@/components/OfficeShowroom";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(max-width: 767px)").matches;
  });
  const [showMobileSuccess, setShowMobileSuccess] = useState(false);

  useEffect(() => {
    trackPageView("/", "Kaykov Media - Custom Signs That Bring Your Brand to Life");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const state = location.state as { formSubmitted?: boolean } | null;
    if (state?.formSubmitted) {
      if (isMobile) {
        setShowMobileSuccess(true);
      } else {
        toast.success("Request submitted successfully!", {
          description: "We will contact you shortly.",
          duration: 5000,
        });
      }
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [isMobile, location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!showMobileSuccess) {
      return;
    }
    const timer = window.setTimeout(() => setShowMobileSuccess(false), 1000);
    return () => window.clearTimeout(timer);
  }, [showMobileSuccess]);

  return (
    <div className="min-h-screen">
      {showMobileSuccess && (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)] md:hidden">
          <div
            role="status"
            className="mx-auto flex max-w-md items-start gap-3 rounded-2xl border-2 border-accent/20 bg-white p-4 text-primary shadow-2xl"
          >
            <span className="mt-0.5 rounded-full bg-accent/10 p-1">
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Request accepted</p>
              <p className="text-xs text-muted-foreground">We will contact you shortly.</p>
            </div>
          </div>
        </div>
      )}
      {/* 1. Hero */}
      <Hero />

      {/* Services */}
      <Services />

      {/* Reviews */}
      <GoogleReviews />

      {/* Video Showcase */}
      <InstagramVideoGrid items={signagesVideos} showHeader />

      {/* Why Us */}
      <WhyChooseUs />

      {/* Office Showroom */}
      <OfficeShowroom />

      {/* AI Sign Design Promo */}
      <SignAIPromo />

      {/* How We Work */}
      <Process />

      {/* Our Promise */}
      <OurPromise />

      {/* Contact */}
      <Contact />
      
      <FloatingContactButtons />
    </div>
  );
};

export default Index;
