import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroImage from "@/assets/outdoor /hero-signage 14.30.46.jpg";
import ApplicationForm from "./ApplicationForm";

interface HeroProps {
  hideButtons?: boolean;
}

export default function Hero({ hideButtons = false }: HeroProps = {}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional custom signage and LED displays"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white w-full">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 sm:px-4">
            Custom Signs That Bring Your{" "}
            <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
              Brand to Life
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Illuminated, non-illuminated, interior, and outdoor signage<span className="hidden sm:inline"><br /></span>{" "}
            designed, built, and installed<span className="hidden sm:inline"><br /></span>{" "}
            to elevate your brand's identity everywhere it appears.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12 px-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-lg shadow-2xl shadow-black/30 hover:shadow-3xl hover:shadow-black/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm w-auto sm:w-auto"
              onClick={() => setIsFormOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get a Custom Quote
            </Button>
            <Button 
              variant="cta" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-lg shadow-2xl shadow-accent/30 hover:shadow-3xl hover:shadow-accent/40 hover:scale-105 transition-all duration-300 w-auto sm:w-auto" 
              onClick={() => window.open('https://wa.me/19179033458', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>

          {/* Service Navigation Buttons */}
          {!hideButtons && (
          <div className="mb-6 sm:mb-8 md:mb-12 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">Browse Our Signage Types</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-4 rounded-lg backdrop-blur-md transition-all duration-500 font-medium !bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl hover:shadow-black/30 hover:scale-105 w-auto sm:w-auto"
                onClick={() => {
                  const element = document.getElementById('outdoor-premium-collection');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Outdoor Signages
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-4 rounded-lg backdrop-blur-md transition-all duration-500 font-medium !bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl hover:shadow-black/30 hover:scale-105 w-auto sm:w-auto"
                onClick={() => {
                  const element = document.getElementById('interior-signages');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Indoor Signages
              </Button>
            </div>
          </div>
          )}
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center px-4">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 min-h-[100px] sm:h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
              <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">Perfect Design</h3>
              <p className="text-white/90 text-xs sm:text-sm group-hover:text-white/95 transition-colors duration-300">You'll love it before we build it</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 min-h-[100px] sm:h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
              <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">Professional Installation</h3>
              <p className="text-white/90 text-xs sm:text-sm group-hover:text-white/95 transition-colors duration-300">Done right, every time</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 min-h-[100px] sm:h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
              <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">3-Year Warranty</h3>
              <p className="text-white/90 text-xs sm:text-sm group-hover:text-white/95 transition-colors duration-300">Professional quality guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="!max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
          <ApplicationForm onClose={() => setIsFormOpen(false)} inDialog={true} />
        </DialogContent>
      </Dialog>
    </section>
  );
}