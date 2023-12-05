import { render } from '../../../utils/test'

import { DropdownLinks } from '.'
import { Button } from '../../elements/Button'
import { fireEvent } from '@testing-library/react'

const options = [
  { value: 'https://google.com', label: 'Google' },
  { value: 'https://facebook.com', label: 'Facebook' },
]

const DropdownExample = (
  <DropdownLinks options={options}>
    {({ anchorProps }) => <Button {...anchorProps}>Links</Button>}
  </DropdownLinks>
)

describe('DropdownLinks', () => {
  it('toggle links when button is clicked', () => {
    const { getByRole, getAllByRole } = render(DropdownExample)

    expect(() => getByRole('link')).toThrow()
    expect(() => getByRole('navigation')).toThrow()

    const button = getByRole('button')
    expect(button).not.toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')

    expect(getAllByRole('link')).toHaveLength(2)
    expect(getByRole('navigation')).toBeDefined()

    fireEvent.click(button)

    expect(button).not.toHaveAttribute('aria-expanded', 'true')

    expect(() => getByRole('link')).toThrow()
    expect(() => getByRole('navigation')).toThrow()
  })
})
