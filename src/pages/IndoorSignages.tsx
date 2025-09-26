import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Import indoor signage images
import acrylicStorefrontImage from "@/assets/acrylic-storefront.jpg";
import lightboxImage from "@/assets/lightbox.jpg";
import ledNeonImage from "@/assets/led-neon.jpg";
import menuBoardImage from "@/assets/menu-board.jpg";
import wayfindingSignsImage from "@/assets/wayfinding-signs.jpg";
import tradeShowBannerImage from "@/assets/trade-show-banner.jpg";

const indoorServices = [
  {
    title: "Acrylic Reception Signs",
    description: "Professional lobby and reception area signage",
    features: ["Crystal clear acrylic", "LED backlighting options", "Custom cut to shape", "Premium mounting hardware"],
    price: "Starting at $125",
    image: acrylicStorefrontImage,
    popular: true
  },
  {
    title: "LED Lightboxes",
    description: "Illuminated signs for maximum visibility",
    features: ["Even LED lighting", "Changeable graphics", "Energy efficient", "Slim profile design"],
    price: "Starting at $185",
    image: lightboxImage,
    featured: true
  },
  {
    title: "LED Neon Signs",
    description: "Modern neon-style lighting for atmosphere",
    features: ["Flexible LED strips", "Custom colors & effects", "Remote control", "Safe & cool operation"],
    price: "Starting at $95",
    image: ledNeonImage
  },
  {
    title: "Menu Boards",
    description: "Restaurant and cafe display boards",
    features: ["Easy-change graphics", "Magnetic options", "LED illumination", "Multiple sizes available"],
    price: "Starting at $85",
    image: menuBoardImage
  },
  {
    title: "Wayfinding Systems",
    description: "Directional and informational signage",
    features: ["ADA compliant options", "Modular system", "Custom color schemes", "Easy installation"],
    price: "Starting at $55",
    image: wayfindingSignsImage
  },
  {
    title: "Trade Show Displays",
    description: "Portable exhibition and event signage",
    features: ["Lightweight & portable", "Tool-free assembly", "High-quality graphics", "Carrying cases included"],
    price: "Starting at $125",
    image: tradeShowBannerImage
  }
];

const benefits = [
  {
    title: "Professional Appearance",
    description: "Create a polished, professional environment that impresses clients and customers."
  },
  {
    title: "Brand Consistency", 
    description: "Maintain your brand identity throughout your interior spaces with custom designs."
  },
  {
    title: "Easy Updates",
    description: "Many of our indoor signs allow for easy graphic changes and updates."
  },
  {
    title: "Energy Efficient",
    description: "Modern LED lighting solutions that save money on electricity costs."
  }
];

export default function IndoorSignages() {
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
            Indoor Signage Experts
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Interior Signs That
            <span className="block text-accent">Make an Impact</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/90">
            Professional indoor signage that enhances your brand, guides your customers, 
            and creates memorable experiences in any interior space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="w-5 h-5" />
              Free Design Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Browse Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why Choose Indoor Signage?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">Indoor Signage Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From elegant reception signs to functional wayfinding systems, we create interior signage that works perfectly for your space.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {indoorServices.map((service, index) => (
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
                    Request Quote
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
          <h2 className="text-4xl font-bold mb-6">Transform Your Interior Space</h2>
          <p className="text-xl mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
            Our indoor signage experts will help you create a cohesive, professional environment 
            that reflects your brand and guides your visitors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Phone className="w-5 h-5" />
              Call (555) 123-4567
            </Button>
            <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              <MessageCircle className="w-5 h-5" />
              Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}