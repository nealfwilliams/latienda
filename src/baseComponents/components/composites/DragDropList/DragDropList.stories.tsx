import type { Meta, StoryObj } from '@storybook/react'

import { DragDropList, DragHandle } from './index'
import React from 'react'
import { Paragraph } from '../../elements/text/Paragraph'

const meta: Meta<typeof DragDropList> = {
  title: 'Composites/DragDropList',
  component: DragDropList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DragDropList>

type Item = {
  id: string
  label: string
  accessibleLabel: string
}

const _items: Item[] = [
  {
    id: '1',
    label: 'Foo',
    accessibleLabel: 'Foo',
  },
  {
    id: '2',
    label: 'Bar',
    accessibleLabel: 'Bar',
  },
]

type StateManagerProps = {
  children: (params: {
    items: Item[]
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
  }) => React.ReactNode
}

const StateManager: React.FC<StateManagerProps> = ({ children }) => {
  const [items, setItems] = React.useState<Item[]>(_items)

  return <>{children({ items, setItems })}</>
}

export const Default: Story = {
  render: () => (
    <StateManager>
      {({ items, setItems }) => (
        <DragDropList<Item>
          items={items}
          onReorder={({ reorderedList }) => setItems(reorderedList)}
        >
          {({ item }) => (
            <>
              <Paragraph sx={{ ml: 2 }}>{item.label}</Paragraph>
            </>
          )}
        </DragDropList>
      )}
    </StateManager>
  ),
}

export const Disabled: Story = {
  render: () => (
    <DragDropList<Item> disabled items={_items} onReorder={() => {}}>
      {({ item }) => (
        <>
          <DragHandle />
          <Paragraph sx={{ ml: 2 }}>{item.label}</Paragraph>
        </>
      )}
    </DragDropList>
  ),
}
