import type { Meta, StoryObj } from '@storybook/react'

import { ArrowLink } from '.'
import { Column } from '../layout/Column'
import { Box } from '../layout/Box'

const meta: Meta<typeof ArrowLink> = {
  title: 'Elements/ArrowLink',
  component: ArrowLink,
}

export default meta
type Story = StoryObj<typeof ArrowLink>

export const Default: Story = {
  render: () => (
    <Column>
      <Box>
        <ArrowLink to="/">Click Me</ArrowLink>
      </Box>
    </Column>
  ),
}
