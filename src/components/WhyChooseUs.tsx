import { useQuoteForm } from "@/components/QuoteFormProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Headphones, Star, CreditCard, Wrench } from "lucide-react";

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
  const { openForm } = useQuoteForm();

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
          <p className="hidden sm:block text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            We don't just make signs - we create <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent font-semibold">partnerships</span>.<br />
            Here's what makes Kaykov Media different.
          </p>
          <p className="sm:hidden text-sm text-muted-foreground max-w-2xl mx-auto px-4">
            The reasons businesses choose Kaykov Media.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20 sm:h-80 flex flex-col">
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
                <p className="hidden sm:block text-muted-foreground text-center text-sm sm:text-base">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button
            variant="cta"
            size="lg"
            className="text-lg px-10 py-6 rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
            onClick={() =>
              openForm({
                ctaId: "why_choose_us_quote",
                ctaText: "Get a Custom Quote",
                location: "why_choose_us_cta",
              })
            }
          >
            Get a Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}