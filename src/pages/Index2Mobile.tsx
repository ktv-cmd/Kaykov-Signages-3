import HeroMobile from "@/components/HeroMobile";
import Services from "@/components/Services";
import GoogleReviews from "@/components/GoogleReviews";
import InstagramVideoGrid from "@/components/InstagramVideoGrid";
import { signagesVideos } from "@/data/signagesVideos";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import OurPromise from "@/components/OurPromise";
import ContactMobile from "@/components/ContactMobile";
import OfficeShowroom from "@/components/OfficeShowroom";
import FloatingContactButtonsMobile from "@/components/FloatingContactButtonsMobile";

const Index2Mobile = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero - Mobile Optimized */}
      <HeroMobile />
      
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
      
      {/* 12. Ready to Bring Your Brand to Life? - Mobile Optimized */}
      <ContactMobile />
      
      <FloatingContactButtonsMobile />
    </div>
  );
};

export default Index2Mobile;

