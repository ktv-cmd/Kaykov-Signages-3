import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Headphones, Star, CreditCard, Wrench, Sparkles, ArrowRight } from "lucide-react";
import ApplicationForm from "./ApplicationForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const benefits = [
  {
    icon: Clock,
    title: "Lightning Fast Response",
    description: "Consultation available within 3 hours. Most projects completed in 3-10 business days.",
    highlight: "3 hour response"
  },
  {
    icon: Headphones,
    title: "Your Brand, Our Priority",
    description: "Every project starts with understanding your business — we craft signage that speaks your language and attracts your audience.",
    highlight: "Tailored to you"
  },
  {
    icon: Star,
    title: "Perfect Design Guarantee",
    description: "Custom design with up to 3 free revisions until you absolutely love your sign.",
    highlight: "Up to 3 revisions"
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Options",
    description: "5% discount for early full payment or choose our 50% upfront deposit plan.",
    highlight: "5% early discount"
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Our certified installers ensure your sign is mounted perfectly and safely.",
    highlight: "Certified installers"
  },
  {
    icon: Shield,
    title: "3-Year Warranty",
    description: "We stand behind our work with a comprehensive 3-year warranty on most signs.",
    highlight: "3-year warranty"
  }
];

export default function WhyChooseUs() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Benefits Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💡 Why Choose Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
            Why Businesses Love Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            We don't just make signs - we create <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent font-semibold">partnerships</span>.<br />
            Here's what makes Kaykov Media different.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20 min-h-[280px] sm:h-80 flex flex-col">
              <CardHeader className="text-center flex-grow px-4 sm:px-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-accent/10 to-neon/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                </div>
                <CardTitle className="text-lg sm:text-xl mb-2">{benefit.title}</CardTitle>
                <div className="flex justify-center mb-0">
                  <Badge 
                    variant="secondary" 
                    className="bg-accent/10 text-accent border-accent/20 text-xs font-medium px-3 py-1 w-fit"
                  >
                    {benefit.highlight}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-start pt-0 -mt-4 px-4 sm:px-6 pb-4 sm:pb-6">
                <p className="text-muted-foreground text-center text-sm sm:text-base">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section - Smooth, Creative, High Quality */}
        <div className="mt-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-accent/10 hover:shadow-2xl hover:border-accent/20 transition-all duration-500 relative overflow-hidden group max-w-4xl mx-auto">
            {/* Subtle animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent/10 to-neon/10 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Ready to Bring Your Vision to Life?
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Get a custom quote tailored to your project. Fast response, premium quality, and expert service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="cta"
                  size="lg"
                  className="text-lg px-10 py-6 rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 group/btn"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover/btn:rotate-180 transition-transform duration-500" />
                  Get a Custom Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-6 rounded-xl border-2 hover:border-accent hover:bg-accent/5 transition-all duration-300 lg:hidden"
                  onClick={() => window.open('tel:+17184784200', '_self')}
                >
                  📞 Call (718) 478-4200
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="!max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
          <ApplicationForm onClose={() => setIsFormOpen(false)} inDialog={true} />
        </DialogContent>
      </Dialog>
    </section>
  );
}