import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Palette, Building, Car, Home, Lightbulb } from "lucide-react";
import { useState } from "react";
import ServiceGallery from "./ServiceGallery";
import RequestCallModal from "./RequestCallModal";
import MessagingOptions from "./MessagingOptions";

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
  price: "From $45",
  image: vinylBannerImage,
  gallery: [
    { src: vinylBannerImage, alt: "Window Signage example 1" },
    { src: vinylBannerImage, alt: "Window Signage example 2" },
    { src: vinylBannerImage, alt: "Window Signage example 3" }
  ]
}, {
  title: "Flat Signage",
  description: "Durable outdoor option built to last",
  price: "From $65",
  image: aluminumSignImage,
  gallery: [
    { src: aluminumSignImage, alt: "Flat Signage example 1" },
    { src: aluminumSignImage, alt: "Flat Signage example 2" },
    { src: aluminumSignImage, alt: "Flat Signage example 3" }
  ]
}, {
  title: "Yard Signs",
  description: "Great for campaigns and real estate",
  price: "From $25",
  image: yardSignsImage,
  gallery: [
    { src: yardSignsImage, alt: "Yard Sign example 1" },
    { src: yardSignsImage, alt: "Yard Sign example 2" },
    { src: yardSignsImage, alt: "Yard Sign example 3" }
  ]
}, {
  title: "Car Wraps & Signs",
  description: "Advertise everywhere you go",
  price: "From $150",
  image: carWrapImage,
  gallery: [
    { src: carWrapImage, alt: "Car Wrap example 1" },
    { src: carWrapImage, alt: "Car Wrap example 2" },
    { src: carWrapImage, alt: "Car Wrap example 3" }
  ]
}, {
  title: "Menu Boards",
  description: "Restaurant specials and food displays",
  price: "From $85",
  image: menuBoardImage,
  gallery: [
    { src: menuBoardImage, alt: "Menu Board example 1" },
    { src: menuBoardImage, alt: "Menu Board example 2" },
    { src: menuBoardImage, alt: "Menu Board example 3" }
  ]
}, {
  title: "Trade Show Displays",
  description: "Portable event and exhibition signage",
  price: "From $125",
  image: tradeShowBannerImage,
  gallery: [
    { src: tradeShowBannerImage, alt: "Trade Show Display example 1" },
    { src: tradeShowBannerImage, alt: "Trade Show Display example 2" },
    { src: tradeShowBannerImage, alt: "Trade Show Display example 3" }
  ]
}, {
  title: "Wayfinding Signs",
  description: "Directional and safety compliance signage",
  price: "From $55",
  image: wayfindingSignsImage,
  gallery: [
    { src: wayfindingSignsImage, alt: "Wayfinding Sign example 1" },
    { src: wayfindingSignsImage, alt: "Wayfinding Sign example 2" },
    { src: wayfindingSignsImage, alt: "Wayfinding Sign example 3" }
  ]
}, {
  title: "Digital LED Signs",
  description: "Programmable electronic message displays",
  price: "From $350",
  image: digitalLedImage,
  gallery: [
    { src: digitalLedImage, alt: "Digital LED Sign example 1" },
    { src: digitalLedImage, alt: "Digital LED Sign example 2" },
    { src: digitalLedImage, alt: "Digital LED Sign example 3" }
  ]
}, {
  title: "A-Frame Signage",
  description: "Custom cut, see-through, or blackout options",
  price: "From $15",
  gallery: []
}, {
  title: "Real Estate Signage",
  description: "Professional property signs with frames",
  price: "From $85",
  image: realEstatePostImage,
  gallery: [
    { src: realEstatePostImage, alt: "Real Estate Signage example 1" },
    { src: realEstatePostImage, alt: "Real Estate Signage example 2" },
    { src: realEstatePostImage, alt: "Real Estate Signage example 3" }
  ]
}];
export default function Services() {
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
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-accent/50">
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
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></div>
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
            2D Signage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, effective, and budget-friendly options that deliver professional results without breaking the bank.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {affordableServices.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => service.gallery.length > 0 && openGallery(service.gallery, service.title)}
            >
              {service.image ? (
                <div className="relative h-40 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
          <MessagingOptions 
            buttonText="Get Custom Quote"
            buttonVariant="cta"
            buttonSize="lg"
            className="text-lg px-8 py-4"
            showModal={true}
            onModalOpen={() => setIsCallModalOpen(true)}
          />
        </div>
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
    </section>
  );
}