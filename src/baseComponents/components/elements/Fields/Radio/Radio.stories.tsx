import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from './index'
import { useState } from 'react'
import { Row } from '../../layout/Row'

const meta: Meta<typeof Radio> = {
  title: 'Elements/Fields/Radio',
  component: Radio,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Radio>

const StatefulRadio = (props: any) => {
  const [checked, setChecked] = useState(false)

  return <Radio {...props} checked={checked} onChange={setChecked} />
}

export const Default: Story = {
  render: () => (
    <Row>
      <StatefulRadio />
    </Row>
  ),
}
