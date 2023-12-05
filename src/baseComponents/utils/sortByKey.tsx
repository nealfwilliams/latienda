export enum SORT_DIRECTION {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortConfig<RowData> = {
  key: keyof RowData
  direction: SORT_DIRECTION
}

export function sortByKey<Item = any>(params: {
  items: Item[]
  config: SortConfig<Item>
}) {
  const {
    items,
    config: { key, direction },
  } = params

  const newItems = [...items]

  return newItems.sort((a, b) => {
    if (a[key] < b[key] && direction === SORT_DIRECTION.ASC) {
      return -1
    } else if (b[key] < a[key] && direction === SORT_DIRECTION.DESC) {
      return -1
    } else {
      return 1
    }
  })
}
