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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Outdoor Signages Premium Collection */}
      {/* 3. Outdoor Signages */}
      {/* 4. Interior Signages */}
      <Services />
      
      {/* 5. What Our Clients Say */}
      <GoogleReviews />
      
      {/* 7. Kaykov Signs – Video Showcase */}
      <InstagramVideoGrid items={signagesVideos} showHeader />
      
      {/* 8. Why Businesses Love Us */}
      <WhyChooseUs />
      
      {/* 9. Office Showroom */}
      <OfficeShowroom />
      
      {/* 10. Smooth. Creative. High Quality. */}
      <Process />
      
      {/* 11. our promise */}
      <OurPromise />
      
      {/* 12. Ready to Bring Your Brand to Life? */}
      <Contact />
      
      <FloatingContactButtons />
    </div>
  );
};

export default Index;
