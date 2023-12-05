import React from 'react'
import _ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { TextInput, TextInputProps } from '../TextInput'
import _CalendarIcon from '@mui/icons-material/CalendarMonth'
import { Box, BoxProps } from '../../layout/Box'
import { importedDefaultComponentShim } from '../../../../utils/misc'

const CalendarIcon = importedDefaultComponentShim(_CalendarIcon)
const ReactDatePicker = importedDefaultComponentShim(_ReactDatePicker)

// Need to do this to allow passing props to TextInput
// react-datepicker will overwrite all props passed to customInput
export const InputWrapper = React.forwardRef<
  any,
  {
    onChange?: (e: React.ChangeEvent) => void
    onClick?: (e: React.MouseEvent) => void
    value?: string
    children: React.ReactElement
  }
>(({ onChange, value, children, onClick }, ref) => {
  return React.cloneElement(children, {
    value: value!, //eslint-disable-line
    onChangeRaw: onChange,
    ref: ref,
    leftIcon: CalendarIcon,
    onClick,
  })
})

const PermissiveTextInput = TextInput as any

const areDatesEqual = (d1: Date, d2: Date) => {
  const serializeDate = (d: Date) =>
    `${d.getFullYear()} ${d.getMonth()} ${d.getDate()}`
  return serializeDate(d1) === serializeDate(d2)
}

export const DatePicker: React.FC<{
  value: Date
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  inline?: boolean
  highlightDates?: Date[]
  wrapperProps?: BoxProps
  inputProps?: Partial<TextInputProps>
}> = ({ value, wrapperProps, inputProps, highlightDates, ...rest }) => {
  const highlightDateSet = new Set(highlightDates?.map((d) => d.toDateString()))

  return (
    <Box {...wrapperProps}>
      <ReactDatePicker
        calendarClassName="ndlib-date-picker"
        selected={value}
        dayClassName={(date) => {
          if (areDatesEqual(date, value)) {
            return ''
          }

          if (highlightDateSet.has(date.toDateString())) {
            return 'ndlib-date-picker-highlight'
          }

          return ''
        }}
        customInput={
          <InputWrapper>
            <PermissiveTextInput {...inputProps} />
          </InputWrapper>
        }
        {...rest}
      />
    </Box>
  )
}
