import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Car, Truck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

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
    popular: true
  },
  {
    title: "Partial Vehicle Wraps",
    description: "Targeted advertising on key vehicle areas",
    features: ["Strategic placement", "Cost-effective", "High-impact design", "Quick installation"],
    price: "Starting at $800",
    image: carWrapImage,
    icon: Zap
  },
  {
    title: "Commercial Fleet Wraps",
    description: "Consistent branding across your entire fleet",
    features: ["Volume discounts", "Brand consistency", "Fleet management", "Professional results"],
    price: "Starting at $1,200",
    image: carWrapImage,
    icon: Truck,
    featured: true
  },
  {
    title: "Window Graphics",
    description: "Perforated vinyl for window advertising",
    features: ["See-through design", "One-way visibility", "Easy removal", "Weather resistant"],
    price: "Starting at $150",
    image: carWrapImage,
    icon: Car
  },
  {
    title: "Magnetic Signs",
    description: "Removable vehicle signage for flexibility",
    features: ["Easy on/off", "Strong magnets", "Custom shapes", "No adhesive"],
    price: "Starting at $65",
    image: carWrapImage,
    icon: Zap
  },
  {
    title: "Racing Stripes & Decals",
    description: "Custom graphics and performance styling",
    features: ["Precision cut", "High-performance vinyl", "Custom colors", "Professional finish"],
    price: "Starting at $200",
    image: carWrapImage,
    icon: Car
  }
];

const vehicleTypes = [
  { name: "Cars & SUVs", description: "Personal and business vehicles" },
  { name: "Trucks & Vans", description: "Commercial and delivery vehicles" },
  { name: "Trailers", description: "Box trucks and trailers" },
  { name: "Motorcycles", description: "Bikes and specialty vehicles" },
  { name: "Boats", description: "Marine vehicle graphics" },
  { name: "RVs", description: "Recreational vehicles" }
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
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button variant="default" size="sm">
                <MessageCircle className="w-4 h-4" />
                Get Quote
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
            <Button variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="w-5 h-5" />
              Free Vehicle Assessment
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              View Wrap Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">We Wrap All Vehicle Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {vehicleTypes.map((type, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Car className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1 text-primary">{type.name}</h3>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
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
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
                service.popular ? 'ring-2 ring-accent' : ''
              } ${service.featured ? 'ring-2 ring-primary' : ''}`}>
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-white/90 text-primary font-bold">
                      {service.price}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Get Estimate
                  </Button>
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

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Wrap Your Vehicle?</h2>
          <p className="text-xl mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
            Get a free estimate for your vehicle wrap project. Our team will assess your vehicle 
            and provide a detailed quote with design options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Phone className="w-5 h-5" />
              Call (555) 123-4567
            </Button>
            <Button variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              <MessageCircle className="w-5 h-5" />
              Schedule Assessment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}