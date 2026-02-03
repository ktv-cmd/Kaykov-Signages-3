import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowLeft, ArrowRight, X, Upload, Phone } from "lucide-react";
import { toast } from "sonner";
import { submitToGoogleSheets, type CallbackFormData } from "@/lib/googleSheets";
import { trackFormSubmit, trackPhoneClick } from "@/lib/analytics";

type FormData = {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  businessLocation?: string;
  details?: string;
  picture?: FileList;
};

interface ApplicationFormMobileProps {
  onClose?: () => void;
  inDialog?: boolean;
  onSuccess?: () => void;
  suppressSuccessToast?: boolean;
  showStickyCta?: boolean;
  withCard?: boolean;
  formId?: string;
  formLocation?: string;
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

export default function ApplicationFormMobile({
  onClose,
  inDialog = false,
  onSuccess,
  suppressSuccessToast = false,
  showStickyCta = true,
  withCard = true,
  formId = "quote_form_mobile",
  formLocation,
}: ApplicationFormMobileProps = {}) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const stepWrapperClass = inDialog
    ? "space-y-5 sm:space-y-6 pb-6 sm:pb-6"
    : "space-y-5 sm:space-y-6 pb-24 sm:pb-6";
  
  const { register, handleSubmit, watch, formState: { errors }, reset, trigger } = useForm<FormData>({
    mode: "onChange"
  });

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedPhone = watch("phone");
  const watchedBusinessName = watch("businessName");
  const watchedBusinessLocation = watch("businessLocation");
  const watchedDetails = watch("details");

  // Auto-focus on first field when form opens
  useEffect(() => {
    if (inDialog && nameInputRef.current) {
      // Small delay to ensure dialog is fully rendered
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [inDialog]);

  // Validate that at least email or phone is provided
  const validateContact = () => {
    const email = watchedEmail?.trim();
    const phone = watchedPhone?.replace(/\D/g, '');
    return (email && email.length > 0) || (phone && phone.length > 0);
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
      description: "Please call us at (718) 614-6369 or try again later.",
      duration: 6000,
      action: {
        label: "Call Now",
        onClick: () => {
          trackPhoneClick("form_error_call_mobile", "+17186146369", formLocation ?? "application_form_mobile");
          window.open('tel:+17186146369', '_self');
        },
      },
    });
  };

  const showSuccessToast = () => {
    toast.success("Request submitted successfully!", {
      description: "We will contact you shortly.",
      duration: 5000,
    });
  };

  const onInvalid = () => {
    setCurrentStep(1);
    toast.error("Please complete the required fields before submitting.");
  };

  const onSubmit = async (data: FormData, e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsSubmitting(true);
    let didSubmit = false;
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

      const shouldReset = !onSuccess;
      if (shouldReset) {
        reset();
        setUploadedImage(null);
        setImagePreview(null);
        setCurrentStep(1);
      }

      // Submit to Google Sheets (in background, don't wait for response)
      submitToGoogleSheets(sheetData).catch(showErrorToast);

      // Track conversion in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17829037355',
          'value': 1.0,
          'currency': 'USD'
        });
      }

      trackFormSubmit({
        formId,
        location: formLocation ?? (inDialog ? "quote_form_dialog_mobile" : "quote_form_inline_mobile"),
        serviceType: "Custom Quote",
      });

      if (!suppressSuccessToast) {
        showSuccessToast();
      }

      // Close dialog if in dialog mode
      if (inDialog) {
        onClose?.();
      }
      didSubmit = true;
    } catch (error) {
      showErrorToast();
    } finally {
      setIsSubmitting(false);
      if (didSubmit) {
        onSuccess?.();
      }
    }
  };

  const submitHandler = handleSubmit(onSubmit, onInvalid);

  const formContent = (
    <>
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary">
          Get a Custom Quote for Your Signage
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Tell us about your business and we'll create a custom quote just for you.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">Form Completion</span>
          <span className={`text-sm font-semibold ${completionPercentage === 100 ? 'text-accent' : 'text-primary'}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full ${
              completionPercentage === 100 ? 'bg-primary' : 'bg-accent'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        {completionPercentage === 100 && (
          <p className="text-xs text-primary mt-2 text-center">Ready to submit!</p>
        )}
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8 gap-2">
        <div className={`flex items-center ${currentStep === 1 ? 'text-accent' : 'text-primary'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            currentStep === 1 ? 'border-accent bg-accent/10' : 'border-primary bg-primary text-white'
          }`}>
            {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
          </div>
          <span className="ml-2 text-sm font-medium">Required Info</span>
        </div>
        <div className={`w-12 h-0.5 ${currentStep > 1 ? 'bg-primary' : 'bg-border'}`} />
        <div className={`flex items-center ${currentStep === 2 ? 'text-accent' : currentStep > 2 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            currentStep === 2 ? 'border-accent bg-accent/10' : currentStep > 2 ? 'border-primary bg-primary text-white' : 'border-border'
          }`}>
            {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
          </div>
          <span className="ml-2 text-sm font-medium">Additional Info</span>
        </div>
      </div>

      {/* Step 1: Required Fields */}
      {currentStep === 1 && (
        <div className={stepWrapperClass}>
          <div className="space-y-2">
            <Label htmlFor="name-mobile" className="flex items-center gap-2">
              Name <span className="text-destructive">*</span>
              {watchedName?.trim() && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </Label>
            <Input 
              id="name-mobile"
              ref={nameInputRef}
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className={`min-h-[48px] h-12 sm:h-12 text-base touch-manipulation ${watchedName?.trim() ? "border-primary/40 focus:border-primary" : ""}`}
              style={{ touchAction: 'manipulation' }}
              autoFocus={inDialog}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-mobile" className="flex items-center gap-2">
              Phone <span className="text-destructive">*</span>
              {watchedPhone?.trim() && !errors.phone && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </Label>
            <Input 
              id="phone-mobile"
              type="tel"
              inputMode="tel"
              {...register("phone", {
                validate: {
                  contactRequired: (value) => {
                    const phoneDigits = value?.replace(/\D/g, "");
                    const emailValue = watchedEmail?.trim();
                    if (!phoneDigits && !emailValue) {
                      return "Please provide at least an email or phone number";
                    }
                    return true;
                  },
                  validPhone: (value) => {
                    const phoneDigits = value?.replace(/\D/g, "");
                    if (!phoneDigits) {
                      return true;
                    }
                    return validatePhone(value);
                  },
                },
              })}
              placeholder="(718) 614-6369"
              className={`min-h-[48px] h-12 sm:h-12 text-base touch-manipulation ${watchedPhone?.trim() && !errors.phone ? "border-primary/40 focus:border-primary" : ""}`}
              style={{ touchAction: 'manipulation' }}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-mobile" className="flex items-center gap-2">
              Email <span className="text-destructive">*</span>
              {watchedEmail?.trim() && !errors.email && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </Label>
            <Input 
              id="email-mobile"
              type="email"
              inputMode="email"
              {...register("email", {
                validate: {
                  contactRequired: (value) => {
                    const emailValue = value?.trim();
                    const phoneDigits = watchedPhone?.replace(/\D/g, "");
                    if (!emailValue && !phoneDigits) {
                      return "Please provide at least an email or phone number";
                    }
                    return true;
                  },
                  validEmail: (value) => {
                    const emailValue = value?.trim();
                    if (!emailValue) {
                      return true;
                    }
                    return validateEmail(value);
                  },
                },
              })}
              placeholder="your@email.com"
              className={`min-h-[48px] h-12 sm:h-12 text-base touch-manipulation ${watchedEmail?.trim() && !errors.email ? "border-primary/40 focus:border-primary" : ""}`}
              style={{ touchAction: 'manipulation' }}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={(e) => handleNext(e)}
            disabled={!watchedName?.trim() || (!watchedPhone?.trim() && !watchedEmail?.trim()) || !!errors.phone || !!errors.email}
            className="w-full min-h-[48px] h-14 sm:h-12 text-base font-medium bg-accent hover:bg-accent/90 active:bg-accent/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            Next Step
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Optional Fields */}
      {currentStep === 2 && (
        <div className={stepWrapperClass}>
          <div className="space-y-2">
            <Label htmlFor="businessName-mobile" className="flex items-center gap-2">
              Business Name
              {watchedBusinessName?.trim() && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </Label>
            <Input 
              id="businessName-mobile"
              {...register("businessName")}
              placeholder="Your business name (optional)"
              className={`min-h-[48px] h-12 sm:h-12 text-base touch-manipulation ${watchedBusinessName?.trim() ? "border-primary/40 focus:border-primary" : ""}`}
              style={{ touchAction: 'manipulation' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessLocation-mobile" className="flex items-center gap-2">
              Business Location
              {watchedBusinessLocation?.trim() && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </Label>
            <Input 
              id="businessLocation-mobile"
              {...register("businessLocation")}
              placeholder="Business address (optional)"
              className={`min-h-[48px] h-12 sm:h-12 text-base touch-manipulation ${watchedBusinessLocation?.trim() ? "border-primary/40 focus:border-primary" : ""}`}
              style={{ touchAction: 'manipulation' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details-mobile" className="flex items-center gap-2">
              Details
              {watchedDetails?.trim() && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </Label>
            <Textarea 
              id="details-mobile"
              {...register("details")}
              placeholder="If you know the dimensions, please include them in the description for a faster quote (optional)"
              rows={4}
              className={`resize-none text-base min-h-[120px] touch-manipulation ${watchedDetails?.trim() ? "border-primary/40 focus:border-primary" : ""}`}
              style={{ touchAction: 'manipulation' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="picture-mobile" className="flex items-center gap-2">
              Picture of the place you need signage for
            </Label>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors touch-manipulation" style={{ touchAction: 'manipulation' }}>
                <input
                  type="file"
                  id="picture-mobile"
                  accept="image/*"
                  {...register("picture")}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="picture-mobile" className="cursor-pointer flex flex-col items-center touch-manipulation" style={{ touchAction: 'manipulation' }}>
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
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
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                  style={{ touchAction: 'manipulation' }}
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
              className="flex-1 min-h-[48px] h-14 sm:h-12 text-base touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 min-h-[48px] h-14 sm:h-12 text-base font-medium bg-accent hover:bg-accent/90 active:bg-accent/80 transition-all duration-300 disabled:opacity-50 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </div>
      )}

      {/* Sticky CTA for Mobile - only for inline page form */}
      {!inDialog && showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-accent/20 shadow-2xl z-50 p-4 sm:hidden touch-manipulation" style={{ touchAction: 'manipulation' }}>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                trackPhoneClick("form_sticky_call_mobile", "+17186146369", formLocation ?? "application_form_mobile");
                window.open('tel:+17186146369', '_self');
              }}
              className="flex-1 min-h-[48px] h-12 text-base touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                if (currentStep === 1) {
                  handleNext(e);
                } else {
                  submitHandler(e as any);
                }
              }}
              disabled={currentStep === 1 && (!watchedName?.trim() || (!watchedPhone?.trim() && !watchedEmail?.trim()) || !!errors.phone || !!errors.email)}
              className="flex-1 min-h-[48px] h-12 text-base font-medium bg-accent hover:bg-accent/90 active:bg-accent/80 transition-all duration-300 disabled:opacity-50 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              {currentStep === 1 ? (
                <>
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                isSubmitting ? "Submitting..." : "Submit"
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );

  if (inDialog) {
    return (
      <>
        <form onSubmit={submitHandler} noValidate className="w-full p-4 sm:p-6" style={{ touchAction: 'manipulation' }}>
          {formContent}
        </form>
      </>
    );
  }

  if (withCard) {
    return (
      <>
        <form onSubmit={submitHandler} noValidate className="w-full" style={{ touchAction: 'manipulation' }}>
          <Card className="border-2 hover:border-accent/20 hover:shadow-lg transition-all duration-300 p-4 sm:p-6 rounded-2xl sm:rounded-lg">
            <CardContent className="p-0">
              {formContent}
            </CardContent>
          </Card>
        </form>
      </>
    );
  }

  return (
    <>
      <form onSubmit={submitHandler} noValidate className="w-full" style={{ touchAction: 'manipulation' }}>
        <div className="p-4 sm:p-6">
          {formContent}
        </div>
      </form>
    </>
  );
}

