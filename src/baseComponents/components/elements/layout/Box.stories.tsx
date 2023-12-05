import type { Meta, StoryObj } from '@storybook/react'

import { Box as BoxComponent } from './Box'
import { COLOR } from '../../../theme/colors'

const meta: Meta<typeof BoxComponent> = {
  title: 'Elements/Layout/Box',
  component: BoxComponent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BoxComponent>

export const Box: Story = {
  render: () => (
    <BoxComponent sx={{ p: 1, bg: COLOR.PRIMARY }}>
      <BoxComponent sx={{ p: 1, bg: COLOR.SECONDARY }} />
    </BoxComponent>
  ),
}
