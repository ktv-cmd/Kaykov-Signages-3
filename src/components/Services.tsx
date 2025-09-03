import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Palette, Building, Car, Home, Lightbulb } from "lucide-react";

const premiumServices = [
  {
    icon: Lightbulb,
    title: "3D Signs",
    description: "Dimensional and bold signage that makes a statement",
    features: ["Custom depth & thickness", "Premium materials", "LED integration available"]
  },
  {
    icon: Building,
    title: "Acrylic Storefront Signs",
    description: "Sleek, professional signs perfect for businesses",
    features: ["Crystal clear finish", "Weather resistant", "Day & night visibility"]
  },
  {
    icon: Zap,
    title: "LED Neon Signs",
    description: "Fun, vibrant, modern lighting solutions",
    features: ["Energy efficient", "Custom colors", "Remote control options"]
  },
  {
    icon: Lightbulb,
    title: "Light Boxes",
    description: "Always visible, day or night illuminated signs",
    features: ["Uniform lighting", "Changeable graphics", "Energy efficient LEDs"]
  }
];

const affordableServices = [
  {
    title: "Vinyl Banners",
    description: "Perfect for events, promotions, and grand openings",
    price: "From $45"
  },
  {
    title: "Aluminum Signs",
    description: "Durable outdoor option built to last",
    price: "From $65"
  },
  {
    title: "Yard Signs",
    description: "Great for campaigns and real estate",
    price: "From $25"
  },
  {
    title: "Car Wraps & Signs",
    description: "Advertise everywhere you go",
    price: "From $150"
  },
  {
    title: "Vinyl Stickers",
    description: "Custom cut, see-through, or blackout options",
    price: "From $15"
  },
  {
    title: "Real Estate Posts",
    description: "Professional property signs with frames",
    price: "From $85"
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Premium Signs Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💎 Premium Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            3D & Illuminated Signs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            When you want to impress, go big. Our premium signs use cutting-edge materials and lighting to make your brand unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {premiumServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Affordable Signs Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🎨 Affordable Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            2D Signage Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, effective, and budget-friendly options that deliver professional results without breaking the bank.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {affordableServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-accent font-semibold">
                    {service.price}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="cta" size="lg" className="text-lg px-8 py-4">
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}