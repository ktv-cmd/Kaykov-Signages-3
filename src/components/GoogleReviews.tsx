import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll use mock data
    // Replace this with actual API call once you have Google Places API key
    setTimeout(() => {
      const mockReviews: GoogleReview[] = [
        {
          author_name: "Sarah Chen",
          rating: 5,
          text: "Kaykov Media transformed our shop. The LED sign brings us customers even at night!",
          time: Date.now() - 86400000 * 5, // 5 days ago
          relative_time_description: "5 days ago"
        },
        {
          author_name: "Michael Rodriguez",
          rating: 5,
          text: "Professional, fast, and easy to work with. Our office sign looks amazing.",
          time: Date.now() - 86400000 * 12,
          relative_time_description: "2 weeks ago"
        },
        {
          author_name: "Moshe Borukh",
          rating: 5,
          text: "Great work. Fast and efficient. Very reasonably priced as well. Good communication.",
          time: Date.now() - 86400000 * 20,
          relative_time_description: "3 weeks ago"
        }
      ];
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💬 Client Reviews
          </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

    return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💬 Client Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            See what our satisfied customers have to say about their experience with Kaykov Media.
          </p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {reviews.map((review, index) => (
          <Card 
            key={index} 
              className="bg-white border-2 hover:border-accent/20 transition-all duration-300 animate-fade-in h-full flex flex-col"
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: 1
            }}
          >
              <CardHeader className="flex-grow">
                <div className="flex items-center mb-4 gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                "{review.text.length > 150 ? `${review.text.substring(0, 150)}...` : review.text}"
              </blockquote>
            </CardHeader>
              <CardContent className="pt-0">
              <div className="text-sm">
                <p className="font-semibold text-primary">{review.author_name}</p>
                <p className="text-muted-foreground">{review.relative_time_description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* See All Reviews Button */}
        <div className="text-center mt-12">
        <Button 
          variant="outline" 
          size="lg"
          className="text-lg px-8 py-4"
          onClick={() => window.open('https://www.google.com/search?q=kaykov+media#lrd=0x89c25e1b8baa853b:0x6525be028bcfbcdc,1', '_blank')}
        >
          <Star className="w-5 h-5 mr-2" />
          See All Reviews on Google
        </Button>
      </div>
    </div>
    </section>
  );
}
