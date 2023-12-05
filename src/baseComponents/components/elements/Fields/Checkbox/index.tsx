/** @jsxImportSource theme-ui */
import React from 'react'

import { StyledElementProps, useTheme } from '../../../../theme'

type CheckboxProps = StyledElementProps<
  HTMLInputElement,
  {
    checked: boolean
    onChange: (value: boolean) => void
  },
  string
>

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  sx,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <input
      type="checkbox"
      onChange={(e: any) => {
        onChange(e.target.checked)
      }}
      checked={checked}
      sx={{
        margin: '0px',
        height: '1.25rem',
        width: '1.25rem',
        cursor: 'pointer',
        ':hover': {
          boxShadow: theme.boxShadow,
        },
        ...sx,
      }}
      {...rest}
    />
  )
}
