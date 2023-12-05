/** @jsxImportSource theme-ui */
import React from 'react'
import { StyledElementProps } from '../../../theme'
import { TYPOGRAPHY_TYPE, getTypographyStyles } from '../../../theme/typography'
import { COLOR } from '../../../theme/colors'
import { useUniqueId } from '../../providers/uniqueIds'

type TabListProps = StyledElementProps<HTMLDivElement>

export const TabList: React.FC<TabListProps> = ({ children, sx, ...props }) => {
  return (
    <div
      role="tablist"
      sx={{
        flexDirection: 'row',
        ...sx,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

type TabProps = StyledElementProps<
  HTMLButtonElement,
  {
    selected?: boolean
    children: string
  }
>

export const Tab: React.FC<TabProps> = ({ selected, children, ...rest }) => {
  const typographyStyles = getTypographyStyles(
    TYPOGRAPHY_TYPE.CONDENSED_TEXT_LARGE,
  )
  const labelId = useUniqueId('tab-label')

  return (
    <button
      role="tab"
      sx={{
        height: '3.25rem',
        boxSizing: 'border-box',
        px: 4,
        bg: COLOR.WHITE,
        color: selected ? COLOR.DARK_GRAY : COLOR.GRAY,
        border: 'none',
        borderBottom: selected ? 'solid 3px' : 'solid 1px',
        borderColor: selected ? COLOR.ND_BLUE_BRIGHT : COLOR.LIGHT_GRAY,
        cursor: 'pointer',
        ...typographyStyles,
      }}
      aria-labelledby={labelId}
      aria-selected={selected ? 'true' : 'false'}
      {...rest}
    >
      <div
        id={labelId}
        sx={{
          transform: selected ? 'scale(1.1)' : undefined,
          ':hover': {
            transform: selected ? 'scale(1.1)' : 'scale(1.05)',
          },
        }}
      >
        {children}
      </div>
    </button>
  )
}
