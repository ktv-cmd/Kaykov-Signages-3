import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    title: "Multiple Support Channels",
    description: "Support by Chat, WhatsApp, AI Assistant, or Phone - however you prefer to communicate.",
    highlight: "24/7 support"
  },
  {
    icon: Star,
    title: "Perfect Design Guarantee",
    description: "Custom design with unlimited revisions until you absolutely love your sign.",
    highlight: "Unlimited revisions"
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
            We don't just make signs - we create partnerships. Here's what makes Kaykov Media different.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent/10 to-neon/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  {benefit.highlight}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💬 Client Reviews
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            What Our Clients Say
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-2 hover:border-accent/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg italic text-muted-foreground">
                  "{testimonial.text}"
                </blockquote>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-muted-foreground">{testimonial.business}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Guarantee Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-accent/10 to-neon/10 rounded-2xl p-8 border-2 border-accent/20 max-w-4xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h3 className="text-3xl font-bold mb-4 text-primary">Our Promise to You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">3-Year Warranty</p>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">Professional Installation</p>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">Secure Payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}