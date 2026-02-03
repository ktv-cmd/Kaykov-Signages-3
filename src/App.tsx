import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, type Location } from "react-router-dom";
import { QuoteFormProvider } from "@/components/QuoteFormProvider";
import Index from "./pages/Index";
import Form from "./pages/Form";
import OutdoorSignages from "./pages/OutdoorSignages";
import IndoorSignages from "./pages/IndoorSignages";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

type LocationState = {
  backgroundLocation?: Location;
};

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  return (
    <QuoteFormProvider>
      <ScrollToTop />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Index />} />
        <Route path="/form" element={<Form />} />
        <Route path="/outdoor-signages" element={<OutdoorSignages />} />
        <Route path="/indoor-signages" element={<IndoorSignages />} />
      </Routes>
    </QuoteFormProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
