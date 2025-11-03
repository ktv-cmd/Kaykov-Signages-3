import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ServiceGalleryProps {
  images: GalleryImage[];
  serviceTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceGallery({ images, serviceTitle, isOpen, onClose }: ServiceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setImageLoaded(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, prevImage, nextImage]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && images.length > 1) {
      prevImage();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images || images.length === 0) return null;

  const whatsappUrl = "https://api.whatsapp.com/send/?phone=17184784200&text=Hello!%20I'm%20interested%20in%20your%20signage%20services.%20Can%20you%20add%20my%20case%3F";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 160ms ease-out',
      }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          width: '90vw',
          maxWidth: '720px',
          animation: 'scaleFadeIn 160ms ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Image Area - 16:10 Aspect Ratio */}
        <div className="relative w-full bg-black" style={{ aspectRatio: '16/10' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="bg-white border-t border-gray-200 p-4">
            {/* Desktop: Full thumbnails */}
            <div className="hidden min-[400px]:flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageLoaded(false);
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 transition-all duration-200 rounded-lg overflow-hidden ${
                    index === currentIndex
                      ? 'ring-2 ring-[#E11D48] ring-offset-2 scale-105'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{
                    width: '72px',
                    height: '72px',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Mobile: Swipeable chips (<400px) */}
            <div className="flex min-[400px]:hidden gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageLoaded(false);
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 transition-all duration-200 rounded-full px-3 py-1.5 text-xs font-medium snap-center ${
                    index === currentIndex
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA Block */}
        <div className="bg-white border-t border-gray-200 p-6">
          <p className="text-sm text-gray-600 text-center mb-4">
            We're happy to add your case here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={() => window.open(whatsappUrl, '_blank')}
              className="bg-[#E11D48] hover:bg-[#E11D48]/90 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
            <button
              onClick={() => {
                // Add your quick quote handler here
                window.open('tel:+17184784200', '_self');
              }}
              className="text-sm text-gray-600 hover:text-[#E11D48] transition-colors duration-200 underline"
            >
              Get a Quick Quote
            </button>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scaleFadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
