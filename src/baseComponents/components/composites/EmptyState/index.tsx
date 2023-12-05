import { StyledElementProps } from '../../../theme'
import React from 'react'
import _SearchOffIcon from '@mui/icons-material/SearchOff'
import { Row } from '../../elements/layout/Row'
import { Column } from '../../elements/layout/Column'
import { PARAGRAPH_SIZE, Paragraph } from '../../elements/text/Paragraph'
import { COLOR } from '../../../theme/colors'
import { Icon } from '../../elements/Icon'
import { FONT_SIZE } from '../../../theme/typography'
import { importedDefaultComponentShim } from '../../../utils/misc'

const SearchOffIcon = importedDefaultComponentShim(_SearchOffIcon)

export enum EMPTY_STATE_SIZE {
  SM = 'SM',
  LG = 'LG',
}

type EmptyStateProps = StyledElementProps<
  HTMLDivElement,
  {
    icon?: React.FC
    omitIcon?: boolean
    size?: EMPTY_STATE_SIZE
    message?: string
  }
>

export const DEFAULT_MESSAGE = 'No results found.'

export const EmptyState: React.FC<EmptyStateProps> = ({
  omitIcon,
  icon,
  children,
  size: sizeProp,
  sx,
  ...rest
}) => {
  const size = sizeProp || EMPTY_STATE_SIZE.LG

  return (
    <Column
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        mt: size === EMPTY_STATE_SIZE.SM ? 3 : 5,
        ...sx,
      }}
      {...rest}
    >
      <Row>
        {omitIcon ? null : (
          <Icon
            icon={icon || SearchOffIcon}
            size={size === EMPTY_STATE_SIZE.SM ? FONT_SIZE.ML : FONT_SIZE.XL}
            color={COLOR.GRAY}
          />
        )}
      </Row>
      <Row sx={{ mt: size === EMPTY_STATE_SIZE.SM ? 0 : 1 }}>
        <Paragraph
          sx={{ color: COLOR.GRAY }}
          size={
            size === EMPTY_STATE_SIZE.SM ? PARAGRAPH_SIZE.MD : PARAGRAPH_SIZE.LG
          }
        >
          {children || DEFAULT_MESSAGE}
        </Paragraph>
      </Row>
    </Column>
  )
}
