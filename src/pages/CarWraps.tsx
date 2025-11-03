import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Car, Truck, Zap, Clock, Shield, Headphones, Star, CreditCard, Wrench, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceGallery from "@/components/ServiceGallery";
import RequestCallModal from "@/components/RequestCallModal";
import MessagingOptions from "@/components/MessagingOptions";

// Import car wrap images
import carWrapImage from "@/assets/car-wrap.jpg";

const wrapServices = [
  {
    title: "Full Vehicle Wraps",
    description: "Complete transformation of your vehicle",
    features: ["Complete coverage", "Premium 3M vinyl", "5-year warranty", "Professional installation"],
    price: "Starting at $2,500",
    image: carWrapImage,
    icon: Car,
    popular: true,
    gallery: [
      { src: carWrapImage, alt: "Full Vehicle Wraps example 1" },
      { src: carWrapImage, alt: "Full Vehicle Wraps example 2" },
      { src: carWrapImage, alt: "Full Vehicle Wraps example 3" }
    ]
  },
  {
    title: "Partial Vehicle Wraps",
    description: "Targeted advertising on key vehicle areas",
    features: ["Strategic placement", "Cost-effective", "High-impact design", "Quick installation"],
    price: "Starting at $800",
    image: carWrapImage,
    icon: Zap,
    gallery: [
      { src: carWrapImage, alt: "Partial Vehicle Wraps example 1" },
      { src: carWrapImage, alt: "Partial Vehicle Wraps example 2" },
      { src: carWrapImage, alt: "Partial Vehicle Wraps example 3" }
    ]
  },
  {
    title: "Commercial Fleet Wraps",
    description: "Consistent branding across your entire fleet",
    features: ["Volume discounts", "Brand consistency", "Fleet management", "Professional results"],
    price: "Starting at $1,200",
    image: carWrapImage,
    icon: Truck,
    featured: true,
    gallery: [
      { src: carWrapImage, alt: "Commercial Fleet Wraps example 1" },
      { src: carWrapImage, alt: "Commercial Fleet Wraps example 2" },
      { src: carWrapImage, alt: "Commercial Fleet Wraps example 3" }
    ]
  },
  {
    title: "Window Graphics",
    description: "Perforated vinyl for window advertising",
    features: ["See-through design", "One-way visibility", "Easy removal", "Weather resistant"],
    price: "Starting at $150",
    image: carWrapImage,
    icon: Car,
    gallery: [
      { src: carWrapImage, alt: "Window Graphics example 1" },
      { src: carWrapImage, alt: "Window Graphics example 2" },
      { src: carWrapImage, alt: "Window Graphics example 3" }
    ]
  },
  {
    title: "Magnetic Signs",
    description: "Removable vehicle signage for flexibility",
    features: ["Easy on/off", "Strong magnets", "Custom shapes", "No adhesive"],
    price: "Starting at $65",
    image: carWrapImage,
    icon: Zap,
    gallery: [
      { src: carWrapImage, alt: "Magnetic Signs example 1" },
      { src: carWrapImage, alt: "Magnetic Signs example 2" },
      { src: carWrapImage, alt: "Magnetic Signs example 3" }
    ]
  },
  {
    title: "Racing Stripes & Decals",
    description: "Custom graphics and performance styling",
    features: ["Precision cut", "High-performance vinyl", "Custom colors", "Professional finish"],
    price: "Starting at $200",
    image: carWrapImage,
    icon: Car,
    gallery: [
      { src: carWrapImage, alt: "Racing Stripes & Decals example 1" },
      { src: carWrapImage, alt: "Racing Stripes & Decals example 2" },
      { src: carWrapImage, alt: "Racing Stripes & Decals example 3" }
    ]
  }
];

const vehicleTypes = [
  { 
    name: "Cars", 
    description: "Personal and business vehicles",
    icon: Car,
    price: "Starting at $1,200"
  },
  { 
    name: "Trucks", 
    description: "Commercial and delivery vehicles",
    icon: Truck,
    price: "Starting at $1,800"
  },
  { 
    name: "Trailers", 
    description: "Box trucks and trailers",
    icon: Truck,
    price: "Starting at $2,200"
  },
  { 
    name: "Motorcycles", 
    description: "Bikes and specialty vehicles",
    icon: Car,
    price: "Starting at $400"
  }
];

const benefits = [
  {
    title: "Mobile Advertising",
    description: "Turn your vehicle into a moving billboard that works 24/7"
  },
  {
    title: "Cost Effective",
    description: "More affordable than traditional advertising with better ROI"
  },
  {
    title: "Paint Protection",
    description: "Protect your vehicle's original paint while advertising"
  },
  {
    title: "Professional Image",
    description: "Present a consistent, professional brand image"
  }
];

export default function CarWraps() {
  const [selectedGallery, setSelectedGallery] = useState<{ images: Array<{ src: string; alt: string }>; title: string } | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const openGallery = (images: Array<{ src: string; alt: string }>, title: string) => {
    if (images && images.length > 0) {
      setSelectedGallery({ images, title });
    }
  };

  const closeGallery = () => {
    setSelectedGallery(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.open('tel:+17184784200', '_self')}>
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button variant="default" size="sm" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp Quote
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 bg-accent text-accent-foreground">
            Vehicle Wrap Specialists
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Car Wraps That
            <span className="block text-accent">Drive Business</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/90">
            Transform your vehicle into a powerful marketing tool with high-quality vinyl wraps. 
            Professional installation, premium materials, and designs that get noticed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => window.open('tel:+17184784200', '_self')}>
              <Phone className="w-5 h-5" />
              Free Vehicle Assessment
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
              WhatsApp Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">We Wrap All Vehicle Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleTypes.map((type, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow group">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <type.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{type.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                <Badge variant="secondary" className="bg-accent/10 text-accent font-semibold">
                  {type.price}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why Choose Vehicle Wraps?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">Vehicle Wrap Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From full wraps to simple decals, we offer comprehensive vehicle graphics solutions 
              for every budget and business need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wrapServices.map((service, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] ${
                  service.popular ? 'ring-2 ring-accent' : ''
                } ${service.featured ? 'ring-2 ring-primary' : ''}`}
                onClick={() => service.gallery && openGallery(service.gallery, service.title)}
              >
                {(service.popular || service.featured) && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="default" className={service.popular ? 'bg-accent' : 'bg-primary'}>
                      {service.popular ? 'Most Popular' : 'Featured'}
                    </Badge>
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-accent/50">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-white/90 text-primary font-bold">
                      {service.price}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="bg-white/50 group-hover:bg-white/70 transition-all duration-500">
                  <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="bg-white/30 group-hover:bg-white/50 transition-all duration-500">
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <MessagingOptions 
                    buttonText="Get Estimate"
                    buttonVariant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    showModal={true}
                    onModalOpen={() => setIsCallModalOpen(true)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Wrap Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Design Consultation", description: "We create custom designs based on your brand and goals" },
              { step: "2", title: "Vehicle Preparation", description: "Thorough cleaning and prep work for optimal adhesion" },
              { step: "3", title: "Professional Installation", description: "Expert application using premium materials and techniques" },
              { step: "4", title: "Quality Inspection", description: "Final inspection and care instructions for your new wrap" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clients Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              💡 Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Why Clients Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just make signs - we create partnerships.<br />
              Here's what makes Kaykov Media different.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Clock,
                title: "Lightning Fast Response",
                description: "Consultation available within 3 hours. Most projects completed in 3-10 business days.",
                highlight: "3 hour response"
              },
              {
                icon: Headphones,
                title: "Your Brand, Our Priority",
                description: "Every project starts with understanding your business — we craft signage that speaks your language and attracts your audience.",
                highlight: "Tailored to you"
              },
              {
                icon: Star,
                title: "Perfect Design Guarantee",
                description: "Custom design with up to 3 free revisions until you absolutely love your sign.",
                highlight: "Up to 3 revisions"
              },
              {
                icon: CreditCard,
                title: "Flexible Payment Options",
                description: "5% discount for full early payment or choose our 50% upfront deposit plan.",
                highlight: "5% early discount"
              },
              {
                icon: Wrench,
                title: "Professional Installation",
                description: "Our certified installers ensure your sign is mounted perfectly and safely.",
                highlight: "Certified installers"
              },
              {
                icon: Shield,
                title: "3-Year Warranty",
                description: "We stand behind our work with a comprehensive 3-year warranty on most signs.",
                highlight: "3-year warranty"
              }
            ].map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 border-2 hover:border-accent/40 h-80 flex flex-col bg-gradient-to-br from-white to-white/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
                <CardHeader className="text-center flex-grow">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 via-accent/15 to-neon/15 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-500">
                    <benefit.icon className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-accent transition-colors duration-300">{benefit.title}</CardTitle>
                  <div className="flex justify-center mb-0">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-accent/15 to-neon/10 text-accent border-accent/30 text-xs font-semibold px-4 py-1.5 w-fit rounded-full shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300"
                    >
                      {benefit.highlight}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-start pt-0 -mt-4">
                  <p className="text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Our Promise Section */}
          <div className="text-center mt-20">
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

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Wrap Your Vehicle?</h2>
          <p className="text-xl mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
            Get a free estimate for your vehicle wrap project. Our team will assess your vehicle 
            and provide a detailed quote with design options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => window.open('tel:+17184784200', '_self')}>
              <Phone className="w-5 h-5" />
              Call +1(718) 478-4200
            </Button>
            <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent" onClick={() => window.open('https://wa.me/19179033458', '_blank')}>
              <MessageCircle className="w-5 h-5" />
              WhatsApp Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedGallery && (
        <ServiceGallery
          images={selectedGallery.images}
          serviceTitle={selectedGallery.title}
          isOpen={!!selectedGallery}
          onClose={closeGallery}
        />
      )}

      {/* Request Call Modal */}
      <RequestCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </div>
  );
}