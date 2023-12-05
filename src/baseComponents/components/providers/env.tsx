import { PropsWithChildren, createContext, useContext } from 'react'

export enum ENVIRONMENT {
  DEV = 'DEVELOPMENT',
  PROD = 'PRODUCTION',
}

type EnvironmentContextType = {
  env?: ENVIRONMENT
  flagInDevelopment: (message: string) => void
}

const EnvironmentContext = createContext<EnvironmentContextType>({
  flagInDevelopment: () => {},
})

export const useEnvironment = () => useContext(EnvironmentContext)

export const EnvironmentProvider: React.FC<
  PropsWithChildren<{
    env?: ENVIRONMENT
  }>
> = ({ env, children }) => {
  const flagInDevelopment = (message: string) => {
    if (env === ENVIRONMENT.DEV) {
      throw new Error(message)
    } else {
      console.warn(message)
    }
  }

  return (
    <EnvironmentContext.Provider
      value={{
        env,
        flagInDevelopment,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  )
}
