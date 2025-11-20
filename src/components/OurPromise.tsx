import { Badge } from "@/components/ui/badge";
import { Shield, Palette, Wrench } from "lucide-react";

export default function OurPromise() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="bg-gradient-to-r from-accent/10 to-neon/10 rounded-2xl p-8 border-2 border-accent/20 max-w-5xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h3 className="text-3xl font-bold mb-8 text-primary">Our Promise to You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <div className="bg-white/50 rounded-xl p-5 border border-accent/10 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-neon/20 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-primary">Perfect Design</h4>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3">
                  Visualize First
                </Badge>
                <p className="text-sm text-muted-foreground">3D rendering to see everything in advance</p>
              </div>

              <div className="bg-white/50 rounded-xl p-5 border border-accent/10 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-neon/20 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-primary">Professional Installation</h4>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3">
                  Certified experts
                </Badge>
                <p className="text-sm text-muted-foreground">Done right, every time</p>
              </div>

              <div className="bg-white/50 rounded-xl p-5 border border-accent/10 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-neon/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-primary">3-Year Warranty</h4>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3">
                  Quality guaranteed
                </Badge>
                <p className="text-sm text-muted-foreground">Professional quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
