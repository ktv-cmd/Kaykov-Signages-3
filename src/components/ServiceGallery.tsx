import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";

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
  const [mouseStart, setMouseStart] = useState(0);
  const [mouseEnd, setMouseEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [thumbnailDragStart, setThumbnailDragStart] = useState(0);
  const [thumbnailScrollStart, setThumbnailScrollStart] = useState(0);
  const [isThumbnailDragging, setIsThumbnailDragging] = useState(false);
  const thumbnailDragDistanceRef = useRef(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setImageLoaded(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Close form when gallery closes
      setIsFormOpen(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-scroll thumbnails to center current image
  useEffect(() => {
    if (!isOpen) return;
    
    const thumbnailContainer = document.querySelector('[data-thumbnail-container]') as HTMLElement;
    if (!thumbnailContainer) return;

    const thumbnails = thumbnailContainer.querySelectorAll('button');
    if (thumbnails[currentIndex]) {
      const thumbnail = thumbnails[currentIndex] as HTMLElement;
      const containerRect = thumbnailContainer.getBoundingClientRect();
      const thumbnailRect = thumbnail.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const thumbnailCenter = thumbnailRect.left + thumbnailRect.width / 2;
      
      // Calculate scroll offset to center the thumbnail
      const scrollOffset = thumbnailCenter - containerCenter;
      thumbnailContainer.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isOpen]);

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

  // Mouse handlers for drag/swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const offset = currentX - mouseStart;
    setDragOffset(offset);
    setMouseEnd(currentX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && images.length > 1) {
      prevImage();
    }
    
    setIsDragging(false);
    setMouseStart(0);
    setMouseEnd(0);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: 'hsl(var(--primary) / 0.75)',
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
          className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-lg p-2 transition-all duration-200 hover:scale-110"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Image Area - 16:10 Aspect Ratio */}
        <div 
          className="relative w-full bg-black cursor-grab active:cursor-grabbing" 
          style={{ aspectRatio: '16/10' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-primary animate-pulse" />
          )}
          
          <div 
            className="relative w-full h-full"
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            <img
              src={images[currentIndex]?.src || ''}
              alt={images[currentIndex]?.alt || serviceTitle}
              className={`w-full h-full object-contain transition-opacity duration-300 select-none ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error('Image failed to load:', images[currentIndex]?.src);
                setImageLoaded(true); // Show error state
              }}
              loading="lazy"
              draggable={false}
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-lg p-2 transition-all duration-200 hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-lg p-2 transition-all duration-200 hover:scale-110 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="bg-white border-t border-border p-2 sm:p-4">
            {/* Desktop: Full thumbnails with smooth scrolling */}
            <div 
              data-thumbnail-container
              className="hidden min-[400px]:flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scroll-smooth cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--accent)) transparent',
              }}
              onMouseDown={(e) => {
                const container = e.currentTarget;
                setThumbnailDragStart(e.clientX);
                setThumbnailScrollStart(container.scrollLeft);
                thumbnailDragDistanceRef.current = 0;
                setIsThumbnailDragging(true);
              }}
              onMouseMove={(e) => {
                if (!isThumbnailDragging) return;
                const container = e.currentTarget;
                const deltaX = e.clientX - thumbnailDragStart;
                thumbnailDragDistanceRef.current = Math.abs(deltaX);
                container.scrollLeft = thumbnailScrollStart - deltaX;
              }}
              onMouseUp={() => {
                setIsThumbnailDragging(false);
                // Reset after a short delay to allow onClick to check
                setTimeout(() => {
                  thumbnailDragDistanceRef.current = 0;
                }, 100);
              }}
              onMouseLeave={() => {
                setIsThumbnailDragging(false);
                thumbnailDragDistanceRef.current = 0;
              }}
            >
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Prevent click if user was dragging
                    if (thumbnailDragDistanceRef.current > 5) return;
                    setImageLoaded(false);
                    setCurrentIndex(index);
                    
                    // Center the clicked thumbnail
                    setTimeout(() => {
                      const thumbnailContainer = document.querySelector('[data-thumbnail-container]') as HTMLElement;
                      if (!thumbnailContainer) return;
                      
                      const thumbnail = e.currentTarget as HTMLElement;
                      const containerRect = thumbnailContainer.getBoundingClientRect();
                      const thumbnailRect = thumbnail.getBoundingClientRect();
                      const containerCenter = containerRect.left + containerRect.width / 2;
                      const thumbnailCenter = thumbnailRect.left + thumbnailRect.width / 2;
                      
                      // Calculate scroll offset to center the thumbnail
                      const scrollOffset = thumbnailCenter - containerCenter;
                      thumbnailContainer.scrollBy({
                        left: scrollOffset,
                        behavior: 'smooth'
                      });
                    }, 10);
                  }}
                  className={`flex-shrink-0 transition-all duration-200 rounded-lg overflow-hidden cursor-pointer w-12 h-12 sm:w-[72px] sm:h-[72px] ${
                    index === currentIndex
                      ? 'ring-2 ring-accent ring-offset-1 sm:ring-offset-2 scale-105 shadow-lg'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img
                    src={img.src || ''}
                    alt={img.alt || serviceTitle}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Thumbnail failed to load:', img.src);
                    }}
                    draggable={false}
                  />
                </button>
              ))}
            </div>
            
            {/* Mobile: Swipeable chips (<400px) */}
            <div 
              className="flex min-[400px]:hidden gap-2 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--accent)) transparent',
              }}
            >
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageLoaded(false);
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 transition-all duration-200 rounded-lg px-3 py-1.5 text-xs font-medium snap-center cursor-pointer ${
                    index === currentIndex
                      ? 'bg-accent text-white shadow-md scale-105'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA Block */}
        <div className="bg-white border-t border-border p-6">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Want to see your business featured here? Get a quote and we'll add your project to our gallery.
          </p>
          <div className="flex justify-center items-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsFormOpen(true);
              }}
              className="bg-accent hover:opacity-90 px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Get a Quick Quote
            </Button>
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

      {/* Application Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="!max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
              <ApplicationForm onClose={() => setIsFormOpen(false)} inDialog={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
