/** @jsxImportSource theme-ui */
import React from 'react'
import { StyledElementProps } from '../../../theme'
import { FlexHelperProps, convertFlexHelperProps } from './Row'

type ColumnProps = StyledElementProps<HTMLDivElement, FlexHelperProps>

export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ sx, children, ...rest }, ref) => {
    const flexStyles = convertFlexHelperProps(rest)

    return (
      <div
        ref={ref}
        {...rest}
        sx={{
          ...flexStyles,
          ...sx,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    )
  },
)
