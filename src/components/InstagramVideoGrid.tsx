import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Loader2, ExternalLink } from "lucide-react";
import ApplicationForm from "./ApplicationForm";

export type InstagramVideoItem = {
  title: string;
  description?: string;
  videoSrc: string; // local video file path
  thumbnailSrc: string; // local preview image path
  alt: string;
  instagramUrl?: string; // optional link to the original Instagram reel/post
};

export type InstagramVideoGridProps = {
  items: InstagramVideoItem[];
  showHeader?: boolean;
};

export default function InstagramVideoGrid({ items, showHeader = true }: InstagramVideoGridProps) {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [loadingVideo, setLoadingVideo] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const handleVideoToggle = (index: number) => {
    if (playingVideo === index) {
      // Pause and hide video
      const video = videoRefs.current[index];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      setPlayingVideo(null);
      setLoadingVideo(null);
    } else {
      // Stop any currently playing video
      if (playingVideo !== null) {
        const currentVideo = videoRefs.current[playingVideo];
        if (currentVideo) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
        }
      }
      // Show loading state and start loading video
      setLoadingVideo(index);
      setPlayingVideo(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleVideoToggle(index);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Optional Header */}
        {showHeader && (
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              📹 Video Showcase
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Kaykov Signs – Video Showcase
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See our custom signage projects in action
            </p>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border-2 border-transparent hover:border-accent/40"
              onClick={() => handleVideoToggle(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-label={`${playingVideo === index ? "Pause" : "Play"} video: ${item.title}`}
            >
              {/* Video or Thumbnail Container */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                {playingVideo === index ? (
                  <>
                    {/* Loading Indicator */}
                    {loadingVideo === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                      </div>
                    )}
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={item.videoSrc}
                      poster={item.thumbnailSrc}
                      playsInline
                      autoPlay
                      muted
                      loop
                      preload="none"
                      className="w-full h-full object-cover bg-black cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const video = videoRefs.current[index];
                        if (video) {
                          if (video.paused) {
                            video.play().catch((err) => {
                              console.error("Error playing video:", err);
                            });
                          } else {
                            video.pause();
                          }
                        }
                      }}
                      onLoadStart={() => {
                        if (index === playingVideo) {
                          setLoadingVideo(index);
                        }
                      }}
                      onLoadedData={() => {
                        if (index === playingVideo) {
                          const video = videoRefs.current[index];
                          if (video) {
                            video.play().catch((err) => {
                              console.error("Error playing video:", err);
                              setLoadingVideo(null);
                            });
                          }
                        }
                      }}
                      onCanPlay={() => {
                        if (index === playingVideo) {
                          setLoadingVideo(null);
                          const video = videoRefs.current[index];
                          if (video && video.paused) {
                            video.play().catch((err) => {
                              console.error("Error playing video:", err);
                            });
                          }
                        }
                      }}
                      onWaiting={() => {
                        if (index === playingVideo) {
                          setLoadingVideo(index);
                        }
                      }}
                      onPlaying={() => {
                        if (index === playingVideo) {
                          setLoadingVideo(null);
                        }
                      }}
                      onEnded={() => {
                        // Loop video instead of closing
                        const video = videoRefs.current[index];
                        if (video) {
                          video.currentTime = 0;
                          video.play().catch((err) => {
                            console.error("Error playing video:", err);
                          });
                        }
                      }}
                      onError={(e) => {
                        console.error(`Failed to load video: ${item.videoSrc}`, e);
                        setPlayingVideo(null);
                        setLoadingVideo(null);
                      }}
                      style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={item.thumbnailSrc}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Title and Description */}
              {(item.title || item.description) && (
                <div className="p-4 bg-white/50 group-hover:bg-white/70 transition-all duration-500">
                  {item.title && (
                    <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.instagramUrl && (
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 mt-2 transition-colors duration-300"
                    >
                      View on Instagram
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Custom Quote Button Section */}
        {showHeader && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-accent to-neon text-white rounded-lg font-medium text-lg hover:opacity-90 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get a Custom Quote
            </Button>
          </div>
        )}
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

