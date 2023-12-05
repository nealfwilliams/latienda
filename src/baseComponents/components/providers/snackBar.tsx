import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type SnackBarMessage = {
  message: string
  content?: JSX.Element
  id?: string
}

type SendMessageOptions = {
  timeout?: number
  wipePrevious?: boolean
}

const DEFAULT_TIMEOUT = 10000

// Id required for messages that have been added
type SnackBarMessageWithId = Omit<SnackBarMessage, 'id'> & {
  id: string
}

type AddMessage = (
  message: SnackBarMessage,
  options?: SendMessageOptions,
) => void

type SnackBarContextType = {
  addMessage: AddMessage
  removeMessage: (id: string) => void
  messages: SnackBarMessageWithId[]
  previousMessageCount: number
}

const SnackBarContext = createContext<SnackBarContextType>({
  addMessage: () => {},
  removeMessage: () => {},
  previousMessageCount: 0,
  messages: [],
})

export const SnackBarProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [messages, setMessages] = useState<SnackBarMessageWithId[]>([])
  const removeMessageTimeouts = useRef<any[]>([])
  const previousMessageCount = useRef(0)

  const removeMessage = useCallback((id: string) => {
    setMessages((messages) => {
      previousMessageCount.current = messages.length
      return messages.filter((m) => m.id !== id)
    })
  }, [])

  const addMessage = useCallback(
    (message: SnackBarMessage, options: SendMessageOptions = {}) => {
      const newRandomId = Math.random().toString(36).substring(7)

      setMessages((messages) => {
        previousMessageCount.current = options.wipePrevious
          ? 0
          : messages.length

        let newMessages = options.wipePrevious ? [] : [...messages]

        // Filter messages that share id
        newMessages = newMessages.filter((m) => m.id !== message.id)

        newMessages.push({ ...message, id: message.id || newRandomId })

        if (newMessages.length > 3) {
          newMessages.shift()
        }
        return newMessages
      })

      const removeMessageTimeout = setTimeout(() => {
        removeMessage(newRandomId)
      }, options.timeout || DEFAULT_TIMEOUT)

      removeMessageTimeouts.current.push(removeMessageTimeout)
    },
    [removeMessage],
  )

  useEffect(() => {
    // Remove message callbacks if component dismounts
    return () => {
      removeMessageTimeouts.current.forEach((timeout) => clearTimeout(timeout)) // eslint-disable-line
    }
  }, [])

  return (
    <SnackBarContext.Provider
      value={{
        messages,
        removeMessage,
        previousMessageCount: previousMessageCount.current,
        addMessage,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  )
}

export const useSnackBar = () => {
  return useContext(SnackBarContext)
}
