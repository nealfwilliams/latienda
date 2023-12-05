import type { Meta, StoryObj } from '@storybook/react'
import SearchIcon from '@mui/icons-material/Search'

import { PILL_SIZE, PILL_TYPE, Pill } from '.'
import { GROUP_TYPE, Group } from '../Group'
import { HEADING_SIZE, Heading } from '../text/Heading'
import { Column } from '../layout/Column'
import { Row } from '../layout/Row'

const meta: Meta<typeof Pill> = {
  title: 'Elements/Pill',
  component: Pill,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pill>

const sizes = [
  { size: PILL_SIZE.LG, label: 'Large' },
  { size: PILL_SIZE.SM, label: 'Small' },
]

export const Default: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Row sx={{ mt: 2 }}>
            <Pill {...args} size={size.size} sx={{ mr: 1 }} />
            <Pill {...args} size={size.size} type={PILL_TYPE.OUTLINE} />
          </Row>
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: PILL_TYPE.DEFAULT,
    children: 'Virtual Event',
    onClick: () => console.log('clicked'),
  },
}

export const Icon: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Row sx={{ mt: 2 }}>
            <Pill {...args} size={size.size} sx={{ mr: 1 }} icon={SearchIcon} />
            <Pill
              {...args}
              size={size.size}
              type={PILL_TYPE.OUTLINE}
              icon={SearchIcon}
            />
          </Row>
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: PILL_TYPE.DEFAULT,
    children: 'Virtual Event',
    onClick: () => console.log('clicked'),
  },
}

export const NoAction: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Row sx={{ mt: 2 }}>
            <Pill {...args} size={size.size} sx={{ mr: 1 }} />
            <Pill {...args} size={size.size} type={PILL_TYPE.OUTLINE} />
          </Row>
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: PILL_TYPE.DEFAULT,
    children: 'Virtual Event',
  },
}
