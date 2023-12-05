/** @jsxImportSource theme-ui */
import React from 'react'
import {
  getTypographyStyles,
  TYPOGRAPHY_TYPE,
} from '../../../../theme/typography'
import { StyledElementProps } from '../../../../theme'
import { GROUP_TYPE, useGroup } from '../../Group'
import { useEnvironment } from '../../../providers/env'

export enum LABEL_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export const SIZE_TYPOGRAPHY_MAP = {
  [LABEL_SIZE.SM]: TYPOGRAPHY_TYPE.CONTROL_SMALL,
  [LABEL_SIZE.MD]: TYPOGRAPHY_TYPE.CONTROL_MEDIUM,
  [LABEL_SIZE.LG]: TYPOGRAPHY_TYPE.CONTROL_LARGE,
}

type LabelProps = StyledElementProps<
  HTMLLabelElement,
  {
    size?: LABEL_SIZE
    typography?: TYPOGRAPHY_TYPE
    standalone?: boolean
  }
>

export const Label: React.FC<LabelProps> = ({
  sx,
  size,
  standalone,
  typography: typographyParam,
  ...rest
}) => {
  const { labelId, labelTargetId, type: groupType } = useGroup()
  const { flagInDevelopment } = useEnvironment()

  const typography =
    typographyParam || SIZE_TYPOGRAPHY_MAP[size || LABEL_SIZE.MD]

  if (
    groupType !== GROUP_TYPE.GROUP &&
    groupType !== GROUP_TYPE.RAW &&
    !standalone
  ) {
    flagInDevelopment(
      'Label component should be used within a Group component with property type={GROUP_TYPE.GROUP} or given the standalone flag',
    )
  }

  return (
    <label
      id={labelId}
      htmlFor={labelTargetId}
      sx={{
        ...getTypographyStyles(typography),
        ...sx,
      }}
      {...rest}
    />
  )
}
