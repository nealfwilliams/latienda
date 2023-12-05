import type { Meta, StoryObj } from '@storybook/react'
import { EMPTY_STATE_SIZE, EmptyState } from '.'

import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { Link } from '../../elements/Link'
import { FONT_SIZE } from '../../../theme/typography'

const meta: Meta<typeof EmptyState> = {
  title: 'Composites/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  render: () => <EmptyState />,
  args: {},
}

export const Small: Story = {
  render: () => <EmptyState size={EMPTY_STATE_SIZE.SM} />,
  args: {},
}

export const CustomMessage: Story = {
  render: () => <EmptyState>Custom message</EmptyState>,
  args: {},
}

export const JsxMessage: Story = {
  render: () => (
    <EmptyState>
      Something is wrong.{' '}
      <Link to="/" sx={{ fontSize: FONT_SIZE.MD }}>
        Click here to fix.
      </Link>
    </EmptyState>
  ),
  args: {},
}

export const CustomIcon: Story = {
  render: () => <EmptyState message="Custom icon" icon={NotInterestedIcon} />,
  args: {},
}
