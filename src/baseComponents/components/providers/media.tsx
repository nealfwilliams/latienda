import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTheme } from '../../theme'

type MediaContextType = {
  screenSize: number
  breakpoint: number
}

const MediaContext = createContext<MediaContextType>({
  screenSize: -1,
  breakpoint: -1,
})

export const MediaSizeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [renderCount, setRenderCount] = useState(0)
  const theme = useTheme()
  const breakpoints = theme.breakpoints.map(
    (bp) => parseInt(bp.slice(0, -2)),
    [theme],
  )

  const { screenSize, breakpoint } = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        screenSize: -1,
        breakpoint: -1,
      }
    }

    const screenSize = window.innerWidth
    const closestBreakpoint = breakpoints.findIndex((bp) => screenSize < bp)

    const breakpoint =
      closestBreakpoint === -1 ? breakpoints.length : closestBreakpoint

    return {
      screenSize,
      breakpoint,
    }
  }, [renderCount, breakpoints]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof window === 'undefined') return

    const rerenderOnResize = () => {
      setRenderCount((renderCount) => renderCount + 1)
    }

    window.addEventListener('resize', rerenderOnResize)

    return () => {
      window.removeEventListener('resize', rerenderOnResize)
    }
  }, [])

  return (
    <MediaContext.Provider
      value={{
        breakpoint,
        screenSize,
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export const useMediaQuery = () => useContext(MediaContext)
