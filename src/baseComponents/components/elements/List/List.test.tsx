import { render } from '../../../utils/test'
import { List, ListItem } from '.'

const MockIcon = () => <div data-testid="mock-icon" />

describe('List', () => {
  it('renders children inside list', () => {
    const { getByRole, getAllByRole } = render(
      <List>
        <ListItem index={0}>Item 1</ListItem>
        <ListItem index={1}>Item 2</ListItem>
      </List>,
    )

    expect(getByRole('list')).toBeDefined()
    expect(getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders custom component if provided', async () => {
    const { getAllByTestId } = render(
      <List icon={MockIcon}>
        <ListItem index={0}>Item 1</ListItem>
        <ListItem index={1}>Item 2</ListItem>
      </List>,
    )

    expect(getAllByTestId('mock-icon')).toHaveLength(2)
  })
})
