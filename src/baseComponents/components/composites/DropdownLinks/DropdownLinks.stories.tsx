import type { Meta, StoryObj } from '@storybook/react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { DropdownLinks } from '.'
import { Button } from '../../elements/Button'
import { Box } from '../../elements/layout/Box'
import { Row } from '../../elements/layout/Row'

const meta: Meta<typeof DropdownLinks> = {
  title: 'Composites/DropdownLinks',
  component: DropdownLinks,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DropdownLinks>

const options = [
  { value: 'https://google.com', label: 'Google' },
  { value: 'https://facebook.com', label: 'This is intentionally long' },
]

export const Default: Story = {
  render: () => (
    <Box sx={{ width: '200px', height: '200px' }}>
      <DropdownLinks options={options}>
        {({ anchorProps }) => (
          <Button {...anchorProps} rightIcon={ArrowDropDownIcon}>
            Links
          </Button>
        )}
      </DropdownLinks>
    </Box>
  ),
}

export const Right: Story = {
  render: () => (
    <Row sx={{ width: '90vw', height: '200px' }} justify="flex-end">
      <DropdownLinks options={options}>
        {({ anchorProps }) => (
          <Button {...anchorProps} rightIcon={ArrowDropDownIcon}>
            Links
          </Button>
        )}
      </DropdownLinks>
    </Row>
  ),
}

export const OpenInNewTab: Story = {
  render: () => (
    <Box sx={{ width: '200px', height: '200px' }}>
      <DropdownLinks options={options} openNewTab>
        {({ anchorProps }) => <Button {...anchorProps}>Links</Button>}
      </DropdownLinks>
    </Box>
  ),
}
