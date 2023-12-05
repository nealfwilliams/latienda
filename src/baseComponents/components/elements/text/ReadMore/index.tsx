/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { StyledElementProps, useTheme } from '../../../../theme'
import { COLOR, colors } from '../../../../theme/colors'
import {
  TYPOGRAPHY_TYPE,
  getTypographyStyles,
} from '../../../../theme/typography'
import { useMediaQuery } from '../../../providers/media'

const ReadMoreLink: React.FC<{
  bg?: COLOR
  color?: COLOR
}> = (props) => {
  // const theme = useTheme()

  const bg = colors[props.bg || COLOR.BACKGROUND]
  const color = colors[props.color || COLOR.ND_BLUE_LIGHT]

  return (
    <div
      css={{
        whiteSpace: 'nowrap',
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingLeft: '3rem',
        background: `linear-gradient(to right, ${bg}00, ${bg} 30%, ${bg} 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        sx={{
          color,
          transform: 'scale(0.9)',
          cursor: 'pointer',
        }}
      >
        Read More...
      </div>
    </div>
  )
}

export const useLinesHeight = (args: {
  lines: number
  typography: TYPOGRAPHY_TYPE
}) => {
  const theme = useTheme()
  const styles = getTypographyStyles(args.typography)
  const fontSize = styles.fontSize

  const fontSizeRem = theme.fontSizes[fontSize]

  // slice of the 'rem' from end of fontSize string and convert to number
  const fontSizeNumber = Number(fontSizeRem.slice(0, fontSizeRem.length - 3))

  // Multiply the fontSize by the lineHeight ratio and the number of lines
  const linesHeight =
    fontSizeNumber * theme.lineHeights[styles.lineHeight] * args.lines

  return `${linesHeight}rem`
}

// A react component that accepts text content and truncates it 3 lines. If the content
// exceeds the alloted space, an ellipsis will be placed at the end of the last line.
// This component does not use the css property `text-overflow: ellipsis`
// because it does not work with multiple lines of text.
export const ReadMore: React.FC<
  StyledElementProps<
    HTMLDivElement,
    {
      typography: TYPOGRAPHY_TYPE
      lines: number
      fixedHeight?: boolean
    },
    string
  >
> = ({ typography, sx, role, lines, fixedHeight, children, ...rest }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [showEllipsis, setShowEllipsis] = useState(true)
  const wrapperHeight = useLinesHeight({ typography, lines })
  const { screenSize } = useMediaQuery()
  const { color, bg } = sx || {}

  React.useEffect(() => {
    if (ref.current) {
      // Check if the content exceeds the alloted space
      if (fixedHeight) {
        ref.current.style.height = wrapperHeight
      } else {
        ref.current.style.maxHeight = wrapperHeight
      }

      const isOverflowing = ref.current.scrollHeight > ref.current.clientHeight

      if (isOverflowing) {
        setShowEllipsis(true)
      } else {
        setShowEllipsis(false)
      }
    }
  }, [children, wrapperHeight, fixedHeight, screenSize])

  return (
    <div
      role={role || 'paragraph'}
      ref={ref}
      style={{
        overflow: 'hidden',
        position: 'relative',
      }}
      sx={{
        ...getTypographyStyles(typography),
        ...sx,
      }}
      {...rest}
    >
      {children}
      {showEllipsis && <ReadMoreLink bg={bg} color={color} />}
    </div>
  )
}
