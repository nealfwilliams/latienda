import { API_ROOT } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

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

export const useProducts = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  // Debounce updates to the query
  const { data, isLoading, error} = useQuery({
    queryKey: [PRODUCTS_CACHE_KEY, debouncedQuery],
    queryFn: async () => {
      const url = debouncedQuery ? `${baseUrl}` : baseUrl
      const response = await fetch(url)
      const responseData = await response.json()
      return responseData.products
    },
  })

  return {
    products: data,
    isLoading,
    error,
    query,
    setQuery,
  }
}

