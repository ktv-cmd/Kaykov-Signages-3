import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { trackCtaClick, trackPageView, type CtaMeta } from "@/lib/analytics";
import ApplicationForm from "@/components/ApplicationForm";
import ApplicationFormMobile from "@/components/ApplicationFormMobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type QuoteFormContextValue = {
  openForm: (meta?: CtaMeta) => void;
};

const QuoteFormContext = createContext<QuoteFormContextValue | undefined>(undefined);
const FORM_PATH = "/form";

export const QuoteFormProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { backgroundLocation?: Location } | null;
  const backgroundLocation = locationState?.backgroundLocation;
  const [isOpen, setIsOpen] = useState(false);
  const [activeMeta, setActiveMeta] = useState<CtaMeta | null>(null);
  const shouldShowModal = location.pathname === FORM_PATH;
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(max-width: 767px)").matches;
  });

  const openForm = useCallback((meta?: CtaMeta) => {
    const formPath = meta?.destination ?? FORM_PATH;
    if (meta?.ctaId) {
      trackCtaClick({
        ...meta,
        destination: formPath,
        ctaType: meta.ctaType ?? "quote_form",
      });
    }
    if (formPath !== FORM_PATH) {
      navigate(formPath);
      return;
    }
    setActiveMeta(meta ?? null);
    setIsOpen(true);
    navigate(FORM_PATH, { state: { backgroundLocation: location } });
  }, [location, navigate]);

  const closeModal = useCallback(() => {
    setActiveMeta(null);
    setIsOpen(false);
    if (backgroundLocation) {
      const nextPath = `${backgroundLocation.pathname}${backgroundLocation.search}${backgroundLocation.hash}`;
      navigate(nextPath, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [backgroundLocation, navigate]);

  useEffect(() => {
    if (shouldShowModal) {
      trackPageView("/form", "Kaykov Media - Custom Quote Form");
    }
  }, [shouldShowModal]);

  useEffect(() => {
    if (location.pathname !== FORM_PATH && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, location.pathname]);

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

  const value = useMemo(() => ({ openForm }), [openForm]);

  return (
    <QuoteFormContext.Provider value={value}>
      {children}
      <Dialog
        open={shouldShowModal || isOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent className="max-w-3xl p-0 sm:p-0">
          {isMobile ? (
            <ApplicationFormMobile
              inDialog
              showStickyCta={false}
              onClose={closeModal}
              formId="quote_form_dialog_mobile"
              formLocation={activeMeta?.location ?? "quote_form_dialog"}
            />
          ) : (
            <ApplicationForm
              inDialog
              onClose={closeModal}
              formId="quote_form_dialog_desktop"
              formLocation={activeMeta?.location ?? "quote_form_dialog"}
            />
          )}
        </DialogContent>
      </Dialog>
    </QuoteFormContext.Provider>
  );
};

export const useQuoteForm = () => {
  const context = useContext(QuoteFormContext);
  if (!context) {
    throw new Error("useQuoteForm must be used within QuoteFormProvider");
  }
  return context;
};
