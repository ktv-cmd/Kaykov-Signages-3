import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, CheckCircle, Clock, Shield, Headphones, Star, CreditCard, Wrench, Palette, Calendar, Lightbulb, Zap, Building } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceGallery from "@/components/ServiceGallery";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ApplicationForm from "@/components/ApplicationForm";
import Process from "@/components/Process";
import GoogleReviews from "@/components/GoogleReviews";
import Contact from "@/components/Contact";

// Import outdoor signage images
import threeDSignImage from "@/assets/3d-sign.jpg";
import aluminumSignImage from "@/assets/aluminum-sign.jpg";
import vinylBannerImage from "@/assets/vinyl-banner.jpg";
import realEstatePostImage from "@/assets/real-estate-post.jpg";
import digitalLedImage from "@/assets/digital-led.jpg";
import yardSignsImage from "@/assets/yard-signs.jpg";
import lightboxImage from "@/assets/lightbox.jpg";
import ledNeonImage from "@/assets/led-neon.jpg";
import heroImage from "@/assets/hero-signage.jpg";
import menuBoardImage from "@/assets/menu-board.jpg";

const outdoorServices = [
  // 3D Premium Signages
  {
    category: "3D Premium Signages",
    title: "3D Letters - LED Light",
    description: "Illuminated dimensional letters for maximum visibility",
    features: ["LED backlighting", "Weather resistant", "Custom colors", "10-year warranty"],
    price: "Starting at $850",
    image: threeDSignImage,
    icon: Lightbulb,
    popular: true,
    gallery: [
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" },
      { src: threeDSignImage, alt: "3D Letters - LED Light" }
    ]
  },
  {
    category: "3D Premium Signages",
    title: "3D Letters - No Light",
    description: "Dimensional letters without lighting for clean aesthetics",
    features: ["Premium materials", "Custom finishes", "Weather resistant", "Professional mounting"],
    price: "Starting at $450",
    image: threeDSignImage,
    icon: Building,
    gallery: [
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" },
      { src: threeDSignImage, alt: "3D Letters - No Light" }
    ]
  },
  {
    category: "3D Premium Signages",
    title: "Light Box or Logo",
    description: "Illuminated signage boxes with custom graphics",
    features: ["Even LED lighting", "Changeable graphics", "Energy efficient", "Slim profile"],
    price: "Starting at $650",
    image: lightboxImage,
    icon: Lightbulb,
    featured: true,
    gallery: [
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" },
      { src: lightboxImage, alt: "Light Box or Logo" }
    ]
  },
  {
    category: "3D Premium Signages",
    title: "Neon Sign",
    description: "Modern LED neon-style signage for eye-catching appeal",
    features: ["Flexible LED strips", "Custom colors & effects", "Remote control", "Safe operation"],
    price: "Starting at $350",
    image: ledNeonImage,
    icon: Zap,
    gallery: [
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" },
      { src: ledNeonImage, alt: "Neon Sign" }
    ]
  },
  
  // 2D Signages
  {
    category: "2D Signages",
    title: "Flat Signage",
    description: "Versatile flat signs in various materials",
    features: ["Multiple materials", "Custom sizes", "UV resistant", "Professional finish"],
    image: aluminumSignImage,
    gallery: [
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" },
      { src: aluminumSignImage, alt: "Flat Signage" }
    ]
  },
  {
    category: "2D Signages",
    title: "Hanging Signage",
    description: "Suspended signs for storefronts and entrances",
    features: ["Professional mounting", "Weather resistant", "Custom designs", "Multiple sizes"],
    image: vinylBannerImage,
    gallery: [
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" },
      { src: vinylBannerImage, alt: "Hanging Signage" }
    ]
  },
  {
    category: "2D Signages",
    title: "Awning Signage",
    description: "Custom awning signs for storefronts and businesses",
    features: ["Weather resistant", "Custom colors", "Professional installation", "Durable materials"],
    image: aluminumSignImage,
    gallery: [
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" },
      { src: aluminumSignImage, alt: "Awning Signage" }
    ]
  },
  {
    category: "2D Signages",
    title: "Window Signage",
    description: "Window graphics and decals for storefronts",
    features: ["See-through design", "Easy application", "Removable", "Custom shapes"],
    image: vinylBannerImage,
    gallery: [
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" },
      { src: vinylBannerImage, alt: "Window Signage" }
    ]
  },
  {
    category: "2D Signages",
    title: "Wall Decals",
    description: "Custom wall graphics and decals for branding",
    features: ["Easy application", "Removable", "Custom designs", "Multiple sizes"],
    image: menuBoardImage,
    gallery: [
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" },
      { src: menuBoardImage, alt: "Wall Decals" }
    ]
  },
  {
    category: "2D Signages",
    title: "Pole Signage",
    description: "Freestanding pole signs for businesses",
    features: ["Durable construction", "Custom heights", "Professional mounting", "Weather resistant"],
    image: aluminumSignImage,
    gallery: [
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" },
      { src: aluminumSignImage, alt: "Pole Signage" }
    ]
  },
  {
    category: "2D Signages",
    title: "Yard & Real Estate Signs",
    description: "Great for campaigns, real estate, and professional property signs with frames",
    features: ["Professional mounting", "Weather resistant", "Custom designs", "Multiple sizes"],
    image: realEstatePostImage,
    gallery: [
      { src: yardSignsImage, alt: "Yard & Real Estate Signs" },
      { src: realEstatePostImage, alt: "Yard & Real Estate Signs" },
      { src: yardSignsImage, alt: "Yard & Real Estate Signs" },
      { src: realEstatePostImage, alt: "Yard & Real Estate Signs" },
      { src: yardSignsImage, alt: "Yard & Real Estate Signs" },
      { src: realEstatePostImage, alt: "Yard & Real Estate Signs" },
      { src: yardSignsImage, alt: "Yard & Real Estate Signs" },
      { src: realEstatePostImage, alt: "Yard & Real Estate Signs" }
    ]
  },
  {
    category: "2D Signages",
    title: "A-Frame Signage",
    description: "Portable A-frame signs for events and promotions",
    features: ["Portable design", "Weather resistant", "Double-sided", "Easy setup"],
    image: yardSignsImage,
    gallery: [
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" },
      { src: yardSignsImage, alt: "A-Frame Signage" }
    ]
  },
  {
    category: "2D Signages",
    title: "Projector Signage",
    description: "Digital projection signage for events and displays",
    features: ["High resolution", "Remote control", "Custom content", "Energy efficient"],
    image: digitalLedImage,
    gallery: [
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" },
      { src: digitalLedImage, alt: "Projector Signage" }
    ]
  }
];

export default function OutdoorSignages() {
  const [selectedGallery, setSelectedGallery] = useState<{ images: Array<{ src: string; alt: string }>; title: string } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const mouseMoveHandlers = useRef<Map<HTMLElement, (e: MouseEvent) => void>>(new Map());

  const openGallery = (images: Array<{ src: string; alt: string }>, title: string) => {
    if (images && images.length > 0) {
      setSelectedGallery({ images, title });
    }
  };

  const closeGallery = () => {
    setSelectedGallery(null);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const handleMove = (ev: MouseEvent) => {
      const x = ev.clientX - centerX;
      const y = ev.clientY - centerY;
      const rotateX = (y / rect.height) * -15;
      const rotateY = (x / rect.width) * 15;
      card.style.transform = `translateY(-12px) scale(1.03) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(225, 29, 72, 0.3)';
    };
    
    mouseMoveHandlers.current.set(card, handleMove);
    card.addEventListener('mousemove', handleMove);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const handler = mouseMoveHandlers.current.get(card);
    if (handler) {
      card.removeEventListener('mousemove', handler);
      mouseMoveHandlers.current.delete(card);
    }
    card.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0) rotateY(0)';
    card.style.boxShadow = '';
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-white">

      {/* Header */}
      <header className="relative z-50 sticky top-0 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-primary hover:text-accent transition-all duration-300 group">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-semibold group-hover:scale-105 transition-transform duration-300">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.open('tel:+17184784200', '_self')}
                className="text-lg px-8 py-4 rounded-lg backdrop-blur-md bg-white/20 border-white/30 text-primary hover:bg-white/30 hover:border-white/50 hover:scale-105 transition-all duration-300 shadow-md"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Outdoor signage background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 bg-accent/90 backdrop-blur-sm text-accent-foreground border-accent/50">
            Outdoor Signage Specialists
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Outdoor Signs That
            <span className="block bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">Stand Out</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Weather-resistant, durable outdoor signage designed to attract customers and withstand the elements. 
            From small yard signs to large architectural displays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-10 py-6 rounded-lg shadow-2xl shadow-black/30 hover:shadow-3xl hover:shadow-black/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              onClick={() => setIsFormOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-10 py-6 rounded-lg shadow-2xl shadow-accent/30 hover:shadow-3xl hover:shadow-accent/40 hover:scale-105 transition-all duration-300" 
              onClick={() => window.open('tel:+17184784200', '_self')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* 3D Premium Signages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-primary text-center">3D Premium Signages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      {service.icon && (
                        <div className="w-12 h-12 bg-gradient-to-r from-accent to-neon rounded-lg flex items-center justify-center mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-accent/50">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  <CardHeader className="text-center bg-white/50 group-hover:bg-white/70 transition-all duration-500">
                    <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white/30 group-hover:bg-white/50 transition-all duration-500">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-accent rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section After 3D Signages */}
          <div className="my-16 text-center">
            <div className="max-w-md mx-auto">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 px-10 py-6 rounded-lg font-medium text-base w-full"
                onClick={() => setIsFormOpen(true)}
              >
                Get a Custom Quote
              </Button>
            </div>
          </div>

          {/* 2D Signages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-primary text-center">2D Signages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outdoorServices.filter(service => service.category === "2D Signages").map((service, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 overflow-hidden cursor-pointer bg-white/95 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-[1.02] ${
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section After 2D Signages */}
          <div className="my-16 text-center">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-none hover:shadow-[0_4px_30px_rgba(0,0,0,0.15)] max-w-xl mx-auto border relative overflow-hidden animate-cta-block transition-shadow duration-300">
              {/* Subtle animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-900 tracking-tight animate-fade-in-up">
                  Found something you like?
                </h3>
                <p className="text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed animate-fade-in-up-delay">
                  We can make it for your company
                </p>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-accent text-white hover:bg-gray-900 border-2 border-white transition-all duration-300 px-10 py-6 rounded-lg font-medium text-base relative group !shadow-none w-full"
                  style={{ 
                    animation: 'fade-in-up 0.6s ease-out 0.4s forwards',
                    animationFillMode: 'forwards',
                    opacity: 0,
                    boxShadow: 'none !important'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.setProperty('box-shadow', '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)', 'important');
                    e.currentTarget.style.setProperty('background-color', '#111827', 'important');
                    e.currentTarget.style.setProperty('transform', 'scale(1)', 'important');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('box-shadow', 'none', 'important');
                    e.currentTarget.style.setProperty('background-color', 'hsl(var(--accent))', 'important');
                    e.currentTarget.style.setProperty('transform', 'scale(1)', 'important');
                  }}
                  onClick={() => setIsFormOpen(true)}
                >
                  Get a Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Smooth. Creative. High Quality. */}
      <Process />

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Why Clients Choose Us Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-accent/10 via-accent/5 to-neon/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-accent border-accent/30 bg-white">
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
              <Card key={index} className="group hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 border-2 hover:border-accent/40 h-80 flex flex-col bg-white/95 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
                <CardHeader className="text-center flex-grow">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 via-accent/15 to-neon/15 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-500">
                    <benefit.icon className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-accent transition-colors duration-300">{benefit.title}</CardTitle>
                  <div className="flex justify-center mb-0">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-accent/15 to-neon/10 text-accent border-accent/30 text-xs font-semibold px-4 py-1.5 w-fit rounded-lg shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300"
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
        </div>
      </section>

      {/* Our Promise Section - Apple Style */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 border border-gray-200/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]">
              <Shield className="w-20 h-20 mx-auto mb-8 text-accent" />
              <h3 className="text-4xl font-bold mb-12 text-primary tracking-tight">Our Promise to You</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/10 to-neon/10 rounded-2xl flex items-center justify-center">
                    <Palette className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold text-xl mb-3 text-primary tracking-tight">Perfect Design</h4>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-4 text-xs font-medium">
                    Visualize First
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">3D rendering to see everything in advance</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/10 to-neon/10 rounded-2xl flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold text-xl mb-3 text-primary tracking-tight">Professional Installation</h4>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-4 text-xs font-medium">
                    Certified experts
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">Done right, every time</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/10 to-neon/10 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold text-xl mb-3 text-primary tracking-tight">3-Year Warranty</h4>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-4 text-xs font-medium">
                    Quality guaranteed
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">Professional quality guaranteed</p>
                </div>
              </div>
            </div>
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

          {/* Application Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-lg p-2 transition-all duration-200 hover:scale-110"
                  aria-label="Close form"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="max-h-[95vh] overflow-y-auto">
                  <ApplicationForm />
                </div>
              </div>
            </div>
          )}

          {/* Get Started Today Section */}
          <Contact />

           {/* Floating Contact Buttons */}
           <FloatingContactButtons />

           {/* Apple Style Animations */}
           <style>{`
             @keyframes fade-in-up {
               from {
                 opacity: 0;
                 transform: translateY(10px);
               }
               to {
                 opacity: 1;
                 transform: translateY(0);
               }
             }
             
             @keyframes cta-block {
               from {
                 opacity: 0;
                 transform: translateY(20px) scale(0.98);
               }
               to {
                 opacity: 1;
                 transform: translateY(0) scale(1);
               }
             }
             
             .animate-fade-in-up {
               animation: fade-in-up 0.6s ease-out forwards;
             }
             
             .animate-fade-in-up-delay {
               animation: fade-in-up 0.6s ease-out 0.2s forwards;
               opacity: 0;
             }
             
             .animate-cta-block {
               animation: cta-block 0.8s ease-out forwards;
             }
           `}</style>
         </div>
       );
     }