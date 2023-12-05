import { PropsWithChildren } from 'react'
import {
  ComponentConfigParam,
  ComponentConfigProvider,
} from './componentConfig'
import { ENVIRONMENT, EnvironmentProvider } from './env'
import { ThemeProvider } from '../../theme/'
import { FontLoader } from '../../FontLoader'
import { GlobalStyles } from '../../theme/GlobalStyles'
import { DialogsProvider } from './dialogs'
import { MediaSizeProvider } from './media'
import { SnackBarProvider } from './snackBar'
import { UniqueIdProvider } from './uniqueIds'

export type UiConfig = {
  env?: ENVIRONMENT
  components?: ComponentConfigParam
  disableAlerts?: boolean
  loadFonts?: boolean
  loadGlobalStyles?: boolean
  includeTheme?: boolean
}

type UiProviderProps = PropsWithChildren<UiConfig>

export const UiProvider: React.FC<UiProviderProps> = ({
  env,
  components,
  children,
  includeTheme = true,
  loadFonts,
  loadGlobalStyles,
}): JSX.Element => {
  const core = (
    <EnvironmentProvider env={env}>
      <MediaSizeProvider>
        <ComponentConfigProvider config={components || {}}>
          <UniqueIdProvider>
            <SnackBarProvider>
              <DialogsProvider>
                {children}
              </DialogsProvider>
            </SnackBarProvider>
          </UniqueIdProvider>
        </ComponentConfigProvider>
      </MediaSizeProvider>
      {loadGlobalStyles && <GlobalStyles />}
      {loadFonts && <FontLoader />}
    </EnvironmentProvider>
  )

  return includeTheme ? <ThemeProvider>{core}</ThemeProvider> : core
}
