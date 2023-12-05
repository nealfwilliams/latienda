import type { Meta, StoryObj } from '@storybook/react'
import SearchIcon from '@mui/icons-material/Search'

import { INPUT_SIZE, TextInput } from '.'
import { useState } from 'react'
import { Column } from '../../layout/Column'
import { Group } from '../../Group'
import { Heading, HEADING_SIZE } from '../../text/Heading'
import { COLOR } from '../../../../theme/colors'

const meta: Meta<typeof TextInput> = {
  title: 'Elements/Fields/TextInput',
  component: TextInput,
  tags: ['autodocs'],
}

export default meta

const sizes = [
  { label: 'Large', size: INPUT_SIZE.LG },
  { label: 'Medium', size: INPUT_SIZE.MD },
  { label: 'Small', size: INPUT_SIZE.SM },
]

type Story = StoryObj<typeof TextInput>

const StatefulInput = (props: any) => {
  const [value, setValue] = useState('')

  return <TextInput value={value} onChange={setValue} {...props} />
}

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <StatefulInput
            size={size.size}
            leftIcon={SearchIcon}
            placeholder="Placeholder"
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
          <StatefulInput
            size={size.size}
            leftIcon={SearchIcon}
            label="Search"
            placeholder="Placeholder"
            sx={{ mt: 2 }}
          />
        </Group>
      ))}
    </Column>
  ),
}

export const Inverted: Story = {
  render: () => (
    <Column sx={{ backgroundColor: COLOR.BLACK, p: 2 }}>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD} sx={{ color: COLOR.WHITE }}>
            {size.label}
          </Heading>
          <StatefulInput
            inverted
            size={size.size}
            leftIcon={SearchIcon}
            placeholder="Placeholder"
            label="Search"
            sx={{ mt: 2 }}
          />
        </Group>
      ))}
    </Column>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Column sx={{ p: 2 }}>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD} sx={{ color: COLOR.WHITE }}>
            {size.label}
          </Heading>
          <StatefulInput
            disabled
            size={size.size}
            leftIcon={SearchIcon}
            placeholder="Placeholder"
            label="Search"
            sx={{ mt: 2 }}
          />
        </Group>
      ))}
    </Column>
  ),
}
