import { useState } from 'react'
import { useSnackBar } from '../../providers/snackBar'
import { Row } from '../../elements/layout/Row'
import { Button } from '../../elements/Button'
import { SnackBar } from '.'

export const BasicExample = () => {
  const { addMessage } = useSnackBar()
  const [messageCount, setMessageCount] = useState(1)

  return (
    <>
      <Button
        onClick={() => {
          setMessageCount(messageCount + 1)
          addMessage({ message: `Message ${messageCount}` })
        }}
      >
        Add Message
      </Button>
      <SnackBar />
    </>
  )
}

export const ReplaceMessageExample = () => {
  const { addMessage } = useSnackBar()
  const [messageCount, setMessageCount] = useState(1)

  return (
    <>
      <Button
        onClick={() => {
          setMessageCount(messageCount + 1)
          addMessage({ message: `Message ${messageCount}`, id: 'same-id' })
        }}
      >
        Add Message
      </Button>
      <SnackBar />
    </>
  )
}

export const WipeMessagesExample = () => {
  const { addMessage } = useSnackBar()
  const [messageCount, setMessageCount] = useState(1)

  return (
    <Row>
      <Button
        onClick={() => {
          setMessageCount((count) => count + 1)
          addMessage({ message: `Message ${messageCount}` })
        }}
        sx={{ mr: 1 }}
      >
        Add Message
      </Button>
      <Button
        onClick={() => {
          setMessageCount((count) => count + 1)
          addMessage(
            { message: `Message ${messageCount}` },
            {
              wipePrevious: true,
            },
          )
        }}
      >
        Wipe and Add
      </Button>
      <SnackBar />
    </Row>
  )
}
