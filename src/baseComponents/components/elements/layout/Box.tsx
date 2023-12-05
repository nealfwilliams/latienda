/** @jsxImportSource theme-ui */
import React from 'react'
import { StyledElementProps } from '../../../theme'

export type BoxProps = StyledElementProps<HTMLDivElement>

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <div {...props} ref={ref} />
))
