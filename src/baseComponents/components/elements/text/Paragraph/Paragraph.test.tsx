import { render } from '../../../../utils/test'
import { Paragraph } from '.'

describe('Paragraph', () => {
  it('renders without an error', () => {
    const { getByText } = render(<Paragraph>Foo</Paragraph>)

    expect(getByText('Foo')).toBeInTheDocument()
  })
})
