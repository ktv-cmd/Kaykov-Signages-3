import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, Ruler, CreditCard, Palette, Factory, Wrench } from "lucide-react";
import { useState } from "react";
import ApplicationForm from "./ApplicationForm";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  highlight: string;
}

const steps: Step[] = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Consultation",
    description: "Tell us your vision, and we'll help bring it to life while estimating the full project cost.",
    highlight: "Free consultation"
  },
  {
    icon: Ruler,
    number: "02", 
    title: "Measurements",
    description: "To estimate accurately, our specialist comes to measure everything you need",
    highlight: "$50 on-site visit"
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Payment",
    description: "Choose a payment plan—5% off for early full payment or a simple 50% deposit option.",
    highlight: "Flexible options"
  },
  {
    icon: Palette,
    number: "04",
    title: "Design",
    description: "We create a custom design with a 3D preview so you approve it before production, with up to 3 revisions.",
    highlight: "3 free revisions"
  },
  {
    icon: Factory,
    number: "05",
    title: "Production",
    description: "Premium materials and expert craftsmanship. Completed in 3–10 business days.",
    highlight: "3-10 business days"
  },
  {
    icon: Wrench,
    number: "06",
    title: "Installation",
    description: "Your sign is professionally installed by certified experts and covered by our full 3-year warranty.",
    highlight: "3-year warranty"
  }
];

export default function Process() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-primary/20 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-primary/10 rounded-lg"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🎯 Our Journey Together
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
            How We Work
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            From consultation to installation, we guide you through every step.
          </p>
        </div>
        
        {/* Roadmap */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line - positioned below step titles */}
          <div className="absolute top-[160px] left-0 right-0 h-1 bg-gradient-to-r from-accent via-neon to-accent hidden lg:block z-0"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-20 left-1/2 w-1 h-24 bg-gradient-to-b from-accent to-neon transform -translate-x-1/2 lg:hidden"></div>
                )}
                
                {/* Step Circle */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-neon rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <step.icon className="w-10 h-10 text-white" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-lg flex items-center justify-center text-sm font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border-2 border-accent/20 group-hover:border-accent/40 group-hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:-translate-y-2 min-h-[160px] sm:min-h-[180px] md:min-h-[240px] flex flex-col shadow-md">
                  <div className="h-8 sm:h-10 mb-2 sm:mb-3 flex items-end justify-center">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary text-center break-words px-1">{step.title}</h3>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-start">
                    <p className="text-muted-foreground text-sm sm:text-base md:text-sm text-center leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute top-10 -right-4 hidden lg:block">
                    <div className="w-8 h-8 text-white/40">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12 sm:mt-20 px-4">
          <div className="max-w-md mx-auto">
            <Button 
              variant="cta" 
              size="lg" 
              className="bg-gradient-to-r from-accent to-neon text-white hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300 px-6 sm:px-10 py-5 sm:py-6 rounded-xl font-medium text-base sm:text-lg w-full shadow-lg"
              onClick={() => setIsFormOpen(true)}
            >
              Get a Custom Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="!max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
          <ApplicationForm onClose={() => setIsFormOpen(false)} inDialog={true} />
        </DialogContent>
      </Dialog>
    </section>
  );
}