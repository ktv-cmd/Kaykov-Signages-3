import { useQuoteForm } from "@/components/QuoteFormProvider";
import { trackCtaClick } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// Import office case images
import officeImage1 from "@/assets/outdoor /cases in office /1 K2 letter.JPG";
import officeImage2 from "@/assets/outdoor /cases in office /2 Front lid _2.JPG";
import officeImage3 from "@/assets/outdoor /cases in office /3 Y1 letter.JPG";
import officeImage4 from "@/assets/outdoor /cases in office /4 K2.JPG";
import officeImage5 from "@/assets/outdoor /cases in office /5 o letter.JPG";
import officeImage6 from "@/assets/outdoor /cases in office /6 y letter.JPG";
import officeImage7 from "@/assets/outdoor /cases in office /7 Km2.JPG";
import officeImage8 from "@/assets/outdoor /cases in office /8 m letter.JPG";
import officeImage9 from "@/assets/outdoor /cases in office /9 KAY_3629.JPG";
import officeImage10 from "@/assets/outdoor /cases in office /10 D letter.JPG";
import officeImage11 from "@/assets/outdoor /cases in office /11 I letter.JPG";
import officeImage12 from "@/assets/outdoor /cases in office /12 KAY_3639.JPG";

const officeImages = [
  officeImage1,
  officeImage2,
  officeImage3,
  officeImage4,
  officeImage5,
  officeImage6,
  officeImage7,
  officeImage8,
  officeImage9,
  officeImage10,
  officeImage11,
  officeImage12
];

export default function OfficeShowroom() {
  const { openForm } = useQuoteForm();

  return (
    <>
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🏢 Our Showroom
          </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
            If You Want to See signages in person
          </h2>
            <p className="hidden sm:block text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 px-4">
              Visit our office to see our work up close and get inspired for your next signage project.
            </p>
            <p className="sm:hidden text-sm text-muted-foreground max-w-2xl mx-auto mb-4 px-4">
              Visit our office to see our work in person.
            </p>
          <a 
            href="https://www.google.com/maps?rlz=1C5CHFA_en&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIQCAEQLhivARjHARiABBiOBTIHCAIQABiABDIICAMQABgWGB4yCggEEAAYgAQYogQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyNDc2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KTuFqosbXsKJMdy8z4sCviVl&daddr=77-40+164th+St,+Queens,+NY+11366"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-wrap items-center justify-center gap-2 text-accent hover:text-accent/80 font-semibold text-base sm:text-lg transition-colors duration-300 text-center max-w-full px-4 leading-snug"
          onClick={() =>
            trackCtaClick({
              ctaId: "office_showroom_directions",
              ctaText: "Get Directions to Our Office",
              location: "office_showroom",
              destination: "https://www.google.com/maps?rlz=1C5CHFA_en&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIQCAEQLhivARjHARiABBiOBTIHCAIQABiABDIICAMQABgWGB4yCggEEAAYgAQYogQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyNDc2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KTuFqosbXsKJMdy8z4sCviVl&daddr=77-40+164th+St,+Queens,+NY+11366",
              ctaType: "directions",
            })
          }
          >
            📍 Get Directions to Our Office →
          </a>
        </div>
        
        {/* First Row - 6 images */}
        <div className="grid grid-cols-6 gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-2 sm:mb-3 md:mb-4">
          {officeImages.slice(0, 6).map((image, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img 
                src={image} 
                alt={`Office showroom ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
        
        {/* Second Row - 6 images */}
          <div className="grid grid-cols-6 gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-12">
          {officeImages.slice(6, 12).map((image, index) => (
            <div 
              key={index + 6}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img 
                src={image} 
                alt={`Office showroom ${index + 7}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
          
          {/* CTA Button */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="cta"
              size="lg"
              className="text-lg px-10 py-6 rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
              onClick={() =>
                openForm({
                  ctaId: "office_showroom_quote",
                  ctaText: "Get a Custom Quote",
                  location: "office_showroom_cta",
                })
              }
            >
              Get a Custom Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 rounded-xl !bg-transparent border-2 border-primary text-primary hover:!bg-primary hover:text-white transition-all duration-300 hover:scale-105"
              onClick={() => { window.location.href = "/ai" }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Design My Sign with AI →
            </Button>
          </div>
      </div>
    </section>
    </>
  );
}
