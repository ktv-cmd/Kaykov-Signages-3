import { useEffect } from "react";
import Hero from "@/components/Hero";
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

const IndoorSignages = () => {
  useEffect(() => {
    // Track page view in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'AW-17829037355', {
        page_path: '/indoor-signages',
        page_title: 'Indoor Signages - Kaykov Media'
      });

      // Track page view event
      (window as any).gtag('event', 'page_view', {
        page_path: '/indoor-signages',
        page_title: 'Indoor Signages - Kaykov Media'
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
      <Hero hideButtons={true} />
      
      {/* 2. Services */}
      <Services hideOutdoor={true} />
      
      {/* 3. What Our Clients Say */}
      <GoogleReviews />

      {/* 4. Kaykov Signs – Video Showcase */}
      <InstagramVideoGrid items={signagesVideos} showHeader />

      {/* 5. Why Businesses Love Us */}
      <WhyChooseUs />
      
      {/* 6. Office Showroom */}
      <OfficeShowroom />
      
      {/* 7. How We Work */}
      <Process />
      
      {/* 8. Our Promise */}
      <OurPromise />
      
      {/* 9. Ready to Bring Your Brand to Life? */}
      <Contact />

      <FloatingContactButtons />
    </div>
  );
};

export default IndoorSignages;
