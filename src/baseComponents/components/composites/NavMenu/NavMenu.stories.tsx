import { NavMenu } from './'
import { DemoMenuImplementation } from './demo'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NavMenu> = {
  title: 'Composites/NavMenu',
  component: NavMenu,
}

export default meta
type Story = StoryObj<typeof NavMenu>

export const Default: Story = {
  render: () => <DemoMenuImplementation />,
  args: {},
}
