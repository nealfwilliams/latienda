import { DetailedHTMLProps, PropsWithChildren } from 'react'
import { ThemeUICSSObject, ThemeUIProvider, useThemeUI } from 'theme-ui'

import {
  FONT,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  fontStyles,
} from './typography'
import { COLOR, colors } from './colors'
import { BOX_SHADOW, Z_INDEX } from './custom'

export const BREAKPOINTS = ['576px', '768px', '992px', '1200px', '1400px']

export const SPACING = [
  '0rem',
  '0.25rem',
  '0.5rem',
  '0.75rem',
  '1rem',
  '1.5rem',
  '2rem',
  '3rem',
  '4rem',
]

export const theme = {
  ...fontStyles,
  colors,
  space: SPACING,
  boxShadow: BOX_SHADOW,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
}

export type Theme = typeof theme

export type StylesProp = ThemeUICSSObject & {
  color?: COLOR
  bg?: COLOR
  borderColor?: COLOR
  fontSize?: FONT_SIZE
  font?: FONT
  fontWeight?: FONT_WEIGHT
  lineHeight?: LINE_HEIGHT | number
  boxShadow?: BOX_SHADOW
}

export type StyledElementProps<
  E extends Element,
  CustomProps = object,
  Children = React.ReactNode,
> =
{
  sx?: StylesProp
  children?: Children
} & Omit<React.HTMLAttributes<E>, 'children' | 'onChange' | 'size'> &
  CustomProps & {
    htmlFor?: string
  }

export const useTheme = () => {
  const { theme } = useThemeUI()
  return theme as Theme
}

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
}
