import type { Meta, StoryObj } from '@storybook/react'

import { COLOR } from './colors'
import { GROUP_TYPE, Group } from '../components/elements/Group'
import { Row } from '../components/elements/layout/Row'
import { Box } from '../components/elements/layout/Box'
import { LABEL_SIZE, Label } from '../components/elements/text/Label'

const meta: Meta = {
  title: 'Theme/Colors',
}

const ColorSquare: React.FC<{ color: COLOR }> = ({ color }) => {
  return <Box sx={{ p: 3, bg: color }} />
}

export default meta

type Story = StoryObj<typeof meta>

const colors = [
  { color: COLOR.TEXT, label: 'TEXT' },
  { color: COLOR.BACKGROUND, label: 'BACKGROUND' },
  { color: COLOR.PRIMARY, label: 'PRIMARY' },
  { color: COLOR.PRIMARY_HIGHLIGHT, label: 'PRIMARY_HIGHLIGHT' },
  { color: COLOR.GRAY, label: 'GRAY' },
  { color: COLOR.DARK_GRAY, label: 'DARK_GRAY' },
  { color: COLOR.LIGHT_GRAY, label: 'LIGHT GRAY' },
  { color: COLOR.EXTRA_LIGHT_GRAY, label: 'EXTRA_LIGHT_GRAY' },
  { color: COLOR.EXTRA_EXTRA_LIGHT_GRAY, label: 'EXTRA_EXTRA_LIGHT_GRAY' },
  { color: COLOR.ND_BLUE, label: 'ND_BLUE' },
  { color: COLOR.ND_BLUE_DARK, label: 'ND_BLUE_DARK' },
  { color: COLOR.ND_BLUE_LIGHT, label: 'ND_BLUE_LIGHT' },
  { color: COLOR.ND_BLUE_BRIGHT, label: 'ND_BLUE_BRIGHT' },
  { color: COLOR.ND_GOLD, label: 'ND_GOLD' },
  { color: COLOR.ND_GOLD_LIGHT, label: 'ND_GOLD_LIGHT' },
  { color: COLOR.ND_GOLD_DARK, label: 'ND_GOLD_DARK' },
  { color: COLOR.ND_METALLIC_GOLD, label: 'ND_METALLIC_GOLD' },
  { color: COLOR.ND_PROVOST_BLUE, label: 'ND_PROVOST_BLUE' },
  { color: COLOR.ND_SECONDARY_1, label: 'ND_SECONDARY_1' },
  { color: COLOR.ND_SECONDARY_2, label: 'ND_SECONDARY_2' },
  { color: COLOR.ND_SECONDARY_3, label: 'ND_SECONDARY_3' },
  { color: COLOR.ND_SECONDARY_4, label: 'ND_SECONDARY_4' },
  { color: COLOR.ND_SECONDARY_5, label: 'ND_SECONDARY_5' },
  { color: COLOR.ND_SECONDARY_6, label: 'ND_SECONDARY_6' },
  { color: COLOR.ND_TERTIARY_1, label: 'ND_TERTIARY_1' },
  { color: COLOR.ND_TERTIARY_2, label: 'ND_TERTIARY_2' },
  { color: COLOR.ND_TERTIARY_3, label: 'ND_TERTIARY_3' },
  { color: COLOR.ND_TERTIARY_4, label: 'ND_TERTIARY_4' },
  { color: COLOR.ND_TERTIARY_5, label: 'ND_TERTIARY_5' },
  { color: COLOR.ND_TERTIARY_6, label: 'ND_TERTIARY_6' },
  { color: COLOR.ALERT_INFORMATIONAL_BG, label: 'ALERT_INFORMATIONAL_BG' },
  {
    color: COLOR.ALERT_INFORMATIONAL_BORDER,
    label: 'ALERT_INFORMATIONAL_BORDER',
  },
  {
    color: COLOR.ALERT_INFORMATIONAL_YELLOW_BG,
    label: 'ALERT_INFORMATIONAL_YELLOW_BG',
  },
  {
    color: COLOR.ALERT_INFORMATIONAL_YELLOW_BORDER,
    label: 'ALERT_INFORMATIONAL_YELLOW_BORDER',
  },
  { color: COLOR.ALERT_WARNING_BG, label: 'ALERT_WARNING_BG' },
  { color: COLOR.ALERT_WARNING_BORDER, label: 'ALERT_WARNING_BORDER' },
]

export const Default: Story = {
  render: () => (
    <Row sx={{ flexWrap: 'wrap' }}>
      {colors.map((color) => (
        <Group
          type={GROUP_TYPE.GROUP}
          sx={{ mr: 3, mt: 0, flexBasis: '100px' }}
          key={color.label}
        >
          <Label size={LABEL_SIZE.SM}>{color.label}</Label>
          <ColorSquare color={color.color} />
        </Group>
      ))}
    </Row>
  ),
}
