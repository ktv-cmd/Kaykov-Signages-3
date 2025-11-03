import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Mail, MapPin, Youtube, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🚀 Get Started
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Ready to Bring Your Brand to Life?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your perfect sign is just a conversation away. Choose how you'd like to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20 cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Call Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground mb-3">Speak directly with our team</p>
                  <Button variant="outline" className="w-full" onClick={() => window.open('tel:+17184784200', '_self')}>
                    📞 +1(718) 478-4200
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20 cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">WhatsApp</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground mb-3">Quick chat anytime</p>
                  <Button variant="outline" className="w-full" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
                    💬 WhatsApp +19179033458
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Social Links */}
            <div className="mb-6">
              <h4 className="font-semibold mb-4">Follow Our Work</h4>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://www.youtube.com/@kaykovmedia', '_blank')}
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://www.instagram.com/kaykovmedia/', '_blank')}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://www.facebook.com/kaykovmedia', '_blank')}
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://kaykovmedia.com/', '_blank')}
                >
                  <Linkedin className="w-4 h-4" />
                  Website
                </Button>
              </div>
            </div>

            {/* Location Map */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Visit Us
              </h4>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary/10 hover:shadow-xl transition-shadow duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5!2d-73.8050998!3d40.7231743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e1b8baa853b%3A0x6525be028bcfbcdc!2sKaykov%20Media!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Kaykov Media Location"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto text-accent hover:text-accent/80"
                  onClick={() => window.open('https://www.google.com/maps/place/Kaykov+Media/@40.7231743,-73.8050998,17z/data=!4m15!1m8!3m7!1s0x89c260fa69c0d9c7:0x7d663dc77053edb7!2s77-40+164th+St,+Fresh+Meadows,+NY+11366!3b1!8m2!3d40.7231743!4d-73.8050998!16s%2Fg%2F11b8z2n3r7!3m5!1s0x89c25e1b8baa853b:0x6525be028bcfbcdc!8m2!3d40.7232836!4d-73.8051251!16s%2Fg%2F1tfr1bqr?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                >
                  Get Directions →
                </Button>
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Request Free Consultation</CardTitle>
              <p className="text-muted-foreground">Tell us about your project and we'll get back to you within 3 hours.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Smith" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="john@business.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input type="tel" placeholder="+1(718) 478-4200" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Type of Sign Needed</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="">Select sign type...</option>
                    <option value="3d">3D/Premium Signs</option>
                    <option value="storefront">Storefront Signs</option>
                    <option value="office">Office Signs</option>
                    <option value="vehicle">Car Wraps/Signs</option>
                    <option value="outdoor">Outdoor Banners</option>
                    <option value="other">Other/Multiple Types</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Details</label>
                  <Textarea 
                    placeholder="Tell us about your project, dimensions, timeline, and any specific requirements..."
                    rows={4}
                  />
                </div>
                
                <Button variant="cta" className="w-full text-lg py-6">
                  Get Free Consultation
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to receive communications from Kaykov Media. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Don't Wait - Your Competition Won't</h3>
            <p className="text-xl mb-6 text-white/90">
              Every day without great signage is a day of missed opportunities. Let's get you noticed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4" onClick={() => window.open('tel:+17184784200', '_self')}>
                📞 Call +1(718) 478-4200
              </Button>
              <Button variant="cta" size="lg" className="text-lg px-8 py-4" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
                💬 WhatsApp +19179033458
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}