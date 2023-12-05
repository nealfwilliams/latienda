import type { Meta, StoryObj } from '@storybook/react'
import { AutoComplete } from '.'
import { Paragraph, PARAGRAPH_SIZE } from '../../text/Paragraph'
import { HEADING_SIZE, Heading } from '../../text/Heading'
import { Column } from '../../layout/Column'
import { Row } from '../../layout/Row'

const options = [
  {
    label: 'Cucumber',
    value: 'Cucumber',
  },
  {
    label: 'Egg Plant',
    value: 'Egg Plant',
  },
  {
    label: 'Napa',
    value: 'Napa',
  },
  {
    label: 'Cabbage',
    value: 'Cabbage',
  },
  {
    label: 'Broccoli',
    value: 'Broccoli',
  },
  {
    label: 'Radish',
    value: 'Radish',
  },
  {
    label: 'Cauliflower',
    value: 'Cauliflower',
  },
  {
    label: 'Beet',
    value: 'Beet',
  },
  {
    label: 'Tomato',
    value: 'Tomato',
  },
  {
    label: 'Zuchinni',
    value: 'Zuchinni',
  },
]

function onSelect() {
  return console.log('clicked')
}

const meta: Meta<typeof AutoComplete> = {
  title: 'Elements/Fields/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AutoComplete>

export const Default: Story = {
  render: () => (
    <>
      <Row justify="space-between">
        <Column>
          <Heading size={HEADING_SIZE.LG}>Vegetables</Heading>
          <br />
          <AutoComplete
            options={options}
            value="cucumber"
            onSelect={onSelect}
          />
          <br />
          <Paragraph size={PARAGRAPH_SIZE.LG}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            ultrices venenatis purus at porta. Etiam congue sapien leo, sed
            malesuada justo commodo in. Nunc consequat, massa non cursus
            posuere, magna eros lacinia lectus, eget lobortis mi erat ut justo.
            Maecenas nisi mi, mollis sed ornare vitae, pharetra sed augue.
            Curabitur mollis orci risus, sed imperdiet nisi aliquet et. Ut non
            elit nec magna rhoncus maximus sit amet ut dui. Mauris sit amet
            eleifend lectus. Aliquam consectetur posuere libero eu ultricies.
            Etiam rutrum non orci nec vulputate. Sed vel accumsan diam. Cras
            aliquet eros eros, sit amet pharetra eros tincidunt ut. Vestibulum
            est erat, eleifend dapibus eros vel, elementum vehicula risus. Etiam
            blandit condimentum sodales. Donec non libero in orci aliquam
            egestas fringilla eget purus. Suspendisse pellentesque at ligula ut
            accumsan.
          </Paragraph>
        </Column>
      </Row>
    </>
  ),
}
