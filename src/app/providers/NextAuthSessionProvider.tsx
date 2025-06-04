"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

// Loading component for authentication state
const AuthLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function NextAuthSessionProvider({ children }: SessionProviderProps) {
  const pathname = usePathname();
  
  // Skip session loading for public routes
  const isPublicRoute = pathname?.startsWith('/auth') || pathname === '/';
  
  return (
    <SessionProvider>
      <Suspense fallback={<AuthLoading />}>
        {children}
      </Suspense>
    </SessionProvider>
  );
}