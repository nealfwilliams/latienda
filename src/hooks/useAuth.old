import React, { useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export enum AUTH_STATE {
  LOGGED_OUT,
  LOGGED_IN,
  SENDING_CREDENTIALS,
  VERIFYING_CODE,
  SIGN_IN_ERROR
}

type AuthContextType = {
  token: string | undefined,
  authState: AUTH_STATE,
  error: string | undefined,
  handleLogIn: (params: {
    phone: number,
    username: string
  }) => void,
  handleSignUp: (params: {
    phone: number,
    username: string
  }) => void,
  handleSignOut: () => void,
  cancelLogIn: () => void,
}

const AuthContext = React.createContext<AuthContextType>({
  token: undefined,
  authState: AUTH_STATE.LOGGED_OUT,
  error: undefined,
  handleLogIn: () => {},
  handleSignUp: () => {},
  handleSignOut: () => {},
  cancelLogIn: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren>  = ({ children }) => {
  const {
    value: storedAuthToken,
    setValue: setStoredAuthToken,
  } = useLocalStorage<any>("authToken", null);
  const [authToken, setAuthToken] = React.useState(storedAuthToken);

  const [phone, setPhone] = React.useState<number | undefined>();

  const [authState, setAuthState] = React.useState(authToken
    ? AUTH_STATE.LOGGED_IN
    : AUTH_STATE.LOGGED_OUT
  );
  const [error, setError] = React.useState<string | undefined>();

  const handleLogIn = async (phone: number) => {
    setAuthState(AUTH_STATE.SENDING_CREDENTIALS);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ phone }),
    })

    const result: any = res.json()
    if (result.codeSent) {
      setAuthState(AUTH_STATE.VERIFYING_CODE);
      setPhone(phone);
    }
  };

  const cancelLogIn = () => {
    setAuthState(AUTH_STATE.LOGGED_OUT);
    setPhone(undefined)
  }

  useEffect(() => {
    setStoredAuthToken(authToken);
  }, [authToken]) 

  useEffect(() => {
    // Continually make request to verify code until it is verified
    // If it is verified, setAuthToken

    // If the user logs out, setAuthToken(null)
    let checkCredentialsInterval: any = undefined

    if (authState === AUTH_STATE.VERIFYING_CODE) {
      checkCredentialsInterval = setInterval(async () => {
        const res = await fetch("/api/verifyLogin", {
          method: "POST",
          body: JSON.stringify({ phone }),
        })
        const json = await res.json()
        if (json.codeVerified) {
          setAuthToken(json.authToken)
          setAuthState(AUTH_STATE.LOGGED_IN)
        }
      }, 2000)
    }

    return () => {
      clearInterval(checkCredentialsInterval)
    }
  }, [authState])

  const handleSignUp = async (params: {
    phone: number,
    username: string
  }) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          phone: params.phone,
          username: params.username
        }),
      })

      const json = await res.json()
      if (json.codeSent) {
        setPhone(phone)
        setAuthState(AUTH_STATE.VERIFYING_CODE)
      } else {
        throw new Error("Code not sent")
      }
    } catch (e) {
      setError("Error signing up")
    }
  }

  const handleSignOut = () => {
    setAuthToken(undefined)
    setAuthState(AUTH_STATE.LOGGED_OUT)
  };

  const context = useMemo(() => ({
    handleSignOut,
    handleSignUp,
    handleLogIn,
    cancelLogIn,
    token: authToken,
    authState,
    error,
  }), [authToken, authState, error]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
