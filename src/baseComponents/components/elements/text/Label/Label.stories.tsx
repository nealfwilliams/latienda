import type { Meta, StoryObj } from '@storybook/react'
import { GROUP_TYPE, Group } from '../../Group'
import { LABEL_SIZE, Label } from '.'
import { Column } from '../../layout/Column'

const meta: Meta<typeof Label> = {
  title: 'Elements/Label',
  component: Label,
}

export default meta
type Story = StoryObj<typeof Label>

const sizes = [
  { size: LABEL_SIZE.LG, label: 'Large' },
  { size: LABEL_SIZE.MD, label: 'Medium' },
  { size: LABEL_SIZE.SM, label: 'Small' },
]

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.GROUP}>
          <Label size={size.size}>{size.label}</Label>
        </Group>
      ))}
    </Column>
  ),
  args: {
    children: 'Label',
  },
}
