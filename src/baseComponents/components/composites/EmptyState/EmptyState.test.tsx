import { render } from '../../../utils/test'
import { EmptyState, DEFAULT_MESSAGE } from '.'

const TEST_MESSAGE = 'test message'

const MOCK_ICON_TEST_ID = 'mock-icon'
const MockIcon = () => <div data-testid={MOCK_ICON_TEST_ID} />

describe('EmptyState', () => {
  it('renders passed message', () => {
    const { getByText } = render(<EmptyState>{TEST_MESSAGE}</EmptyState>)

    expect(getByText(TEST_MESSAGE)).toBeDefined()
  })

  it('renders default message if no message passed', () => {
    const { getByText } = render(<EmptyState />)

    expect(getByText(DEFAULT_MESSAGE)).toBeDefined()
  })

  it('renders passed icon', () => {
    const { getByTestId } = render(<EmptyState icon={MockIcon} />)

    expect(getByTestId(MOCK_ICON_TEST_ID)).toBeDefined()
  })
})
