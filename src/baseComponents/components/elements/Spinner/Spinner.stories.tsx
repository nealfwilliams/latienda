import type { Meta, StoryObj } from '@storybook/react'
import { Column, Group, HEADING_SIZE, Heading } from '../../..'
import { SPINNER_SIZE, Spinner } from '.'
import { GROUP_TYPE } from '../Group'
import { COLOR } from '../../../theme/colors'
// import { HEADING_SIZE, Heading } from '.'
// import { COLOR } from '../../../../theme/colors'

const meta: Meta<typeof Spinner> = {
  title: 'Elements/Spinner',
  component: Spinner,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

const sizes = [
  { size: SPINNER_SIZE.LG, label: 'Large' },
  { size: SPINNER_SIZE.MD, label: 'Medium' },
  { size: SPINNER_SIZE.SM, label: 'Small' },
]

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.SM}>{size.label}</Heading>
          <Spinner size={size.size} />
        </Group>
      ))}
    </Column>
  ),
  args: {},
}

export const CustomColor: Story = {
  render: () => (
    <Column>
      <Spinner color={COLOR.SECONDARY} />
    </Column>
  ),
  args: {
    children: 'Heading',
  },
}
