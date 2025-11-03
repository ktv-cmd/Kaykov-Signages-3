import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Clock, Shield, Headphones, Star, CreditCard, Wrench, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceGallery from "@/components/ServiceGallery";
import RequestCallModal from "@/components/RequestCallModal";
import MessagingOptions from "@/components/MessagingOptions";

// Import outdoor signage images
import threeDSignImage from "@/assets/3d-sign.jpg";
import aluminumSignImage from "@/assets/aluminum-sign.jpg";
import vinylBannerImage from "@/assets/vinyl-banner.jpg";
import realEstatePostImage from "@/assets/real-estate-post.jpg";
import digitalLedImage from "@/assets/digital-led.jpg";
import yardSignsImage from "@/assets/yard-signs.jpg";
import lightboxImage from "@/assets/lightbox.jpg";
import ledNeonImage from "@/assets/led-neon.jpg";

const outdoorServices = [
  // 3D Premium Signages
  {
    category: "3D Premium Signages",
    title: "3D Letters - LED Light",
    description: "Illuminated dimensional letters for maximum visibility",
    features: ["LED backlighting", "Weather resistant", "Custom colors", "10-year warranty"],
    price: "Starting at $850",
    image: threeDSignImage,
    popular: true,
    gallery: [
      { src: threeDSignImage, alt: "3D Letters - LED Light example 1" },
      { src: threeDSignImage, alt: "3D Letters - LED Light example 2" },
      { src: threeDSignImage, alt: "3D Letters - LED Light example 3" }
    ]
  },
  {
    category: "3D Premium Signages",
    title: "3D Letters - No Light",
    description: "Dimensional letters without lighting for clean aesthetics",
    features: ["Premium materials", "Custom finishes", "Weather resistant", "Professional mounting"],
    price: "Starting at $450",
    image: threeDSignImage,
    gallery: [
      { src: threeDSignImage, alt: "3D Letters - No Light example 1" },
      { src: threeDSignImage, alt: "3D Letters - No Light example 2" },
      { src: threeDSignImage, alt: "3D Letters - No Light example 3" }
    ]
  },
  {
    category: "3D Premium Signages",
    title: "Light Box or Logo",
    description: "Illuminated signage boxes with custom graphics",
    features: ["Even LED lighting", "Changeable graphics", "Energy efficient", "Slim profile"],
    price: "Starting at $650",
    image: lightboxImage,
    featured: true,
    gallery: [
      { src: lightboxImage, alt: "Light Box or Logo example 1" },
      { src: lightboxImage, alt: "Light Box or Logo example 2" },
      { src: lightboxImage, alt: "Light Box or Logo example 3" }
    ]
  },
  {
    category: "3D Premium Signages",
    title: "Neon Sign",
    description: "Modern LED neon-style signage for eye-catching appeal",
    features: ["Flexible LED strips", "Custom colors & effects", "Remote control", "Safe operation"],
    price: "Starting at $350",
    image: ledNeonImage,
    gallery: [
      { src: ledNeonImage, alt: "Neon Sign example 1" },
      { src: ledNeonImage, alt: "Neon Sign example 2" },
      { src: ledNeonImage, alt: "Neon Sign example 3" }
    ]
  },
  
  // 2D Signages
  {
    category: "2D Signages",
    title: "Flat Signage",
    description: "Versatile flat signs in various materials",
    features: ["Multiple materials", "Custom sizes", "UV resistant", "Professional finish"],
    price: "Starting at $65",
    image: aluminumSignImage,
    gallery: [
      { src: aluminumSignImage, alt: "Flat Signage example 1" },
      { src: aluminumSignImage, alt: "Flat Signage example 2" },
      { src: aluminumSignImage, alt: "Flat Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "Real Estate Signage",
    description: "Professional property signs with frames",
    features: ["Steel frame construction", "Multiple panel options", "Branding customization", "Easy installation"],
    price: "Starting at $85",
    image: realEstatePostImage,
    gallery: [
      { src: realEstatePostImage, alt: "Real Estate Signage example 1" },
      { src: realEstatePostImage, alt: "Real Estate Signage example 2" },
      { src: realEstatePostImage, alt: "Real Estate Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "Hanging Signage",
    description: "Suspended signs for storefronts and entrances",
    features: ["Professional mounting", "Weather resistant", "Custom designs", "Multiple sizes"],
    price: "Starting at $125",
    image: vinylBannerImage,
    gallery: [
      { src: vinylBannerImage, alt: "Hanging Signage example 1" },
      { src: vinylBannerImage, alt: "Hanging Signage example 2" },
      { src: vinylBannerImage, alt: "Hanging Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "Window Signage",
    description: "Window graphics and decals for storefronts",
    features: ["See-through design", "Easy application", "Removable", "Custom shapes"],
    price: "Starting at $45",
    image: vinylBannerImage,
    gallery: [
      { src: vinylBannerImage, alt: "Window Signage example 1" },
      { src: vinylBannerImage, alt: "Window Signage example 2" },
      { src: vinylBannerImage, alt: "Window Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "A-Frame Signage",
    description: "Portable A-frame signs for events and promotions",
    features: ["Portable design", "Weather resistant", "Double-sided", "Easy setup"],
    price: "Starting at $95",
    image: yardSignsImage,
    gallery: [
      { src: yardSignsImage, alt: "A-Frame Signage example 1" },
      { src: yardSignsImage, alt: "A-Frame Signage example 2" },
      { src: yardSignsImage, alt: "A-Frame Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "Projector Signage",
    description: "Digital projection signage for events and displays",
    features: ["High resolution", "Remote control", "Custom content", "Energy efficient"],
    price: "Starting at $1,200",
    image: digitalLedImage,
    gallery: [
      { src: digitalLedImage, alt: "Projector Signage example 1" },
      { src: digitalLedImage, alt: "Projector Signage example 2" },
      { src: digitalLedImage, alt: "Projector Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "Yard Signage",
    description: "Corrugated plastic signs for campaigns and events",
    features: ["Lightweight & portable", "Weather resistant", "Full color printing", "Stakes included"],
    price: "Starting at $25",
    image: yardSignsImage,
    gallery: [
      { src: yardSignsImage, alt: "Yard Signage example 1" },
      { src: yardSignsImage, alt: "Yard Signage example 2" },
      { src: yardSignsImage, alt: "Yard Signage example 3" }
    ]
  },
  {
    category: "2D Signages",
    title: "Pole Signage",
    description: "Freestanding pole signs for businesses",
    features: ["Durable construction", "Custom heights", "Professional mounting", "Weather resistant"],
    price: "Starting at $185",
    image: aluminumSignImage,
    gallery: [
      { src: aluminumSignImage, alt: "Pole Signage example 1" },
      { src: aluminumSignImage, alt: "Pole Signage example 2" },
      { src: aluminumSignImage, alt: "Pole Signage example 3" }
    ]
  }
];

export default function OutdoorSignages() {
  const [selectedGallery, setSelectedGallery] = useState<{ images: Array<{ src: string; alt: string }>; title: string } | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const openGallery = (images: Array<{ src: string; alt: string }>, title: string) => {
    if (images && images.length > 0) {
      setSelectedGallery({ images, title });
    }
  };

  const closeGallery = () => {
    setSelectedGallery(null);
  };

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
              <Button variant="outline" size="sm" onClick={() => window.open('tel:+17184784200', '_self')}>
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button variant="default" size="sm" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp Quote
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
            <Button variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => window.open('tel:+17184784200', '_self')}>
              <Phone className="w-5 h-5" />
              Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
              WhatsApp Quote
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
          
          {/* 3D Premium Signages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-primary text-center">3D Premium Signages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {outdoorServices.filter(service => service.category === "3D Premium Signages").map((service, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] ${
                    service.popular ? 'ring-2 ring-accent' : ''
                  } ${service.featured ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => service.gallery && openGallery(service.gallery, service.title)}
                >
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
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary font-bold">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="bg-white/50 group-hover:bg-white/70 transition-all duration-500">
                    <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white/30 group-hover:bg-white/50 transition-all duration-500">
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <MessagingOptions 
                      buttonText="Get Quote"
                      buttonVariant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      showModal={true}
                      onModalOpen={() => setIsCallModalOpen(true)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 2D Signages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-primary text-center">2D Signages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outdoorServices.filter(service => service.category === "2D Signages").map((service, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] ${
                    service.popular ? 'ring-2 ring-accent' : ''
                  } ${service.featured ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => service.gallery && openGallery(service.gallery, service.title)}
                >
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
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary font-bold">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="bg-white/50 group-hover:bg-white/70 transition-all duration-500">
                    <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white/30 group-hover:bg-white/50 transition-all duration-500">
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <MessagingOptions 
                      buttonText="Get Quote"
                      buttonVariant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      showModal={true}
                      onModalOpen={() => setIsCallModalOpen(true)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Clients Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              💡 Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Why Clients Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just make signs - we create partnerships.<br />
              Here's what makes Kaykov Media different.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
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
            ].map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 border-2 hover:border-accent/40 h-80 flex flex-col bg-gradient-to-br from-white to-white/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
                <CardHeader className="text-center flex-grow">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 via-accent/15 to-neon/15 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-500">
                    <benefit.icon className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-accent transition-colors duration-300">{benefit.title}</CardTitle>
                  <div className="flex justify-center mb-0">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-accent/15 to-neon/10 text-accent border-accent/30 text-xs font-semibold px-4 py-1.5 w-fit rounded-full shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300"
                    >
                      {benefit.highlight}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-start pt-0 -mt-4">
                  <p className="text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Our Promise Section */}
          <div className="text-center mt-20">
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

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make Your Mark?</h2>
          <p className="text-xl mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
            Get a free consultation and quote for your outdoor signage project. 
            Our experts will help you choose the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => window.open('tel:+17184784200', '_self')}>
              <Phone className="w-5 h-5" />
              Call +1(718) 478-4200
            </Button>
            <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
              <MessageCircle className="w-5 h-5" />
              WhatsApp Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedGallery && (
        <ServiceGallery
          images={selectedGallery.images}
          serviceTitle={selectedGallery.title}
          isOpen={!!selectedGallery}
          onClose={closeGallery}
        />
      )}

      {/* Request Call Modal */}
      <RequestCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </div>
  );
}