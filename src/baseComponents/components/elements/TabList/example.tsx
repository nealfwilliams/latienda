import React from 'react'
import { TabList, Tab } from '.'

type Item = {
  id: string
  label: string
}

export const items: Item[] = [
  {
    id: '1',
    label: 'Items & Requests',
  },
  {
    id: '2',
    label: 'Courses',
  },
  {
    id: '3',
    label: 'Checkout',
  },
  {
    id: '4',
    label: 'History',
  },
  {
    id: '5',
    label: 'Preferences',
  },
  {
    id: '6',
    label: 'Reservations',
  },
]

type StateManagerProps = {
  children: (params: {
    selected: string
    setSelected: React.Dispatch<React.SetStateAction<string>>
  }) => React.ReactNode
}

const StateManager: React.FC<StateManagerProps> = ({ children }) => {
  const [selected, setSelected] = React.useState<string>('1')

  return <>{children({ selected, setSelected })}</>
}

export const ExampleTabs = () => (
  <StateManager>
    {({ selected, setSelected }) => (
      <TabList>
        {items.map((item) => (
          <Tab
            key={item.id}
            onClick={() => {
              setSelected(item.id)
            }}
            selected={selected === item.id}
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
    )}
  </StateManager>
)
