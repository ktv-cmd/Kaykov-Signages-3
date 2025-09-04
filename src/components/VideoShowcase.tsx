import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Heart, Share, MessageCircle } from "lucide-react";

const videoReels = [
  {
    id: 1,
    title: "3D Illuminated Office Sign",
    description: "Premium lobby signage with LED backlighting",
    thumbnail: "/assets/office-lobby-sign.jpg",
    duration: "0:15",
    likes: 234,
    comments: 12
  },
  {
    id: 2,
    title: "Neon Bar Sign Installation",
    description: "Custom LED neon for nightlife venue",
    thumbnail: "/assets/led-neon.jpg", 
    duration: "0:12",
    likes: 189,
    comments: 8
  },
  {
    id: 3,
    title: "Car Wrap Process",
    description: "Full vehicle branding transformation",
    thumbnail: "/assets/car-wrap.jpg",
    duration: "0:30",
    likes: 445,
    comments: 23
  },
  {
    id: 4,
    title: "Menu Board Setup",
    description: "Restaurant digital menu installation",
    thumbnail: "/assets/menu-board.jpg",
    duration: "0:18",
    likes: 156,
    comments: 6
  },
  {
    id: 5,
    title: "Trade Show Display",
    description: "Portable exhibition booth setup",
    thumbnail: "/assets/trade-show-banner.jpg",
    duration: "0:25",
    likes: 298,
    comments: 15
  },
  {
    id: 6,
    title: "Real Estate Sign Install",
    description: "Professional property signage",
    thumbnail: "/assets/real-estate-post.jpg",
    duration: "0:08",
    likes: 123,
    comments: 4
  }
];

export default function VideoShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🎬 See Our Work in Action
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Behind the Scenes & Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch real installations, before & after transformations, and see how our signs make businesses stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {videoReels.map((reel) => (
            <Card key={reel.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30">
              <div className="relative">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-secondary/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <p className="text-muted-foreground font-medium">{reel.title}</p>
                      <p className="text-sm text-muted-foreground/70">{reel.description}</p>
                    </div>
                  </div>
                  
                  {/* Video overlay effects */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/70 text-white border-none">
                      {reel.duration}
                    </Badge>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Social media style bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{reel.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{reel.comments}</span>
                      </div>
                    </div>
                    <Share className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{reel.title}</h3>
                <p className="text-muted-foreground text-sm">{reel.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-accent/10 to-neon/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Ready to Create Your Success Story?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every sign tells a story. Let's create yours with professional design, quality materials, and expert installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="text-lg px-8 py-4" asChild>
              <a href="/apply">Start Your Project</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Chat with AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}