/** @jsxImportSource theme-ui */
import { CSSProperties, ThemeUICSSProperties } from 'theme-ui'
import { StyledElementProps } from '../../../theme'
import React from 'react'

// Putting shared utils and types here so autodocs can pick them up
export const convertFlexHelperProps = (props: FlexHelperProps) => {
  const styleObject: ThemeUICSSProperties = {}

  if (props.grow) {
    styleObject.flexGrow = props.grow
  }

  if (props.shrink) {
    styleObject.flexShrink = props.shrink
  }

  if (props.flex) {
    styleObject.flex = props.flex
  }

  if (props.basis) {
    styleObject.flexBasis = props.basis
  }

  if (props.centered) {
    styleObject.alignItems = 'center'
    styleObject.justifyContent = 'center'
  }

  if (props.align) {
    styleObject.alignItems = props.align
  }

  if (props.justify) {
    styleObject.justifyContent = props.justify
  }

  return styleObject
}

export type FlexHelperProps = {
  grow?: number
  shrink?: number
  basis?: string
  flex?: string
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  centered?: boolean
}

type RowProps = StyledElementProps<
  HTMLDivElement,
  FlexHelperProps & {
    breakpoint?: number
  }
>

type FlexDirection = 'row' | 'column'

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ sx, children, breakpoint: breakpointParam, ...rest }, ref) => {
    const flexStyles = convertFlexHelperProps(rest)

    let flexDirection: FlexDirection | FlexDirection[] = 'row'

    if (breakpointParam !== undefined) {
      flexDirection = []

      for (let i = 0; i <= breakpointParam; i++) {
        flexDirection.push('column')
      }

      flexDirection.push('row')
    }

    return (
      <div
        {...rest}
        ref={ref}
        sx={{
          ...flexStyles,
          ...sx,
          flexDirection,
          display: 'flex',
        }}
      >
        {children}
      </div>
    )
  },
)
