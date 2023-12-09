/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react'
import {
  getTypographyStyles,
  TYPOGRAPHY_TYPE,
} from '../../../../theme/typography'
import { StyledElementProps } from '../../../../theme'
import { GROUP_TYPE, useGroup } from '../../Group'
import { COLOR } from '../../../../theme/colors'
import { useEnvironment } from '../../../providers/env'

type HeaderProps = StyledElementProps<
  HTMLSpanElement,
  {
    size?: HEADING_SIZE
    standalone?: boolean
    underline?: boolean
    underlineColor?: COLOR
    typography?: TYPOGRAPHY_TYPE
    level?: number
  }
>

export enum HEADING_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

const SIZE_TYPOGRAPHY_MAP = {
  [HEADING_SIZE.SM]: TYPOGRAPHY_TYPE.HEADING_SMALL,
  [HEADING_SIZE.MD]: TYPOGRAPHY_TYPE.HEADING_MEDIUM,
  [HEADING_SIZE.LG]: TYPOGRAPHY_TYPE.HEADING_LARGE,
  [HEADING_SIZE.XL]: TYPOGRAPHY_TYPE.HEADING_XLARGE,
}

const LEVEL_TYPOGRAPHY_MAP = {
  1: TYPOGRAPHY_TYPE.HEADING_XLARGE,
  2: TYPOGRAPHY_TYPE.HEADING_LARGE,
  3: TYPOGRAPHY_TYPE.HEADING_MEDIUM,
  4: TYPOGRAPHY_TYPE.HEADING_SMALL,
  5: TYPOGRAPHY_TYPE.HEADING_SMALL,
  6: TYPOGRAPHY_TYPE.HEADING_SMALL,
}

export const Heading: React.FC<HeaderProps> = ({
  sx,
  size,
  standalone,
  underline,
  underlineColor,
  typography: typographyProp,
  level: levelParam,
  ...rest
}) => {
  const { level: groupLevel, labelId, type, trackHeadingRendered } = useGroup()
  const { flagInDevelopment } = useEnvironment()

  // should prioritize explicitly passed level, eg if coming from markdown
  const level = levelParam || groupLevel

  useEffect(() => {
    trackHeadingRendered()
  })

  let typography = TYPOGRAPHY_TYPE.HEADING_MEDIUM

  if (typographyProp) {
    typography = typographyProp
  } else if (size) {
    typography = SIZE_TYPOGRAPHY_MAP[size]
  } else if (level) {
    typography =
      LEVEL_TYPOGRAPHY_MAP[level as keyof typeof LEVEL_TYPOGRAPHY_MAP]
  }

  if (type !== GROUP_TYPE.REGION && !standalone) {
    flagInDevelopment(
      'Heading component should be used within a Group component with property type={GROUP_TYPE.REGION} or given the standalone flag',
    )
  }

  return (
    <div
      id={labelId}
      role="heading"
      aria-level={level}
      sx={{
        py: 0,
        borderBottom: underline ? 'solid 2px' : undefined,
        borderBottomColor: underlineColor ? underlineColor : COLOR.SECONDARY,
        color: COLOR.TEXT,
        ...getTypographyStyles(typography),
        ...sx,
      }}
      {...rest}
    />
  )
}
