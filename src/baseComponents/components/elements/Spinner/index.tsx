/** @jsxImportSource theme-ui */
import { keyframes } from '@emotion/react'
import { StyledElementProps, useTheme } from '../../../theme'
import { COLOR } from '../../../theme/colors'

export enum SPINNER_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export type SpinnerProps = StyledElementProps<
  HTMLDivElement,
  {
    size?: SPINNER_SIZE
    color?: COLOR
  }
>

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const sizeLengthMap = {
  [SPINNER_SIZE.SM]: '1.25rem',
  [SPINNER_SIZE.MD]: '2rem',
  [SPINNER_SIZE.LG]: '3rem',
}

export const SPINNER_LABEL = 'Loading'

export const Spinner: React.FC<SpinnerProps> = ({
  size: sizeParam,
  color: colorParam,
  ...rest
}) => {
  const { colors } = useTheme()
  const size = sizeParam || SPINNER_SIZE.MD
  const color = colors[colorParam || COLOR.PRIMARY]
  return (
    <div
      aria-label={SPINNER_LABEL}
      sx={{
        animation: `${spin} 1.4s linear 0s infinite normal none running;`,
        borderRadius: '50%',
        height: sizeLengthMap[size],
        width: sizeLengthMap[size],
        border: size === SPINNER_SIZE.LG ? 'solid 6px' : 'solid 4px',
        borderColor: `${color} ${color} transparent`,
      }}
      {...rest}
    ></div>
  )
}
