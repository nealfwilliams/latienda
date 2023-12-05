import _ReactModal from 'react-modal'
import { importedDefaultComponentShim } from '../../../utils/misc'
import { StyledElementProps, ThemeProvider, useTheme } from '../../../theme'
import React from 'react'
import { GROUP_TYPE, Group } from '../../elements/Group'
import { Row } from '../../elements/layout/Row'
import { HEADING_SIZE, Heading } from '../../elements/text/Heading'
import { BUTTON_TYPE, Button, ButtonProps } from '../../elements/Button'
import { COLOR } from '../../../theme/colors'
import { TYPOGRAPHY_TYPE } from '../../../theme/typography'
import { useMediaQuery } from '../../providers/media'
import { useComponentConfig } from '../../providers/componentConfig'

const ReactModal = importedDefaultComponentShim(_ReactModal)

type ModalProps = StyledElementProps<
  HTMLDivElement,
  {
    isOpen: boolean
    close: (e: React.MouseEvent) => void
    heading: string
    hideHeading?: boolean
    zIndex?: number
    footer?: React.ReactNode
    actions?: ModalAction[]
    wrapWithTheme?: boolean
  }
>

type ModalAction = {
  label: string
  isPrimary?: boolean
  buttonProps?: Partial<ButtonProps>
  onClick: (e: React.MouseEvent) => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  heading,
  hideHeading,
  isOpen,
  footer,
  actions,
  wrapWithTheme,
  close,
  zIndex,
  ...props
}) => {
  const { breakpoint } = useMediaQuery()
  const { modal } = useComponentConfig()
  const theme = useTheme()

  const shouldShowFooter =
    footer !== undefined || (actions !== undefined && actions.length > 0)

  const modalBody = (
    <Group type={GROUP_TYPE.REGION} sx={{ my: 0 }}>
      {!hideHeading && (
        <Row
          justify="space-between"
          align="center"
          sx={{
            p: 3,
            borderBottom: 'solid 1px',
            borderColor: COLOR.LIGHT_GRAY,
          }}
        >
          <Heading
            size={HEADING_SIZE.SM}
            typography={TYPOGRAPHY_TYPE.CONTROL_MEDIUM}
          >
            {heading}
          </Heading>
          <Button
            type={BUTTON_TYPE.TEXT}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              close(e)
            }}
          >
            Close
          </Button>
        </Row>
      )}
      <Row sx={{ p: 3 }}>{children}</Row>
      {shouldShowFooter && (
        <Row
          sx={{ borderTop: 'solid 1px', borderColor: COLOR.LIGHT_GRAY, p: 3 }}
        >
          {footer}
          {actions !== undefined && (
            <Row sx={{ width: '100%', justifyContent: 'flex-end' }}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  type={
                    action.isPrimary ? BUTTON_TYPE.DEFAULT : BUTTON_TYPE.OUTLINE
                  }
                  onClick={(e) => {
                    action.onClick(e)
                  }}
                  sx={{
                    mr: index < actions.length - 1 ? 1 : 0,
                  }}
                  {...action.buttonProps}
                >
                  {action.label}
                </Button>
              ))}
            </Row>
          )}
        </Row>
      )}
    </Group>
  )

  return (
    <ReactModal
      isOpen={isOpen}
      shouldFocusAfterRender
      appElement={modal.appElement}
      onRequestClose={(e) => {
        e.preventDefault()
        e.stopPropagation()
        close(e as any)
      }}
      {...props}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: zIndex || theme.zIndex.MODAL,
        },
        content: {
          padding: 0,
          minWidth: breakpoint === 0 ? 'calc(100% - 1rem)' : '500px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      {wrapWithTheme ? <ThemeProvider>{modalBody}</ThemeProvider> : modalBody}
    </ReactModal>
  )
}
