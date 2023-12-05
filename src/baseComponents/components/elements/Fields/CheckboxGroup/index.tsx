import React, { useMemo } from 'react'

import { StyledElementProps, StylesProp } from '../../../../theme'
import { Key } from '../option'
import { Row } from '../../layout/Row'
import { Checkbox } from '../Checkbox'
import { Label } from '../../text/Label'
import { Group } from '../../Group'
import { GROUP_TYPE } from '../../Group'
import { Column } from '../../layout/Column'
import {
  TYPOGRAPHY_TYPE,
  getTypographyStyles,
} from '../../../../theme/typography'

type Option = {
  value: Key
  label: string
}

type CheckboxGroupProps = StyledElementProps<
  HTMLDivElement,
  {
    onChange: (value: Set<Key>) => void
    options: Option[]
    checkedOptions?: Set<Key>
    columnStyles: StylesProp
    columns?: number
  },
  string
>

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  checkedOptions,
  columns: columnsProp,
  columnStyles,
  onChange,
  ...rest
}) => {
  const columns = columnsProp || 1

  const optionsByColumn = useMemo(() => {
    // place first i/n items into first column, next i/n items into second column, etc.
    const optionsByColumn = []
    for (let i = 0; i < options.length; i++) {
      const maxPerColumn = Math.ceil(options.length / columns)
      const columnIndex = Math.floor(i / maxPerColumn)

      if (optionsByColumn[columnIndex] === undefined) {
        optionsByColumn[columnIndex] = [] as Option[]
      }

      optionsByColumn[columnIndex].push(options[i])
    }

    return optionsByColumn
  }, [options, columns])

  return (
    <Row {...rest}>
      {optionsByColumn.map((options, index) => (
        <Column
          key={index}
          grow={1}
          sx={{
            mr: 4,
            ...columnStyles,
          }}
        >
          {options.map((option) => (
            <Group type={GROUP_TYPE.RAW} key={option.value}>
              {({ labelTargetId }) => (
                <Row
                  sx={{
                    mb: 2,
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    onChange={(checked) => {
                      const updatedSet = new Set(checkedOptions || [])
                      if (checked) {
                        updatedSet.add(option.value)
                      } else {
                        updatedSet.delete(option.value)
                      }
                      onChange(updatedSet)
                    }}
                    checked={!!checkedOptions?.has(option.value)}
                    id={labelTargetId}
                    sx={{ mr: 2 }}
                  />
                  <Label
                    sx={{
                      cursor: 'pointer',
                      ...getTypographyStyles(
                        TYPOGRAPHY_TYPE.CONDENSED_TEXT_MEDIUM,
                      ),
                    }}
                  >
                    {option.label}
                  </Label>
                </Row>
              )}
            </Group>
          ))}
        </Column>
      ))}
    </Row>
  )
}
