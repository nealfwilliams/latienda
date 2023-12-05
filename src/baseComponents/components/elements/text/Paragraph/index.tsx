/** @jsxImportSource theme-ui */
import React from 'react'
import {
  getTypographyStyles,
  TYPOGRAPHY_TYPE,
} from '../../../../theme/typography'
import { StyledElementProps } from '../../../../theme'

type ParagraphProps = StyledElementProps<
  HTMLSpanElement,
  {
    size?: PARAGRAPH_SIZE
    typography?: TYPOGRAPHY_TYPE
  }
>

export enum PARAGRAPH_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const SIZE_TYPOGRAPHY_MAP = {
  [PARAGRAPH_SIZE.SM]: TYPOGRAPHY_TYPE.PARAGRAPH_SMALL,
  [PARAGRAPH_SIZE.MD]: TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM,
  [PARAGRAPH_SIZE.LG]: TYPOGRAPHY_TYPE.PARAGRAPH_LARGE,
}

export const Paragraph: React.FC<ParagraphProps> = ({
  size,
  typography: typographyParam,
  sx,
  ...rest
}) => {
  const typography =
    typographyParam || SIZE_TYPOGRAPHY_MAP[size || PARAGRAPH_SIZE.MD]

  return (
    <div
      sx={{
        ...getTypographyStyles(typography),
        my: 1,
        ...sx,
      }}
      {...rest}
    />
  )
}
