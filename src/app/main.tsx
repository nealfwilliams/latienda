'use client'

import { BUTTON_SIZE, BUTTON_TYPE, Button, COLOR, Column, DropdownLinks, Heading, INPUT_SIZE, Row, TextInput } from "@/baseComponents"
import { Cart } from "./Cart"
import CartIcon from '@mui/icons-material/ShoppingCart'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { useCart } from "@/hooks/useCart"
import { useSDK } from '@metamask/sdk-react';
import { useEffect } from "react"

const TopControls = () => {
  const {isOpen, setIsOpen} = useCart()
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const accountOptions = [ {
    label: 'Sign in as vendor',
    value: 'vendor-signin',
    onClick: () => {}
  }]

  if (!connected) {
    accountOptions.unshift({
      label: 'Connect Wallet',
      onClick: () => {
        sdk?.connect()
      },
      value: 'metamask-connect'
    })
  } else {
    accountOptions.unshift({
      label: 'Disconnect Wallet',
      onClick: () => {
        sdk?.disconnect()
      },
      value: 'metamask-disconnect'
    })
  }

  return (
    <Row>
      <DropdownLinks
        options={accountOptions}
      >
        {({ anchorProps }) => (
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
            La Tienda
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

  return (
    <Column>
      <TopBar />

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
            <Button type={BUTTON_TYPE.OUTLINE}>
              Vendors
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