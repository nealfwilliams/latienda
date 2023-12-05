import type { Meta, StoryObj } from '@storybook/react'
import { GROUP_TYPE, Group } from '../../Group'
import { PARAGRAPH_SIZE, Paragraph } from '.'
import { Column } from '../../layout/Column'
import { HEADING_SIZE, Heading } from '../Heading'
import { COLOR } from '../../../../theme/colors'

const meta: Meta<typeof Paragraph> = {
  title: 'Elements/Paragraph',
  component: Paragraph,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Paragraph>

const sizes = [
  { size: PARAGRAPH_SIZE.LG, label: 'Large' },
  { size: PARAGRAPH_SIZE.MD, label: 'Medium' },
  { size: PARAGRAPH_SIZE.SM, label: 'Small' },
]

const p1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices venenatis purus at porta. Etiam congue sapien leo, sed malesuada justo commodo in. Nunc consequat, massa non cursus posuere, magna eros lacinia lectus, eget lobortis mi erat ut justo. Maecenas nisi mi, mollis sed ornare vitae, pharetra sed augue. Curabitur mollis orci risus, sed imperdiet nisi aliquet et. Ut non elit nec magna rhoncus maximus sit amet ut dui. Mauris sit amet eleifend lectus. Aliquam consectetur posuere libero eu ultricies. Etiam rutrum non orci nec vulputate. Sed vel accumsan diam. Cras aliquet eros eros, sit amet pharetra eros tincidunt ut. Vestibulum est erat, eleifend dapibus eros vel, elementum vehicula risus. Etiam blandit condimentum sodales. Donec non libero in orci aliquam egestas fringilla eget purus. Suspendisse pellentesque at ligula ut accumsan.'
const p2 =
  'Sed non lobortis mi, vitae dapibus arcu. Aenean at euismod arcu. Ut consectetur porttitor mattis. In eget vehicula augue. Ut at dolor posuere, tristique nisi finibus, posuere turpis. Etiam placerat, dui id lacinia volutpat, lorem turpis volutpat nisi, vel dapibus purus lorem at ante. Ut imperdiet enim nec arcu sagittis luctus.'

export const Default: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading
            size={HEADING_SIZE.LG}
            underline
            sx={{ color: COLOR.PRIMARY }}
          >
            {size.label}
          </Heading>
          {[p1, p2].map((content) => (
            <Paragraph {...args} size={size.size}>
              {content}
            </Paragraph>
          ))}
        </Group>
      ))}
    </Column>
  ),
  args: {
    children: 'Heading',
  },
}
