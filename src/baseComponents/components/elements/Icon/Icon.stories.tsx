import type { Meta, StoryObj } from '@storybook/react'

import { GROUP_TYPE, Group } from '../Group'
import { HEADING_SIZE, Heading } from '../text/Heading'
import { Column } from '../layout/Column'

import { Icon } from './'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { COLOR } from '../../../theme/colors'
import { FONT_SIZE } from '../../../theme/typography'

const meta: Meta<typeof Icon> = {
  title: 'Elements/Icon',
  component: Icon,
}

export default meta
type Story = StoryObj<typeof Icon>

const sizes = [
  { size: FONT_SIZE.XXL, label: 'XX Large' },
  { size: FONT_SIZE.XL, label: 'X Large' },
  { size: FONT_SIZE.LG, label: 'Large' },
  { size: FONT_SIZE.ML, label: 'Medium Large' },
  { size: FONT_SIZE.MD, label: 'Medium' },
  { size: FONT_SIZE.MS, label: 'Medium Small' },
  { size: FONT_SIZE.SM, label: 'Small' },
  { size: FONT_SIZE.XS, label: 'X Small' },
]

export const Default: Story = {
  render: () => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Icon icon={AccessAlarmIcon} size={size.size} />
        </Group>
      ))}
    </Column>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <Icon icon={AccessAlarmIcon} color={COLOR.SECONDARY} size={FONT_SIZE.LG} />
  ),
}
