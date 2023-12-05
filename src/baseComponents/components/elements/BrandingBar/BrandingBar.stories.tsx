import type { Meta, StoryObj } from '@storybook/react'

import { BrandingBar } from '.'

const meta: Meta<typeof BrandingBar> = {
  title: 'Elements/BrandingBar',
  component: BrandingBar,

  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BrandingBar>

export const Default: Story = {
  render: () => <BrandingBar />,
}
