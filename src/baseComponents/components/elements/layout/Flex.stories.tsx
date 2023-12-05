import type { Meta, StoryObj } from '@storybook/react'

import { Column } from './Column'
import { Row } from './Row'
import { Paragraph } from '../text/Paragraph'
import { COLOR } from '../../../theme/colors'

const meta: Meta<typeof Row> = {
  title: 'Elements/Layout/Flex',
  component: Row,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Row>

export const Columns: Story = {
  render: () => (
    <Row justify="space-between">
      <Column>
        <Paragraph>Column 1</Paragraph>
      </Column>
      <Column>
        <Paragraph>Column 2</Paragraph>
      </Column>
      <Column>
        <Paragraph>Column 3</Paragraph>
      </Column>
    </Row>
  ),
}

export const Rows: Story = {
  render: () => (
    <Column>
      <Row>
        <Paragraph>Row 1</Paragraph>
      </Row>
      <Row>
        <Paragraph>Row 2</Paragraph>
      </Row>
      <Row>
        <Paragraph>Row 3</Paragraph>
      </Row>
    </Column>
  ),
}

export const ResponsiveRow: Story = {
  render: () => (
    <Row justify="space-between" breakpoint={0}>
      <Column>
        <Paragraph>Column 1</Paragraph>
      </Column>
      <Column>
        <Paragraph>Column 2</Paragraph>
      </Column>
      <Column>
        <Paragraph>Column 3</Paragraph>
      </Column>
    </Row>
  ),
}

export const FlexHelpers: Story = {
  render: () => (
    <Row justify="space-between">
      <Column
        align="flex-end"
        grow={1}
        sx={{ bg: COLOR.PRIMARY, color: COLOR.TEXT_ON_PRIMARY }}
      >
        <Row>
          <Paragraph>Right-aligned</Paragraph>
        </Row>
      </Column>
      <Column grow={1}>
        <Paragraph>
          Growing Column....................................................
        </Paragraph>
      </Column>
      <Column
        shrink={1}
        sx={{ bg: COLOR.PRIMARY, color: COLOR.TEXT_ON_PRIMARY }}
      >
        <Paragraph>Shrinking Column</Paragraph>
      </Column>
    </Row>
  ),
}

export const Centered: Story = {
  render: () => (
    <Row
      centered
      sx={{ width: '100%', height: '100px', border: 'solid black 1px' }}
    >
      <Paragraph>Hello World</Paragraph>
    </Row>
  ),
}
