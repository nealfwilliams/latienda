/** @jsxImportSource theme-ui */
import type { Meta, StoryObj } from '@storybook/react'
import { getTypographyStyles, TYPOGRAPHY_TYPE } from './typography'
import { Group } from '../components/elements/Group'
import { Box } from '../components/elements/layout/Box'
import { LABEL_SIZE, Label } from '../components/elements/text/Label'

const meta: Meta = {
  title: 'Theme/Typography',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

const types = [
  { type: TYPOGRAPHY_TYPE.PARAGRAPH_XSMALL, label: 'Paragraph X Small' },
  { type: TYPOGRAPHY_TYPE.PARAGRAPH_SMALL, label: 'Paragraph Small' },
  { type: TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM, label: 'Paragraph Medium' },
  { type: TYPOGRAPHY_TYPE.PARAGRAPH_LARGE, label: 'Paragraph Large' },
  { type: TYPOGRAPHY_TYPE.HEADING_SMALL, label: 'Heading Small' },
  { type: TYPOGRAPHY_TYPE.HEADING_MEDIUM, label: 'Heading Medium' },
  { type: TYPOGRAPHY_TYPE.HEADING_LARGE, label: 'Heading Large' },
  { type: TYPOGRAPHY_TYPE.HEADING_XLARGE, label: 'Heading X Large' },
  { type: TYPOGRAPHY_TYPE.CONTROL_SMALL, label: 'Control Small' },
  { type: TYPOGRAPHY_TYPE.CONTROL_MEDIUM, label: 'Control Medium' },
  { type: TYPOGRAPHY_TYPE.CONTROL_LARGE, label: 'Control Large' },
  { type: TYPOGRAPHY_TYPE.HEADLINE_SMALL, label: 'Headline Small' },
  { type: TYPOGRAPHY_TYPE.HEADLINE_MEDIUM, label: 'Headline Medium' },
  { type: TYPOGRAPHY_TYPE.HEADLINE_LARGE, label: 'Headline Large' },
]

const pangrams = [
  'The quick brown fox jumps over the lazy dog.',
  'Waltz, bad nymph, for quick jigs vex.',
  'How vexingly quick daft zebras jump!',
  'Pack my box with five dozen liquor jugs.',
  'The five boxing wizards jump quickly.',
  'When zombies arrive, quickly fax Judge Pat.',
  'Amazingly few discotheques provide jukeboxes.',
]

const randomElement = (arr: string[]) => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined
}
export const Default: Story = {
  render: () => (
    <Group>
      {types.map((t) => {
        const style = getTypographyStyles(t.type)
        return (
          <Group sx={{ mb: '1rem' }}>
            <Label size={LABEL_SIZE.SM}>{t.label}</Label>
            <Box sx={{ p: 3, boxShadow: '0px 0px 8px 1px #dddddd' as any }}>
              <div sx={style}>{randomElement(pangrams)}</div>
            </Box>
          </Group>
        )
      })}
    </Group>
  ),
}
