import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Palette, Building, Car, Home, Lightbulb } from "lucide-react";

// Import sign images
import threeDSignImage from "@/assets/3d-sign.jpg";
import acrylicStorefrontImage from "@/assets/acrylic-storefront.jpg";
import ledNeonImage from "@/assets/led-neon.jpg";
import lightboxImage from "@/assets/lightbox.jpg";
import vinylBannerImage from "@/assets/vinyl-banner.jpg";
import aluminumSignImage from "@/assets/aluminum-sign.jpg";
import carWrapImage from "@/assets/car-wrap.jpg";
import realEstatePostImage from "@/assets/real-estate-post.jpg";
import yardSignsImage from "@/assets/yard-signs.jpg";
import menuBoardImage from "@/assets/menu-board.jpg";
import tradeShowBannerImage from "@/assets/trade-show-banner.jpg";
import wayfindingSignsImage from "@/assets/wayfinding-signs.jpg";
import digitalLedImage from "@/assets/digital-led.jpg";

const premiumServices = [
  {
    icon: Lightbulb,
    title: "3D Signs",
    description: "Dimensional and bold signage that makes a statement",
    features: ["Custom depth & thickness", "Premium materials", "LED integration available"],
    image: threeDSignImage
  },
  {
    icon: Building,
    title: "Acrylic Storefront Signs",
    description: "Sleek, professional signs perfect for businesses",
    features: ["Crystal clear finish", "Weather resistant", "Day & night visibility"],
    image: acrylicStorefrontImage
  },
  {
    icon: Zap,
    title: "LED Neon Signs",
    description: "Fun, vibrant, modern lighting solutions",
    features: ["Energy efficient", "Custom colors", "Remote control options"],
    image: ledNeonImage
  },
  {
    icon: Lightbulb,
    title: "Light Boxes",
    description: "Always visible, day or night illuminated signs",
    features: ["Uniform lighting", "Changeable graphics", "Energy efficient LEDs"],
    image: lightboxImage
  }
];

const affordableServices = [
  {
    title: "Vinyl Banners",
    description: "Perfect for events, promotions, and grand openings",
    price: "From $45",
    image: vinylBannerImage
  },
  {
    title: "Aluminum Signs",
    description: "Durable outdoor option built to last",
    price: "From $65",
    image: aluminumSignImage
  },
  {
    title: "Yard Signs",
    description: "Great for campaigns and real estate",
    price: "From $25",
    image: yardSignsImage
  },
  {
    title: "Car Wraps & Signs",
    description: "Advertise everywhere you go",
    price: "From $150",
    image: carWrapImage
  },
  {
    title: "Menu Boards",
    description: "Restaurant specials and food displays",
    price: "From $85",
    image: menuBoardImage
  },
  {
    title: "Trade Show Displays",
    description: "Portable event and exhibition signage",
    price: "From $125",
    image: tradeShowBannerImage
  },
  {
    title: "Wayfinding Signs",
    description: "Directional and safety compliance signage",
    price: "From $55",
    image: wayfindingSignsImage
  },
  {
    title: "Digital LED Signs",
    description: "Programmable electronic message displays",
    price: "From $350",
    image: digitalLedImage
  },
  {
    title: "Vinyl Stickers",
    description: "Custom cut, see-through, or blackout options",
    price: "From $15"
  },
  {
    title: "Real Estate Posts",
    description: "Professional property signs with frames",
    price: "From $85",
    image: realEstatePostImage
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
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <CardHeader className="text-center">
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
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              {service.image ? (
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge variant="secondary" className="absolute top-4 right-4 text-accent font-semibold bg-white/90">
                    {service.price}
                  </Badge>
                </div>
              ) : (
                <div className="h-20 bg-gradient-to-r from-secondary to-secondary/50 flex items-center justify-center">
                  <Badge variant="secondary" className="text-accent font-semibold">
                    {service.price}
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-accent/10 to-neon/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              From simple 2D signs to stunning 3D illuminated displays, we create signage that gets noticed and drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" className="text-lg px-8 py-4" asChild>
                <a href="/apply">Get Started Today</a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}