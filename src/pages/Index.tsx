import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import UseCases from "@/components/UseCases";
import VideoShowcase from "@/components/VideoShowcase";
import Contact from "@/components/Contact";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <UseCases />
      <VideoShowcase />
      <Process />
      <WhyChooseUs />
      <Contact />
      <AIChat />
    </div>
  );
};

export default Index;
