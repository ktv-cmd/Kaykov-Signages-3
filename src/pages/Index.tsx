import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import ApplicationForm from "@/components/ApplicationForm";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Process />
      <WhyChooseUs />
      <ApplicationForm />
      <Contact />
    </div>
  );
};

export default Index;
