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

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    trackPageView("/form", "Kaykov Media - Custom Quote Form");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("toast") === "1") {
      toast.success("Request submitted successfully!", {
        description: "We will contact you shortly.",
        duration: 5000,
      });
    }
  }, [location.search]);

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
              formId="form_page_mobile"
              formLocation="form_page"
              leadSource="Google"
            />
          ) : (
            <ApplicationForm
              onSuccess={handleSuccess}
              suppressSuccessToast
              withCard={false}
              formId="form_page_desktop"
              formLocation="form_page"
              leadSource="Google"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
