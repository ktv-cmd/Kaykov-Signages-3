import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Ruler, Palette, CreditCard, Factory, Wrench } from "lucide-react";
import { useState } from "react";
import ApplicationForm from "./ApplicationForm";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Consultation",
    description: "Tell us what you need - office, shop, real estate, or event signage. Available within 3 hours!",
    highlight: "Free consultation"
  },
  {
    icon: Ruler,
    number: "02", 
    title: "Measurements",
    description: "We handle all measurements or guide you step-by-step through the process.",
    highlight: "$50 on-site visit"
  },
  {
    icon: Palette,
    number: "03",
    title: "Design",
    description: "Custom design with 3D preview to ensure you love your sign before it's made.",
    highlight: "3 free revisions"
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Payment",
    description: "Choose your preferred payment plan - 5% discount for early payment or 50% deposit.",
    highlight: "Flexible options"
  },
  {
    icon: Factory,
    number: "05",
    title: "Production",
    description: "Fast turnaround with premium materials and professional craftsmanship.",
    highlight: "3-10 business days"
  },
  {
    icon: Wrench,
    number: "06",
    title: "Installation",
    description: "Professional installation done right, with our 3-year warranty guarantee.",
    highlight: "3-year warranty"
  }
];

export default function Process() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-white/10 rounded-lg"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
            🎯 Our Journey Together
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Smooth. Creative. High Quality.
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Follow our proven roadmap from concept to completion, designed for excellence at every step.
          </p>
        </div>
        
        {/* Roadmap */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-neon to-accent transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
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
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:shadow-2xl group-hover:transform group-hover:-translate-y-2 h-40 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">{step.title}</h3>
                  
                  <p className="text-white/80 text-sm text-center leading-relaxed">{step.description}</p>
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
        
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white/90 mb-8 text-lg">Your perfect sign is just one conversation away. Let's create something amazing together!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 transition-all duration-300 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1"
              >
                📞 Start Your Project
              </button>
              <a 
                href="https://wa.me/19179033458" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-accent to-neon text-white hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-xl font-semibold text-lg hover:transform hover:-translate-y-1"
              >
                💬 Chat With Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-lg p-2 transition-all duration-200 hover:scale-110"
              aria-label="Close form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="max-h-[95vh] overflow-y-auto">
              <ApplicationForm />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}