import type { Meta, StoryObj } from '@storybook/react'
import { ReadMore } from '.'
import { Column } from '../../layout/Column'
import { TYPOGRAPHY_TYPE } from '../../../../theme/typography'
import { COLOR } from '../../../../theme/colors'

const meta: Meta<typeof ReadMore> = {
  title: 'Elements/ReadMore',
  component: ReadMore,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ReadMore>

const p1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices venenatis purus at porta. Etiam congue sapien leo, sed malesuada justo commodo in. Nunc consequat, massa non cursus posuere, magna eros lacinia lectus, eget lobortis mi erat ut justo. Maecenas nisi mi, mollis sed ornare vitae, pharetra sed augue. Curabitur mollis orci risus, sed imperdiet nisi aliquet et. Ut non elit nec magna rhoncus maximus sit amet ut dui. Mauris sit amet eleifend lectus. Aliquam consectetur posuere libero eu ultricies. Etiam rutrum non orci nec vulputate. Sed vel accumsan diam. Cras aliquet eros eros, sit amet pharetra eros tincidunt ut. Vestibulum est erat, eleifend dapibus eros vel, elementum vehicula risus. Etiam blandit condimentum sodales. Donec non libero in orci aliquam egestas fringilla eget purus. Suspendisse pellentesque at ligula ut accumsan.'

const p2 = 'Lorem ipsum dolor sit'

export const Default: Story = {
  render: () => (
    <Column>
      <ReadMore
        sx={{ width: '250px' }}
        lines={2}
        typography={TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM}
      >
        {p1}
      </ReadMore>
    </Column>
  ),
}

export const NotTruncated: Story = {
  render: () => (
    <Column>
      <ReadMore
        sx={{ width: '250px' }}
        lines={2}
        typography={TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM}
      >
        {p2}
      </ReadMore>
    </Column>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <Column>
      <ReadMore
        lines={2}
        typography={TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM}
        sx={{
          color: COLOR.BACKGROUND,
          bg: COLOR.PRIMARY,
          width: '250px',
        }}
      >
        {p1}
      </ReadMore>
    </Column>
  ),
}
