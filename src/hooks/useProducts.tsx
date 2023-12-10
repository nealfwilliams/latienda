import { API_ROOT, DEFAULT_CHAIN_ID } from '@/constants'
import { Product } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'

const PRODUCTS_CACHE_KEY = 'defiber-products'
const baseUrl = `${API_ROOT}/api/products` 

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

type ProductListContextType = {
  products: Product[],
  isLoading: boolean
  error: any
  query: string
  setQuery: (query: string) => void,
  setChainId: (chainId: string) => void,
}

const ProductListContext = createContext<ProductListContextType>({
  products: [],
  isLoading: false,
  error: null,
  query: '',
  setQuery: () => {},
  setChainId: () => {},
})

export const ProductListProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [query, setQuery] = useState('')
  const [chainId, setChainId] = useState<string | undefined>(undefined)
  const debouncedQuery = useDebounce(query, 500)


  // Debounce updates to the query
  const { data, isLoading, error} = useQuery({
    queryKey: [PRODUCTS_CACHE_KEY, debouncedQuery, chainId],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      queryParams.set('chainId', chainId || DEFAULT_CHAIN_ID)

      if (debouncedQuery) queryParams.set('query', query)

      const url = `${baseUrl}?${queryParams.toString()}`
      const response = await fetch(url)
      const responseData = await response.json()
      return responseData.products
    },
  })

  return (
    <ProductListContext.Provider
      value={{
        products: data,
        setChainId,
        isLoading,
        error,
        query,
        setQuery,
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export const useProducts = () => {
  return React.useContext(ProductListContext)
}

