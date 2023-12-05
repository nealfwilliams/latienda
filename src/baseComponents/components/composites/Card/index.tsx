import { HEADING_SIZE, Heading } from '../../elements/text/Heading'
import { ReadMore } from '../../elements/text/ReadMore'
import { StyledElementProps, StylesProp, useTheme } from '../../../theme'
import { GROUP_TYPE, Group } from '../../elements/Group'
import { Box } from '../../elements/layout/Box'
import { Icon } from '../../elements/Icon'
import { Column, FONT, FONT_SIZE, Row, TYPOGRAPHY_TYPE } from '../../..'
import { COLOR } from '../../../theme/colors'
import React, { useEffect, useState } from 'react'
import { KEY_CODES } from '../../../utils/misc'
import { useHover } from '../../../utils/hooks/useHover'

export enum CARD_LAYOUT {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum CARD_SIZE {
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
}

type CardState = {
  isHovered: boolean
  activeBackground: COLOR
}

type CardChildren = React.ReactNode | ((state: CardState) => React.ReactNode)

export type CardProps = StyledElementProps<
  HTMLDivElement,
  {
    headline?: string
    heading?: string
    headingStyles?: StylesProp
    headingIcon?: React.FC
    headingAction?: React.ReactNode
    truncateHeadlineAfter?: number
    body?: React.ReactNode
    image?: string
    layout?: CARD_LAYOUT
    size?: CARD_SIZE
    displayDate?: string
    onClick?: () => void
    raised?: boolean
  },
  CardChildren
>

const MONTH_LABELS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

type DateDisplayProps = StyledElementProps<
  HTMLDivElement,
  {
    date: string
  }
>

const DateDisplay: React.FC<DateDisplayProps> = ({ date: dateString }) => {
  const date = React.useMemo(() => {
    return new Date(dateString)
  }, [dateString])

  return (
    <Column
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        fontFamily: FONT.BRANDED2,
        backgroundColor: COLOR.ND_GOLD,
      }}
    >
      <Box
        sx={{
          fontSize: FONT_SIZE.LG,
        }}
      >
        {date.getDate()}
      </Box>
      <Box
        sx={{
          fontSize: FONT_SIZE.MD,
          mt: 1,
        }}
      >
        {MONTH_LABELS[date.getMonth()]}
      </Box>
    </Column>
  )
}

export const Card: React.FC<CardProps> = ({
  size,
  displayDate,
  headline,
  image,
  layout,
  onClick,
  raised,
  truncateHeadlineAfter,
  heading,
  headingStyles,
  headingIcon,
  headingAction,
  sx,
  children,
}) => {
  const theme = useTheme()
  const contentPaddingX = size === CARD_SIZE.SM ? 3 : 4
  const isVertical = !layout || layout === CARD_LAYOUT.VERTICAL

  const { isHovered, anchorElementProps } = useHover()
  const [activeBackground, setActiveBackground] = useState(
    isHovered ? COLOR.ND_SKY_BLUE : COLOR.BACKGROUND,
  )

  useEffect(() => {
    setActiveBackground(isHovered ? COLOR.ND_SKY_BLUE : COLOR.BACKGROUND)
  }, [isHovered])

  const contentPaddingY = isVertical ? contentPaddingX : 2
  const typography =
    size === CARD_SIZE.SM
      ? TYPOGRAPHY_TYPE.HEADLINE_SMALL
      : TYPOGRAPHY_TYPE.HEADLINE_MEDIUM

  return (
    <Group
      {...anchorElementProps}
      type={headline || heading ? GROUP_TYPE.REGION : GROUP_TYPE.GROUP}
      role={onClick ? 'button' : 'group'}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && e.key === KEY_CODES.ENTER) {
          onClick()
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        boxShadow: raised || heading ? theme.boxShadow.NORMAL : undefined,
        width: !isVertical && '100%',
        borderBottom: 'solid 2px',
        borderColor: COLOR.TRANSPARENT,
        cursor: onClick ? 'pointer' : undefined,
        display: 'flex',
        flexDirection: layout === CARD_LAYOUT.HORIZONTAL ? 'row' : 'column',
        alignItems: 'flex-start',
        ':hover,:focus': onClick
          ? {
              transform: 'scale(1.01)',
              borderColor: COLOR.ND_SKY_BLUE_DARK,
              backgroundColor: COLOR.ND_SKY_BLUE,
            }
          : {},
        ...sx,
      }}
    >
      {image && (
        <img
          src={image}
          style={{
            width: isVertical ? '100%' : 'auto',
            height: isVertical ? 'auto' : '100%',
          }}
        />
      )}

      {displayDate && <DateDisplay date={displayDate} />}
      {heading && (
        <Row
          sx={{
            bg: COLOR.PRIMARY,
            color: COLOR.WHITE,
            width: '100%',
            px: contentPaddingX,
            py: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
            ...headingStyles,
          }}
        >
          <Row>
            {headingIcon && (
              <Icon
                icon={headingIcon}
                size={FONT_SIZE.LG}
                color={COLOR.WHITE}
                sx={{ mr: 2 }}
              />
            )}
            <Heading
              size={HEADING_SIZE.SM}
              sx={{
                color: COLOR.WHITE,
                whiteSpace: 'nowrap',
              }}
            >
              {heading}
            </Heading>
          </Row>
          <Row>{headingAction && headingAction}</Row>
        </Row>
      )}

      <Row sx={{ px: contentPaddingX, py: contentPaddingY }}>
        <Column justify="center">
          {headline && (
            <Heading typography={typography} sx={{ textAlign: 'justify' }}>
              {truncateHeadlineAfter ? (
                <ReadMore
                  lines={truncateHeadlineAfter}
                  typography={typography}
                  sx={{ bg: activeBackground }}
                >
                  {headline}
                </ReadMore>
              ) : (
                headline
              )}
            </Heading>
          )}
          {children && (
            <Box sx={{ mt: headline && !heading ? 2 : 0 }}>
              {typeof children === 'function'
                ? children({ isHovered, activeBackground })
                : children}
            </Box>
          )}
        </Column>
      </Row>
    </Group>
  )
}
