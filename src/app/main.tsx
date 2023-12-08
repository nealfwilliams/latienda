'use client'

import { BUTTON_SIZE, BUTTON_TYPE, Button, COLOR, Column, DropdownLinks, Heading, INPUT_SIZE, Modal, Paragraph, Row, Spinner, TextInput, useDialog } from "@/baseComponents"
import { Cart } from "./Cart"
import CartIcon from '@mui/icons-material/ShoppingCart'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { useCart } from "@/hooks/useCart"
import { useSDK } from '@metamask/sdk-react';
import React from "react"
import { AUTH_STATE, useAuth } from "@/hooks/useAuth"

enum AUTH_FLOW {
  LOG_IN='LOG_IN',
  SIGN_UP='SIGN_UP'
}


const AuthModal: React.FC<{
  isOpen: boolean,
  close: () => void
}> = ({ isOpen, close }) => { 
  const { authState, handleSignIn } = useAuth()

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      heading="Sign In"
    >
      <Column align="center" sx={{width: '100%', height: '60px'}} justify="center">
        {authState === AUTH_STATE.SIGNED_OUT && (
          <Button
            onClick={() => {
              handleSignIn()
            }}
          >
            Sign In With Metamask
          </Button>
        )}

        {authState === AUTH_STATE.SIGNING_IN && (
          <Spinner />
        )}
      </Column>
    </Modal>
  )
}

const TopControls = () => {
  const {isOpen, setIsOpen} = useCart()
  const {authState, handleSignOut} = useAuth()

  const { open } = useDialog('auth-modal')

  return (
    <Row>
      {authState === AUTH_STATE.SIGNED_OUT && (
        <Button
          color={COLOR.PRIMARY}
          textColor={COLOR.WHITE}
          primaryIcon={AccountIcon}
          size={BUTTON_SIZE.LG}
          sx={{
            mr: 2,
          }}
          onClick={() => {
            open()
          }}
        />
      )}

      {authState === AUTH_STATE.SIGNED_IN && (
        <>
          <Button
            color={COLOR.PRIMARY}
            textColor={COLOR.WHITE}
            primaryIcon={AccountIcon}
            size={BUTTON_SIZE.LG}
            sx={{
              mr: 2,
            }}
            onClick={() => {
              open()
            }}
          />
          <DropdownLinks
            options={[{
              label: 'Sign Out',
              onClick: () => {
                handleSignOut()
              },
              value: 'sign-out'
            }]}
          >
            {( { anchorProps }) => (
              <Button  
                {...anchorProps}
                color={COLOR.PRIMARY}
                textColor={COLOR.WHITE}
                primaryIcon={AccountIcon}
                size={BUTTON_SIZE.LG}
                sx={{
                  mr: 2,
                }}
              />
            )}
          </DropdownLinks>
        </>
      )}


      <Button
        color={COLOR.PRIMARY}
        textColor={COLOR.WHITE}
        primaryIcon={CartIcon}
        size={BUTTON_SIZE.LG}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        sx={{
          mr: 4,
        }}
      />
    </Row>
  )
}

const TopBar = () => {
  return (
    <Row
      justify='center'
      sx={{
        width: '100%',
        height: '64px',
        bg: COLOR.PRIMARY
      }}
    >
      <Row sx={{maxWidth: '1000px', width: '100%'}} justify="space-between" align="center">
        <Row>
          <Heading sx={{color: COLOR.WHITE}}>
            Defiber
          </Heading>
        </Row>
        <Row>
          <TopControls />
        </Row>
      </Row>
    </Row>
  )
}

const MaxWidth = ({ children }: any) => {
  return (
    <Column sx={{width: '100vw'}} align="center">
      <Column sx={{maxWidth: '1000px', width: '100%'}}>
        {children}
      </Column>
    </Column>
  )
}

export const Main = () => {
  const cart = useCart()
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const {open, close, state} = useDialog('auth-modal')

  return (
    <Column>
      <TopBar />
      <AuthModal isOpen={state.isOpen} close={close}/>
      <MaxWidth>
        <Column sx={{mt: 8}}>
          <Row>
            <Button
              color={COLOR.PRIMARY}
              textColor={COLOR.WHITE}
              sx={{
                mr: 2
              }}
            >
              Products
            </Button>
          </Row>

          <Row sx={{mt: 6}}>
            <TextInput
              label="Search"
              value=""
              size={INPUT_SIZE.LG}
              placeholder="Search for products..."
              sx={{
                width: '400px'
              }}
            />
          </Row>
        </Column>
      </MaxWidth>
      <Cart />
    </Column>
  )
}