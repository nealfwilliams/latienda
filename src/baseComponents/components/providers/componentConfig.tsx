import { PropsWithChildren, createContext, useContext, useMemo } from 'react'
import { DeepPartial } from '../../utils/misc'
import { StyledElementProps } from '../../theme'

export type ComponentConfig = {
  link: {
    externalMatcher: RegExp
    navigate: (url: string) => void
    internalLinkComponent: React.FC<LinkComponentProps>
    externalLinkComponent: React.FC<LinkComponentProps>
  }
  modal: {
    appElement: HTMLElement | undefined
  }
}

export type ComponentConfigParam = DeepPartial<ComponentConfig>

export type LinkComponentProps = StyledElementProps<
  HTMLAnchorElement,
  {
    to: string
    target?: string
  }
>

const DEFAULT_EXTERNAL_LINK_MATCHER = /[a-zA-Z0-9]*:\/\/[^\s]*/g

export const DefaultLink: React.FC<LinkComponentProps> = ({ to, ...rest }) => {
  return <a href={to} {...rest} />
}

const defaultComponentConfig = {
  link: {
    externalMatcher: DEFAULT_EXTERNAL_LINK_MATCHER,
    navigate: (url: string) => {
      window.location.href = url
    },
    internalLinkComponent: DefaultLink,
    externalLinkComponent: DefaultLink,
  },
  modal: {
    appElement: undefined,
  },
}

export const ComponentConfigContext = createContext<ComponentConfig>(
  defaultComponentConfig,
)
export const useComponentConfig = () => useContext(ComponentConfigContext)

export const ComponentConfigProvider: React.FC<
  PropsWithChildren<{
    config: ComponentConfigParam
  }>
> = ({ config: configParam, children }) => {
  const config = useMemo(
    () => ({
      ...defaultComponentConfig,
      ...configParam,
      link: {
        ...defaultComponentConfig.link,
        ...configParam.link,
      },
    }),
    [], // eslint-disable-line
  )

  return (
    <ComponentConfigContext.Provider value={config as ComponentConfig}>
      {children}
    </ComponentConfigContext.Provider>
  )
}
