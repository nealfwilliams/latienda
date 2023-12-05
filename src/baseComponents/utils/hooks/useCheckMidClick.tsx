import React from 'react'

export const useCheckMidClick = () => {
  const isMidClick = React.useRef<boolean>(false)

  const onMouseDown = () => {
    isMidClick.current = true
  }

  const onMouseUp = () => {
    isMidClick.current = false
  }

  return {
    elementProps: {
      onMouseDown,
      onMouseUp,
    },
    isMidClick,
  }
}
