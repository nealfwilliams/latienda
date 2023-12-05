/** @jsxImportSource theme-ui */
import React from 'react'
import { StyledElementProps, useTheme } from '../../../theme'
import { COLOR } from '../../../theme/colors'
import {
  TYPOGRAPHY_TYPE,
  getIconSize,
  getTypographyStyles,
} from '../../../theme/typography'
import { Icon } from '../Icon'
import { useEnvironment } from '../../providers/env'
import { SPINNER_SIZE, Spinner } from '../Spinner'

export enum BUTTON_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const typographyMap = {
  [BUTTON_SIZE.SM]: TYPOGRAPHY_TYPE.CONTROL_SMALL,
  [BUTTON_SIZE.MD]: TYPOGRAPHY_TYPE.CONTROL_MEDIUM,
  [BUTTON_SIZE.LG]: TYPOGRAPHY_TYPE.CONTROL_LARGE,
}

const defaultPaddingX = {
  [BUTTON_SIZE.SM]: 2,
  [BUTTON_SIZE.MD]: 3,
  [BUTTON_SIZE.LG]: 3,
}

const defaultHeight = {
  [BUTTON_SIZE.SM]: '2rem',
  [BUTTON_SIZE.MD]: '2.5rem',
  [BUTTON_SIZE.LG]: '3rem',
}

const iconMargin = {
  [BUTTON_SIZE.SM]: 1,
  [BUTTON_SIZE.MD]: 2,
  [BUTTON_SIZE.LG]: 2,
}

export enum BUTTON_TYPE {
  DEFAULT = 'default',
  TEXT = 'text',
  OUTLINE = 'outline',
  // ARROW
}

export type ButtonProps = StyledElementProps<
  HTMLButtonElement,
  {
    size?: BUTTON_SIZE
    type?: BUTTON_TYPE
    color?: COLOR
    textColor?: COLOR
    customColor?: string
    primaryIcon?: React.FC<any>
    leftIcon?: React.FC<any>
    rightIcon?: React.FC<any>
    accessibleLabel?: string
    loading?: boolean
    disabled?: boolean
    disableFocusStyles?: boolean
  }
>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size: sizeParam,
      type: typeParam,
      color,
      customColor,
      textColor: textColorParam,
      primaryIcon,
      leftIcon,
      rightIcon,
      disabled: disabledParam,
      children,
      sx,
      loading,
      disableFocusStyles,
      ...rest
    },
    ref,
  ) => {
    const disabled = disabledParam || loading
    const theme = useTheme()
    const { flagInDevelopment } = useEnvironment()

    let bg: COLOR = COLOR.PRIMARY
    let borderColor = COLOR.TRANSPARENT as COLOR
    let cursor = 'pointer'
    let textColor = COLOR.BACKGROUND

    let hoverShadow: string | undefined = theme.boxShadow.NORMAL
    let hoverDecoration: string | undefined = undefined
    let hoverTransform = 'scale(1.03)'

    const isTextButton = typeParam === BUTTON_TYPE.TEXT
    const isIconButton = primaryIcon

    const type = typeParam || BUTTON_TYPE.DEFAULT
    const size = sizeParam || BUTTON_SIZE.MD

    const paddingX = isIconButton || isTextButton ? 0 : defaultPaddingX[size]
    const height = isTextButton ? undefined : defaultHeight[size]
    const width = primaryIcon ? height : undefined

    if (isIconButton && !rest['aria-label']) {
      flagInDevelopment(
        'Icon buttons should include aria-label prop for accessibility',
      )
    }

    if (isIconButton) {
      hoverTransform = 'scale(1.05)'
    }

    if (type === BUTTON_TYPE.DEFAULT) {
      bg = color || COLOR.SECONDARY
      textColor = COLOR.BLACK
    }

    if (type === BUTTON_TYPE.TEXT) {
      bg = COLOR.TRANSPARENT
      textColor = color || COLOR.PRIMARY
      hoverShadow = undefined
      hoverDecoration = 'underline'
    }

    if (type === BUTTON_TYPE.OUTLINE) {
      bg = COLOR.BACKGROUND
      textColor = color || COLOR.TEXT
      borderColor = textColor
    }

    if (textColorParam) {
      textColor = textColorParam
    }

    if (disabled) {
      cursor = 'not-allowed'

      if (bg === COLOR.BACKGROUND || bg === COLOR.TRANSPARENT) {
        textColor = COLOR.GRAY
      } else {
        bg = COLOR.GRAY
      }
    }

    const typography = typographyMap[size]
    const typographyStyles = getTypographyStyles(typography)

    let body: React.ReactNode = children
    if (primaryIcon) {
      body = (
        <Icon
          icon={primaryIcon}
          size={getIconSize(typographyStyles.fontSize)}
          color={textColor}
        />
      )
    }

    if (loading) {
      body = (
        <div
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner
            size={SPINNER_SIZE.SM}
            color={textColor}
            sx={{ position: 'absolute' }}
          />
          <div sx={{ visibility: 'hidden' }}>{body}</div>
        </div>
      )
    }

    const hoverStyles = !disabled
      ? {
          boxShadow: hoverShadow,
          transform: hoverTransform,
          textDecoration: hoverDecoration,
        }
      : undefined

    return (
      <button
        ref={ref}
        tabIndex={disabled ? -1 : 0}
        disabled={disabled}
        css={{
          backgroundColor: customColor,
        }}
        sx={{
          cursor,
          bg: customColor ? undefined : bg,
          color: textColor,
          px: paddingX,
          width: width,
          height: height,
          border: 'solid 1px',
          borderRadius: '4px',
          borderColor,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': !disableFocusStyles ? hoverStyles : {},
          ':focus': !disableFocusStyles ? hoverStyles : {},
          ...typographyStyles,
          ...sx,
        }}
        {...rest}
      >
        {leftIcon && (
          <Icon
            icon={leftIcon}
            size={typographyStyles.fontSize}
            sx={{ mr: iconMargin[size] }}
            color={textColor}
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
        {rightIcon && (
          <Icon
            icon={rightIcon}
            size={typographyStyles.fontSize}
            sx={{ ml: iconMargin[size] }}
            color={textColor}
          />
        )}
      </button>
    )
  },
)

type LinkButtonProps = Omit<ButtonProps, 'type' | 'color' | 'textColor'>

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <Button {...props} color={COLOR.ND_BLUE_BRIGHT} textColor={COLOR.WHITE} />
  )
}
