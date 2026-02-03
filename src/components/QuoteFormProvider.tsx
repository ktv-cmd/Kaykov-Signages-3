import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { trackCtaClick, type CtaMeta } from "@/lib/analytics";

type QuoteFormContextValue = {
  openForm: (meta?: CtaMeta) => void;
};

const QuoteFormContext = createContext<QuoteFormContextValue | undefined>(undefined);
const FORM_PATH = "/form";

export const QuoteFormProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const openForm = useCallback((meta?: CtaMeta) => {
    if (meta?.ctaId) {
      trackCtaClick({
        ...meta,
        destination: FORM_PATH,
        ctaType: meta.ctaType ?? "quote_form",
      });
    }
    navigate(FORM_PATH);
  }, [navigate]);

  const value = useMemo(() => ({ openForm }), [openForm]);

  return (
    <QuoteFormContext.Provider value={value}>
      {children}
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
