import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Headphones, Star, CreditCard, Wrench, Palette } from "lucide-react";
import GoogleReviews from "./GoogleReviews";

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
    description: "5% discount for full early payment or choose our 50% upfront deposit plan.",
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

const testimonials = [
  {
    text: "Kaykov Media transformed our shop. The LED sign brings us customers even at night!",
    author: "Sarah Chen",
    business: "Retail Store Owner",
    rating: 5
  },
  {
    text: "Professional, fast, and easy to work with. Our office sign looks amazing.",
    author: "Michael Rodriguez",
    business: "Business Client",
    rating: 5
  },
  {
    text: "The car wrap exceeded our expectations. We get compliments everywhere we go!",
    author: "Jennifer Kim",
    business: "Local Service Business",
    rating: 5
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Benefits Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💡 Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why Businesses Love Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't just make signs - we create partnerships.<br />
            Here's what makes Kaykov Media different.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20 h-80 flex flex-col">
              <CardHeader className="text-center flex-grow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent/10 to-neon/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                <div className="flex justify-center mb-0">
                  <Badge 
                    variant="secondary" 
                    className="bg-accent/10 text-accent border-accent/20 text-xs font-medium px-3 py-1 w-fit"
                  >
                    {benefit.highlight}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-start pt-0 -mt-4">
                <p className="text-muted-foreground text-center">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Testimonials Section */}
        <GoogleReviews />
        
        {/* Guarantee Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-accent/10 to-neon/10 rounded-2xl p-8 border-2 border-accent/20 max-w-5xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h3 className="text-3xl font-bold mb-8 text-primary">Our Promise to You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <div className="bg-white/50 rounded-xl p-5 border border-accent/10 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-neon/20 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-primary">Perfect Design</h4>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3">
                  Visualize First
                </Badge>
                <p className="text-sm text-muted-foreground">3D rendering to see everything in advance</p>
              </div>

              <div className="bg-white/50 rounded-xl p-5 border border-accent/10 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-neon/20 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-primary">Professional Installation</h4>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3">
                  Certified experts
                </Badge>
                <p className="text-sm text-muted-foreground">Done right, every time</p>
              </div>

              <div className="bg-white/50 rounded-xl p-5 border border-accent/10 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-neon/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-primary">3-Year Warranty</h4>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3">
                  Quality guaranteed
                </Badge>
                <p className="text-sm text-muted-foreground">Professional quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}