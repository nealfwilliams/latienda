import { SnackBar } from './'
import type { Meta, StoryObj } from '@storybook/react'
import {
  BasicExample,
  ReplaceMessageExample,
  WipeMessagesExample,
} from './examples'

const meta: Meta<typeof SnackBar> = {
  title: 'Composites/SnackBar',
  component: SnackBar,
}

export default meta
type Story = StoryObj<typeof SnackBar>

export const Default: Story = {
  render: () => <BasicExample />,
  args: {},
}

export const ReplaceMessage: Story = {
  render: () => <ReplaceMessageExample />,
  args: {},
}

export const WipeMessages: Story = {
  render: () => <WipeMessagesExample />,
  args: {},
}
