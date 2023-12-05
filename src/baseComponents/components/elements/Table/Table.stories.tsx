import type { Meta, StoryObj } from '@storybook/react'

import { Table, TableColumn } from '.'
import { SORT_DIRECTION, SortConfig, sortByKey } from '../../../utils/sortByKey'
import { useState } from 'react'

const meta: Meta<typeof Table> = {
  title: 'Elements/Table',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

type RowData = {
  name: string
  age: number
  position: string
}

const data: RowData[] = [
  {
    name: 'Steve Rogers',
    age: 100,
    position: 'Ethics Officer',
  },
  {
    name: 'Natasha Romanoff',
    age: 35,
    position: 'Opposition Researcher',
  },
  {
    name: 'Thor',
    age: 1500,
    position: 'VP of Thunder',
  },
  {
    name: 'Peter Parker',
    age: 18,
    position: 'Web Crawling Expert',
  },
  {
    name: 'Kate Bishop',
    age: 22,
    position: 'Trust Fund Recipient',
  },
]

export const Default: Story = {
  render: () => (
    <Table<RowData> data={data} alternateRowColor>
      <TableColumn<RowData>
        header="Name"
        dataKey="name"
        sx={{
          width: '160px',
        }}
      />
      <TableColumn<RowData>
        header="Age"
        sx={{
          width: '100px',
        }}
      >
        {(row) => row.age}
      </TableColumn>
      <TableColumn<RowData> header="Occupation">
        {(row) => row.position}
      </TableColumn>
    </Table>
  ),
}

export const OmitColumn: Story = {
  render: () => {
    const someCondition = false
    return (
      <Table<RowData> data={data} alternateRowColor>
        <TableColumn<RowData>
          header="Name"
          dataKey="name"
          sx={{
            width: '160px',
          }}
        />
        {someCondition ? (
          <TableColumn<RowData>
            header="Age"
            sx={{
              width: '100px',
            }}
          >
            {(row) => row.age}
          </TableColumn>
        ) : null}
        <TableColumn<RowData> header="Occupation">
          {(row) => row.position}
        </TableColumn>
      </Table>
    )
  },
}

export const ResponsiveColumn: Story = {
  render: () => {
    return (
      <Table<RowData> data={data} alternateRowColor>
        <TableColumn<RowData>
          header="Name"
          dataKey="name"
          sx={{
            width: '160px',
          }}
        />
        <TableColumn<RowData>
          breakpoint={2}
          header="Age"
          sx={{
            width: '100px',
          }}
        >
          {(row) => row.age}
        </TableColumn>
        <TableColumn<RowData> header="Occupation">
          {(row) => row.position}
        </TableColumn>
      </Table>
    )
  },
}

export const ColumnGroup: Story = {
  render: () => {
    return (
      <Table<RowData> data={data} alternateRowColor>
        <TableColumn<RowData>
          header="Name"
          dataKey="name"
          sx={{
            width: '160px',
          }}
        />
        {[
          <TableColumn<RowData>
            header="Age"
            sx={{
              width: '100px',
            }}
          >
            {(row) => row.age}
          </TableColumn>,
          <TableColumn<RowData> header="Occupation">
            {(row) => row.position}
          </TableColumn>,
        ]}
      </Table>
    )
  },
}

const SortableStory = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig<RowData>>({
    key: 'name',
    direction: SORT_DIRECTION.ASC,
  })

  console.log(sortConfig)

  const sorted = sortByKey({
    items: data,
    config: sortConfig,
  })

  return (
    <Table<RowData>
      data={sorted}
      alternateRowColor
      sortConfig={sortConfig}
      updateSort={setSortConfig}
    >
      <TableColumn<RowData>
        header="Name"
        dataKey="name"
        sortable
        sx={{
          width: '160px',
        }}
      />
      {[
        <TableColumn<RowData>
          header="Age"
          sortKey="age"
          sortable
          sx={{
            width: '100px',
          }}
        >
          {(row) => row.age}
        </TableColumn>,
        <TableColumn<RowData>
          header="Occupation"
          sortable
          dataKey="position"
        />,
      ]}
    </Table>
  )
}

export const Sortable: Story = {
  render: SortableStory,
}
