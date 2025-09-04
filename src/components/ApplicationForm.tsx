import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Phone, MessageSquare, Clock } from "lucide-react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  serviceType?: string;
  preferredTime?: string;
  urgency?: string;
};

export default function ApplicationForm() {
  const [activeTab, setActiveTab] = useState("meeting");
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Request submitted! We'll contact you within 3 hours.");
    reset();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Get Started Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your brand to life? Choose how you'd like to connect with us.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="meeting" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </TabsTrigger>
              <TabsTrigger value="callback" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Request Callback
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meeting">
              <Card className="border-2 border-accent/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Schedule Free Consultation</CardTitle>
                  <CardDescription>
                    Book a meeting with our design experts. We'll discuss your project and provide personalized recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          {...register("name", { required: "Name is required" })}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          type="email"
                          {...register("email", { required: "Email is required" })}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          {...register("phone", { required: "Phone is required" })}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input 
                          id="company" 
                          {...register("company")}
                          placeholder="Your business name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Type of Signage</Label>
                      <Select onValueChange={(value) => setValue("serviceType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sign type you're interested in" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3d-signs">3D Signs</SelectItem>
                          <SelectItem value="acrylic-storefront">Acrylic Storefront Signs</SelectItem>
                          <SelectItem value="led-neon">LED Neon Signs</SelectItem>
                          <SelectItem value="lightbox">Light Boxes</SelectItem>
                          <SelectItem value="vinyl-banners">Vinyl Banners</SelectItem>
                          <SelectItem value="aluminum-signs">Aluminum Signs</SelectItem>
                          <SelectItem value="car-wraps">Car Wraps & Signs</SelectItem>
                          <SelectItem value="real-estate">Real Estate Posts</SelectItem>
                          <SelectItem value="not-sure">Not Sure / Multiple Types</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Meeting Time</Label>
                      <Select onValueChange={(value) => setValue("preferredTime", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="When would you like to meet?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your project *</Label>
                      <Textarea 
                        id="message" 
                        {...register("message", { required: "Project description is required" })}
                        placeholder="Describe your signage needs, location, timeline, and any specific requirements..."
                        rows={4}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full">
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Free Consultation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="callback">
              <Card className="border-2 border-accent/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-neon rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Request Callback</CardTitle>
                  <CardDescription>
                    Need to speak with someone quickly? We'll call you back within 3 hours during business hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          {...register("name", { required: "Name is required" })}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          {...register("phone", { required: "Phone is required" })}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        {...register("email")}
                        placeholder="your@email.com (optional)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">How urgent is your project?</Label>
                      <Select onValueChange={(value) => setValue("urgency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP - Need it this week</SelectItem>
                          <SelectItem value="soon">Soon - Within 2-3 weeks</SelectItem>
                          <SelectItem value="month">This month</SelectItem>
                          <SelectItem value="planning">Just planning ahead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Brief description of your needs *</Label>
                      <Textarea 
                        id="message" 
                        {...register("message", { required: "Description is required" })}
                        placeholder="What type of sign do you need? Where will it be installed? Any specific requirements..."
                        rows={3}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    <div className="bg-secondary/50 p-4 rounded-lg flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Quick Response Guarantee</p>
                        <p className="text-muted-foreground">We'll call you back within 3 hours during business hours (Mon-Fri, 9 AM - 6 PM).</p>
                      </div>
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full">
                      <Phone className="w-5 h-5 mr-2" />
                      Request Callback Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}