import React, { PropsWithChildren } from 'react'

type DialogState = {
  [key: string]: {
    isOpen: boolean
  }
}

type DialogContextType = {
  open: (key: string) => void
  close: (key: string) => void
  dialogs: DialogState
}

const DialogContext = React.createContext<DialogContextType>({
  open: () => {},
  close: () => {},
  dialogs: {},
})

export const DialogsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [dialogs, setDialogs] = React.useState<DialogState>({})

  const open = (key: string) => {
    setDialogs({ ...dialogs, [key]: { isOpen: true } })
  }

  const close = (key: string) => {
    setDialogs({ ...dialogs, [key]: { isOpen: false } })
  }

  return (
    <DialogContext.Provider
      value={{
        dialogs,
        open,
        close,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = (id: string) => {
  const dialogs = React.useContext(DialogContext)

  const open = () => dialogs.open(id)
  const close = () => dialogs.close(id)
  const state = dialogs.dialogs[id] || { isOpen: false }

  return {
    open,
    close,
    state,
  }
}
