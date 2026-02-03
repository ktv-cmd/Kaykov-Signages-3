import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, MapPin, Youtube, Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import ApplicationFormMobile from "./ApplicationFormMobile";
import { trackCtaClick, trackPhoneClick } from "@/lib/analytics";

export default function ContactMobile() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            🚀 Get Started
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary px-4">
            Get Your Custom Sign Today
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Fast turnaround, premium quality, and expert service. Contact us now to get started.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>
            
            {/* Quick Contact Cards - Mobile Optimized: Full width buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20 cursor-pointer touch-manipulation" style={{ touchAction: 'manipulation' }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-accent to-neon rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Call Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground mb-3">Speak directly with our team</p>
                  <Button 
                    variant="outline" 
                    className="w-full min-h-[48px] h-12 touch-manipulation whitespace-normal text-center leading-snug" 
                    onClick={() => {
                      trackPhoneClick("contact_mobile_call", "+17186146369", "contact_section_mobile");
                      window.open('tel:+17186146369', '_self');
                    }}
                    style={{ touchAction: 'manipulation' }}
                  >
                    📞 +1(718) 614-6369
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20 cursor-pointer touch-manipulation" style={{ touchAction: 'manipulation' }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-accent to-neon rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">WhatsApp</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground mb-3">Quick chat anytime</p>
                  <Button 
                    variant="outline" 
                    className="w-full min-h-[48px] h-12 touch-manipulation whitespace-normal text-center leading-snug" 
                    onClick={() => {
                      trackCtaClick({
                        ctaId: "contact_mobile_whatsapp",
                        ctaText: "WhatsApp",
                        location: "contact_section_mobile",
                        destination: "https://wa.me/19179033458",
                        ctaType: "whatsapp",
                      });
                      window.open('https://wa.me/19179033458', '_blank');
                    }}
                    style={{ touchAction: 'manipulation' }}
                  >
                    💬 WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20 cursor-pointer touch-manipulation" style={{ touchAction: 'manipulation' }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-accent to-neon rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground mb-3">Send us your details</p>
                  <Button
                    variant="outline"
                    className="w-full min-h-[48px] h-12 touch-manipulation whitespace-normal text-center leading-snug"
                    onClick={() => {
                      trackCtaClick({
                        ctaId: "contact_mobile_email",
                        ctaText: "info@kaykovmedia.com",
                        location: "contact_section_mobile",
                        destination: "mailto:info@kaykovmedia.com",
                        ctaType: "email",
                      });
                      window.open('mailto:info@kaykovmedia.com', '_self');
                    }}
                    style={{ touchAction: 'manipulation' }}
                  >
                    ✉️ info@kaykovmedia.com
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
                  className="flex items-center gap-2 min-h-[44px] touch-manipulation"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "contact_mobile_social_youtube",
                      ctaText: "YouTube",
                      location: "contact_section_mobile",
                      destination: "https://www.youtube.com/@kaykovmedia",
                      ctaType: "social",
                    });
                    window.open('https://www.youtube.com/@kaykovmedia', '_blank');
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 min-h-[44px] touch-manipulation"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "contact_mobile_social_instagram",
                      ctaText: "Instagram",
                      location: "contact_section_mobile",
                      destination: "https://www.instagram.com/kaykovmedia/",
                      ctaType: "social",
                    });
                    window.open('https://www.instagram.com/kaykovmedia/', '_blank');
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 min-h-[44px] touch-manipulation"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "contact_mobile_social_facebook",
                      ctaText: "Facebook",
                      location: "contact_section_mobile",
                      destination: "https://www.facebook.com/kaykovmedia",
                      ctaType: "social",
                    });
                    window.open('https://www.facebook.com/kaykovmedia', '_blank');
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 min-h-[44px] touch-manipulation"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "contact_mobile_social_website",
                      ctaText: "Website",
                      location: "contact_section_mobile",
                      destination: "https://signscompanynewyork.com/",
                      ctaType: "social",
                    });
                    window.open('https://signscompanynewyork.com/', '_blank');
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <Linkedin className="w-4 h-4" />
                  Website
                </Button>
              </div>
            </div>

              {/* Location Map - Desktop version (original position) */}
              <div className="hidden lg:block">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-xl">
                <MapPin className="w-5 h-5 text-accent" />
                Visit Us
              </h4>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary/10 hover:shadow-xl transition-shadow duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5!2d-73.8050998!3d40.7231743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e1b8baa853b%3A0x6525be028bcfbcdc!2sKaykov%20Media!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                    height="400"
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
                    className="p-0 h-auto text-accent hover:text-accent/80 min-h-[44px] touch-manipulation"
                  onClick={() => {
                    trackCtaClick({
                      ctaId: "contact_mobile_directions_desktop",
                      ctaText: "Get Directions",
                      location: "contact_section_mobile",
                      destination: "https://www.google.com/maps/place/Kaykov+Media/@40.7231743,-73.8050998,17z/data=!4m15!1m8!3m7!1s0x89c260fa69c0d9c7:0x7d663dc77053edb7!2s77-40+164th+St,+Fresh+Meadows,+NY+11366!3b1!8m2!3d40.7231743!4d-73.8050998!16s%2Fg%2F11b8z2n3r7!3m5!1s0x89c25e1b8baa853b:0x6525be028bcfbcdc!8m2!3d40.7232836!4d-73.8051251!16s%2Fg%2F1tfr1bqr?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D",
                      ctaType: "directions",
                    });
                    window.open('https://www.google.com/maps/place/Kaykov+Media/@40.7231743,-73.8050998,17z/data=!4m15!1m8!3m7!1s0x89c260fa69c0d9c7:0x7d663dc77053edb7!2s77-40+164th+St,+Fresh+Meadows,+NY+11366!3b1!8m2!3d40.7231743!4d-73.8050998!16s%2Fg%2F11b8z2n3r7!3m5!1s0x89c25e1b8baa853b:0x6525be028bcfbcdc!8m2!3d40.7232836!4d-73.8051251!16s%2Fg%2F1tfr1bqr?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D', '_blank');
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  Get Directions →
                </Button>
              </p>
            </div>
          </div>
          
          {/* Get a Custom Quote Form - Mobile Optimized */}
            <div className="pt-12 lg:pt-14">
              <ApplicationFormMobile
                inDialog={false}
                formId="contact_form_mobile"
                formLocation="contact_section_mobile"
              />
            </div>
          </div>

          {/* Location Map - Full width on mobile (new position) */}
          <div className="mt-8 lg:hidden">
            <h4 className="font-semibold mb-4 flex items-center gap-2 text-xl">
              <MapPin className="w-5 h-5 text-accent" />
              Visit Us
            </h4>
            <div className="rounded-none sm:rounded-xl overflow-hidden shadow-lg border-0 sm:border-2 border-primary/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5!2d-73.8050998!3d40.7231743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e1b8baa853b%3A0x6525be028bcfbcdc!2sKaykov%20Media!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="400"
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
                className="p-0 h-auto text-accent hover:text-accent/80 min-h-[44px] touch-manipulation"
                onClick={() => {
                  trackCtaClick({
                    ctaId: "contact_mobile_directions_mobile",
                    ctaText: "Get Directions",
                    location: "contact_section_mobile",
                    destination: "https://www.google.com/maps/place/Kaykov+Media/@40.7231743,-73.8050998,17z/data=!4m15!1m8!3m7!1s0x89c260fa69c0d9c7:0x7d663dc77053edb7!2s77-40+164th+St,+Fresh+Meadows,+NY+11366!3b1!8m2!3d40.7231743!4d-73.8050998!16s%2Fg%2F11b8z2n3r7!3m5!1s0x89c25e1b8baa853b:0x6525be028bcfbcdc!8m2!3d40.7232836!4d-73.8051251!16s%2Fg%2F1tfr1bqr?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D",
                    ctaType: "directions",
                  });
                  window.open('https://www.google.com/maps/place/Kaykov+Media/@40.7231743,-73.8050998,17z/data=!4m15!1m8!3m7!1s0x89c260fa69c0d9c7:0x7d663dc77053edb7!2s77-40+164th+St,+Fresh+Meadows,+NY+11366!3b1!8m2!3d40.7231743!4d-73.8050998!16s%2Fg%2F11b8z2n3r7!3m5!1s0x89c25e1b8baa853b:0x6525be028bcfbcdc!8m2!3d40.7232836!4d-73.8051251!16s%2Fg%2F1tfr1bqr?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D', '_blank');
                }}
                style={{ touchAction: 'manipulation' }}
              >
                Get Directions →
              </Button>
            </p>
          </div>
        </div>
        
      </div>

    </section>
  );
}

