import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic } from '.'

import { Paragraph } from '../Paragraph'

const meta: Meta<typeof Bold> = {
  title: 'Elements/Inline',
  component: Bold,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Bold>

export const Default: Story = {
  render: () => (
    <Paragraph>
      Text with <Bold>bold content</Bold> and <Italic>italic content</Italic>
    </Paragraph>
  ),
}
