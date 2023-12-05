import { render } from '@testing-library/react'
import { UniqueIdProvider, useUniqueId } from './uniqueIds'

const ExampleInner = () => {
  const uniqueId1 = useUniqueId('test-1')
  const uniqueId2 = useUniqueId('test-1')
  const uniqueId3 = useUniqueId('test-2')
  return (
    <>
      <div>{uniqueId1}</div>
      <div>{uniqueId2}</div>
      <div>{uniqueId3}</div>
    </>
  )
}

const ExampleOuter = () => {
  return (
    <UniqueIdProvider>
      <ExampleInner />
      <ExampleInner />
      <ExampleInner />
    </UniqueIdProvider>
  )
}

describe('UniqueIdProvider', () => {
  it('should generate unique ids', () => {
    const { getByText } = render(<ExampleOuter />)

    expect(getByText('test-1-1')).toBeInTheDocument()
    expect(getByText('test-1-2')).toBeInTheDocument()
    expect(getByText('test-2-1')).toBeInTheDocument()
    expect(getByText('test-1-3')).toBeInTheDocument()
    expect(getByText('test-1-4')).toBeInTheDocument()
    expect(getByText('test-2-2')).toBeInTheDocument()
    expect(getByText('test-1-5')).toBeInTheDocument()
    expect(getByText('test-1-6')).toBeInTheDocument()
    expect(getByText('test-2-3')).toBeInTheDocument()
  })
})
