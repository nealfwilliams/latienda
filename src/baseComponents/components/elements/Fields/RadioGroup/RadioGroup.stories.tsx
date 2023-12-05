import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './index'
import { useState } from 'react'
import { Row } from '../../layout/Row'

const meta: Meta<typeof RadioGroup> = {
  title: 'Elements/Fields/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RadioGroup>

const options = [
  { value: 'orange', label: 'Orange' },
  { value: 'apple', label: 'Apple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'pineapple', label: 'Pineapple' },
]

const StatefulRadioGroup = (props: any) => {
  const [checked, setChecked] = useState(new Set())

  return (
    <RadioGroup
      {...props}
      checked={checked}
      options={options}
      onChange={setChecked}
    />
  )
}

export const Default: Story = {
  render: () => (
    <Row>
      <StatefulRadioGroup />
    </Row>
  ),
}
