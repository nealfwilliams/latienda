/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { StyledElementProps, useTheme } from '../../../theme'
import { COLOR, colors } from '../../../theme/colors'
import { TYPOGRAPHY_TYPE, getTypographyStyles } from '../../../theme/typography'
import { Icon } from '../Icon'

export enum PILL_SIZE {
  SM = 'sm',
  LG = 'lg',
}

const typographyMap = {
  [PILL_SIZE.SM]: TYPOGRAPHY_TYPE.PARAGRAPH_XSMALL,
  [PILL_SIZE.LG]: TYPOGRAPHY_TYPE.PARAGRAPH_SMALL,
}

const defaultPaddingX = {
  [PILL_SIZE.SM]: 2,
  [PILL_SIZE.LG]: 3,
}

const defaultHeight = {
  [PILL_SIZE.SM]: '1.75rem',
  [PILL_SIZE.LG]: '2rem',
}

const iconMargin = {
  [PILL_SIZE.SM]: 1,
  [PILL_SIZE.LG]: 1,
}

export enum PILL_TYPE {
  DEFAULT = 'default',
  OUTLINE = 'outline',
}

type PillProps = StyledElementProps<
  HTMLButtonElement,
  {
    size?: PILL_SIZE
    type?: PILL_TYPE
    color?: COLOR
    icon?: React.FC<any>
  }
>

export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      size: sizeParam,
      type: typeParam,
      color,
      icon,
      children,
      sx,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme()
    const [hover, setHover] = useState(false)
    const clickable = onClick !== undefined

    let bg: COLOR = COLOR.PRIMARY
    let hoverBg = COLOR.PRIMARY_HIGHLIGHT
    let textColor = COLOR.TEXT
    let hoverTextColor: COLOR | undefined = undefined
    let borderColor = COLOR.TRANSPARENT as COLOR
    const cursor = clickable ? 'pointer' : 'default'

    const hoverShadow: string | undefined = theme.boxShadow.NORMAL
    const hoverDecoration: string | undefined = undefined
    const hoverTransform = 'scale(1.03)'

    const type = typeParam || PILL_TYPE.DEFAULT
    const size = sizeParam || PILL_SIZE.SM

    const paddingX = defaultPaddingX[size]
    const height = defaultHeight[size]

    if (type === PILL_TYPE.DEFAULT) {
      bg = color || COLOR.PRIMARY

      hoverBg =
        bg === COLOR.PRIMARY
          ? COLOR.PRIMARY_HIGHLIGHT
          : bg === COLOR.SECONDARY
          ? COLOR.SECONDARY_HIGHLIGHT
          : bg

      textColor =
        bg === COLOR.PRIMARY
          ? COLOR.TEXT_ON_PRIMARY
          : bg === COLOR.SECONDARY
          ? COLOR.TEXT_ON_SECONDARY
          : COLOR.TEXT

      hoverTextColor = textColor
    }

    if (type === PILL_TYPE.OUTLINE) {
      bg = COLOR.BACKGROUND
      hoverBg = COLOR.BACKGROUND
      textColor = color || COLOR.PRIMARY
      hoverTextColor = textColor
      borderColor = textColor
    }

    const typography = typographyMap[size]
    const typographyStyles = getTypographyStyles(typography)

    const body: React.ReactNode = children

    return (
      <button
        ref={ref}
        tabIndex={onClick ? -1 : 0}
        onClick={onClick}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
        sx={{
          ...typographyStyles,
          cursor,
          borderRadius: '1000px',
          bg: bg || colors.primary,
          color: textColor,
          px: paddingX,
          height: height,
          border: 'solid 1px',
          borderColor,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': clickable
            ? {
                bg: hoverBg,
                color: hoverTextColor,
                boxShadow: hoverShadow,
                transform: hoverTransform,
                textDecoration: hoverDecoration,
              }
            : undefined,
          ':focus': clickable
            ? {
                bg: hoverBg,
                color: hoverTextColor,
                boxShadow: hoverShadow,
                cursor: 'pointer',
                transform: hoverTransform,
                textDecoration: hoverDecoration,
              }
            : undefined,
          ...sx,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            icon={icon}
            size={typographyStyles.fontSize}
            sx={{ mr: iconMargin[size] }}
            color={hover ? hoverTextColor : textColor}
          />
        )}

        <div
          css={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textAlign: 'start',
          }}
        >
          {body}
        </div>
      </button>
    )
  },
)
