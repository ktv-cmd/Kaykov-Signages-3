import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Store, Home, Car, Users, Utensils, MapPin, Monitor } from "lucide-react";

// Import use case images
import officeLobbyImage from "@/assets/office-lobby-sign.jpg";
import yardSignsImage from "@/assets/yard-signs.jpg";
import menuBoardImage from "@/assets/menu-board.jpg";
import tradeShowBannerImage from "@/assets/trade-show-banner.jpg";
import wayfindingSignsImage from "@/assets/wayfinding-signs.jpg";
import digitalLedImage from "@/assets/digital-led.jpg";

const useCases = [
  {
    icon: Building2,
    title: "Corporate & Offices",
    description: "Professional signage for business environments",
    image: officeLobbyImage,
    examples: [
      "Reception area signs",
      "Directory boards", 
      "Conference room signs",
      "Company logos",
      "Safety & compliance signs"
    ]
  },
  {
    icon: Store,
    title: "Retail & Storefronts",
    description: "Eye-catching signs that drive foot traffic",
    image: digitalLedImage,
    examples: [
      "Storefront signs",
      "Window graphics",
      "Sale banners",
      "Digital displays",
      "Hours of operation"
    ]
  },
  {
    icon: Utensils,
    title: "Restaurants & Food",
    description: "Appetizing signage for the food industry",
    image: menuBoardImage,
    examples: [
      "Menu boards",
      "A-frame sidewalk signs",
      "Drive-thru signs",
      "Specials displays",
      "Food truck graphics"
    ]
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Professional property marketing signs",
    image: yardSignsImage,
    examples: [
      "For sale signs",
      "Open house banners",
      "Realtor branding",
      "Property features",
      "Directional arrows"
    ]
  },
  {
    icon: Users,
    title: "Events & Trade Shows",
    description: "Portable and impactful event signage",
    image: tradeShowBannerImage,
    examples: [
      "Booth displays",
      "Step and repeat backdrops",
      "Registration banners",
      "Sponsor recognition",
      "Directional signage"
    ]
  },
  {
    icon: MapPin,
    title: "Wayfinding & Safety",
    description: "Clear navigation and safety compliance",
    image: wayfindingSignsImage,
    examples: [
      "Directional signs",
      "Emergency exits",
      "Parking signs",
      "Building directories",
      "ADA compliance signs"
    ]
  }
];

const industries = [
  {
    name: "Healthcare",
    signs: ["Patient room signs", "Wayfinding", "Safety compliance", "Reception signs"]
  },
  {
    name: "Education", 
    signs: ["Campus directories", "Classroom signs", "Event banners", "Safety signs"]
  },
  {
    name: "Manufacturing",
    signs: ["Safety signs", "Equipment labels", "Warehouse signs", "Compliance displays"]
  },
  {
    name: "Hospitality",
    signs: ["Welcome signs", "Room numbers", "Event displays", "Amenity signs"]
  },
  {
    name: "Automotive",
    signs: ["Service bay signs", "Promotional banners", "Parts displays", "Safety signs"]
  },
  {
    name: "Non-Profit",
    signs: ["Fundraising banners", "Event signage", "Donor recognition", "Awareness campaigns"]
  }
];

export default function UseCases() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🎯 Perfect For Every Need
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Signage Solutions That Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional signage solutions tailored to your specific needs and environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg">{useCase.title}</h3>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-base mb-4">{useCase.description}</CardDescription>
                <div className="space-y-2">
                  <p className="font-medium text-sm text-muted-foreground">Common applications:</p>
                  <ul className="space-y-1">
                    {useCase.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}