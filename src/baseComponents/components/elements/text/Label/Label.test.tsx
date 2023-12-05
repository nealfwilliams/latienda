import { vi } from 'vitest'

import { render as _render } from '../../../../utils/test'
import { Label } from '.'
import { GROUP_TYPE, Group } from '../../Group'
import { ENVIRONMENT } from '../../../providers/env'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'

const render = (component: any) => {
  return _render(component, { env: ENVIRONMENT.DEV })
}

describe('Label', () => {
  const originalError = console.error

  beforeEach(() => {
    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalError
    vi.useRealTimers()
  })

  it('renders without an error if passed standalone prop', () => {
    const { getByText } = render(<Label standalone>Foo</Label>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('renders without an error if used within region Group component', () => {
    const { getByText } = render(
      <Group type={GROUP_TYPE.GROUP}>
        <Label>Foo</Label>
      </Group>,
    )

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('throws if used outside a Group component', async () => {
    expect(() => render(<Label>Foo</Label>)).toThrow()
  })

  it('throws if used within non-group-type Group component', async () => {
    expect(() =>
      render(
        <Group type={GROUP_TYPE.REGION}>
          <Label>Foo</Label>
        </Group>,
      ),
    ).toThrow()
  })

  it('labels group target automatically', () => {
    const { getByLabelText } = render(
      <Group type={GROUP_TYPE.GROUP}>
        <Label>Foo</Label>
      </Group>,
    )

    expect(getByLabelText('Foo')).toBeDefined()
  })

  it('can send focus to label target', async () => {
    const INPUT_TEST_ID = 'input-test-id'

    const { getByText, getByTestId } = render(
      <Group type={GROUP_TYPE.GROUP}>
        {({ labelTargetId }) => (
          <>
            <Label>Foo</Label>
            <input id={labelTargetId} data-testid={INPUT_TEST_ID} />
          </>
        )}
      </Group>,
    )

    userEvent.click(getByText('Foo'))

    await waitFor(() => {
      expect(getByTestId(INPUT_TEST_ID)).toHaveFocus()
    })
  })
})
