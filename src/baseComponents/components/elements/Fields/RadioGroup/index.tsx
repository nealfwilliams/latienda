import React from 'react'

import { StyledElementProps } from '../../../../theme'
import { Key } from '../option'
import { Row } from '../../layout/Row'
import { Label } from '../../text/Label'
import { Group } from '../../Group'
import { GROUP_TYPE } from '../../Group'
import { Column } from '../../layout/Column'
import {
  TYPOGRAPHY_TYPE,
  getTypographyStyles,
} from '../../../../theme/typography'
import { Radio } from '../Radio'

type Option = {
  value: Key
  label: string
}

type RadioGroupProps = StyledElementProps<
  HTMLDivElement,
  {
    onChange: (value: Key) => void
    options: Option[]
    checked?: Key
  },
  string
>

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  checked,
  onChange,
  ...rest
}) => {
  return (
    <Column {...rest}>
      {options.map((option) => (
        <Group type={GROUP_TYPE.RAW} key={option.value}>
          {({ labelTargetId }) => (
            <Row
              sx={{
                mb: 2,
                alignItems: 'center',
              }}
            >
              <Radio
                onChange={() => {
                  onChange(option.value)
                }}
                checked={checked === option.value}
                id={labelTargetId}
                sx={{ mr: 2 }}
              />
              <Label
                sx={{
                  cursor: 'pointer',
                  ...getTypographyStyles(TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM),
                }}
              >
                {option.label}
              </Label>
            </Row>
          )}
        </Group>
      ))}
    </Column>
  )
}
