"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/signs/ui/tooltip";
import { QuoteFormProvider } from "@/components/signs/QuoteFormProvider";
import { Toaster as SonnerToaster } from "@/components/signs/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuoteFormProvider>
          {children}
          <SonnerToaster />
        </QuoteFormProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
