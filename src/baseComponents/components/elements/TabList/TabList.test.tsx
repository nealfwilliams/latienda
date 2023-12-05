import { render, fireEvent } from '@testing-library/react'
import { items, ExampleTabs } from './example'

describe('TabList', () => {
  it('renders interactive tabs', () => {
    const { getByRole } = render(<ExampleTabs />)

    expect(getByRole('tablist')).toBeInTheDocument()

    for (const item of items) {
      expect(getByRole('tab', { name: item.label })).toBeInTheDocument()
    }

    const firstTab = getByRole('tab', { name: items[0].label })
    const secondTab = getByRole('tab', { name: items[1].label })

    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    expect(secondTab).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(secondTab)

    expect(firstTab).toHaveAttribute('aria-selected', 'false')
    expect(secondTab).toHaveAttribute('aria-selected', 'true')
  })
})
