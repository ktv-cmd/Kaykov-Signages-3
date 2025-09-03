import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Ruler, Palette, CreditCard, Factory, Wrench } from "lucide-react";

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
    description: "Unlimited revisions until you're completely in love with your design.",
    highlight: "Unlimited revisions"
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
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
            🔧 Our Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Simple. Fast. Professional.
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From consultation to installation, we make getting your perfect sign easy and stress-free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="group relative bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader className="text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-4">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                
                <CardTitle className="text-xl text-white mb-2">{step.title}</CardTitle>
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  {step.highlight}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6">Your perfect sign is just a conversation away. Let's bring your brand to life!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:" className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 transition-colors px-6 py-3 rounded-lg font-semibold">
                📞 Call Us Now
              </a>
              <a href="#" className="inline-flex items-center justify-center bg-gradient-to-r from-accent to-neon text-white hover:shadow-lg transition-all px-6 py-3 rounded-lg font-semibold">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}