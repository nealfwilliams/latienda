import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxGroup } from './index'
import { useState } from 'react'
import { Row } from '../../layout/Row'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Elements/Fields/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CheckboxGroup>

const options = [
  { value: 'orange', label: 'Orange' },
  { value: 'apple', label: 'Apple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'pineapple', label: 'Pineapple' },
]

const StatefulCheckboxGroup = (props: any) => {
  const [checked, setChecked] = useState(new Set())

  return (
    <CheckboxGroup
      {...props}
      checkedOptions={checked}
      options={options}
      onChange={setChecked}
    />
  )
}

export const Default: Story = {
  render: () => (
    <Row>
      <StatefulCheckboxGroup />
    </Row>
  ),
}

export const Columns: Story = {
  render: () => (
    <Row>
      <StatefulCheckboxGroup columns={2} />
    </Row>
  ),
}
