import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './index'
import { useState } from 'react'
import { Row } from '../../layout/Row'

const meta: Meta<typeof Checkbox> = {
  title: 'Elements/Fields/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Checkbox>

const StatefulCheckbox = (props: any) => {
  const [checked, setChecked] = useState(false)

  return <Checkbox {...props} checked={checked} onChange={setChecked} />
}

export const Default: Story = {
  render: () => (
    <Row>
      <StatefulCheckbox />
    </Row>
  ),
}
