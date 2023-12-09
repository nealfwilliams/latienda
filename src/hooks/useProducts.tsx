import { API_ROOT } from '@/constants'
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
  setQuery: (query: string) => void
}

const ProductListContext = createContext<ProductListContextType>({
  products: [],
  isLoading: false,
  error: null,
  query: '',
  setQuery: () => {}
})

export const ProductListProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  // Debounce updates to the query
  const { data, isLoading, error} = useQuery({
    queryKey: [PRODUCTS_CACHE_KEY, debouncedQuery],
    queryFn: async () => {
      const url = debouncedQuery ? `${baseUrl}?query=${query}` : baseUrl
      const response = await fetch(url)
      const responseData = await response.json()
      console.log('responseData', responseData)
      return responseData.products
    },
  })

  return (
    <ProductListContext.Provider
      value={{
        products: data,
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

