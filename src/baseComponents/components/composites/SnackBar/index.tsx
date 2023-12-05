import { keyframes } from '@emotion/react'
import { COLOR } from '../../../theme/colors'
import { TYPOGRAPHY_TYPE, getTypographyStyles } from '../../../theme/typography'
import { BUTTON_TYPE, Button } from '../../elements/Button'
import { Box } from '../../elements/layout/Box'
import { Column } from '../../elements/layout/Column'
import { Row } from '../../elements/layout/Row'
import { useSnackBar } from '../../providers/snackBar'
import CloseIcon from '@mui/icons-material/Close'
import { Z_INDEX } from '../../../theme/custom'

const getTransformForMessageCount = (messageCount: number) =>
  messageCount ? `translateY(-${messageCount * 4 + 1}rem)` : '0rem'

const getAnimation = (messageCount: number, previousMessageCount: number) => {
  return keyframes`
      from {
        transform: ${getTransformForMessageCount(previousMessageCount)};
      }
      to {
        transform: ${getTransformForMessageCount(messageCount)};
      }
    `
}

export const SnackBar = () => {
  const { messages, removeMessage, previousMessageCount } = useSnackBar()
  const typographyStyles = getTypographyStyles(
    TYPOGRAPHY_TYPE.CONDENSED_TEXT_MEDIUM,
  )

  const animation = getAnimation(messages.length, previousMessageCount)
  const animationStyle = `${animation} 100ms linear 1 forwards`

  return (
    <Column
      sx={{
        position: 'fixed',
        left: 0,
        top: '100%',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        pb: 3,
        animation: animationStyle,
        zIndex: Z_INDEX.DIALOG,
      }}
    >
      {messages.map((message) => (
        <Row
          key={message.id}
          sx={{
            width: ['90vw', '500px'],
            height: '56px',
            borderRadius: '4px',
            p: 4,
            mt: '0.5rem',
            border: '1px solid',
            bg: COLOR.PRIMARY,
            color: COLOR.WHITE,
            justifyContent: 'space-between',
            alignItems: 'center',
            ...typographyStyles,
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            aria-live="polite"
          >
            {message.message}
          </Box>
          <Box>
            <Button
              aria-label="Dismiss Notice"
              type={BUTTON_TYPE.TEXT}
              primaryIcon={CloseIcon}
              onClick={() => {
                removeMessage(message.id)
              }}
              textColor={COLOR.WHITE}
            />
          </Box>
        </Row>
      ))}
    </Column>
  )
}
