import { render as rtlRender } from '@testing-library/react'
import { UiProvider, UiConfig } from '../components/providers/ui'

export const render = (component: React.ReactNode, configParam?: UiConfig) => {
  const config = configParam || {}

  return rtlRender(
    <UiProvider
      env={config.env}
      components={config.components}
      alertsConfig={{
        disable: true,
      }}
    >
      {component}
    </UiProvider>,
  )
}
