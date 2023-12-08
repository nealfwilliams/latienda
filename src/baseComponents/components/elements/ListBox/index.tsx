/** @jsxImportSource theme-ui */
import React from 'react'
import { COLOR } from '../../..'
import { StyledElementProps } from '../../../theme'
import { TYPOGRAPHY_TYPE, getTypographyStyles } from '../../../theme/typography'
import {
  BasicOption,
  Key,
  RenderOption,
  defaultRenderOption,
  getOptionId,
} from '../Fields/option'

type ListBoxProps<
  Value extends Key,
  Option extends BasicOption<Value>,
> = StyledElementProps<
  HTMLDivElement,
  {
    options: Option[]
    renderOption?: RenderOption<Value, Option>
    selected?: Value
    focused?: Value
    selectOption?: (option: Option) => void
    onDownPress?: () => void
    onUpPress?: () => void
    onSelect?: () => void
    onBlur?: () => void
  }
>

function ListBoxInner<
  Value extends Key = string,
  Option extends BasicOption<Value> = any,
>(
  {
    options,
    renderOption: renderOptionParam,
    selected,
    focused,
    selectOption,
    sx,
    ...rest
  }: ListBoxProps<Value, Option>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const renderOption: RenderOption<Value, Option> =
    renderOptionParam || defaultRenderOption
  const typography = getTypographyStyles(TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM)

  return (
    <div
      role="listbox"
      ref={ref}
      sx={{
        border: 'solid 1px',
        borderRadius: '4px',
        borderColor: COLOR.LIGHT_GRAY,
        backgroundColor: COLOR.BACKGROUND,
        boxShadow: '0px 0px 8px 2px #dddddd',
        ...typography,
        ...sx,
      }}
      onKeyDown={(e) => {
        console.log(e)
      }}
      {...rest}
    >
      {options.map((option) => (
        <div
          key={option.value}
          id={getOptionId(option.value)}
          aria-selected={selected === option.value}
          role="option"
          onClick={option.onClick}
          onMouseDown={() => selectOption && selectOption(option)}
          sx={{
            px: 4,
            py: 3,
            backgroundColor:
              focused === option.value
                ? COLOR.EXTRA_EXTRA_LIGHT_GRAY
                : COLOR.BACKGROUND,
            cursor: 'pointer',
            borderBottom: 'solid 1px',
            borderBottomColor: COLOR.LIGHT_GRAY,
            color: COLOR.TEXT,
            ':last-of-type': {
              borderBottom: 'none',
              borderBottomRightRadius: '4px',
              borderBottomLeftRadius: '4px',
            },
            ':first-of-type': {
              borderTopRightRadius: '4px',
              borderTopLeftRadius: '4px',
            },
            ':hover': {
              backgroundColor: COLOR.EXTRA_EXTRA_LIGHT_GRAY,
            },
          }}
        >
          {renderOption({
            option,
            selected: selected === option.value,
            focused: focused === option.value,
          })}
        </div>
      ))}
    </div>
  )
}

export const ListBox = React.forwardRef(ListBoxInner) as <
  Value extends Key = string,
  Option extends BasicOption<Value> = any,
>(
  props: ListBoxProps<Value, Option> & {
    ref?: React.ForwardedRef<HTMLDivElement>
  },
) => any
