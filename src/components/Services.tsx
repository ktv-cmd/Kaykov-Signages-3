import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Palette, Building, Car, Home, Lightbulb, Phone, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServiceGallery from "./ServiceGallery";
import RequestCallModal from "./RequestCallModal";
import MessagingOptions from "./MessagingOptions";
import ApplicationForm from "./ApplicationForm";

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
import heroSignageImage from "@/assets/hero-signage.jpg";

const premiumServices = [{
  icon: Lightbulb,
  title: "Outdoor Letters",
  description: "Dimensional and bold signage that makes a statement",
  features: ["Custom depth & thickness", "Premium materials", "LED integration available"],
  image: threeDSignImage,
  gallery: [
    { src: threeDSignImage, alt: "Outdoor Letters example 1" },
    { src: threeDSignImage, alt: "Outdoor Letters example 2" },
    { src: threeDSignImage, alt: "Outdoor Letters example 3" }
  ]
}, {
  icon: Building,
  title: "Indoor Letters",
  description: "Sleek, professional signs perfect for businesses",
  features: ["Crystal clear finish", "Weather resistant", "Day & night visibility"],
  image: acrylicStorefrontImage,
  gallery: [
    { src: acrylicStorefrontImage, alt: "Indoor Letters example 1" },
    { src: acrylicStorefrontImage, alt: "Indoor Letters example 2" },
    { src: acrylicStorefrontImage, alt: "Indoor Letters example 3" }
  ]
}, {
  icon: Zap,
  title: "LED Neon Signs",
  description: "Fun, vibrant, modern lighting solutions",
  features: ["Energy efficient", "Custom colors", "Remote control options"],
  image: ledNeonImage,
  gallery: [
    { src: ledNeonImage, alt: "LED Neon Sign example 1" },
    { src: ledNeonImage, alt: "LED Neon Sign example 2" },
    { src: ledNeonImage, alt: "LED Neon Sign example 3" }
  ]
}, {
  icon: Lightbulb,
  title: "Light Boxes",
  description: "Always visible, day or night illuminated signs",
  features: ["Uniform lighting", "Changeable graphics", "Energy efficient LEDs"],
  image: lightboxImage,
  gallery: [
    { src: lightboxImage, alt: "Light Box example 1" },
    { src: lightboxImage, alt: "Light Box example 2" },
    { src: lightboxImage, alt: "Light Box example 3" }
  ]
}];
const affordableServices = [{
  title: "Window Signage",
  description: "Perfect for events, promotions, and grand openings",
  image: vinylBannerImage,
  gallery: [
    { src: vinylBannerImage, alt: "Window Signage example 1" },
    { src: vinylBannerImage, alt: "Window Signage example 2" },
    { src: vinylBannerImage, alt: "Window Signage example 3" }
  ]
}, {
  title: "Flat Signage",
  description: "Durable outdoor option built to last",
  image: aluminumSignImage,
  gallery: [
    { src: aluminumSignImage, alt: "Flat Signage example 1" },
    { src: aluminumSignImage, alt: "Flat Signage example 2" },
    { src: aluminumSignImage, alt: "Flat Signage example 3" }
  ]
}, {
  title: "Wall Decals",
  description: "Restaurant specials and food displays",
  image: menuBoardImage,
  gallery: [
    { src: menuBoardImage, alt: "Wall Decals example 1" },
    { src: menuBoardImage, alt: "Wall Decals example 2" },
    { src: menuBoardImage, alt: "Wall Decals example 3" }
  ]
}, {
  title: "Car Wraps & Signs",
  description: "Advertise everywhere you go",
  image: carWrapImage,
  gallery: [
    { src: carWrapImage, alt: "Car Wrap example 1" },
    { src: carWrapImage, alt: "Car Wrap example 2" },
    { src: carWrapImage, alt: "Car Wrap example 3" }
  ]
}, {
  title: "Wayfinding Signs",
  description: "Directional and safety compliance signage",
  image: wayfindingSignsImage,
  gallery: [
    { src: wayfindingSignsImage, alt: "Wayfinding Sign example 1" },
    { src: wayfindingSignsImage, alt: "Wayfinding Sign example 2" },
    { src: wayfindingSignsImage, alt: "Wayfinding Sign example 3" }
  ]
}, {
  title: "A-Frame Signage",
  description: "Custom cut, see-through, or blackout options",
  image: yardSignsImage,
  gallery: [
    { src: yardSignsImage, alt: "A-Frame Signage example 1" },
    { src: yardSignsImage, alt: "A-Frame Signage example 2" },
    { src: yardSignsImage, alt: "A-Frame Signage example 3" }
  ]
}, {
  title: "Yard & Real Estate Signs",
  description: "Great for campaigns, real estate, and professional property signs with frames",
  image: realEstatePostImage,
  gallery: [
    { src: yardSignsImage, alt: "Yard Sign example 1" },
    { src: realEstatePostImage, alt: "Real Estate Signage example 1" },
    { src: yardSignsImage, alt: "Yard Sign example 2" },
    { src: realEstatePostImage, alt: "Real Estate Signage example 2" }
  ]
}, {
  title: "Pole Signages",
  description: "Freestanding pole-mounted signs for maximum visibility",
  image: aluminumSignImage,
  gallery: [
    { src: aluminumSignImage, alt: "Pole Signage example 1" },
    { src: aluminumSignImage, alt: "Pole Signage example 2" },
    { src: aluminumSignImage, alt: "Pole Signage example 3" }
  ]
}];
export default function Services() {
  const [selectedGallery, setSelectedGallery] = useState<{ images: Array<{ src: string; alt: string }>; title: string } | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openGallery = (images: Array<{ src: string; alt: string }>, title: string) => {
    if (images && images.length > 0) {
      setSelectedGallery({ images, title });
    }
  };

  const closeGallery = () => {
    setSelectedGallery(null);
  };
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Premium Signs Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💎 Premium Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">3D Signages</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            When you want to impress, go big. Our premium signs use cutting-edge materials and lighting to make your brand unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {premiumServices.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
              onClick={() => openGallery(service.gallery, service.title)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-neon rounded-lg flex items-center justify-center mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-accent/50">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
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
        
        {/* CTA Section After 3D Signages - Apple Style */}
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
        
        {/* Affordable Signs Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🎨 Affordable Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            2D Signage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, effective, and budget-friendly options that deliver professional results without breaking the bank.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {affordableServices.map((service, index) => {
            // Check if this is Car Wraps & Signs - make it link to car-wraps page
            const isCarWraps = service.title === "Car Wraps & Signs";
            
            if (isCarWraps) {
              return (
                <Link key={index} to="/car-wraps" className="block">
                  <Card 
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full"
                  >
                    {service.image ? (
                      <div className="relative h-40 overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-20 bg-gradient-to-r from-secondary to-secondary/50 flex items-center justify-center">
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            }
            
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => service.gallery.length > 0 && openGallery(service.gallery, service.title)}
              >
                {service.image ? (
                  <div className="relative h-40 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ) : (
                  <div className="h-20 bg-gradient-to-r from-secondary to-secondary/50 flex items-center justify-center">
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
          
          {/* CTA Block - Right of Pole Signages */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-none hover:shadow-[0_4px_30px_rgba(0,0,0,0.15)] border relative overflow-hidden animate-cta-block transition-shadow duration-300 h-full flex flex-col justify-center">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 tracking-tight animate-fade-in-up">
                Found something you like?
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed animate-fade-in-up-delay">
                We can make it for your company
              </p>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-accent text-white hover:bg-gray-900 border-2 border-white transition-all duration-300 px-8 py-5 rounded-lg font-medium text-sm relative group !shadow-none w-full"
                style={{ 
                  animation: 'fade-in-up 0.6s ease-out 0.4s forwards',
                  animationFillMode: 'forwards',
                  opacity: 0,
                  boxShadow: 'none !important'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('box-shadow', '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)', 'important');
                  e.currentTarget.style.setProperty('background-color', '#111827', 'important');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('box-shadow', 'none', 'important');
                  e.currentTarget.style.setProperty('background-color', 'hsl(var(--accent))', 'important');
                }}
                onClick={() => setIsFormOpen(true)}
              >
                Get a Custom Quote
              </Button>
            </div>
          </div>
        </div>
        
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
          
          @keyframes button-pulse {
            0%, 100% {
              box-shadow: none !important;
            }
            50% {
              box-shadow: none !important;
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }
          
          .animate-fade-in-up-delay {
            animation: fade-in-up 0.6s ease-out 0.2s forwards;
            opacity: 0;
          }
          
          .animate-fade-in-up-delay-2 {
            opacity: 0;
            animation: fade-in-up 0.6s ease-out 0.4s forwards;
            animation-fill-mode: forwards;
          }
          
          .animate-fade-in-up-delay-2.animate-button-pulse {
            opacity: 1;
          }
          
          .animate-cta-block {
            animation: cta-block 0.8s ease-out forwards;
          }
          
          .animate-button-pulse {
            animation: button-pulse 2s ease-in-out infinite;
            animation-delay: 1s;
          }
        `}</style>
      </div>

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

      {/* Application Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-lg p-2 transition-all duration-200 hover:scale-110"
              aria-label="Close form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ApplicationForm />
          </div>
        </div>
      )}
    </section>
  );
}