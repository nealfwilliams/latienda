import React from 'react'
import _ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { TextInput, TextInputProps } from '../TextInput'
import { InputWrapper } from '../DatePicker'
import { Box, BoxProps } from '../../layout/Box'
import { importedDefaultComponentShim } from '../../../../utils/misc'

const ReactDatePicker = importedDefaultComponentShim(_ReactDatePicker)
const PermissiveTextInput = TextInput as any

export const MonthPicker: React.FC<{
  value: Date
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  inline?: boolean
  inputProps?: Partial<TextInputProps>
  wrapperProps?: BoxProps
}> = ({ value, inputProps, wrapperProps, ...rest }) => {
  return (
    <Box {...wrapperProps}>
      <ReactDatePicker
        calendarClassName="ndlib-date-picker"
        selected={value}
        customInput={
          <InputWrapper>
            <PermissiveTextInput {...inputProps} />
          </InputWrapper>
        }
        showMonthYearPicker
        {...rest}
      />
    </Box>
  )
}
