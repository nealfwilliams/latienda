import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { MonthPicker } from '.'
import { Box } from '../../layout/Box'

const meta: Meta<typeof MonthPicker> = {
  title: 'Elements/Fields/MonthPicker',
  component: MonthPicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MonthPicker>

const StatefulMonthPicker = (props: any) => {
  const [date, setDate] = useState(new Date())

  return <MonthPicker {...props} value={date} onChange={setDate} />
}

export const Default: Story = {
  render: () => (
    <Box sx={{ height: '500px' }}>
      <StatefulMonthPicker />
    </Box>
  ),
}

export const Inline: Story = {
  render: () => (
    <Box sx={{ height: '500px' }}>
      <StatefulMonthPicker inline />
    </Box>
  ),
}
