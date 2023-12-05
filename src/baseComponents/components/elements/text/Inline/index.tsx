/** @jsxImportSource theme-ui */
import React from 'react'
import { StyledElementProps } from '../../../../theme'
import { FONT_WEIGHT } from '../../../../theme/typography'

type InlineProps = StyledElementProps<HTMLSpanElement>

export const Bold: React.FC<InlineProps> = ({ sx, ...rest }) => {
  return (
    <span
      sx={{
        ...sx,
        fontWeight: FONT_WEIGHT.BOLD,
      }}
      {...rest}
    />
  )
}

export const Italic: React.FC<InlineProps> = ({ sx, ...rest }) => {
  return (
    <span
      sx={{
        ...sx,
        fontStyle: 'italic',
      }}
      {...rest}
    />
  )
}
