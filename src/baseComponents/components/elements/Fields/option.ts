export type Key = string | number

export interface BasicOption<Value extends Key> {
  value: Value
  label?: string
  onClick?: () => void
}

export type RenderOption<
  Value extends Key,
  Option extends BasicOption<Value>,
> = (params: {
  option: Option
  selected?: boolean
  focused?: boolean
}) => React.ReactNode

export type RenderOptionLabel<Option extends BasicOption<Key>> = (
  option: Option,
) => string

export const getOptionId = (value: Key) => `option-id-${value}`

export const defaultRenderOption: RenderOption<Key, any> = ({ option }) =>
  option.label

export const defaultRenderOptionLabel: RenderOptionLabel<any> = (option) =>
  option.label
