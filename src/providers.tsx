import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";
import type { ReactNode } from "react";

interface IFProps {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, // optional
      retry: false, // optional, but many people set this too
    },
  },
});

export const Providers = ({ children }: IFProps) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </QueryClientProvider>
    </APIProvider>
  );
};
