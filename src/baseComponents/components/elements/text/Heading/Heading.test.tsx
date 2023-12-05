import { vi } from 'vitest'

import { render as _render } from '../../../../utils/test'
import { Heading } from '.'
import { GROUP_TYPE, Group } from '../../Group'
import { ENVIRONMENT } from '../../../providers/env'

const render = (component: any) => {
  return _render(component, { env: ENVIRONMENT.DEV })
}

describe('Heading', () => {
  const originalError = console.error

  beforeEach(() => {
    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalError
    vi.useRealTimers()
  })

  it('renders without an error if passed standalone prop', () => {
    const { getByText } = render(<Heading standalone>Foo</Heading>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('renders without an error if used within region Group component', () => {
    const { getByText } = render(
      <Group>
        <Heading>Foo</Heading>
      </Group>,
    )

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('throws if used outside a Group component', async () => {
    expect(() => render(<Heading>Foo</Heading>)).toThrow()
  })

  it('throws if used within non-region Group component', async () => {
    expect(() =>
      render(
        <Group type={GROUP_TYPE.GROUP}>
          <Heading>Foo</Heading>
        </Group>,
      ),
    ).toThrow()
  })

  it('labels group target automatically', () => {
    const { getByLabelText } = render(
      <Group>
        <Heading>Foo</Heading>
      </Group>,
    )

    expect(getByLabelText('Foo')).toBeDefined()
  })

  it('is required to render region Group component', async () => {
    vi.useFakeTimers()
    render(<Group>Foo</Group>)

    expect(() => vi.runAllTimers()).toThrow()
  })
})
