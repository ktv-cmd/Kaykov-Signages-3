import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Building, Lightbulb, Layers } from "lucide-react";
import { useState } from "react";
import ServiceGallery from "./ServiceGallery";
import ApplicationForm from "./ApplicationForm";

// Light Boxes images - ALL images from light throug folder
import lightbox1 from "@/assets/outdoor /2d /light throug/Laundry loft .JPG";
import lightbox2 from "@/assets/outdoor /2d /light throug/1.jpg";
import lightbox3 from "@/assets/outdoor /2d /light throug/18.jpg";
import lightbox4 from "@/assets/outdoor /2d /light throug/3 11.jpg";
import lightbox5 from "@/assets/outdoor /2d /light throug/3D outdoor no light.jpg";
import lightbox6 from "@/assets/outdoor /2d /light throug/4 2.jpg";
import lightbox7 from "@/assets/outdoor /2d /light throug/6.jpg";
import lightbox8 from "@/assets/outdoor /2d /light throug/Oral Sergery.JPG";
import lightbox9 from "@/assets/outdoor /2d /light throug/light box.jpg";
// Interior 3D LID indoor (with light) - ALL images from 3D LID indoor folder
import interiorWithLight1 from "@/assets/interiar /3D LID indoor/1 sweet.JPG";
import interiorWithLight2 from "@/assets/interiar /3D LID indoor/2 joe.JPG";
import interiorWithLight3 from "@/assets/interiar /3D LID indoor/3leviev.JPG";
import interiorWithLight4 from "@/assets/interiar /3D LID indoor/4 aldente.JPG";
import interiorWithLight5 from "@/assets/interiar /3D LID indoor/6 respect spa.JPG";
import interiorWithLight6 from "@/assets/interiar /3D LID indoor/7 UR.JPG";
import interiorWithLight7 from "@/assets/interiar /3D LID indoor/5.png";
// Interior 3D LID indoor images moved from back Lid folder
import interiorWithLight8 from "@/assets/interiar /3D LID indoor/2.jpg";
import interiorWithLight9 from "@/assets/interiar /3D LID indoor/3 3.jpg";
import interiorWithLight10 from "@/assets/interiar /3D LID indoor/5 2.jpg";
import interiorWithLight11 from "@/assets/interiar /3D LID indoor/fack lid.jpg";
// Interior 3D Letters Indoor (without light) - ALL images from 3d Letters Indoor folder
import interiorNoLight1 from "@/assets/interiar /3d Letters Indoor/1 tov.JPG";
import interiorNoLight2 from "@/assets/interiar /3d Letters Indoor/2 endodontic.jpg";
import interiorNoLight3 from "@/assets/interiar /3d Letters Indoor/2 tov2.JPG";
import interiorNoLight4 from "@/assets/interiar /3d Letters Indoor/3 Elliot Efraimoff.JPG";
import interiorNoLight5 from "@/assets/interiar /3d Letters Indoor/4Elliot.JPG";
import interiorNoLight6 from "@/assets/interiar /3d Letters Indoor/Shalom.JPG";
import interiorNoLight7 from "@/assets/interiar /3d Letters Indoor/jlgs.JPG";
import interiorNoLight8 from "@/assets/interiar /3d Letters Indoor/levy.jpg";
import interiorNoLight9 from "@/assets/interiar /3d Letters Indoor/mass.JPG";
import interiorNoLight10 from "@/assets/interiar /3d Letters Indoor/shimonov law.JPG";
import interiorNoLight11 from "@/assets/interiar /3d Letters Indoor/simply.JPG";
import interiorNoLight12 from "@/assets/interiar /3d Letters Indoor/smile.JPG";
import interiorNoLight13 from "@/assets/interiar /3d Letters Indoor/terkina.JPG";
import interiorNoLight14 from "@/assets/interiar /3d Letters Indoor/watch.JPG";
import interiorNoLight15 from "@/assets/interiar /3d Letters Indoor/indoor no light.jpg";
import interiorNoLight16 from "@/assets/interiar /3d Letters Indoor/indoorno lid.jpg";
// 3D not light images - ALL images from not light folder
import noLight1 from "@/assets/outdoor /3d signages /not light /no light 3d outdoor.jpg";
import noLight2 from "@/assets/outdoor /3d signages /not light /3 4.jpg";
import noLight3 from "@/assets/outdoor /3d signages /not light /Canarce.JPG";
import noLight4 from "@/assets/outdoor /3d signages /not light /Law office.JPG";
import noLight5 from "@/assets/outdoor /3d signages /not light /Medical Spa.JPG";
// LID Front Light images - ALL images from Front lid folder
import frontLid1 from "@/assets/outdoor /3d signages /Front lid /13.jpg";
import frontLid2 from "@/assets/outdoor /3d signages /Front lid /2 11.jpg";
import frontLid3 from "@/assets/outdoor /3d signages /Front lid /2 13.jpg";
import frontLid4 from "@/assets/outdoor /3d signages /Front lid /2 2.jpg";
import frontLid5 from "@/assets/outdoor /3d signages /Front lid /2 5.jpg";
import frontLid6 from "@/assets/outdoor /3d signages /Front lid /2 6.jpg";
import frontLid7 from "@/assets/outdoor /3d signages /Front lid /LVL UP.JPG";
import frontLid8 from "@/assets/outdoor /3d signages /Front lid /3 9.jpg";
import frontLid9 from "@/assets/outdoor /3d signages /Front lid /TOV Front .JPG";
import frontLid11 from "@/assets/outdoor /3d signages /Front lid /RGF home decore.JPG";
import frontLid12 from "@/assets/outdoor /3d signages /Front lid /Red Mango.JPG";
import frontLid13 from "@/assets/outdoor /3d signages /Front lid /Sweetlab.JPG";
// Front lid letter images (to be placed last)
import frontLidLetter1 from "@/assets/outdoor /3d signages /Front lid /A letter.JPG";
import frontLidLetter2 from "@/assets/outdoor /3d signages /Front lid /K2 letter .JPG";
import frontLidLetter3 from "@/assets/outdoor /3d signages /Front lid /Km2 letter.JPG";
import frontLidLetter4 from "@/assets/outdoor /3d signages /Front lid /front lid letter.JPG";
import frontLidLetter5 from "@/assets/outdoor /3d signages /Front lid /m letter.JPG";
// LID Back Light images - ALL images from back Lid folder
import backLid1 from "@/assets/outdoor /3d signages /back Lid /1 Average Derm.jpg";
import backLid2 from "@/assets/outdoor /3d signages /back Lid /2 7.jpg";
import backLid3 from "@/assets/outdoor /3d signages /back Lid /2 8.jpg";
import backLid6 from "@/assets/outdoor /3d signages /back Lid /3 8.jpg";
import backLid7 from "@/assets/outdoor /3d signages /back Lid /4 4.jpg";
import backLid8 from "@/assets/outdoor /3d signages /back Lid /4.jpg";
import backLid10 from "@/assets/outdoor /3d signages /back Lid /5 3.jpg";
import backLid13 from "@/assets/outdoor /3d signages /back Lid /8.jpg";
import backLid16 from "@/assets/outdoor /3d signages /back Lid /Mad.JPG";
import backLid17 from "@/assets/outdoor /3d signages /back Lid /Michell calon .JPG";
import backLid18 from "@/assets/outdoor /3d signages /back Lid /Smile creators.JPG";
import backLid19 from "@/assets/outdoor /3d signages /back Lid /Ultimate creatore.JPG";
import backLid21 from "@/assets/outdoor /3d signages /back Lid /law back lid.jpg";
// Back lid letter images (to be placed last)
import backLidLetter1 from "@/assets/outdoor /3d signages /back Lid /D letter.JPG";
import backLidLetter2 from "@/assets/outdoor /3d signages /back Lid /K2 letter.JPG";
// LID Back and Front images - ALL images from back and front lid folder
import backAndFrontLid1 from "@/assets/outdoor /3d signages /back and front lid 16/Adams.jpg";
import backAndFrontLid3b from "@/assets/outdoor /3d signages /back and front lid 16/Abaev Law.jpg";
import backAndFrontLid4 from "@/assets/outdoor /3d signages /back Lid /Mullaev Law Group.JPG";
import backAndFrontLid7 from "@/assets/outdoor /3d signages /back and front lid 16/3 10.jpg";
import backAndFrontLid8 from "@/assets/outdoor /3d signages /back and front lid 16/3 7.jpg";
import backAndFrontLid9 from "@/assets/outdoor /3d signages /back and front lid 16/4 3.jpg";
import backAndFrontLid10 from "@/assets/outdoor /3d signages /back and front lid 16/5.jpg";
import backAndFrontLid11 from "@/assets/outdoor /3d signages /back and front lid 16/Front amd back lid .jpg";
import backAndFrontLid13 from "@/assets/outdoor /3d signages /back and front lid 16/back lid 1.jpg";
// Back and front lid letter images (to be placed last)
import backAndFrontLidLetter1 from "@/assets/outdoor /3d signages /back and front lid 16/A letter.JPG";
import backAndFrontLidLetter2 from "@/assets/outdoor /3d signages /back and front lid 16/I letter.JPG";
import backAndFrontLidLetter3 from "@/assets/outdoor /3d signages /back and front lid 16/o letter.JPG";
import backAndFrontLidLetter4 from "@/assets/outdoor /3d signages /back and front lid 16/y letter.JPG";
import backAndFrontLidLetter5 from "@/assets/outdoor /3d signages /back and front lid 16/Y1 letter.JPG";
// Window signage images
import windowOutdoor1 from "@/assets/outdoor /2d /window outdoor/Body language.JPG";
import windowOutdoor2 from "@/assets/outdoor /2d /window outdoor/Levy .JPG";
import windowOutdoor3 from "@/assets/outdoor /2d /window outdoor/Mediacal office.JPG";
import windowOutdoor4 from "@/assets/outdoor /2d /window outdoor/Mediacal spa.JPG";
import windowOutdoor5 from "@/assets/outdoor /2d /window outdoor/Meds.JPG";
import windowOutdoor6 from "@/assets/outdoor /2d /window outdoor/Michel Claon.JPG";
// Awning signage images - ALL images from awning signages folder
import awning1 from "@/assets/outdoor /2d /awning signages/awning 1.jpg";
import awning2 from "@/assets/outdoor /2d /awning signages/forest hills express cafe.JPG";
import awning3 from "@/assets/outdoor /2d /awning signages/mediacal office.JPG";
import awning4 from "@/assets/outdoor /2d /awning signages/2 10.jpg";
import awning5 from "@/assets/outdoor /2d /awning signages/7.jpg";
import awning6 from "@/assets/outdoor /2d /awning signages/Metropolitan smiles.JPG";

// 3D Signages - All 4 types in one array
const premiumServices = [{
  icon: Lightbulb,
  title: "Front Light Signs",
  description: "The lights shine through the front of your letters, making them super bright and easy to see. Perfect for when you want maximum visibility both during the day and at night.",
  features: ["Maximum brightness and visibility", "Premium quality materials", "Weather-resistant and durable", "Available in any color"],
  image: frontLid4,
  gallery: [
    { src: frontLid4, alt: "LID Front Light 1" },
    { src: frontLid1, alt: "LID Front Light 2" },
    { src: frontLid2, alt: "LID Front Light 3" },
    { src: frontLid3, alt: "LID Front Light 4" },
    { src: frontLid5, alt: "LID Front Light 5" },
    { src: frontLid6, alt: "LID Front Light 6" },
    { src: frontLid7, alt: "LID Front Light 7" },
    { src: frontLid8, alt: "LID Front Light 8" },
    { src: frontLid9, alt: "LID Front Light 9" },
    { src: frontLid11, alt: "LID Front Light 11" },
    { src: frontLid12, alt: "LID Front Light 12" },
    { src: frontLid13, alt: "LID Front Light 13" },
    { src: frontLidLetter1, alt: "Front Light Letter 1" },
    { src: frontLidLetter2, alt: "Front Light Letter 2" },
    { src: frontLidLetter3, alt: "Front Light Letter 3" },
    { src: frontLidLetter4, alt: "Front Light Letter 4" },
    { src: frontLidLetter5, alt: "Front Light Letter 5" }
  ]
}, {
  icon: Lightbulb,
  title: "Back Light Signs",
  description: "The lights shine from behind your letters, creating a beautiful glowing outline. This gives your sign an elegant look that stands out and catches eyes.",
  features: ["Beautiful glowing effect", "Premium quality materials", "Weather-resistant and durable", "Sleek, professional look"],
  image: backLid1,
  gallery: [
    { src: backLid1, alt: "LID Back Light 1" },
    { src: backLid2, alt: "LID Back Light 2" },
    { src: backLid3, alt: "LID Back Light 3" },
    { src: backLid6, alt: "LID Back Light 6" },
    { src: backLid7, alt: "LID Back Light 7" },
    { src: backLid8, alt: "LID Back Light 8" },
    { src: backLid10, alt: "LID Back Light 10" },
    { src: backLid13, alt: "LID Back Light 13" },
    { src: backLid16, alt: "LID Back Light 16" },
    { src: backLid17, alt: "LID Back Light 17" },
    { src: backLid18, alt: "LID Back Light 18" },
    { src: backLid19, alt: "LID Back Light 19" },
    { src: backLid21, alt: "LID Back Light 21" },
    { src: backLidLetter1, alt: "Back Light Letter 1" },
    { src: backLidLetter2, alt: "Back Light Letter 2" }
  ]
}, {
  icon: Lightbulb,
  title: "Both Sides Light Signs",
  description: "Lights shine on both the front and back of your letters, so your sign can be seen from every direction. Great for busy streets where people are coming from all sides.",
  features: ["Seen from all directions", "Maximum visibility", "Premium quality materials", "Weather-resistant and durable"],
  image: backAndFrontLid1,
  gallery: [
    { src: backAndFrontLid1, alt: "LID Back and Front 1" },
    { src: backAndFrontLid3b, alt: "LID Back and Front 2" },
    { src: backAndFrontLid4, alt: "LID Back and Front 5" },
    { src: backAndFrontLid7, alt: "LID Back and Front 8" },
    { src: backAndFrontLid8, alt: "LID Back and Front 9" },
    { src: backAndFrontLid9, alt: "LID Back and Front 10" },
    { src: backAndFrontLid10, alt: "LID Back and Front 11" },
    { src: backAndFrontLid11, alt: "LID Back and Front 12" },
    { src: backAndFrontLid13, alt: "LID Back and Front 14" },
    { src: backAndFrontLidLetter1, alt: "Back and Front Light Letter 1" },
    { src: backAndFrontLidLetter2, alt: "Back and Front Light Letter 2" },
    { src: backAndFrontLidLetter3, alt: "Back and Front Light Letter 3" },
    { src: backAndFrontLidLetter4, alt: "Back and Front Light Letter 4" },
    { src: backAndFrontLidLetter5, alt: "Back and Front Light Letter 5" }
  ]
}, {
  icon: Building,
  title: "3D Letters without light",
  description: "Raised letters that stick out from the wall, creating a bold 3D effect. No lights needed - these letters have a classic, professional look that always looks great.",
  features: ["Classic, timeless design", "Custom finishes available", "Weather-resistant and durable", "Professional installation included"],
  image: noLight1,
  gallery: [
    { src: noLight1, alt: "No Light 1" },
    { src: noLight2, alt: "No Light 2" },
    { src: noLight3, alt: "No Light 3" },
    { src: noLight4, alt: "No Light 4" },
    { src: noLight5, alt: "No Light 5" }
  ]
}];
const affordableServices = [{
  title: "Awning Signs",
  description: "Signs mounted on your storefront awning - perfect for storefronts and businesses",
  image: awning1,
  gallery: [
    { src: awning1, alt: "Awning Signage 1" },
    { src: awning2, alt: "Awning Signage 2" },
    { src: awning3, alt: "Awning Signage 3" },
    { src: awning4, alt: "Awning Signage 4" },
    { src: awning5, alt: "Awning Signage 5" },
    { src: awning6, alt: "Awning Signage 6" }
  ]
}, {
  title: "Window Signs",
  description: "Professional signs and graphics for your windows - attract customers walking by",
  image: windowOutdoor1,
  gallery: [
    { src: windowOutdoor1, alt: "Window Signage Outdoor 1" },
    { src: windowOutdoor2, alt: "Window Signage Outdoor 2" },
    { src: windowOutdoor3, alt: "Window Signage Outdoor 3" },
    { src: windowOutdoor4, alt: "Window Signage Outdoor 4" },
    { src: windowOutdoor5, alt: "Window Signage Outdoor 5" },
    { src: windowOutdoor6, alt: "Window Signage Outdoor 6" }
  ]
}, {
  title: "Light Box Signs",
  description: "Flat signs with LED lights behind - bright, clear, and perfect for any business",
  image: lightbox1,
  gallery: [
    { src: lightbox1, alt: "Light Box 1" },
    { src: lightbox2, alt: "Light Box 2" },
    { src: lightbox3, alt: "Light Box 3" },
    { src: lightbox4, alt: "Light Box 4" },
    { src: lightbox5, alt: "Light Box 5" },
    { src: lightbox6, alt: "Light Box 6" },
    { src: lightbox7, alt: "Light Box 7" },
    { src: lightbox8, alt: "Light Box 8" },
    { src: lightbox9, alt: "Light Box 9" }
  ]
}];

// Interior Signages
const interiorServices = [{
  title: "With Light",
  description: "LED-lit signs for inside your business - professional and eye-catching",
  image: interiorWithLight1,
  gallery: [
    { src: interiorWithLight1, alt: "Interior With Light 1" },
    { src: interiorWithLight2, alt: "Interior With Light 2" },
    { src: interiorWithLight3, alt: "Interior With Light 3" },
    { src: interiorWithLight4, alt: "Interior With Light 4" },
    { src: interiorWithLight5, alt: "Interior With Light 5" },
    { src: interiorWithLight6, alt: "Interior With Light 6" },
    { src: interiorWithLight7, alt: "Interior With Light 7" },
    { src: interiorWithLight8, alt: "Interior With Light 8" },
    { src: interiorWithLight9, alt: "Interior With Light 9" },
    { src: interiorWithLight10, alt: "Interior With Light 10" },
    { src: interiorWithLight11, alt: "Interior With Light 11" }
  ]
}, {
  title: "Without Light",
  description: "3D raised letters without lights - clean, elegant look for interior spaces",
  image: interiorNoLight1,
  gallery: [
    { src: interiorNoLight1, alt: "Interior Without Light 1" },
    { src: interiorNoLight2, alt: "Interior Without Light 2" },
    { src: interiorNoLight3, alt: "Interior Without Light 3" },
    { src: interiorNoLight4, alt: "Interior Without Light 4" },
    { src: interiorNoLight5, alt: "Interior Without Light 5" },
    { src: interiorNoLight6, alt: "Interior Without Light 6" },
    { src: interiorNoLight7, alt: "Interior Without Light 7" },
    { src: interiorNoLight8, alt: "Interior Without Light 8" },
    { src: interiorNoLight9, alt: "Interior Without Light 9" },
    { src: interiorNoLight10, alt: "Interior Without Light 10" },
    { src: interiorNoLight11, alt: "Interior Without Light 11" },
    { src: interiorNoLight12, alt: "Interior Without Light 12" },
    { src: interiorNoLight13, alt: "Interior Without Light 13" },
    { src: interiorNoLight14, alt: "Interior Without Light 14" },
    { src: interiorNoLight15, alt: "Interior Without Light 15" },
    { src: interiorNoLight16, alt: "Interior Without Light 16" }
  ]
}];
interface ServicesProps {
  hideInterior?: boolean;
  hideOutdoor?: boolean;
}

export default function Services({ hideInterior = false, hideOutdoor = false }: ServicesProps = {}) {
  const [selectedGallery, setSelectedGallery] = useState<{ images: Array<{ src: string; alt: string }>; title: string } | null>(null);
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
        {!hideOutdoor && (
        <>
        <div id="outdoor-premium-collection" className="text-center mb-16 scroll-mt-20">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💎 Premium Collection
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">Premium Outdoor Signs</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            When you want to impress, go big. Our premium signs use top-quality materials and LED lighting to make your brand stand out and attract customers.
          </p>
        </div>
        
        {/* 3D Signages - 4 images in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {premiumServices.map((service, index) => {
            const isLidService = index < 3; // First 3 are LID signages
            return (
            <Card 
              key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col
                  ${isLidService 
                    ? 'border-accent/60 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 hover:border-accent shadow-lg shadow-accent/20 hover:shadow-accent/40' 
                    : 'border-primary/20 hover:border-accent/40 bg-white/50'
                  }`}
              onClick={() => openGallery(service.gallery, service.title)}
            >
                <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isLidService 
                      ? 'bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 group-hover:via-black/60' 
                      : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 group-hover:via-black/50'
                  }`} />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg ${
                      isLidService 
                        ? 'bg-gradient-to-r from-accent to-neon group-hover:shadow-accent/70' 
                        : 'bg-gradient-to-r from-accent to-neon group-hover:shadow-accent/50'
                    }`}>
                    <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                      isLidService 
                        ? 'text-white group-hover:text-accent' 
                        : 'text-white group-hover:text-accent'
                    }`}>
                      {service.title}
                    </h3>
                  </div>
                </div>
                <CardHeader className={`text-center transition-all duration-500 ${
                  isLidService 
                    ? 'bg-gradient-to-b from-accent/10 to-transparent group-hover:from-accent/20' 
                    : 'bg-white/50 group-hover:bg-white/70'
                }`}>
                  <CardDescription className="text-base mt-2">{service.description}</CardDescription>
              </CardHeader>
                <CardContent className={`transition-all duration-500 flex-grow ${
                  isLidService 
                    ? 'bg-gradient-to-b from-transparent to-accent/5 group-hover:to-accent/10' 
                    : 'bg-white/30 group-hover:bg-white/50'
                }`}>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className={`w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 ${
                          isLidService ? 'bg-accent' : 'bg-accent'
                        }`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            );
          })}
        </div>
        
        {/* CTA Section After 3D Signages - Apple Style */}
        <div className="my-16 text-center">
          <div className="max-w-md mx-auto">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-gradient-to-r hover:from-accent hover:to-neon shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 px-10 py-6 rounded-lg font-medium text-base w-full"
              onClick={() => setIsFormOpen(true)}
            >
              Get a Custom Quote
            </Button>
        </div>
      </div>

        {/* Affordable Outdoor Signs Section */}
        <div className="mt-20 mb-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🎨 Affordable Options
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
            Affordable Outdoor Signs
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Quality outdoor signs that get noticed - perfect<br />
            for businesses looking for great value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {affordableServices.map((service, index) => (
              <Card 
                key={index} 
              className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => service.gallery.length > 0 && openGallery(service.gallery, service.title)}
              >
                {service.image ? (
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 group-hover:via-black/50 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  </div>
                ) : (
                <div className="h-64 bg-gradient-to-r from-secondary to-secondary/50 flex items-center justify-center">
                  </div>
                )}
              <CardHeader className="bg-white/50 group-hover:bg-white/70 transition-all duration-500">
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
          ))}
        </div>
        
        {/* CTA Button - Centered after Affordable Outdoor Collection */}
        <div className="my-16 text-center">
              <Button 
                variant="default" 
                size="lg" 
            className="bg-accent text-white hover:opacity-90 transition-all duration-300 px-8 py-5 rounded-lg font-medium text-lg"
                onClick={() => setIsFormOpen(true)}
              >
                Get a Custom Quote
              </Button>
            </div>
        </div>
        </>
        )}
        
        {/* Interior Signages Section */}
        {!hideInterior && (
        <div id="interior-signages" className="mt-20 mb-16 scroll-mt-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              🏢 Interior Signs
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
              Interior Signs
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Professional signs for inside your business - perfect for offices, retail spaces, and waiting areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {interiorServices.map((service, index) => {
              const isLightService = index === 0; // "With Light" service
              return (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col
                  ${isLightService 
                    ? 'border-accent/60 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 hover:border-accent shadow-lg shadow-accent/20 hover:shadow-accent/40' 
                    : 'border-primary/20 hover:border-accent/40 bg-white/50'
                  }`}
                onClick={() => service.gallery.length > 0 && openGallery(service.gallery, service.title)}
              >
                {service.image ? (
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      isLightService 
                        ? 'bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 group-hover:via-black/60' 
                        : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 group-hover:via-black/50'
                    }`} />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg ${
                        isLightService 
                          ? 'bg-gradient-to-r from-accent to-neon group-hover:shadow-accent/70' 
                          : 'bg-gradient-to-r from-accent to-neon group-hover:shadow-accent/50'
                      }`}>
                        {isLightService ? (
                          <Lightbulb className="w-6 h-6 text-white" />
                        ) : (
                          <Layers className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                        isLightService 
                          ? 'text-white group-hover:text-accent' 
                          : 'text-white group-hover:text-accent'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-r from-secondary to-secondary/50 flex items-center justify-center">
                  </div>
                )}
                <CardHeader className={`text-center transition-all duration-500 ${
                  isLightService 
                    ? 'bg-gradient-to-b from-accent/10 to-transparent group-hover:from-accent/20' 
                    : 'bg-white/50 group-hover:bg-white/70'
                }`}>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className={`transition-all duration-500 flex-grow ${
                  isLightService 
                    ? 'bg-gradient-to-b from-transparent to-accent/5 group-hover:to-accent/10' 
                    : 'bg-white/30 group-hover:bg-white/50'
                }`}>
                  {isLightService && (
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 bg-accent"></div>
                        Professional LED lighting
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 bg-accent"></div>
                        Premium quality materials
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 bg-accent"></div>
                        Eye-catching and professional
                      </li>
                    </ul>
                  )}
                  {!isLightService && (
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 bg-accent"></div>
                        Premium materials including acrylic, aluminum, metal and wood
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 bg-accent"></div>
                        A popular choice for elegant interior spaces
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-lg mr-2 group-hover:scale-150 transition-transform duration-300 bg-accent"></div>
                        Clean, professional appearance
                      </li>
                    </ul>
                  )}
                </CardContent>
              </Card>
              );
            })}
          </div>
          
          {/* CTA Button - Centered after Interior Signages */}
          <div className="my-16 text-center">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-accent text-white hover:opacity-90 transition-all duration-300 px-8 py-5 rounded-lg font-medium text-lg"
              onClick={() => setIsFormOpen(true)}
            >
              Get a Custom Quote
            </Button>
          </div>
        </div>
        )}
        
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

      {/* Application Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="!max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
          <ApplicationForm onClose={() => setIsFormOpen(false)} inDialog={true} />
        </DialogContent>
      </Dialog>
    </section>
  );
}