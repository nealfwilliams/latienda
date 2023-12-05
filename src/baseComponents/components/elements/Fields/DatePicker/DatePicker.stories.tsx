import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { DatePicker } from '.'
import { Box } from '../../layout/Box'

const meta: Meta<typeof DatePicker> = {
  title: 'Elements/Fields/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DatePicker>

const StatefulDatePicker = (props: any) => {
  const [date, setDate] = useState(new Date())

  return (
    <DatePicker
      {...props}
      value={date}
      onChange={(d) => {
        setDate(d)
      }}
    />
  )
}

export const Default: Story = {
  render: () => (
    <Box sx={{ height: '500px' }}>
      <StatefulDatePicker placeholder="test" />
    </Box>
  ),
}

export const Inline: Story = {
  render: () => (
    <Box sx={{ height: '500px' }}>
      <StatefulDatePicker inline />
    </Box>
  ),
}

export const HighlightedDates: Story = {
  render: () => {
    const highlightedDate1 = new Date()
    highlightedDate1.setDate(highlightedDate1.getDate() + 1)

    const highlightedDate2 = new Date()
    highlightedDate2.setDate(highlightedDate2.getDate() - 1)

    return (
      <Box sx={{ height: '500px' }}>
        <StatefulDatePicker
          inline
          highlightDates={[highlightedDate1, highlightedDate2]}
        />
      </Box>
    )
  },
}
