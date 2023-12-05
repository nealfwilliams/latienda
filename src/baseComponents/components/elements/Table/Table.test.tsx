import { render } from '@testing-library/react'
import { Table, TableColumn } from '.'

type RowData = {
  col1: string
  col2: string
  col3: string
}

const data: RowData[] = [
  {
    col1: 'Cell 1-1',
    col2: 'Cell 1-2',
    col3: 'Cell 1-3',
  },
  {
    col1: 'Cell 2-1',
    col2: 'Cell 2-2',
    col3: 'Cell 2-3',
  },
]

export const testExample = (
  <Table<RowData> data={data}>
    <TableColumn<RowData> header="Column 1" dataKey="col1" />
    <TableColumn<RowData> header="Column 2">{(row) => row.col2}</TableColumn>
    <TableColumn<RowData> dataKey="col3" header="Column 3" />
  </Table>
)

describe('Table', () => {
  it('renders all headers and cells', () => {
    const { getByText } = render(testExample)

    const headers = ['Column 1', 'Column 2', 'Column 3']
    const cells = [
      'Cell 1-1',
      'Cell 1-2',
      'Cell 1-3',
      'Cell 2-1',
      'Cell 2-2',
      'Cell 2-3',
    ]

    headers.forEach((header) => {
      expect(getByText(header)).toBeInTheDocument()
    })

    cells.forEach((cell) => {
      expect(getByText(cell)).toBeInTheDocument()
    })
  })
})
