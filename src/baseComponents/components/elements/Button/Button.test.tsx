import { fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { render } from '../../../utils/test'
import { Button } from '.'

const MockPrimaryIcon = () => <div>Mock Primary Icon</div>
const MockLeftIcon = () => <div>Mock Left Icon</div>
const MockRightIcon = () => <div>Mock Right Icon</div>

describe('Button', () => {
  const mockClickHandler = vi.fn()

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders without throwing an error', () => {
    const { getByText } = render(<Button>Foo</Button>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('renders icon component passed to it', () => {
    const { getByText } = render(
      <>
        <Button leftIcon={MockLeftIcon}>Click Me</Button>
        <Button primaryIcon={MockPrimaryIcon}>Click Me</Button>
        <Button rightIcon={MockRightIcon}>Click Me</Button>
      </>,
    )

    expect(getByText('Mock Primary Icon')).toBeDefined()
    expect(getByText('Mock Left Icon')).toBeDefined()
    expect(getByText('Mock Right Icon')).toBeDefined()
  })

  it('responds to click handlers', () => {
    const { getByRole } = render(<Button onClick={mockClickHandler} />)

    fireEvent.click(getByRole('button'))

    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })

  it('does not respond to click handler when disabled', () => {
    const { getByRole } = render(<Button onClick={mockClickHandler} disabled />)

    fireEvent.click(getByRole('button'))

    expect(mockClickHandler).not.toHaveBeenCalled()
  })

  it('does not respond to click handler when loading', () => {
    const { getByRole } = render(<Button onClick={mockClickHandler} loading />)

    fireEvent.click(getByRole('button'))

    expect(mockClickHandler).not.toHaveBeenCalled()
  })
})
