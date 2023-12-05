import React, { createContext, useContext, useMemo, useRef } from 'react'

type PrefixCountIndex = {
  [prefix: string]: {
    count: number
  }
}

const UniqueIdContext = createContext({} as PrefixCountIndex)

// Utility for generating unique ids for elements. Elements will receive a unique and stable id when it mounts that
// Incrementing global counter is used to here to ensure that the id is generated deterministically, to
// avoid issues with SSR and hydration.
export const UniqueIdProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const countIndexRef = useRef<PrefixCountIndex>({})

  return (
    <UniqueIdContext.Provider value={countIndexRef.current}>
      {children}
    </UniqueIdContext.Provider>
  )
}

export const useUniqueId = (prefix: string) => {
  const countIndex = useContext(UniqueIdContext)

  return useMemo(() => {
    const idForPrefix = countIndex[prefix]?.count || 1

    if (!countIndex[prefix]) {
      countIndex[prefix] = {
        count: 2,
      }
    } else {
      countIndex[prefix].count += 1
    }

    return `${prefix}-${idForPrefix}`
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
