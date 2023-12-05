import { useState } from 'react'
import { COLOR } from '../../../../theme/colors'
import { ListBox } from '../../ListBox'
import { TextInput } from '../../Fields/TextInput'

interface Option {
  label: string
  value: string
}

interface AutoCompleteProps {
  value: string
  options: Option[]
  onSelect: (option: string) => any
}

export const AutoComplete = ({
  value,
  options,
  onSelect,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value)
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (value: string) => {
    setInputValue(value)

    const newFilteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredOptions(newFilteredOptions)
    setShowOptions(true)
  }

  const handleSelect = (selectedOption: Option) => {
    setShowOptions(false)
    setInputValue(selectedOption.label)
    onSelect(selectedOption.value)
  }

  return (
    <div>
      <TextInput value={inputValue} onChange={handleChange} />
      {showOptions && (
        <ListBox
          options={filteredOptions}
          selectOption={handleSelect}
          sx={{
            bg: COLOR.PRIMARY,
            marginTop: 2,
          }}
        ></ListBox>
      )}
    </div>
  )
}

export default AutoComplete
