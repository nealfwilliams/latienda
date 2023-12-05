import type { Meta, StoryObj } from '@storybook/react'

import { Link, LINK_SIZE } from '.'
import { Group } from '../Group'
import { HEADING_SIZE, Heading } from '../text/Heading'
import { Column } from '../layout/Column'

const meta: Meta<typeof Link> = {
  title: 'Elements/Link',
  component: Link,
}

export default meta
type Story = StoryObj<typeof Link>

const sizes = [
  { size: LINK_SIZE.LG, label: 'Large' },
  { size: LINK_SIZE.MD, label: 'Medium' },
  { size: LINK_SIZE.SM, label: 'Small' },
]

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Link size={size.size} to="/">
            Click Me
          </Link>
        </Group>
      ))}
    </Column>
  ),
  args: {
    children: 'Click Me',
  },
}
