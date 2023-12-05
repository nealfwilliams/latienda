
// Reads value from local storage
// Provides a setter function to update the value in local storage
// Setter should also update a local state variable so that the 

import React from "react"

// component re-renders when the value is updated
export function useLocalStorage<ValueType = any>(key: string, defaultValue?: ValueType) {
  const [value, setValue] = React.useState<ValueType>(() => {
    if (typeof window === 'undefined') return defaultValue as ValueType

    let storedValue = defaultValue

    try {
      const serializedValue = window.localStorage.getItem(key)
      if (serializedValue) {
        storedValue = JSON.parse(serializedValue)
      }
    } catch (e) {
      window.localStorage.removeItem(key)
    }

    return storedValue as ValueType
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    if (value === undefined) {
      window.localStorage.removeItem(key)
    } else
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return {
    value,
    setValue
  }
}
  