import type { Meta, StoryObj } from '@storybook/react'
import AppleIcon from '@mui/icons-material/Apple'

import { INPUT_SIZE } from '../TextInput'
import { Select } from './index'
import { useState } from 'react'
import { Column } from '../../layout/Column'
import { Group } from '../../Group'
import { Heading, HEADING_SIZE } from '../../text/Heading'
import { COLOR } from '../../../../theme/colors'

const meta: Meta<typeof Select> = {
  title: 'Elements/Fields/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta

const sizes = [
  { label: 'Large', size: INPUT_SIZE.LG },
  { label: 'Medium', size: INPUT_SIZE.MD },
  { label: 'Small', size: INPUT_SIZE.SM },
]

type Story = StoryObj<typeof Select>

const options = [
  { value: 'orange', label: 'Orange' },
  { value: 'apple', label: 'Apple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'pineapple', label: 'Pineapple' },
]

const StatefulSelect = (props: any) => {
  const [value, setValue] = useState('')

  return (
    <Select
      options={options}
      {...props}
      value={value}
      onSelectOption={setValue}
      placeholder="Select A Fruit..."
    />
  )
}

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <StatefulSelect
            size={size.size}
            leftIcon={AppleIcon}
            sx={{ mt: 2 }}
          />
        </Group>
      ))}
    </Column>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <StatefulSelect
            size={size.size}
            leftIcon={AppleIcon}
            sx={{ mt: 2 }}
            label="Fruit"
          />
        </Group>
      ))}
    </Column>
  ),
}

export const InvertedColors: Story = {
  render: () => (
    <Column sx={{ backgroundColor: COLOR.BLACK, p: 4 }}>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD} sx={{ color: COLOR.WHITE }}>
            {size.label}
          </Heading>
          <StatefulSelect
            inverted
            size={size.size}
            leftIcon={AppleIcon}
            sx={{ mt: 2 }}
            label="Fruit"
          />
        </Group>
      ))}
    </Column>
  ),
}
