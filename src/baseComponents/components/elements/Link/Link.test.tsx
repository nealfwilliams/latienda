import { render } from '../../../utils/test'
import { Link } from '.'
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

describe('Link', () => {
  it('renders default external link component without throwing', () => {
    const { getByRole } = render(<Link to="https://google.com">Foo</Link>)

    expect(getByRole('link')).toBeInTheDocument()
  })

  it('renders default internal link component without throwing', () => {
    const { getByRole } = render(<Link to="/test/path">Foo</Link>)

    expect(getByRole('link')).toBeInTheDocument()
  })

  it('renders custom external component if passed', () => {
    const { getByTestId } = render(<Link to="https://google.com">Foo</Link>, {
      components: {
        link: {
          externalLinkComponent: CustomExternalLink,
          internalLinkComponent: CustomInternalLink,
        },
      },
    })

    expect(getByTestId(CUSTOM_EXTERNAL_TEST_ID)).toBeDefined()
    expect(() => getByTestId(CUSTOM_INTERNAL_TEST_ID)).toThrow()
  })

  it('renders custom internal component if passed', () => {
    const { getByTestId } = render(<Link to="/test/route">Foo</Link>, {
      components: {
        link: {
          externalLinkComponent: CustomExternalLink,
          internalLinkComponent: CustomInternalLink,
        },
      },
    })

    expect(getByTestId(CUSTOM_INTERNAL_TEST_ID)).toBeDefined()
    expect(() => getByTestId(CUSTOM_EXTERNAL_TEST_ID)).toThrow()
  })

  it('passes styles to custom component', () => {
    const { getByTestId } = render(
      <>
        <Link to="https://google.com" sx={{ mt: 1 }}>
          Foo
        </Link>
        <Link to="/test/route" sx={{ mt: 1 }}>
          Foo
        </Link>
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
