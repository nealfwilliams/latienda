/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import _ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  useFloating,
  size as sizeMiddleware,
  offset,
  autoPlacement,
} from '@floating-ui/react'

import {
  TYPOGRAPHY_TYPE,
  getTypographyStyles,
} from '../../../../theme/typography'
import { StyledElementProps, useTheme } from '../../../../theme'
import { INPUT_SIZE, labelOffsetMap, labelTypographyMap } from '../TextInput'
import { ListBox } from '../../ListBox'
import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../Button'
import {
  BasicOption,
  Key,
  RenderOption,
  RenderOptionLabel,
  defaultRenderOptionLabel,
  getOptionId,
} from '../option'
import { KEY_CODES, importedDefaultComponentShim } from '../../../../utils/misc'
import { COLOR } from '../../../../theme/colors'
import { Box } from '../../layout/Box'
import { Label } from '../../text/Label'
import { useUniqueId } from '../../../providers/uniqueIds'

const ArrowDropDownIcon = importedDefaultComponentShim(_ArrowDropDownIcon)

const typographyMap = {
  [INPUT_SIZE.SM]: TYPOGRAPHY_TYPE.PARAGRAPH_SMALL,
  [INPUT_SIZE.MD]: TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM,
  [INPUT_SIZE.LG]: TYPOGRAPHY_TYPE.PARAGRAPH_LARGE,
}

const defaultHeight = {
  [INPUT_SIZE.SM]: '2.25rem',
  [INPUT_SIZE.MD]: '2.5rem',
  [INPUT_SIZE.LG]: '3rem',
}

type SelectProps<
  Value extends Key,
  Option extends BasicOption<Value>,
> = StyledElementProps<
  HTMLSelectElement,
  {
    placeholder?: string
    size?: INPUT_SIZE
    leftIcon?: React.FC<any>
    value: Value
    label?: string
    inverted?: boolean
    onSelectOption: (value: Value) => void
    options: Option[]
    renderOption?: RenderOption<Value, Option>
    renderOptionLabel?: RenderOptionLabel<Option>
  },
  string
>

const buttonSizeMap = {
  [INPUT_SIZE.SM]: BUTTON_SIZE.SM,
  [INPUT_SIZE.MD]: BUTTON_SIZE.MD,
  [INPUT_SIZE.LG]: BUTTON_SIZE.LG,
}

const DEFAULT_WIDTH = '16rem'

export function Select<Value extends Key, Option extends BasicOption<Value>>({
  size: sizeParam,
  placeholder,
  leftIcon,
  value,
  label,
  onSelectOption,
  options,
  renderOption,
  inverted,
  renderOptionLabel: renderOptionLabelParam,
  sx,
}: SelectProps<Value, Option>) {
  const theme = useTheme()
  const listboxId = useUniqueId('select-list-box')
  const inputId = useUniqueId('select-input')

  const [isOpen, setIsOpen] = useState(false)
  const [stagedOptionValue, setStagedOptionValue] = useState<
    Value | undefined
  >()

  const currentOption = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  const getNextOptionValue = () => {
    if (stagedOptionValue) {
      const currentIndex = options
        .map((option) => option.value)
        .indexOf(stagedOptionValue)
      const nextIndex = Math.min(currentIndex + 1, options.length - 1)
      return options[nextIndex].value
    } else {
      setIsOpen(true)
      return options[0].value
    }
  }

  const getPrevOptionValue = () => {
    if (stagedOptionValue) {
      const currentIndex = options
        .map((option) => option.value)
        .indexOf(stagedOptionValue)
      const nextIndex = Math.max(currentIndex - 1, 0)

      return options[nextIndex].value
    } else {
      setIsOpen(true)
      return options[options.length - 1].value
    }
  }

  const [dropdownMinWidth, setDropdownMinWidth] = useState('0px')

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset(2),
      sizeMiddleware({
        apply({ rects }) {
          setDropdownMinWidth(`${rects.reference.width}px`)
        },
      }),
      autoPlacement({
        allowedPlacements: ['top-start', 'bottom-start'],
      }),
    ],
  })

  const close = () => {
    setStagedOptionValue(undefined)
    setIsOpen(false)
  }

  const open = () => {
    setStagedOptionValue(stagedOptionValue || value || options[0].value)
    setIsOpen(true)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEY_CODES.ARROW_DOWN) {
      const nextValue = getNextOptionValue()
      setStagedOptionValue(nextValue)
    }

    if (e.key === KEY_CODES.ARROW_UP) {
      const prevValue = getPrevOptionValue()
      setStagedOptionValue(prevValue)
    }

    if (e.key === KEY_CODES.ENTER) {
      if (!isOpen) {
        open()
      }

      if (isOpen && stagedOptionValue && onSelectOption) {
        onSelectOption(stagedOptionValue)
        close()
      }
    }

    if (e.key === KEY_CODES.ESCAPE) {
      close()
    }
  }

  const size = sizeParam || INPUT_SIZE.MD
  const buttonSize = buttonSizeMap[size]

  const height = defaultHeight[size]

  const typography = typographyMap[size]
  const typographyStyles = getTypographyStyles(typography)

  const renderOptionLabel = renderOptionLabelParam || defaultRenderOptionLabel

  const focusStyles = {
    boxShadow: inverted ? theme.boxShadow.INVERTED : theme.boxShadow.NORMAL,
  }

  return (
    <Box
      sx={{
        width: DEFAULT_WIDTH,
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: inverted ? COLOR.DARK_GRAY : COLOR.WHITE,
        ':hover fieldset': focusStyles,
        ':focus fieldset': focusStyles,
        ...sx,
      }}
    >
      <fieldset
        sx={{
          textAlign: 'left',
          position: 'absolute',
          inset: '-4px 0px 0px 0px',
          margin: '0px',
          padding: '0px 0.5rem',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          borderStyle: 'solid',
          borderWidth: '1px',
          overflow: 'hidden',
          minWidth: '0%',
          borderColor: inverted ? COLOR.GRAY : COLOR.LIGHT_GRAY,
          zIndex: theme.zIndex.ELEVATED,
        }}
      >
        <legend
          style={{
            width: 'auto',
            float: 'unset',
            overflow: 'hidden',
            position: 'relative',
            display: 'block',
            padding: '0',
            height: '8px',
            fontSize: '0.75em',
            visibility: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {label && (
            <Label
              standalone
              sx={{
                px: 1,
                position: 'relative',
                display: 'inline-flex',
                opacity: '0',
                visibility: 'hidden',
              }}
              typography={labelTypographyMap[size]}
            >
              {label}
            </Label>
          )}
        </legend>
      </fieldset>

      <Label
        htmlFor={inputId}
        typography={labelTypographyMap[size]}
        sx={{
          position: 'absolute',
          left: '0.5rem',
          lineHeight: 1,
          zIndex: theme.zIndex.ELEVATED,
          color: inverted ? COLOR.EXTRA_LIGHT_GRAY : COLOR.PRIMARY,
          px: 1,
          top: labelOffsetMap[size],
        }}
      >
        {label}
      </Label>
      <Button
        ref={refs.setReference}
        disableFocusStyles
        // A11y attributes
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-autocomplete="none"
        aria-activedescendant={
          isOpen && stagedOptionValue
            ? getOptionId(stagedOptionValue)
            : undefined
        }
        // Style config
        type={BUTTON_TYPE.OUTLINE}
        size={buttonSize}
        onBlur={() => close()}
        onFocus={() => open()}
        onKeyDown={onKeyDown}
        onMouseDown={() => {
          if (!isOpen) {
            open()
          } else {
            close()
          }
        }}
        color={inverted ? COLOR.EXTRA_LIGHT_GRAY : COLOR.TEXT}
        sx={{
          height,
          width: '100%',
          border: 'solid 0px',
          // borderColor: COLOR.GRAY,
          // borderRadius: '4px',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          zIndex: theme.zIndex.NORMAL,
          background: 'none',
          ...typographyStyles,
        }}
        leftIcon={leftIcon}
        rightIcon={ArrowDropDownIcon}
      >
        {currentOption ? renderOptionLabel(currentOption) : placeholder}
      </Button>

      {isOpen && (
        <ListBox<Value, Option>
          id={listboxId}
          options={options}
          selected={value}
          focused={stagedOptionValue}
          selectOption={(option) => {
            onSelectOption && onSelectOption(option.value)
            close()
          }}
          ref={refs.setFloating}
          renderOption={renderOption}
          sx={{
            zIndex: theme.zIndex.DIALOG,
          }}
          style={{
            minWidth: dropdownMinWidth,
            ...floatingStyles,
            boxShadow: inverted
              ? theme.boxShadow.INVERTED
              : theme.boxShadow.NORMAL,
          }}
        />
      )}
    </Box>
  )
}
