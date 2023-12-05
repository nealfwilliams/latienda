import { render } from '../../../utils/test'
import { Row } from './Row'
import { Column } from './Column'

describe('Row', () => {
  it('renders without throwing an error', () => {
    const { getByText } = render(<Row>Foo</Row>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('converts helper props to styles', () => {
    const { getByText } = render(
      <Row
        grow={1}
        shrink={1}
        basis="100px"
        align="baseline"
        justify="flex-start"
      >
        Foo
      </Row>,
    )

    const rendered = getByText('Foo')
    expect(rendered).toHaveStyle('flex-grow: 1')
    expect(rendered).toHaveStyle('flex-shrink: 1')
    expect(rendered).toHaveStyle('flex-basis: 100px')
    expect(rendered).toHaveStyle('align-items: baseline')
    expect(rendered).toHaveStyle('justify-content: flex-start')
  })
})

describe('Column', () => {
  it('renders without throwing an error', () => {
    const { getByText } = render(<Column>Foo</Column>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('converts helper props to styles', () => {
    const { getByText } = render(
      <Column
        grow={1}
        shrink={1}
        basis="100px"
        align="baseline"
        justify="flex-start"
      >
        Foo
      </Column>,
    )

    const rendered = getByText('Foo')
    expect(rendered).toHaveStyle('flex-grow: 1')
    expect(rendered).toHaveStyle('flex-shrink: 1')
    expect(rendered).toHaveStyle('flex-basis: 100px')
    expect(rendered).toHaveStyle('align-items: baseline')
    expect(rendered).toHaveStyle('justify-content: flex-start')
  })
})
