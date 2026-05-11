import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, type Location } from "react-router-dom";
import { QuoteFormProvider } from "@/components/QuoteFormProvider";
import Index from "./pages/Index";
import Form from "./pages/Form";
import InstagramForm from "./pages/InstagramForm";
import OutdoorSignages from "./pages/OutdoorSignages";
import IndoorSignages from "./pages/IndoorSignages";
import AITool from "./pages/AITool";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

type LocationState = {
  backgroundLocation?: Location;
};

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const isFormModal = location.pathname === "/form";
  const routesLocation = isFormModal
    ? (state?.backgroundLocation ?? ({ ...location, pathname: "/" } as Location))
    : location;

  return (
    <QuoteFormProvider>
      <ScrollToTop />
      <Routes location={routesLocation}>
        <Route path="/" element={<Index />} />
        <Route path="/form" element={<Form />} />
        <Route path="/inst" element={<InstagramForm />} />
        <Route path="/window" element={<Navigate to="/inst" replace />} />
        <Route path="/outdoor-signages" element={<OutdoorSignages />} />
        <Route path="/indoor-signages" element={<IndoorSignages />} />
        <Route path="/ai" element={<AITool />} />
      </Routes>
    </QuoteFormProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename={"/"}>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
