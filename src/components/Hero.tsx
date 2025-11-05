import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-signage.jpg";
import ApplicationForm from "./ApplicationForm";

export default function Hero() {
  const location = useLocation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Custom Signs That Bring Your{" "}
            <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
              Brand to Life
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Whether you need a bold storefront sign, a sleek office display, or eye-catching outdoor banners, 
            we design, create, and install signage that gets you noticed.
          </p>
          
          {/* CTA Buttons */}
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

          {/* Service Navigation Buttons */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Explore Our Solutions</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/outdoor-signages">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`text-lg px-8 py-4 rounded-lg backdrop-blur-md transition-all duration-500 font-medium ${
                    location.pathname === '/outdoor-signages' 
                      ? '!bg-primary !text-white !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl shadow-black/30 scale-105' 
                      : '!bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl hover:shadow-black/30 hover:scale-105'
                  }`}
                >
                  Outdoor Signages
                </Button>
              </Link>
              <Link to="/indoor-signages">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`text-lg px-8 py-4 rounded-lg backdrop-blur-md transition-all duration-500 font-medium ${
                    location.pathname === '/indoor-signages' 
                      ? '!bg-primary !text-white !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl shadow-black/30 scale-105' 
                      : '!bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl hover:shadow-black/30 hover:scale-105'
                  }`}
                >
                  Indoor Signages
                </Button>
              </Link>
              <Link to="/car-wraps">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`text-lg px-8 py-4 rounded-lg backdrop-blur-md transition-all duration-500 font-medium ${
                    location.pathname === '/car-wraps' 
                      ? '!bg-primary !text-white !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl shadow-black/30 scale-105' 
                      : '!bg-white !text-primary !border-2 !border-white hover:!bg-primary hover:!text-white hover:!border-2 hover:!border-white shadow-xl hover:shadow-black/30 hover:scale-105'
                  }`}
                >
                  Car Wraps
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-white transition-colors duration-300">Perfect Design</h3>
              <p className="text-white/90 text-sm group-hover:text-white/95 transition-colors duration-300">You're completely in love with</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-white transition-colors duration-300">Professional Installation</h3>
              <p className="text-white/90 text-sm group-hover:text-white/95 transition-colors duration-300">Done right, every time</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 h-32 flex flex-col justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 hover:bg-white/20 transition-all duration-500 group">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-white transition-colors duration-300">3-Year Warranty</h3>
              <p className="text-white/90 text-sm group-hover:text-white/95 transition-colors duration-300">Professional quality guaranteed</p>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
}