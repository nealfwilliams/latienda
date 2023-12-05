import type { Meta, StoryObj } from '@storybook/react'
import AccessTime from '@mui/icons-material/AccessTimeFilled'
import CalendarIcon from '@mui/icons-material/CalendarMonth'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import { CARD_LAYOUT, CARD_SIZE, Card, CardProps } from '.'
import {
  COLOR,
  Column,
  LABEL_SIZE,
  Label,
  Paragraph,
  ReadMore,
  TYPOGRAPHY_TYPE,
} from '../../..'
import { Icon } from '../../elements/Icon'
import { BUTTON_TYPE, Button } from '../../elements/Button'

const meta: Meta<typeof Card> = {
  title: 'Composites/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

const headlinedCards: CardProps[] = [
  {
    headline: 'Exhibit — Printing the Nation: A Century of Irish Book Arts',
    image:
      'https://images.ctfassets.net/cfblb1f7i85j/7aCd5Sm86JdtQepGBKDUfy/dcb4d97dd3a1d3ee810e8bcaa82dc715/Spring_Exhibit_2023-Rep.jpg?w=296',
    size: CARD_SIZE.SM,
    sx: {
      width: '500px',
    },
  },
  {
    headline:
      'One Book, One Michiana Digital Exhibit — Papers Alight: Contextualizing Mike Curato’s Flamer. Other text to make this longer than the other card.',
    image:
      'https://images.ctfassets.net/cfblb1f7i85j/2sGpdDbNkl6MPnlem6wq1R/995c786624613b5ff07228e481996385/One.Book.2023-Rep.png?w=296',
    size: CARD_SIZE.SM,
    sx: {
      width: '500px',
    },
  },
]

const basicCards: CardProps[] = [
  {
    children: <Paragraph>Basic card 1</Paragraph>,
    size: CARD_SIZE.SM,
    sx: {
      width: '500px',
    },
  },
  {
    children: <Paragraph>Basic card 2</Paragraph>,
    size: CARD_SIZE.SM,
    sx: {
      width: '500px',
    },
  },
]

const dateCards = [
  {
    displayDate: new Date().toISOString(),
    headline: 'Exhibit — Printing the Nation: A Century of Irish Book Arts',
    size: CARD_SIZE.SM,
  },
  {
    displayDate: new Date().toISOString(),
    headline:
      'One Book, One Michiana Digital Exhibit — Papers Alight: Contextualizing Mike Curato’s Flamer',
    size: CARD_SIZE.SM,
  },
]

const horizontalCards: CardProps[] = [
  {
    headline: 'Exhibit — Printing the Nation: A Century of Irish Book Arts',
    image:
      'https://images.ctfassets.net/cfblb1f7i85j/7aCd5Sm86JdtQepGBKDUfy/dcb4d97dd3a1d3ee810e8bcaa82dc715/Spring_Exhibit_2023-Rep.jpg?w=296',
    size: CARD_SIZE.SM,
    children: (
      <>
        <Label
          color={COLOR.PRIMARY}
          size={LABEL_SIZE.SM}
          sx={{
            display: 'flex',
          }}
        >
          <Icon icon={CalendarIcon} sx={{ mr: 1 }} />
          Monday, February 6 – Monday, July 31, 2023
        </Label>
        <Label
          color={COLOR.PRIMARY}
          size={LABEL_SIZE.SM}
          sx={{
            display: 'flex',
          }}
        >
          <Icon icon={AccessTime} sx={{ mr: 1 }} />
          M-F: 9:30am – 4:30pm
        </Label>
        <Paragraph>
          This exhibit demonstrates the art and craft of the Irish book since
          1900.
        </Paragraph>
      </>
    ),
  },
  {
    headline:
      'One Book, One Michiana Digital Exhibit — Papers Alight: Contextualizing Mike Curato’s Flamer',
    image:
      'https://images.ctfassets.net/cfblb1f7i85j/2sGpdDbNkl6MPnlem6wq1R/995c786624613b5ff07228e481996385/One.Book.2023-Rep.png?w=296',
    size: CARD_SIZE.SM,
    children: ({ activeBackground }) => (
      <>
        <Label
          color={COLOR.PRIMARY}
          size={LABEL_SIZE.SM}
          sx={{
            display: 'flex',
          }}
        >
          <Icon icon={CalendarIcon} sx={{ mr: 1 }} />
          Monday, February 6 – Monday, July 31, 2023
        </Label>
        <Label
          color={COLOR.PRIMARY}
          size={LABEL_SIZE.SM}
          sx={{
            display: 'flex',
          }}
        >
          <Icon icon={AccessTime} sx={{ mr: 1 }} />
          M-F: 9:30am – 4:30pm
        </Label>
        <ReadMore
          typography={TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM}
          lines={2}
          sx={{ bg: activeBackground }}
        >
          This online exhibition displays rare materials from Hesburgh Libraries
          collections that place Mike Curato’s teen graphic novel into a
          historical and social context.
        </ReadMore>
      </>
    ),
  },
]

export const Default: Story = {
  render: () => (
    <Column>
      {headlinedCards.map((props, i) => (
        <Card {...props} key={i} />
      ))}
    </Column>
  ),
  args: {},
}

export const TruncateHeadline: Story = {
  render: () => (
    <Column>
      {headlinedCards.map((props, i) => (
        <Card {...props} key={i} truncateHeadlineAfter={2} />
      ))}
    </Column>
  ),
  args: {},
}

export const Horizontal: Story = {
  render: () => (
    <Column>
      {horizontalCards.map((props, i) => (
        <Card {...props} key={i} layout={CARD_LAYOUT.HORIZONTAL} />
      ))}
    </Column>
  ),
  args: {},
}

export const DateCards: Story = {
  render: () => (
    <Column>
      {dateCards.map((props, i) => (
        <Card
          {...props}
          key={i}
          layout={CARD_LAYOUT.HORIZONTAL}
          sx={{ height: '120px' }}
        />
      ))}
    </Column>
  ),
  args: {},
}

export const Clickable: Story = {
  render: () => (
    <Column>
      {headlinedCards.map((props, i) => (
        <Card
          {...props}
          onClick={() => {
            alert('Card clicked')
          }}
          key={i}
        />
      ))}
    </Column>
  ),
  args: {},
}

export const Raised: Story = {
  render: () => (
    <Column>
      {basicCards.map((props, i) => (
        <Card {...props} raised key={i} />
      ))}
    </Column>
  ),
  args: {},
}

export const Heading: Story = {
  render: () => (
    <Column>
      {basicCards.map((props, i) => (
        <Card
          {...props}
          key={i}
          heading="Heading"
          headingIcon={BookmarkIcon}
          headingAction={
            <Button
              type={BUTTON_TYPE.TEXT}
              color={COLOR.WHITE}
              onClick={() => {}}
            >
              Click Me
            </Button>
          }
        />
      ))}
    </Column>
  ),
  args: {},
}

export const CustomImageHeading: Story = {
  render: () => (
    <Column>
      {basicCards.map((props, i) => (
        <Card
          {...props}
          key={i}
          heading="Heading"
          headingStyles={{
            backgroundImage: `url(https://library.nd.edu/static/media/jesus.2.4a2b137e.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'right',
            backgrounndPositionY: '-15px',
          }}
        />
      ))}
    </Column>
  ),
  args: {},
}
