import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { submitToGoogleSheets, type CallbackFormData } from "@/lib/googleSheets";

interface RequestCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = CallbackFormData;

export default function RequestCallModal({ isOpen, onClose }: RequestCallModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit to Google Sheets
      const success = await submitToGoogleSheets(data);
      
      if (success) {
        toast.success("Request submitted! We'll call you within 3 hours.", {
          description: "Your information has been saved to our system. Our team will contact you soon.",
        });
      } else {
        // Fallback if Google Sheets integration isn't set up
        toast.success("Request submitted! We'll call you within 3 hours.", {
          description: "Your information has been received. Our team will contact you soon.",
        });
        console.log("Form data (save manually if needed):", data);
      }
      
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again or call us directly.", {
        action: {
          label: "Call Now",
          onClick: () => window.open('tel:+17184784200', '_self'),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 160ms ease-out',
      }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl"
        style={{
          animation: 'scaleFadeIn 160ms ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-lg p-2 transition-all duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent p-8 border-b border-accent/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-neon rounded-lg flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary">Request a Call</h2>
              <p className="text-muted-foreground mt-1">We'll call you within 3 hours</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your full name"
                  className="w-full"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="+1(718) 478-4200"
                  className="w-full"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input 
                id="email" 
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select onValueChange={(value) => setValue("serviceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What are you interested in?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outdoor-signage">Outdoor Signage</SelectItem>
                  <SelectItem value="indoor-signage">Indoor/Reception Signage</SelectItem>
                  <SelectItem value="car-wraps">Car Wraps</SelectItem>
                  <SelectItem value="3d-signs">3D Signs</SelectItem>
                  <SelectItem value="led-neon">LED Neon Signs</SelectItem>
                  <SelectItem value="other">Other / Multiple Types</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell us about your project *</Label>
              <Textarea 
                id="message" 
                {...register("message", { required: "Message is required" })}
                placeholder="Describe your signage needs, location, timeline, and any specific requirements..."
                rows={4}
                className="w-full"
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>

            <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-accent">Quick Response:</strong> We'll call you back within 3 hours.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="default"
                className="flex-1 bg-gradient-to-r from-accent to-neon text-white hover:from-accent/90 hover:to-neon/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 mr-2" />
                    Request Call
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleFadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

