/** @jsxImportSource theme-ui */
import { useMemo } from 'react'
import { StyledElementProps, StylesProp } from '../../../theme'
import { COLOR } from '../../../theme/colors'
import { useEnvironment } from '../../providers/env'
import {
  FONT_SIZE,
  TYPOGRAPHY_TYPE,
  typographyStyleMap,
} from '../../../theme/typography'
import { useMediaQuery } from '../../providers/media'
import { Row } from '../layout/Row'
import _ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import _ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import { importedDefaultComponentShim } from '../../../utils/misc'
import { Icon } from '../Icon'
import { SORT_DIRECTION, SortConfig } from '../../../utils/sortByKey'

const ArrowDropDown = importedDefaultComponentShim(_ArrowDropDown)
const ArrowDropUp = importedDefaultComponentShim(_ArrowDropUp)

type ColumnRenderFn<RowData> = (data: RowData) => React.ReactNode

type ColumnProps<RowData extends object> = {
  header: string
  sortable?: boolean
  sortKey?: keyof RowData
  dataKey?: keyof RowData
  headerStyles?: StylesProp
  align?: 'left' | 'center' | 'right'
  alignHeader?: 'left' | 'center' | 'right'
  children?: ColumnRenderFn<RowData>
  breakpoint?: number
  sx?: StylesProp
}

type ChildList = ChildList[] | JSX.Element | null | undefined

type TableProps<RowData> = StyledElementProps<
  HTMLTableElement,
  {
    data: RowData[]
    sortConfig?: SortConfig<RowData>
    updateSort?: (sortConfig: SortConfig<RowData>) => void
    children: ChildList[]
    cellStyles?: StylesProp
    alternateRowColor?: boolean
    showRowDividers?: boolean
    showColumnDividers?: boolean
  }
>

const useColumnSpec = (children: ChildList[]) => {
  // List of headers will be used to memoize the column spec
  const headerList: string[] = []

  const parseHeaders = (children: ChildList[]) => {
    children.forEach((child) => {
      if (Array.isArray(child)) {
        parseHeaders(child)
      } else if (child) {
        headerList.push(child.props.header)
      }
    })
  }
  parseHeaders(children)

  const columnList = JSON.stringify(headerList)

  return useMemo(() => {
    const columnProps: ColumnProps<any>[] = []

    const parseColumnProps = (children: ChildList[]) => {
      children.forEach((child) => {
        if (Array.isArray(child)) {
          parseColumnProps(child)
        } else if (child) {
          columnProps.push(child.props)
        }
      })
    }
    parseColumnProps(children)

    return columnProps
  }, [columnList]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function TableColumn<RowData extends object>(
  props: ColumnProps<RowData>,
) {
  // This component doesn't actually render anything, it is just a method to
  // provide props to the Table component in a way that is easy to read and understand
  const { flagInDevelopment } = useEnvironment()

  flagInDevelopment('TableColumn should not be used outside of Table component')

  // putting log here to appease tsc / eslint
  console.log('We offer this log to you in reverence, oh compiler gods', props)

  return null
}

export function Table<RowData extends object>(props: TableProps<RowData>) {
  const {
    role,
    data,
    alternateRowColor = true,
    cellStyles,
    sx,
    children,
    showRowDividers = true,
    showColumnDividers = false,
    sortConfig,
    updateSort,
  } = props
  const cellTypographyStyles =
    typographyStyleMap[TYPOGRAPHY_TYPE.CONDENSED_TEXT_MEDIUM]
  const headerTypographyStyles =
    typographyStyleMap[TYPOGRAPHY_TYPE.CONTROL_MEDIUM]

  const { breakpoint } = useMediaQuery()

  // Table parses props provided with <TableColumn /> children

  const columnSpec: ColumnProps<RowData>[] = useColumnSpec(children)

  const getCellStyles = (params: {
    columnProps: ColumnProps<RowData>
    rowIndex: number
    columnIndex: number
  }) => {
    const { columnProps, rowIndex, columnIndex } = params

    const isLastColumn = columnIndex === columnSpec.length - 1
    const isLastRow = rowIndex === data.length - 1

    const cellAlign = columnProps.align || 'left'

    const styles: StylesProp = {
      bg:
        alternateRowColor && rowIndex % 2 === 1
          ? COLOR.EXTRA_EXTRA_LIGHT_GRAY
          : COLOR.WHITE,
      p: 3,
      borderBottom: showRowDividers && !isLastRow ? '1px solid' : 'none',
      borderRight: showColumnDividers && !isLastColumn ? '1px solid' : 'none',
      borderColor: COLOR.LIGHT_GRAY,
      textAlign: cellAlign,
      ...cellTypographyStyles,
    }

    return {
      ...styles,
      ...cellStyles,
      ...columnProps.sx,
    }
  }

  return (
    <table role={role} sx={sx}>
      <thead role="rowgroup">
        <tr>
          {columnSpec.map((column, i) => {
            const isLastColumn = i === columnSpec.length - 1

            if (column.breakpoint && breakpoint < column.breakpoint) {
              return null
            }

            const canSort = sortConfig && column.sortable
            const sortKey = column.sortKey || column.dataKey

            const onSort = () => {
              if (canSort) {
                const direction =
                  sortConfig.direction === SORT_DIRECTION.ASC
                    ? SORT_DIRECTION.DESC
                    : SORT_DIRECTION.ASC
                updateSort &&
                  updateSort({ key: sortKey as keyof RowData, direction })
              }
            }

            return (
              <th
                role="columnheader"
                key={i}
                sx={{
                  textAlign: column.alignHeader || column.align || 'left',
                  borderBottom: '1px solid',
                  borderRight:
                    showColumnDividers && !isLastColumn ? '1px solid' : 'none',
                  borderColor: COLOR.LIGHT_GRAY,
                  px: 3,
                  pb: 1,
                  ...headerTypographyStyles,
                  ...column.headerStyles,
                }}
              >
                <Row
                  onClick={onSort}
                  tabIndex={canSort ? 0 : undefined}
                  sx={{ cursor: canSort ? 'pointer' : 'default' }}
                >
                  {column.header}
                  {canSort &&
                    sortConfig.key === sortKey &&
                    (sortConfig.direction === SORT_DIRECTION.ASC ? (
                      <Icon
                        icon={ArrowDropUp}
                        sx={{ ml: 1 }}
                        size={FONT_SIZE.MD}
                      />
                    ) : (
                      <Icon
                        icon={ArrowDropDown}
                        sx={{ ml: 1 }}
                        size={FONT_SIZE.MD}
                      />
                    ))}
                </Row>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {data.map((rowData, rowIndex) => {
          return (
            <tr role="row" key={rowIndex}>
              {columnSpec.map((column, columnIndex) => {
                if (column.breakpoint && breakpoint < column.breakpoint) {
                  return null
                }

                const { children, dataKey } = column

                const cellStyles = getCellStyles({
                  columnProps: column,
                  rowIndex,
                  columnIndex,
                })

                return (
                  <td sx={cellStyles} key={columnIndex}>
                    <>
                      {dataKey ? rowData[dataKey] : null}
                      {!dataKey && children && children(rowData)}
                    </>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
