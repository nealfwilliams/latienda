import type { Meta, StoryObj } from '@storybook/react'

import { TabList } from './index'
import { ExampleTabs } from './example'

const meta: Meta<typeof TabList> = {
  title: 'Elements/TabList',
  component: TabList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TabList>

export const Default: Story = {
  render: () => <ExampleTabs />,
}
