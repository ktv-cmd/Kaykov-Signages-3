import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Import outdoor signage images
import threeDSignImage from "@/assets/3d-sign.jpg";
import aluminumSignImage from "@/assets/aluminum-sign.jpg";
import vinylBannerImage from "@/assets/vinyl-banner.jpg";
import realEstatePostImage from "@/assets/real-estate-post.jpg";
import digitalLedImage from "@/assets/digital-led.jpg";
import yardSignsImage from "@/assets/yard-signs.jpg";

const outdoorServices = [
  {
    title: "3D Architectural Signs",
    description: "Bold dimensional signage for commercial buildings",
    features: ["Weather resistant materials", "LED backlighting available", "Custom depth options", "10-year warranty"],
    price: "Starting at $850",
    image: threeDSignImage,
    popular: true
  },
  {
    title: "Aluminum Signs",
    description: "Durable outdoor signs for lasting impact",
    features: ["Rust-proof aluminum", "UV-resistant printing", "Various sizes available", "Professional mounting"],
    price: "Starting at $65",
    image: aluminumSignImage
  },
  {
    title: "Digital LED Displays",
    description: "Programmable electronic message boards",
    features: ["Full color displays", "Remote programming", "Energy efficient", "24/7 visibility"],
    price: "Starting at $2,500",
    image: digitalLedImage,
    featured: true
  },
  {
    title: "Vinyl Banners",
    description: "Large format banners for events and promotions",
    features: ["Wind-resistant grommets", "Full color printing", "Various sizes", "Quick turnaround"],
    price: "Starting at $45",
    image: vinylBannerImage
  },
  {
    title: "Real Estate Posts",
    description: "Professional property signs with frames",
    features: ["Steel frame construction", "Multiple panel options", "Branding customization", "Easy installation"],
    price: "Starting at $85",
    image: realEstatePostImage
  },
  {
    title: "Yard Signs",
    description: "Corrugated plastic signs for campaigns and events",
    features: ["Lightweight & portable", "Weather resistant", "Full color printing", "Stakes included"],
    price: "Starting at $25",
    image: yardSignsImage
  }
];

export default function OutdoorSignages() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button variant="default" size="sm">
                <MessageCircle className="w-4 h-4" />
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 bg-accent text-accent-foreground">
            Outdoor Signage Specialists
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Outdoor Signs That
            <span className="block text-accent">Stand Out</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/90">
            Weather-resistant, durable outdoor signage designed to attract customers and withstand the elements. 
            From small yard signs to large architectural displays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="w-5 h-5" />
              Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">Outdoor Signage Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional outdoor signs built to last, designed to impress, and priced to fit your budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outdoorServices.map((service, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
                service.popular ? 'ring-2 ring-accent' : ''
              } ${service.featured ? 'ring-2 ring-primary' : ''}`}>
                {(service.popular || service.featured) && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="default" className={service.popular ? 'bg-accent' : 'bg-primary'}>
                      {service.popular ? 'Most Popular' : 'Featured'}
                    </Badge>
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary font-bold">
                      {service.price}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make Your Mark?</h2>
          <p className="text-xl mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
            Get a free consultation and quote for your outdoor signage project. 
            Our experts will help you choose the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Phone className="w-5 h-5" />
              Call (555) 123-4567
            </Button>
            <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              <MessageCircle className="w-5 h-5" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}