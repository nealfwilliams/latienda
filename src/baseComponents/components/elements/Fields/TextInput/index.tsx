/** @jsxImportSource theme-ui */
import React from 'react'

import {
  TYPOGRAPHY_TYPE,
  getIconSize,
  getTypographyStyles,
} from '../../../../theme/typography'
import { StyledElementProps, useTheme } from '../../../../theme'
import { Icon } from '../../Icon'
import { COLOR } from '../../../../theme/colors'
import { Label } from '../../text/Label'
import { useUniqueId } from '../../../providers/uniqueIds'

export enum INPUT_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const typographyMap = {
  [INPUT_SIZE.SM]: TYPOGRAPHY_TYPE.PARAGRAPH_SMALL,
  [INPUT_SIZE.MD]: TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM,
  [INPUT_SIZE.LG]: TYPOGRAPHY_TYPE.PARAGRAPH_LARGE,
}

export const labelTypographyMap = {
  [INPUT_SIZE.SM]: TYPOGRAPHY_TYPE.CONTROL_SMALL,
  [INPUT_SIZE.MD]: TYPOGRAPHY_TYPE.CONTROL_SMALL,
  [INPUT_SIZE.LG]: TYPOGRAPHY_TYPE.CONTROL_MEDIUM,
}

export const labelOffsetMap = {
  [INPUT_SIZE.SM]: '-0.375rem',
  [INPUT_SIZE.MD]: '-0.45rem',
  [INPUT_SIZE.LG]: '-0.5rem',
}

const defaultPaddingX = {
  [INPUT_SIZE.SM]: 2,
  [INPUT_SIZE.MD]: 3,
  [INPUT_SIZE.LG]: 3,
}

const defaultHeight = {
  [INPUT_SIZE.SM]: '2.25rem',
  [INPUT_SIZE.MD]: '2.5rem',
  [INPUT_SIZE.LG]: '3rem',
}

export type TextInputProps = StyledElementProps<
  HTMLInputElement,
  {
    size?: INPUT_SIZE
    min?: number
    leftIcon?: React.FC<any>
    inline?: boolean
    inverted?: boolean
    label?: string
    disabled?: boolean
    type?: string
    value: string
    onChange?: (value: string) => void
    onChangeRaw?: (e: string | React.ChangeEvent) => void
  },
  string
>

export const TextInput = React.forwardRef<any, TextInputProps>(
  (
    {
      value,
      label,
      onChange,
      onChangeRaw,
      onClick,
      inline,
      inverted,
      size: sizeParam,
      leftIcon,
      sx,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const id = useUniqueId('text-input')
    const theme = useTheme()
    const size = sizeParam || INPUT_SIZE.MD
    const display = inline === false ? 'flex' : 'inline-flex'

    const paddingX = defaultPaddingX[size]
    const height = defaultHeight[size]

    const typography = typographyMap[size]
    const typographyStyles = getTypographyStyles(typography)

    const focusStyles = disabled
      ? {}
      : {
          boxShadow: inverted
            ? theme.boxShadow.INVERTED
            : theme.boxShadow.NORMAL,
        }

    return (
      <div
        ref={ref}
        onClick={onClick}
        id={id}
        sx={{
          height,
          display,
          px: paddingX,
          backgroundColor: inverted ? COLOR.DARK_GRAY : COLOR.WHITE,
          borderRadius: '4px',
          flexDirection: 'row',
          position: 'relative',
          alignItems: 'center',
          ':hover': focusStyles,
          ':focus': focusStyles,
          ...typographyStyles,
          ...sx,
        }}
      >
        <fieldset
          sx={{
            textAlign: 'left',
            position: 'absolute',
            inset: '-4px 0px 0px 0px',
            margin: '0px',
            padding: '0px 0.5rem',
            pointerEvents: 'none',
            borderRadius: 'inherit',
            borderStyle: 'solid',
            borderWidth: '1px',
            overflow: 'hidden',
            minWidth: '0%',
            borderColor: inverted ? COLOR.GRAY : COLOR.LIGHT_GRAY,
            zIndex: theme.zIndex.ELEVATED,
          }}
          aria-ignore
        >
          <legend
            style={{
              width: 'auto',
              float: 'unset',
              overflow: 'hidden',
              position: 'relative',
              display: 'block',
              padding: '0',
              height: '8px',
              fontSize: '0.75em',
              visibility: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {label && (
              <Label
                standalone
                aria-hidden="true"
                sx={{
                  px: 1,
                  position: 'relative',
                  display: 'inline-flex',
                  opacity: '0',
                  visibility: 'hidden',
                }}
                typography={labelTypographyMap[size]}
              >
                {label}
              </Label>
            )}
          </legend>
        </fieldset>
        {leftIcon && (
          <Icon
            icon={leftIcon}
            color={inverted ? COLOR.EXTRA_LIGHT_GRAY : COLOR.TEXT}
            sx={{
              mr: 2,
              fontSize: getIconSize(typographyStyles.fontSize),
            }}
          />
        )}
        <input
          value={value}
          onChange={(event) => {
            onChange && onChange(event.target.value)
            onChangeRaw && onChangeRaw(event)
          }}
          sx={{
            px: 0,
            py: 0,
            width: '100%',
            border: 'none',
            backgroundColor: inverted ? COLOR.DARK_GRAY : COLOR.WHITE,
            color: inverted ? COLOR.EXTRA_LIGHT_GRAY : COLOR.TEXT,
            ...typographyStyles,
            '::placeholder': {
              color: inverted ? COLOR.LIGHT_GRAY : COLOR.GRAY,
            },
            ':focus': {
              outline: 'none',
            },
          }}
          disabled={disabled}
          {...rest}
        ></input>
        {label && (
          <Label
            htmlFor={id}
            typography={labelTypographyMap[size]}
            sx={{
              position: 'absolute',
              color: inverted ? COLOR.EXTRA_LIGHT_GRAY : COLOR.ND_PROVOST_BLUE,
              left: '0.5rem',
              lineHeight: 1,
              zIndex: theme.zIndex.ELEVATED,
              px: 1,
              top: labelOffsetMap[size],
            }}
          >
            {label}
          </Label>
        )}
      </div>
    )
  },
)
