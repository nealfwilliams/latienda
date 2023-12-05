import { render } from '../../../utils/test'
import { ArrowLink } from '.'
import { PropsWithChildren } from 'react'
import { DefaultLink } from '../../providers/componentConfig'
import { StylesProp } from '../../../theme'

const CUSTOM_INTERNAL_TEST_ID = 'internal-link-test-id'
const CUSTOM_EXTERNAL_TEST_ID = 'external-link-test-id'

type LinkProps = PropsWithChildren<{
  to: string
  sx?: StylesProp
}>

const CustomInternalLink: React.FC<LinkProps> = (props) => {
  return <DefaultLink data-testid={CUSTOM_INTERNAL_TEST_ID} {...props} />
}

const CustomExternalLink: React.FC<LinkProps> = (props) => {
  return <DefaultLink data-testid={CUSTOM_EXTERNAL_TEST_ID} {...props} />
}

describe('ArrowLink', () => {
  it('renders default external link component without throwing', () => {
    const { getByRole } = render(
      <ArrowLink to="https://google.com">Foo</ArrowLink>,
    )

    expect(getByRole('link')).toBeInTheDocument()
  })

  it('renders default internal link component without throwing', () => {
    const { getByRole } = render(<ArrowLink to="/test/path">Foo</ArrowLink>)

    expect(getByRole('link')).toBeInTheDocument()
  })

  it('passes styles to custom component', () => {
    const { getByTestId } = render(
      <>
        <ArrowLink to="https://google.com" sx={{ mt: 1 }}>
          Foo
        </ArrowLink>
        <ArrowLink to="/test/route" sx={{ mt: 1 }}>
          Foo
        </ArrowLink>
      </>,
      {
        components: {
          link: {
            externalLinkComponent: CustomExternalLink,
            internalLinkComponent: CustomInternalLink,
          },
        },
      },
    )

    expect(getByTestId(CUSTOM_EXTERNAL_TEST_ID)).toHaveStyle(
      `margin-top: 0.25rem`,
    )
    expect(getByTestId(CUSTOM_INTERNAL_TEST_ID)).toHaveStyle(
      `margin-top: 0.25rem`,
    )
  })
})
