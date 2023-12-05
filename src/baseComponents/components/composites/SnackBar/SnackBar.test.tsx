import { act, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import { render } from '../../../utils/test'
import {
  BasicExample,
  ReplaceMessageExample,
  WipeMessagesExample,
} from './examples'

vi.useFakeTimers()

describe('SnackBar', () => {
  it('supports adding messages', () => {
    const { getByText } = render(<BasicExample />)

    expect(() => getByText('Message 1')).toThrow()

    const addButton = getByText('Add Message')
    act(() => {
      fireEvent.click(addButton)
    })

    expect(getByText('Message 1')).toBeInTheDocument()

    act(() => {
      fireEvent.click(addButton)
    })

    expect(getByText('Message 1')).toBeInTheDocument()
    expect(getByText('Message 2')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    waitFor(() => {
      expect(() => getByText('Message 1')).toThrow()
      expect(() => getByText('Message 2')).toThrow()
    })
  })

  it('supports replacing messages', () => {
    const { getByText } = render(<ReplaceMessageExample />)

    expect(() => getByText('Message 1')).toThrow()

    const addButton = getByText('Add Message')
    act(() => {
      fireEvent.click(addButton)
    })

    expect(getByText('Message 1')).toBeInTheDocument()

    act(() => {
      fireEvent.click(addButton)
    })

    expect(() => getByText('Message 1')).toThrow()
    expect(getByText('Message 2')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    waitFor(() => {
      expect(() => getByText('Message 2')).toThrow()
    })
  })

  it('supports wiping messages', () => {
    const { getByText } = render(<WipeMessagesExample />)

    expect(() => getByText('Message 1')).toThrow()

    const addButton = getByText('Add Message')
    act(() => {
      fireEvent.click(addButton)
    })
    act(() => {
      fireEvent.click(addButton)
    })

    expect(getByText('Message 1')).toBeInTheDocument()
    expect(getByText('Message 2')).toBeInTheDocument()

    const wipeButton = getByText('Wipe and Add')
    act(() => {
      fireEvent.click(wipeButton)
    })

    expect(() => getByText('Message 1')).toThrow()
    expect(() => getByText('Message 2')).toThrow()
    expect(getByText('Message 3')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    waitFor(() => {
      expect(() => getByText('Message 3')).toThrow()
    })
  })
})
