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
  const [error, setError] = useState<string | null>(null);

  const PLACE_ID = "ChIJN1sRk9RYwokRqZEaxL8KhBs"; // Kaykov Media Place ID (will be fetched)
  const API_KEY = "YOUR_GOOGLE_PLACES_API_KEY"; // Needs to be replaced with actual API key

  const fetchGoogleReviews = async () => {
    try {
      // Alternative approach: Since direct API calls need API keys and proper setup,
      // We'll use a proxy service or embed method
      
      // For now, we'll use a mock API approach that you can replace with actual Google Places API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      
      if (data.result && data.result.reviews) {
        const top5Reviews = data.result.reviews.slice(0, 5);
        setReviews(top5Reviews);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      console.error('Error fetching Google reviews:', err);
    } finally {
      setLoading(false);
    }
  };

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
          author_name: "Jennifer Kim",
          rating: 5,
          text: "The car wrap exceeded our expectations. We get compliments everywhere we go!",
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
      <div>
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💬 Client Reviews
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            What Our Clients Say
          </h3>
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div>
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            💬 Client Reviews
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            What Our Clients Say
          </h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary">
          💬 Client Reviews
        </Badge>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
          What Our Clients Say
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {reviews.map((review, index) => (
          <Card 
            key={index} 
            className="bg-white border-2 hover:border-accent/20 transition-all duration-300 animate-fade-in"
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: 1
            }}
          >
            <CardHeader>
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-lg italic text-muted-foreground">
                "{review.text.length > 150 ? `${review.text.substring(0, 150)}...` : review.text}"
              </blockquote>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-semibold text-primary">{review.author_name}</p>
                <p className="text-muted-foreground">{review.relative_time_description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* See All Reviews Button */}
      <div className="text-center mt-8">
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
  );
}
