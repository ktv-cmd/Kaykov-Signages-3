"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { trackCtaClick, type CtaMeta } from "@/lib/signs/analytics";
import ApplicationForm from "@/components/signs/ApplicationForm";
import ApplicationFormMobile from "@/components/signs/ApplicationFormMobile";
import { Dialog, DialogContent } from "@/components/signs/ui/dialog";

type QuoteFormContextValue = {
  openForm: (meta?: CtaMeta) => void;
};

const QuoteFormContext = createContext<QuoteFormContextValue | undefined>(undefined);
// NOTE: Original Vite/react-router version routed to /form to back the modal.
// In Next we keep the modal purely client-side state to avoid routing complexity.

export const QuoteFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMeta, setActiveMeta] = useState<CtaMeta | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const openForm = useCallback((meta?: CtaMeta) => {
    if (meta?.ctaId) {
      trackCtaClick({
        ...meta,
        destination: "/form",
        ctaType: meta.ctaType ?? "quote_form",
      });
    }
    setActiveMeta(meta ?? null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setActiveMeta(null);
    setIsOpen(false);
  }, []);

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
        open={isOpen}
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
              leadSource="Google"
            />
          ) : (
            <ApplicationForm
              inDialog
              onClose={closeModal}
              formId="quote_form_dialog_desktop"
              formLocation={activeMeta?.location ?? "quote_form_dialog"}
              leadSource="Google"
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
