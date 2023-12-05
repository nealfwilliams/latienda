import type { Meta, StoryObj } from '@storybook/react'

import { ListBox } from '.'

const meta: Meta<typeof ListBox> = {
  title: 'Elements/ListBox',
  component: ListBox,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListBox>

const options = [
  { value: 'orange', label: 'Orange' },
  { value: 'apple', label: 'Apple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'pineapple', label: 'Pineapple' },
]

export const Default: Story = {
  render: () => <ListBox options={options} />,
}
