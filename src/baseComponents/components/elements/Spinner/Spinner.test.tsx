import { render } from '../../../utils/test'
import { SPINNER_LABEL, Spinner } from '.'

describe('Button', () => {
  it('renders without throwing an error', () => {
    const { getByLabelText } = render(<Spinner />)

    expect(getByLabelText(SPINNER_LABEL)).toBeInTheDocument()
  })
})
