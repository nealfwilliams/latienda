import type { Meta, StoryObj } from '@storybook/react'
import { GROUP_TYPE, Group } from '../../Group'
import { HEADING_SIZE, Heading } from '.'
import { Column } from '../../layout/Column'
import { COLOR } from '../../../../theme/colors'

const meta: Meta<typeof Heading> = {
  title: 'Elements/Heading',
  component: Heading,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Heading>

const sizes = [
  { size: HEADING_SIZE.XL, label: 'Extra Large (Default Level 1)' },
  { size: HEADING_SIZE.LG, label: 'Large (Default Level 2)' },
  { size: HEADING_SIZE.MD, label: 'Medium (Default Level 3)' },
  { size: HEADING_SIZE.SM, label: 'Small (Default Level 4-6)' },
]

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={size.size}>{size.label}</Heading>
        </Group>
      ))}
    </Column>
  ),
  args: {
    children: 'Heading',
  },
}

export const Color: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={size.size} sx={{ color: COLOR.TEXT }}>
            {size.label}
          </Heading>
        </Group>
      ))}
    </Column>
  ),
  args: {
    children: 'Heading',
  },
}

export const Underline: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={size.size} underline>
            {size.label}
          </Heading>
        </Group>
      ))}
    </Column>
  ),
  args: {
    children: 'Heading',
  },
}
