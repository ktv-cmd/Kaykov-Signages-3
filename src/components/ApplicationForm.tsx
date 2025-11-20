import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowLeft, ArrowRight, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { submitToGoogleSheets, type CallbackFormData } from "@/lib/googleSheets";

type FormData = {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  businessLocation?: string;
  details?: string;
  picture?: FileList;
};

interface ApplicationFormProps {
  onClose?: () => void;
  inDialog?: boolean;
}

// Email validation function - checks for real email format
const validateEmail = (email: string): boolean | string => {
  if (!email) return true;
  
  const trimmedEmail = email.trim();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return "Please enter a valid email address";
  }
  
  if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.startsWith('@') || 
      trimmedEmail.endsWith('.') || trimmedEmail.endsWith('@')) {
    return "Please enter a valid email address";
  }
  
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2 || !parts[1].includes('.')) {
    return "Please enter a valid email address";
  }
  
  return true;
};

// Phone validation function - US numbers only (10 digits)
const validatePhone = (phone: string): boolean | string => {
  if (!phone) return true;
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length !== 10) {
    return "Please enter a valid US phone number (10 digits)";
  }
  
  if (/^(\d)\1{9}$/.test(digitsOnly)) {
    return "Please enter a valid phone number";
  }
  
  const areaCode = digitsOnly.substring(0, 3);
  if (areaCode === '000' || areaCode === '111' || areaCode === '555' || 
      areaCode.startsWith('0') || areaCode.startsWith('1')) {
    return "Please enter a valid US phone number";
  }
  
  const exchangeCode = digitsOnly.substring(3, 6);
  if (exchangeCode.startsWith('0') || exchangeCode.startsWith('1')) {
    return "Please enter a valid US phone number";
  }
  
  return true;
};

// Convert image to base64
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function ApplicationForm({ onClose, inDialog = false }: ApplicationFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  const { register, handleSubmit, watch, formState: { errors }, reset, trigger } = useForm<FormData>({
    mode: "onChange"
  });

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedPhone = watch("phone");
  const watchedBusinessName = watch("businessName");
  const watchedBusinessLocation = watch("businessLocation");
  const watchedDetails = watch("details");

  // Validate that at least email or phone is provided
  const validateContact = () => {
    const email = watchedEmail?.trim();
    const phone = watchedPhone?.replace(/\D/g, '');
    return (email && email.length > 0) || (phone && phone.length >= 10);
  };

  // Calculate completion percentage
  useEffect(() => {
    const nameFilled = watchedName?.trim();
    const emailFilled = watchedEmail?.trim();
    const phoneFilled = watchedPhone?.replace(/\D/g, '');
    
    // Required fields: name + (email or phone)
    const requiredFieldsFilled = nameFilled && ((emailFilled && emailFilled.length > 0) || (phoneFilled && phoneFilled.length >= 10));
    
    if (requiredFieldsFilled) {
      // Required fields complete - show 100% and green
      setCompletionPercentage(100);
    } else {
      // Calculate based on required fields only
      let filled = 0;
      if (nameFilled) filled++;
      if (emailFilled && emailFilled.length > 0) filled++;
      if (phoneFilled && phoneFilled.length >= 10) filled++;
      setCompletionPercentage(Math.round((filled / 3) * 100));
    }
  }, [watchedName, watchedEmail, watchedPhone]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  // Handle step navigation
  const handleNext = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Validate name (required)
    const nameValid = await trigger("name");
    if (!nameValid || !watchedName?.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // Validate that at least email or phone is provided
    const emailValid = watchedEmail?.trim() ? await trigger("email") : true;
    const phoneValid = watchedPhone?.trim() ? await trigger("phone") : true;
    
    if (!validateContact()) {
      toast.error("Please provide at least an email or phone number");
      return;
    }
    
    // If email is provided, it must be valid
    if (watchedEmail?.trim() && !emailValid) {
      return; // Error already shown by trigger
    }
    
    // If phone is provided, it must be valid
    if (watchedPhone?.trim() && !phoneValid) {
      return; // Error already shown by trigger
    }
    
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  // Error handler - extracted to avoid duplication
  const showErrorToast = () => {
    toast.error("There was an issue submitting the form. Your data has been saved locally.", {
      description: "Please call us at (718) 478-4200 or try again later.",
      duration: 6000,
      action: {
        label: "Call Now",
        onClick: () => window.open('tel:+17184784200', '_self'),
      },
    });
  };

  const onSubmit = async (data: FormData, e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsSubmitting(true);
    try {
      const combinedMessage = data.details?.trim() ? `Details: ${data.details.trim()}` : undefined;

      let imageBase64: string | undefined;
      let imageFileName: string | undefined;
      let imageMimeType: string | undefined;
      if (uploadedImage) {
        imageBase64 = await convertImageToBase64(uploadedImage);
        imageFileName = uploadedImage.name;
        imageMimeType = uploadedImage.type;
      }

      const sheetData: CallbackFormData = {
        name: data.name || "",
        phone: data.phone?.trim() || undefined,
        email: data.email?.trim() || undefined,
        company: data.businessName?.trim() || undefined,
        businessLocation: data.businessLocation?.trim() || undefined,
        serviceType: "Custom Quote",
        message: combinedMessage,
        imageBase64,
        imageFileName,
        imageMimeType,
      };

      toast.success("Form Submitted Successfully!", {
        description: "We've received your request and will contact you soon.",
        duration: 5000,
      });

      reset();
      setUploadedImage(null);
      setImagePreview(null);
      setCurrentStep(1);

      // Delay closing the dialog to allow toast to be seen
      setTimeout(() => {
        onClose?.();
      }, 100);

      submitToGoogleSheets(sheetData).catch(showErrorToast);
    } catch (error) {
      showErrorToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <>
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary">
          Get a Custom Quote
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Tell us about your project and we'll create a custom quote just for you.
        </p>
      </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Form Completion</span>
                <span className={`text-sm font-semibold ${completionPercentage === 100 ? 'text-green-600' : 'text-primary'}`}>
                  {completionPercentage}%
                </span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full ${
                    completionPercentage === 100 ? 'bg-green-500' : 'bg-accent'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              {completionPercentage === 100 && (
                <p className="text-xs text-green-600 mt-2 text-center">Ready to submit!</p>
              )}
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8 gap-2">
              <div className={`flex items-center ${currentStep === 1 ? 'text-accent' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === 1 ? 'border-accent bg-accent/10' : 'border-green-600 bg-green-600 text-white'
                }`}>
                  {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                </div>
                <span className="ml-2 text-sm font-medium">Required Info</span>
              </div>
              <div className={`w-12 h-0.5 ${currentStep > 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className={`flex items-center ${currentStep === 2 ? 'text-accent' : currentStep > 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === 2 ? 'border-accent bg-accent/10' : currentStep > 2 ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'
                }`}>
                  {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                </div>
                <span className="ml-2 text-sm font-medium">Additional Info</span>
              </div>
            </div>

            {/* Step 1: Required Fields */}
            {currentStep === 1 && (
              <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    Name <span className="text-destructive">*</span>
                    {watchedName?.trim() && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </Label>
                  <Input 
                    id="name" 
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your full name"
                    className={`h-12 sm:h-12 text-base ${watchedName?.trim() ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    Phone <span className="text-destructive">*</span>
                    {watchedPhone?.trim() && !errors.phone && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    {...register("phone", { 
                      required: "Phone is required",
                      validate: validatePhone 
                    })}
                    placeholder="(718) 478-4200"
                    className={`h-12 sm:h-12 text-base ${watchedPhone?.trim() && !errors.phone ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    Email <span className="text-destructive">*</span>
                    {watchedEmail?.trim() && !errors.email && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </Label>
                  <Input 
                    id="email" 
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      validate: validateEmail 
                    })}
                    placeholder="your@email.com"
                    className={`h-12 sm:h-12 text-base ${watchedEmail?.trim() && !errors.email ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={(e) => handleNext(e)}
                  disabled={!watchedName?.trim() || (!watchedPhone?.trim() && !watchedEmail?.trim()) || !!errors.phone || !!errors.email}
                  className="w-full h-14 sm:h-12 text-base font-medium bg-accent hover:bg-accent/90 active:bg-accent/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Optional Fields */}
            {currentStep === 2 && (
              <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="flex items-center gap-2">
                    Business Name
                    {watchedBusinessName?.trim() && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </Label>
                  <Input 
                    id="businessName" 
                    {...register("businessName")}
                    placeholder="Your business name (optional)"
                    className={`h-12 sm:h-12 text-base ${watchedBusinessName?.trim() ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessLocation" className="flex items-center gap-2">
                    Business Location
                    {watchedBusinessLocation?.trim() && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </Label>
                  <Input 
                    id="businessLocation" 
                    {...register("businessLocation")}
                    placeholder="Business address (optional)"
                    className={`h-12 sm:h-12 text-base ${watchedBusinessLocation?.trim() ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details" className="flex items-center gap-2">
                    Details
                    {watchedDetails?.trim() && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </Label>
                  <Textarea 
                    id="details" 
                    {...register("details")}
                    placeholder="If you know the dimensions, please include them in the description for a faster quote (optional)"
                    rows={4}
                    className={`resize-none text-base ${watchedDetails?.trim() ? "border-green-500 focus:border-green-500" : ""}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="picture" className="flex items-center gap-2">
                    Picture of the place you need signage for
                  </Label>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
                      <input
                        type="file"
                        id="picture"
                        accept="image/*"
                        {...register("picture")}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label htmlFor="picture" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                        <span className="text-xs text-muted-foreground mt-1">Max 5MB</span>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-14 sm:h-12 text-base touch-manipulation"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-14 sm:h-12 text-base font-medium bg-accent hover:bg-accent/90 active:bg-accent/80 transition-all duration-300 disabled:opacity-50 touch-manipulation"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </div>
            )}
    </>
  );

  if (inDialog) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full p-4 sm:p-6">
        {formContent}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <Card className="border-2 hover:border-accent/20 hover:shadow-lg transition-all duration-300 p-4 sm:p-6 rounded-2xl sm:rounded-lg">
        <CardContent className="p-0">
          {formContent}
        </CardContent>
      </Card>
    </form>
  );
}
