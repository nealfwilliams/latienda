/** @jsxImportSource theme-ui */

import React from 'react'
import { COLOR, colors } from '../../../theme/colors'

import { StyledElementProps } from '../../../theme'
import { FONT_SIZE } from '../../../theme/typography'
import { useEnvironment } from '../../providers/env'

export type IconProps = StyledElementProps<
  HTMLDivElement,
  {
    icon: React.FC<any>
    size?: FONT_SIZE
    color?: COLOR
  }
>

export const Icon: React.FC<IconProps> = ({
  icon,
  size,
  color,
  sx,
  onClick,
  ...rest
}) => {
  const InnerComponent = icon

  const { flagInDevelopment } = useEnvironment()

  if (onClick && !rest['aria-label']) {
    flagInDevelopment(
      'Icon component with onClick should have an aria-label and tabIndex={0}',
    )
  }

  return (
    <div
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : 'none'}
      sx={{
        ...sx,
        fontSize: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': onClick
          ? {
              cursor: 'pointer',
              transform: 'scale(1.05)',
            }
          : {},
      }}
      {...rest}
    >
      {React.createElement(InnerComponent, {
        fontSize: 'inherit',
        style: {
          color: colors[color || COLOR.PRIMARY],
        },
      })}
    </div>
  )
}
