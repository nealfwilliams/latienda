import { render } from '../../../utils/test'
import { Pill } from '.'
import { fireEvent } from '@testing-library/react'
import { vitest } from 'vitest'

describe('Pill', () => {
  it('renders children', () => {
    const { getByText } = render(<Pill>Test</Pill>)
    expect(getByText('Test')).toBeInTheDocument()
  })

  it('responds to onClick handler', () => {
    const onClick = vitest.fn()
    const { getByRole } = render(<Pill onClick={onClick} />)
    const button = getByRole('button')
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
