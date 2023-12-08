'use client'

import { UiProvider } from "@/baseComponents"
import { CartProvider } from "@/hooks/useCart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MetaMaskProvider } from '@metamask/sdk-react';
import { AuthProvider } from "@/hooks/useAuth";

export const Providers = ({ children }: any) => {
  const queryClient = new QueryClient()
  const main = (
    <CartProvider>
      <AuthProvider>
        <UiProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </UiProvider>
      </AuthProvider>
    </CartProvider>
  )

  if (typeof window !== 'undefined') {
    return (
      <MetaMaskProvider
        debug
        sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: "La Tienda Shop",
            url: window.location.host,
          }
        }}
      >
        {main}
      </MetaMaskProvider>
    ) 
  } else {
    return main
  }

}