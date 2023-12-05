import { Button, COLOR, Column, EmptyState, Row } from "@/baseComponents"
import { BOX_SHADOW, Z_INDEX } from "@/baseComponents/theme/custom"
import { PLACEHOLDER_IMAGE } from "@/constants"
import { useCart } from "@/hooks/useCart"
import { useSDK } from "@metamask/sdk-react"
import { Product } from "@prisma/client"
import React, { useContext } from "react"
import { ethers } from 'ethers'

export const Cart = () => {
  const { cart, isOpen } = useCart()
  const { sdk, connected, connecting, provider, chainId, account } = useSDK();

  const onCheckout = () => {
    console.log('ethers', ethers)
    console.log('ethereum', window.ethereum)
    console.log('chainId', chainId, 'account', account)

    // GAVIN'S CODE GOES HERE
  }
  
  if (!isOpen) {
    return null
  }

  const total = cart ? cart.reduce((acc, item) => acc + (item.quantity * item.product.price), 0) : 0

  return (
    <Column sx={{
      position: 'fixed',
      top: '64px',
      right: 0,
      width: '400px',
      height: 'calc(100vh - 64px)',
      bg: COLOR.WHITE,
      boxShadow: BOX_SHADOW.NORMAL,
      zIndex: Z_INDEX.ELEVATED,
      p: 4
    }}>
      <Column grow={1}>
        {cart && cart.length === 0 && (
          <EmptyState omitIcon>Your cart is empty.</EmptyState>
        )}

        {cart && cart.length > 0 && (
          <>
            {cart.map((item) => (
              <Row>
                <Column>
                  <img src={PLACEHOLDER_IMAGE} alt={item.product.name} />
                </Column>
                <Column>
                  <Row>
                    <Column>
                      {item.product.name}
                    </Column>
                    <Column>
                      {item.quantity}
                    </Column>
                    <Column>
                      ${item.quantity * item.product.price}
                    </Column>
                  </Row>
                </Column>
              </Row>
            ))}
            <Row>
              <Column>
                Total
              </Column>
              <Column>
                {total}
              </Column>
            </Row>
          </>
        )}

      </Column>

      <Column grow={0} justify={'flex-end'} align="center" sx={{p: 5}}>
        { connected ? (
          <Button
            onClick={() => {
              onCheckout()
            }} 
          >
            Check Out
          </Button>
        ) : (
          <Button
            onClick={() => {
              sdk?.connect()
            }}
          >
            Connect Wallet
          </Button>
        ) }
      </Column>

    </Column>
  )
}