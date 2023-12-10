'use client'
import CartIcon from '@mui/icons-material/ShoppingCart'
import AccountIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import StoreIcon from '@mui/icons-material/Store'

import { BUTTON_SIZE, BUTTON_TYPE, Button, Card, COLOR, Column, DropdownLinks, Heading, INPUT_SIZE, Modal, Paragraph, Row, Spinner, TextInput, useDialog, Icon, FONT_SIZE, TYPOGRAPHY_TYPE, Select } from "@/baseComponents"
import { Cart } from "./Cart"

import { useCart } from "@/hooks/useCart"
import { useSDK } from '@metamask/sdk-react';
import React, { useEffect } from "react"
import { AUTH_STATE, useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { DEFAULT_CHAIN_ID, PLACEHOLDER_IMAGE } from '@/constants'
import { Z_INDEX } from '@/baseComponents/theme/custom'

enum AUTH_FLOW {
  LOG_IN='LOG_IN',
  SIGN_UP='SIGN_UP'
}

const AuthModal: React.FC<{
  isOpen: boolean,
  close: () => void
}> = ({ isOpen, close }) => { 
  const { authState, handleSignIn } = useAuth()

  useEffect(() => {
    if (authState === AUTH_STATE.SIGNED_IN) {
      close()
    }
  }, [authState])

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
  const router = useRouter()

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
            primaryIcon={StoreIcon}
            size={BUTTON_SIZE.LG}
            sx={{
              mr: 2,
            }}
            onClick={() => {
              router.push('/')
            }}
          />
          <Button
            color={COLOR.PRIMARY}
            textColor={COLOR.WHITE}
            primaryIcon={HomeIcon}
            size={BUTTON_SIZE.LG}
            sx={{
              mr: 2,
            }}
            onClick={() => {
              router.push('/home')
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
        bg: COLOR.PRIMARY,
        zIndex: Z_INDEX.ELEVATED + 1
      }}
    >
      <Row sx={{maxWidth: '1000px', width: '100%'}} justify="space-between" align="center">
        <Row>
          <img
            src="https://storage.googleapis.com/defiber-static/defiber%20Main%20Logo.png"
            style={{
              height: '40px',
              width: 'auto'
            }}
          />
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
      <Column sx={{maxWidth: '1000px', width: '100%', px: 4}}>
        {children}
      </Column>
    </Column>
  )
}

export const Main = () => {
  const cart = useCart()
  const {
    sdk,
    connected,
    connecting,
    provider,
    chainId: metamaskChainId,
  } = useSDK();

  const chainId = metamaskChainId || DEFAULT_CHAIN_ID

  const {open, close, state} = useDialog('auth-modal')

  const {
    products,
    query: productQuery,
    setQuery: setProductQuery,
    setChainId,
  } = useProducts()

  useEffect(() => {
    setChainId(chainId)
  }, [chainId])

  return (
    <Column>
      <TopBar />
      <AuthModal isOpen={state.isOpen} close={close}/>
      <MaxWidth>
        <Column>
          <Row sx={{mt: 8}}>
            <TextInput
              label="Search"
              value={productQuery}
              onChange={setProductQuery}
              size={INPUT_SIZE.LG}
              placeholder="Search for products..."
              sx={{
                width: '400px',
                mr: 2
              }}
            />
            <TextInput
              disabled
              size={INPUT_SIZE.LG}
              label="ChainId"
              sx={{
                width: '100px'
              }}
              value={chainId || '0x1'}
            />
          </Row>
          <Row sx={{mt: 6}}>
            <ProductList />
          </Row>
        </Column>
      </MaxWidth>
      <Cart />
    </Column>
  )
}

const ProductList = () => {
  const { products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  if (error) {
    return (
      <Paragraph>
        Error loading products
      </Paragraph>
    )
  }

  if (!products) {
    return (
      <Paragraph>
        No products found
      </Paragraph>
    )
  }

  return (
    <Row
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {products.map((product: any) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </Row>
  )
}
 
const ProductListItem: React.FC<{
  product: any
}> = ({ product }) => {
  const { addToCart } = useCart()
  const [ quantity, setQuantity ] = React.useState(1)

  return (
    <Card
      raised
      image={PLACEHOLDER_IMAGE}
      sx={{
        width: '280px',
        mt: 5,
        mr: 5,
      }}
      headline={product.name}
      imageHeight='150px'
    >
      <Column align="left">
        <Row sx={{fontSize: FONT_SIZE.ML}}>
          {/* <Icon icon={MoneyIcon} /> */}
          <Paragraph typography={TYPOGRAPHY_TYPE.CONDENSED_TEXT_LARGE}>
            $ {product.price}.00
          </Paragraph>
        </Row>
        <Row sx={{mt: 4}}>
          <TextInput
            type="number"
            label="Quantity"
            value={quantity.toString()}
            onChange={(value) => setQuantity(parseInt(value))}
            sx={{mr: 2, width: '100px'}}
          />
          <Button
            onClick={() => {
              addToCart({
                product,
                quantity
              })
            }}
          >
            Add To Cart
          </Button>
        </Row>
      </Column>
    </Card>
  )
}