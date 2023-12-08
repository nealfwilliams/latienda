import React, { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useSDK } from "@metamask/sdk-react";
import { sign } from "crypto";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { SIGN_IN_MESSAGE } from "@/constants";

export enum AUTH_STATE {
  SIGNED_OUT='SIGNED_OUT',
  SIGNING_IN='SIGNING_IN',
  SIGNED_IN='SIGNED_IN',
}

type AuthContextType = {
  signature?: string,
  account?: string,
  authState: AUTH_STATE,
  error: string | undefined,
  handleSignIn: () => void,
  handleSignOut: () => void,
  cancelLogIn: () => void,
}


const AuthContext = React.createContext<AuthContextType>({
  account: undefined,
  signature: undefined,
  authState: AUTH_STATE.SIGNED_OUT,
  error: undefined,
  handleSignIn: () => {},
  handleSignOut: () => {},
  cancelLogIn: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren>  = ({ children }) => {
  const {
    value: storedSignature,
    setValue: setStoredSignature,
  } = useLocalStorage<string>("auth-signature", '');

  const { sdk, provider, account } = useSDK();

  const [error, setError] = useState()

  const [signature, setSignature] = useState<string | undefined>(storedSignature)

  const signedAccount = useMemo(() => {
    if (!signature) return undefined

    else {
      const recoveredAccount = recoverPersonalSignature({
        data: SIGN_IN_MESSAGE,
        signature: signature,
      });

      return recoveredAccount
    }
  }, [signature])

  const [authState, setAuthState] = React.useState(
    signature && (account || signedAccount)
    ? AUTH_STATE.SIGNED_IN
    : AUTH_STATE.SIGNED_OUT
  )

  useEffect(() => {
    const fn = async () => {
      let _signature = signature

      try {
        if (
          !signature &&
          account &&
          authState === AUTH_STATE.SIGNING_IN
        ) {
          _signature = await provider?.request({
            method: 'personal_sign',
            params: [SIGN_IN_MESSAGE, account],
          }) as any;

          // Should confirm no username or account #
          // already exists with this account

          const response = await fetch("/api/signIn", {
            method: "POST",
            body: JSON.stringify({
              signature: _signature,
              account: account
            }),
          })

          if (response.status !== 200) {
            throw new Error('Sign in failed')
          }

          setSignature(_signature)
        }
      } catch (e) {
        console.error('Sign in failed')
        setAuthState(AUTH_STATE.SIGNED_OUT)
      }

      if (signature && authState !== AUTH_STATE.SIGNED_IN) {
        setStoredSignature(signature)
        setAuthState(AUTH_STATE.SIGNED_OUT)
      }
    }

    fn()
  }, [signature, authState, account])

  const cancelLogIn = () => {
    setAuthState(AUTH_STATE.SIGNED_OUT);
  }

  const handleSignIn = async () => {
    try {
      if (!account) {
        setAuthState(AUTH_STATE.SIGNING_IN)
        await sdk?.connect()
      } else if (!signature) {
        setAuthState(AUTH_STATE.SIGNING_IN)
      }
    } catch (e) {

    }
  }

  const handleSignOut = () => {
    setSignature(undefined)
    setAuthState(AUTH_STATE.SIGNED_OUT)
  };

  const context = useMemo(() => ({
    handleSignOut,
    handleSignIn,
    cancelLogIn,
    signature,
    authState,
    account: signedAccount || account,
    error
  }), [signature, authState, error, account]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
