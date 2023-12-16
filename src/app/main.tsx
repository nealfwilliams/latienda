'use client'

import { BUTTON_SIZE, BUTTON_TYPE, Button, Card, COLOR, Column, DropdownLinks, Heading, INPUT_SIZE, Modal, Paragraph, Row, Spinner, TextInput, useDialog, Icon, FONT_SIZE, TYPOGRAPHY_TYPE, Select, SnackBar, useSnackBar } from "@/baseComponents"
import { Cart } from "./Cart"

import { useCart } from "@/hooks/useCart"
import { useSDK } from '@metamask/sdk-react';
import React, { useEffect } from "react"
import { AUTH_STATE, useAuth } from "@/hooks/useAuth"
import { useProducts } from "@/hooks/useProducts"
import { DEFAULT_CHAIN_ID, PLACEHOLDER_IMAGE } from '@/constants'
import { TopBar } from "./TopBar";
import { MaxWidth } from "./MaxWidth";



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

export const Main = () => {
  const {
    chainId: metamaskChainId,
  } = useSDK();

  const chainId = metamaskChainId || DEFAULT_CHAIN_ID

  const {close, state} = useDialog('auth-modal')

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
      <SnackBar />
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
      image={product?.image || PLACEHOLDER_IMAGE}
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