import { render } from '../../../utils/test'
import { Icon } from '.'
import { SPACING } from '../../../theme'
import { FONT_SIZE, fontSizeMap } from '../../../theme/typography'

const MockIcon: React.FC = () => {
  return <div>Mock Icon</div>
}

describe('Icon', () => {
  it('renders component passed to it', () => {
    const { getByText } = render(<Icon icon={MockIcon} />)

    expect(getByText('Mock Icon')).toBeInTheDocument()
  })

  it('passes font size to outer wrapper', () => {
    const { container } = render(<Icon icon={MockIcon} size={FONT_SIZE.MD} />)

    expect(container.childNodes[0]).toHaveStyle({
      fontSize: fontSizeMap[FONT_SIZE.MD],
    })
  })

  it('passes custom styles to outer wrapper', () => {
    const { container } = render(<Icon icon={MockIcon} sx={{ p: 1 }} />)

    expect(container.childNodes[0]).toHaveStyle({
      padding: SPACING[1],
    })
  })
})
