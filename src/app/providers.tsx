'use client'

import { UiProvider } from "@/baseComponents"
import { CartProvider } from "@/hooks/useCart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MetaMaskProvider } from '@metamask/sdk-react';
import { AuthProvider } from "@/hooks/useAuth";
import { ProductListProvider } from "@/hooks/useProducts";
import { API_ROOT } from "@/constants";

export const Providers = ({ children }: any) => {
  const queryClient = new QueryClient()
  const main = (
    <UiProvider>
      <CartProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ProductListProvider>
              {children}
            </ProductListProvider>
          </QueryClientProvider>
        </AuthProvider>
      </CartProvider>
    </UiProvider>
  )

  if (typeof window !== 'undefined') {
    return (
      <MetaMaskProvider
        debug
        sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: "Defiber",
            url: API_ROOT,
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