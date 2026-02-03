type CtaMeta = {
  ctaId: string;
  ctaText?: string;
  location?: string;
  destination?: string;
  ctaType?: string;
};

type FormSubmitMeta = {
  formId: string;
  location?: string;
  serviceType?: string;
};

const getGa4Id = () => {
  const envId = import.meta.env.VITE_GA4_ID;
  if (envId) {
    return envId;
  }
  if (typeof document === "undefined") {
    return undefined;
  }
  const metaId = document.querySelector('meta[name="ga4-id"]')?.getAttribute("content");
  if (!metaId) {
    return undefined;
  }
  const trimmed = metaId.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const getGtag = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const gtag = (window as any).gtag;
  return typeof gtag === "function" ? gtag : null;
};

const getPagePath = () => {
  if (typeof window === "undefined") {
    return undefined;
  }
  return window.location.pathname;
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  const ga4Id = getGa4Id();
  if (ga4Id) {
    gtag("config", ga4Id, {
      page_path: pagePath,
      page_title: pageTitle,
      send_page_view: false,
    });
  }

  gtag("event", "page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const trackCtaClick = ({ ctaId, ctaText, location, destination, ctaType }: CtaMeta) => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", "cta_click", {
    cta_id: ctaId,
    cta_text: ctaText,
    cta_location: location,
    cta_type: ctaType,
    destination,
    page_path: getPagePath(),
  });
};

export const trackPhoneClick = (ctaId: string, phoneNumber: string, location?: string) => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", "phone_click", {
    cta_id: ctaId,
    phone_number: phoneNumber,
    cta_location: location,
    page_path: getPagePath(),
  });
};

export const trackFormSubmit = ({ formId, location, serviceType }: FormSubmitMeta) => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", "form_submit", {
    form_id: formId,
    form_location: location,
    service_type: serviceType,
    page_path: getPagePath(),
  });
};

export type { CtaMeta };
