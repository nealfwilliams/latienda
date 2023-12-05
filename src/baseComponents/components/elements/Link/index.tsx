/** @jsxImportSource theme-ui */
import React from 'react'
import { useComponentConfig } from '../../providers/componentConfig'
import { COLOR } from '../../../theme/colors'
import { StyledElementProps } from '../../../theme'
import { TYPOGRAPHY_TYPE, getTypographyStyles } from '../../../theme/typography'

type LinkProps = StyledElementProps<
  HTMLSpanElement,
  {
    to: string
    target?: string
    size?: LINK_SIZE
  }
>

export enum LINK_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const SIZE_TYPOGRAPHY_MAP = {
  [LINK_SIZE.SM]: TYPOGRAPHY_TYPE.CONTROL_SMALL,
  [LINK_SIZE.MD]: TYPOGRAPHY_TYPE.CONTROL_MEDIUM,
  [LINK_SIZE.LG]: TYPOGRAPHY_TYPE.CONTROL_LARGE,
}

export const Link: React.FC<LinkProps> = ({
  size,
  to,
  sx,
  target,
  ...rest
}) => {
  const { link } = useComponentConfig()

  const typography = SIZE_TYPOGRAPHY_MAP[size || LINK_SIZE.MD]

  const InternalLink = link.internalLinkComponent
  const ExternalLink = link.externalLinkComponent

  const isExternal = link.externalMatcher.test(to)

  const styles = {
    color: COLOR.ND_BLUE_LIGHT,
    textDecoration: 'none',
    ...getTypographyStyles(typography),
    ...sx,
  }

  if (isExternal) {
    return <ExternalLink to={to} {...rest} sx={styles} target={target} />
  } else {
    return <InternalLink to={to} {...rest} sx={styles} target={target} />
  }
}
