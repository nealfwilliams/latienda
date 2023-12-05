/** @jsxImportSource theme-ui */
import { StyledElementProps } from '../../../theme'
import { COLOR } from '../../../theme/colors'
import { Link } from '../Link'

type ArrowLinkProps = StyledElementProps<
  HTMLLinkElement,
  {
    to: string
  }
>

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  to,
  children,
  sx,
  ...rest
}) => {
  return (
    <Link
      to={to}
      {...rest}
      sx={{
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        padding: 0,
        flexGrow: 0,
        position: 'relative',
        boxSizing: 'border-box',
        bg: COLOR.WHITE,
        color: COLOR.PRIMARY,
        ':hover': {
          transform: 'scale(1.02)',
          bg: COLOR.EXTRA_EXTRA_LIGHT_GRAY,
        },
        ':hover>svg': {
          fill: COLOR.EXTRA_EXTRA_LIGHT_GRAY,
        },
        '>svg': {
          fill: COLOR.WHITE,
        },
        ...sx,
      }}
    >
      <div
        sx={{
          position: 'relative',
          border: '1px solid #a7a7a7',
          'border-width': '1px 0 2px 1px',
          boxSizing: 'border-box',

          padding: '0.125rem 1.5rem 0.125rem 0.5rem',
          height: '100%',
          flex: '1 1 auto',
        }}
      >
        {children}
      </div>

      <svg
        viewBox="0 0 16 1"
        preserveAspectRatio="none"
        sx={{
          width: '16px',
          right: '-16px',
          top: '0px',
          position: 'absolute',
          height: '100%',
        }}
      >
        <path d="M0,0 0,0 16,0.5 0,1 0,1z" />
        <line
          x1="0"
          x2="16"
          y1="0"
          y2="0.5"
          stroke="#a7a7a7"
          strokeWidth="0.05"
          strokeLinecap="butt"
        />
        <line
          x1="0"
          x2="16"
          y1="1"
          y2="0.5"
          stroke="#a7a7a7"
          strokeWidth="0.1"
          strokeLinecap="butt"
        />
      </svg>
    </Link>
  )
}
