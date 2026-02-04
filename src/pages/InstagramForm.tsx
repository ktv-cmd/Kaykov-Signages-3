import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationForm from "@/components/ApplicationForm";
import ApplicationFormMobile from "@/components/ApplicationFormMobile";
import { trackPageView } from "@/lib/analytics";
import { toast } from "sonner";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return isMobile;
};

const InstagramForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    trackPageView("/inst", "Kaykov Media - Instagram Quote Form");
  }, []);

  const handleSuccess = () => {
    navigate("/", { replace: true, state: { formSubmitted: true } });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          {isMobile ? (
            <ApplicationFormMobile
              onSuccess={handleSuccess}
              suppressSuccessToast
              showStickyCta={false}
              withCard={false}
              formId="instagram_form_mobile"
              formLocation="instagram_form"
              leadSource="Facebook"
            />
          ) : (
            <ApplicationForm
              onSuccess={handleSuccess}
              suppressSuccessToast
              withCard={false}
              formId="instagram_form_desktop"
              formLocation="instagram_form"
              leadSource="Facebook"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramForm;
