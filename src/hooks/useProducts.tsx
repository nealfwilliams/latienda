import { API_ROOT } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const PRODUCTS_CACHE_KEY = 'products'
const baseUrl = `${API_ROOT}/products` 

export const useProducts = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  // Debounce updates to the query
  return useQuery({
    queryKey: [PRODUCTS_CACHE_KEY, debouncedQuery],
    queryFn: async () => {
      const url = debouncedQuery ? `${baseUrl}?search=${debouncedQuery}` : baseUrl
      const response = await fetch(url)
      return response.json()
    },
  })
}

