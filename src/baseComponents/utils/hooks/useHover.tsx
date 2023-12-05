import React from 'react'

export const useHover = () => {
  const [isHovered, setIsHovered] = React.useState(false)
  const anchorElementProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }

  return {
    isHovered,
    anchorElementProps,
  }
}
