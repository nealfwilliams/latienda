import { fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { render } from '../../../utils/test'
import { Card } from '.'
import { KEY_CODES } from '../../../utils/misc'

const MOCK_HEADLINE = 'MOCK HEADLINE'
const MOCK_BODY = 'MOCK BODY'

describe('Card', () => {
  const mockClickHandler = vi.fn()

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders contents', () => {
    const { getByText } = render(
      <Card headline={MOCK_HEADLINE}>{MOCK_BODY}</Card>,
    )

    expect(getByText(MOCK_HEADLINE)).toBeDefined()
    expect(getByText(MOCK_BODY)).toBeDefined()
  })

  it('fires handler when clicked', () => {
    const { getByRole } = render(
      <Card headline={MOCK_HEADLINE} onClick={mockClickHandler} />,
    )

    const card = getByRole('button')

    fireEvent.click(card)
    expect(mockClickHandler).toBeCalledTimes(1)

    fireEvent.keyDown(card, {
      key: KEY_CODES.ENTER,
    })
    expect(mockClickHandler).toBeCalledTimes(2)
  })

  it('labels card with headline when passed', () => {
    const { getByLabelText } = render(<Card headline={MOCK_HEADLINE} />)

    expect(getByLabelText(MOCK_HEADLINE)).toBeDefined()
  })

  it('labels card with heading when passed', () => {
    const { getByLabelText } = render(<Card heading={MOCK_HEADLINE} />)

    expect(getByLabelText(MOCK_HEADLINE)).toBeDefined()
  })
})
