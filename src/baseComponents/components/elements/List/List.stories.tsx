import type { Meta, StoryObj } from '@storybook/react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { LIST_SIZE, List, ListItem } from './index'
import { Row } from '../layout/Row'
import { Column } from '../layout/Column'
import { HEADING_SIZE, Heading } from '../text/Heading'
import { GROUP_TYPE, Group } from '../Group'
import { COLOR } from '../../..'
import { FONT_SIZE } from '../../../theme/typography'

const meta: Meta<typeof List> = {
  title: 'Elements/List',
  component: List,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof List>

export const Default: Story = {
  render: () => (
    <Row>
      <List>
        <ListItem index={0}>List Item 1</ListItem>
        <ListItem index={1}>List Item 2</ListItem>
        <ListItem index={2}>
          List Item 3
          <List>
            <ListItem index={0}>List Item 3.1</ListItem>
            <ListItem index={1}>List Item 3.2</ListItem>
          </List>
        </ListItem>
      </List>
    </Row>
  ),
}

const sizes = [
  { size: LIST_SIZE.LG, label: 'Large' },
  { size: LIST_SIZE.MD, label: 'Medium' },
  { size: LIST_SIZE.SM, label: 'Small' },
]

export const Sizes: Story = {
  render: () => (
    <Column>
      {sizes.map((size, i) => (
        <Group type={GROUP_TYPE.REGION} sx={{ mt: 3 }} key={i}>
          <Heading size={HEADING_SIZE.MD}>{size.label}</Heading>
          <Row sx={{ mt: 2 }}>
            <List size={size.size}>
              <ListItem index={0}>List Item 1</ListItem>
              <ListItem index={1}>List Item 2</ListItem>
              <ListItem index={2}>List Item 3</ListItem>
            </List>
          </Row>
        </Group>
      ))}
    </Column>
  ),
}

export const Ordered: Story = {
  render: () => (
    <Row>
      <List icon={ChevronRightIcon} ordered>
        <ListItem index={0}>List Item 1</ListItem>
        <ListItem index={1}>List Item 2</ListItem>
        <ListItem index={2}>List Item 3</ListItem>
      </List>
    </Row>
  ),
}

export const CustomIcon: Story = {
  render: () => (
    <Row>
      <List icon={ChevronRightIcon} iconColor={COLOR.PRIMARY}>
        <ListItem index={0}>List Item 1</ListItem>
        <ListItem index={1}>List Item 2</ListItem>
        <ListItem index={2}>List Item 3</ListItem>
      </List>
    </Row>
  ),
}

export const CustomIconPerItem: Story = {
  render: () => (
    <Row>
      <List iconSize={FONT_SIZE.ML}>
        <ListItem
          index={0}
          icon={BookmarkIcon}
          onIconClick={() => {}}
          iconLabel="Unfavorite"
        >
          Favorite 1
        </ListItem>
        <ListItem
          index={1}
          icon={BookmarkIcon}
          onIconClick={() => {}}
          iconLabel="Favorite"
        >
          Favorited 2
        </ListItem>
        <ListItem
          index={2}
          icon={BookmarkBorderIcon}
          onIconClick={() => {}}
          iconLabel="Favorite"
        >
          Not Favorited
        </ListItem>
      </List>
    </Row>
  ),
}
