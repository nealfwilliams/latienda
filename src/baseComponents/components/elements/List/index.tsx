/** @jsxImportSource theme-ui */
import React from 'react'
import _CircleIcon from '@mui/icons-material/Circle'
import _CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import _SquareIcon from '@mui/icons-material/Square'
import _SquareOutlinedIcon from '@mui/icons-material/SquareOutlined'

import { StyledElementProps } from '../../../theme'
import { COLOR, Label, TYPOGRAPHY_TYPE } from '../../..'
import { FONT_SIZE, getTypographyStyles } from '../../../theme/typography'
import { Icon } from '../Icon'
import { importedDefaultComponentShim } from '../../../utils/misc'
import { useLinesHeight } from '../text/ReadMore'
import { Column } from '../layout/Column'
import { useEnvironment } from '../../providers/env'

const CircleIcon = importedDefaultComponentShim(_CircleIcon)
const CircleOutlinedIcon = importedDefaultComponentShim(_CircleOutlinedIcon)
const SquareIcon = importedDefaultComponentShim(_SquareIcon)
const SquareOutlinedIcon = importedDefaultComponentShim(_SquareOutlinedIcon)

type ListProps = StyledElementProps<
  HTMLUListElement,
  {
    ordered?: boolean
    size?: LIST_SIZE
    icon?: React.FC<any>
    iconColor?: COLOR
    iconSize?: FONT_SIZE
  }
>

export enum LIST_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const marginSizeMap = {
  [LIST_SIZE.SM]: 2,
  [LIST_SIZE.MD]: 3,
  [LIST_SIZE.LG]: 4,
}

const iconSizeMap = {
  [LIST_SIZE.SM]: FONT_SIZE.XXS,
  [LIST_SIZE.MD]: FONT_SIZE.XXS,
  [LIST_SIZE.LG]: FONT_SIZE.XS,
}

const defaultIcons = [
  CircleIcon,
  CircleOutlinedIcon,
  SquareIcon,
  SquareOutlinedIcon,
]

const sizeTypographyMap = {
  [LIST_SIZE.SM]: TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL,
  [LIST_SIZE.MD]: TYPOGRAPHY_TYPE.CONDENSED_TEXT_MEDIUM,
  [LIST_SIZE.LG]: TYPOGRAPHY_TYPE.CONDENSED_TEXT_LARGE,
}

const ListConfigContext = React.createContext<{
  size: LIST_SIZE
  ordered: boolean
  icon: React.FC<any>
  iconColor: COLOR
  iconSize?: FONT_SIZE
  depth: number
}>({
  size: LIST_SIZE.MD,
  ordered: false,
  icon: CircleIcon,
  iconColor: COLOR.TEXT,
  iconSize: undefined,
  depth: -1,
})

const useListConfig = () => React.useContext(ListConfigContext)

export const List: React.FC<ListProps> = ({
  sx,
  size: sizeParam,
  ordered,
  icon,
  iconSize: iconSizeParam,
  iconColor: iconColorParam,
  children,
}) => {
  const {
    depth: parentDepth,
    size: parentSize,
    iconColor: parentIconColor,
    iconSize: parentIconSize,
  } = useListConfig()
  const depth = parentDepth + 1

  const defaultStyles = {
    listStyleType: 'none',
    ...getTypographyStyles(),
  }

  const defaultIcon = defaultIcons[depth] || CircleIcon
  const size = sizeParam || parentSize || LIST_SIZE.MD
  const iconSize = iconSizeParam || parentIconSize || iconSizeMap[size]
  const iconColor = iconColorParam || parentIconColor || COLOR.TEXT

  return (
    <ListConfigContext.Provider
      value={{
        size,
        icon: icon || defaultIcon,
        iconColor,
        iconSize,
        ordered: ordered || false,
        depth,
      }}
    >
      {ordered ? (
        <ul sx={{ ...defaultStyles, ...sx }}>{children}</ul>
      ) : (
        <ol sx={{ ...defaultStyles, ...sx }}>{children}</ol>
      )}
    </ListConfigContext.Provider>
  )
}

type ListItemProps = StyledElementProps<
  HTMLLIElement,
  {
    index: number
    icon?: React.FC<any>
    iconSize?: FONT_SIZE
    iconColor?: COLOR
    iconLabel?: string
    onIconClick?: () => void
  }
>

export const ListItem: React.FC<ListItemProps> = ({
  index,
  sx,
  icon: iconParam,
  iconSize: iconSizeParam,
  iconColor: iconColorParam,
  onIconClick,
  onClick,
  children,
  iconLabel,
  ...rest
}) => {
  const {
    ordered,
    icon: listIcon,
    iconColor: listIconColor,
    iconSize: listIconSize,
    size,
    depth,
  } = useListConfig()
  const { flagInDevelopment } = useEnvironment()

  if (onIconClick && !iconLabel) {
    flagInDevelopment(
      'ListItem component with onIconClick should have an iconLabel prop for accessibility',
    )
  }

  const icon = iconParam || listIcon
  const iconSize = iconSizeParam || listIconSize
  const iconColor = iconColorParam || listIconColor

  const typography = sizeTypographyMap[size]

  const typographyStyles = getTypographyStyles(sizeTypographyMap[size])
  const lineHeight = useLinesHeight({ typography, lines: 1 })

  return (
    <li
      sx={{
        depth,
        display: 'flex',
        mt: index === 0 && depth === 0 ? 0 : marginSizeMap[size],
        ml: 1,
        ...typographyStyles,
        ...sx,
      }}
      {...rest}
    >
      {ordered ? (
        <Label standalone sx={{ mr: 2 }}>
          {index + 1}.
        </Label>
      ) : (
        <Column sx={{ height: lineHeight }} justify="center">
          <Icon
            icon={icon}
            color={iconColor}
            size={iconSize}
            onClick={onIconClick}
            aria-label={iconLabel}
            sx={{
              mr: 3,
              alignItems: 'flex-start',
            }}
          />
        </Column>
      )}

      <div
        sx={{
          cursor: onClick ? 'pointer' : 'default',
        }}
        tabIndex={onClick ? 0 : undefined}
      >
        {children}
      </div>
    </li>
  )
}
