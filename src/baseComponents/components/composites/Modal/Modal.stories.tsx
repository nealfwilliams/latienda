import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from '.'
import { Button } from '../../elements/Button'
import { Paragraph } from '../../elements/text/Paragraph'
import { useDialog } from '../../providers/dialogs'
import { useTheme } from '../../../theme'

const meta: Meta<typeof Modal> = {
  title: 'Composites/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalExample = () => {
  const modalId = 'modal-example'
  const { open, close, state } = useDialog(modalId)
  const theme = useTheme()

  return (
    <>
      {/* Putting z-index on button to smoke test any zIndex bug  */}
      <Button
        onClick={open}
        sx={{ position: 'relative', zIndex: theme.zIndex.DIALOG }}
      >
        Open Modal
      </Button>
      <Modal
        isOpen={state.isOpen}
        heading="Heading"
        close={close}
        actions={[
          {
            label: 'Secondary',
            isPrimary: false,
            onClick: () => {},
          },
          {
            label: 'Customized',
            onClick: () => {},
            buttonProps: {
              loading: true,
            },
          },
          {
            label: 'Primary',
            isPrimary: true,
            onClick: () => {},
          },
        ]}
      >
        <Paragraph>Modal body goes here</Paragraph>
      </Modal>
    </>
  )
}
export const Default: Story = {
  render: () => <ModalExample />,
  args: {},
}
