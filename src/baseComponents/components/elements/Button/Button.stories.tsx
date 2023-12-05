import type { Meta, StoryObj } from '@storybook/react'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SettingsIcon from '@mui/icons-material/Settings'

import { BUTTON_SIZE, BUTTON_TYPE, Button, LinkButton } from '.'
import { GROUP_TYPE, Group } from '../Group'
import { HEADING_SIZE, Heading } from '../text/Heading'
import { Column } from '../layout/Column'
import { Row } from '../layout/Row'
import { Paragraph } from '../text/Paragraph'
import { COLOR } from '../../../theme/colors'

const meta: Meta<typeof Button> = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

const sizes = [
  { size: BUTTON_SIZE.LG, label: 'Large' },
  { size: BUTTON_SIZE.MD, label: 'Medium' },
  { size: BUTTON_SIZE.SM, label: 'Small' },
]

export const Default: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Button {...args} size={size.size} sx={{ mt: 1 }} />
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: BUTTON_TYPE.DEFAULT,
    children: 'Click Me',
  },
}

const facebookBlue = '#4267B2'

export const CustomColor: Story = {
  render: (args) => (
    <Column>
      <Paragraph>Use customColor prop for colors not in theme</Paragraph>
      <Row>
        <Button
          {...args}
          customColor={facebookBlue}
          textColor={COLOR.WHITE}
          sx={{ mt: 1 }}
        />
      </Row>
    </Column>
  ),
  args: {
    type: BUTTON_TYPE.DEFAULT,
    children: 'Click Me',
  },
}

export const Link: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <LinkButton {...args} sx={{ mt: 1 }} />
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: BUTTON_TYPE.DEFAULT,
    children: 'Click Me',
  },
}

export const OutlineButton: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Button {...args} size={size.size} sx={{ mt: 1 }} />
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: BUTTON_TYPE.OUTLINE,
    children: 'Click Me',
    onClick: () => {},
  },
}

export const TextButton: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Button {...args} size={size.size} sx={{ mt: 1 }} />
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: BUTTON_TYPE.TEXT,
    onClick: () => {},
    children: 'Click Me',
  },
}

export const IconButton: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Button
            {...args}
            size={size.size}
            sx={{ mt: 1 }}
            primaryIcon={SettingsIcon}
          />
        </Group>
      ))}
    </Column>
  ),
  args: {
    type: BUTTON_TYPE.TEXT,
    children: 'Click Me',
    onClick: () => {},
  },
}

export const LeftIcon: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Button
            {...args}
            size={size.size}
            sx={{ mt: 1 }}
            leftIcon={SearchIcon}
          />
        </Group>
      ))}
    </Column>
  ),
  args: {
    onClick: () => {},
    children: 'Search',
  },
}

export const RightIcon: Story = {
  render: (args) => (
    <Column>
      {sizes.map((size) => (
        <Group type={GROUP_TYPE.REGION}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Button
            {...args}
            size={size.size}
            sx={{ mt: 1 }}
            rightIcon={ArrowDropDownIcon}
          />
        </Group>
      ))}
    </Column>
  ),
  args: {
    onClick: () => {},
    children: 'Select',
  },
}

export const Loading: Story = {
  render: () => (
    <Column>
      <Row>
        <Button loading>Click Me</Button>
      </Row>
      <Row sx={{ mt: 1 }}>
        <Button type={BUTTON_TYPE.OUTLINE} loading>
          Click Me
        </Button>
      </Row>
      <Row sx={{ mt: 1 }}>
        <Button type={BUTTON_TYPE.TEXT} loading>
          Click Me
        </Button>
      </Row>
    </Column>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Column>
      <Row>
        <Button disabled>Click Me</Button>
      </Row>
      <Row sx={{ mt: 1 }}>
        <Button type={BUTTON_TYPE.OUTLINE} disabled>
          Click Me
        </Button>
      </Row>
      <Row sx={{ mt: 1 }}>
        <Button type={BUTTON_TYPE.TEXT} disabled>
          Click Me
        </Button>
      </Row>
    </Column>
  ),
}
