import React, { useCallback, useMemo, useState } from 'react'
import { BasicOption, RenderOption } from '../../elements/Fields/option'
import { StyledElementProps } from '../../../theme'
import { autoPlacement, offset, size, useFloating } from '@floating-ui/react'
import { ListBox } from '../../elements/ListBox'
import { Link } from '../../elements/Link'
import { Box } from '../../elements/layout/Box'
import { useComponentConfig } from '../../providers/componentConfig'
import { useUniqueId } from '../../providers/uniqueIds'
import { Z_INDEX } from '../../../theme/custom'

type AnchorProps = Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'>
type LinkOption = BasicOption<string>

type DropdownChildrenFn = (params: {
  anchorProps: AnchorProps
}) => React.ReactNode

type DropdownLinksProps = StyledElementProps<
  HTMLDivElement,
  {
    options: BasicOption<string>[]
    renderOption?: RenderOption<string, LinkOption>
    openNewTab?: boolean
  },
  DropdownChildrenFn
>

export const Overlay: React.FC<StyledElementProps<HTMLDivElement>> = (
  props,
) => (
  <Box
    {...props}
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: Z_INDEX.ELEVATED,
    }}
  />
)

export const DropdownLinks: React.FC<DropdownLinksProps> = ({
  children,
  options: optionsParam,
  renderOption: renderOptionParam,
  openNewTab,
  role = 'navigation',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownMinWidth, setDropdownMinWidth] = useState('0px')
  const listboxId = useUniqueId('dropdown-links')
  const anchorId = useUniqueId('dropdown-links-anchor')
  const { navigate } = useComponentConfig().link

  const options = optionsParam.map((option) => ({
    ...option,
    onClick: () => {
      if (option.onClick) {
        option.onClick()
      } else if (openNewTab) {
        window.open(option.value, '_blank')
      } else if (option.value) {
        navigate(option.value)
      }
      setIsOpen(false)
    },
  }))

  const renderOption = renderOptionParam
    ? renderOptionParam
    : (params: { option: BasicOption<string> }) => (
        <Link
          to={params.option.value}
          target={openNewTab ? '_blank' : undefined}
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          {params.option.label}
        </Link>
      )

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset(2),
      size({
        apply({ rects }) {
          setDropdownMinWidth(`${rects.reference.width}px`)
        },
      }),
      autoPlacement({
        allowedPlacements: [
          'top-start',
          'bottom-start',
          'top-end',
          'bottom-end',
        ],
      }),
    ],
  })

  const onClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const dropdownAnchorProps = useMemo(
    () => ({
      id: anchorId,
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      'aria-owns': listboxId,
      ref: refs.setReference,
      onClick,
    }),
    [refs, onClick, anchorId, isOpen, listboxId],
  )

  return (
    <Box {...rest}>
      {children &&
        children({
          anchorProps: dropdownAnchorProps,
        })}

      {isOpen && (
        <>
          <ListBox<string, LinkOption>
            role={role}
            id={listboxId}
            options={options}
            ref={refs.setFloating}
            renderOption={renderOption}
            style={{
              minWidth: dropdownMinWidth,
              ...floatingStyles,
              zIndex: Z_INDEX.DIALOG,
            }}
          />
          <Overlay onClick={() => setIsOpen(false)} />
        </>
      )}
    </Box>
  )
}
