'use client'

import { useState } from "react"
import MoneyIcon from '@mui/icons-material/AttachMoney'

import { BUTTON_TYPE, Button, Column, GROUP_TYPE, Group, HEADING_SIZE, Heading, INPUT_SIZE, Label, Modal, Paragraph, Row, TYPOGRAPHY_TYPE, TextInput, useDialog } from "@/baseComponents"
import { useAuth } from "@/hooks/useAuth"
import { useSDK } from "@metamask/sdk-react"
import { DEFAULT_CHAIN_ID } from "@/constants"
import { onCreateProduct } from './onCreateProduct'
import { ORDERS_CACHE_KEY, useOrders } from "@/hooks/useOrders"
import { MaxWidth } from "../MaxWidth"
import { TopBar } from "../TopBar"
import { Order, OrderStatus } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"

const getOrderStatusLabel = (order: Order) => {
  if (!order.hasBeenPaid) {
    return 'Unpaid'
  } else if (!order.hasBeenShipped) {
    return 'Needs Shipping'
  } else if (!order.hasBeenDelivered) {
    return 'In Transit'
  } else if (!order.fulfilled) {
    return 'Delivered'
  } else {
    return 'Payment Received'
  }
}

export const Main = () => {
  const queryClient = useQueryClient()
  const {signature, account} = useAuth()
  const metamask = useSDK()
  const { orders } = useOrders()

  const chainId = metamask.chainId || DEFAULT_CHAIN_ID

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  const [orderIdForShippingModal, setOrderIdForShippingModal] = useState<string | undefined>()
  const [shippingLabel, setShippingLabel] = useState<string>('')

  const { state, open, close } = useDialog('shipping-label')
  const [isProductSaving, setIsProductSaving] = useState(false)

  const addProduct = async () => {
    setIsProductSaving(true)

    try {
      const body = {
        name: productName,
        description: productDescription,
        price: productPrice,
        image: imageUrl,
        chainId
      }
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature!,
          'X-Account': account!
        },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      onCreateProduct({
        product: data.product,
        metamask
      })

    } catch (error) {
      console.log(error)
    }
    setIsProductSaving(false)
  }

  return (
    <Column>
      <Modal
        isOpen={state.isOpen}
        close={close}
        heading="Attach Shipping Label"
        actions={[{
          label: 'Cancel',
          onClick: () => {
            setShippingLabel('')
            setOrderIdForShippingModal(undefined)
            close()
          }
        }, {
          label: 'Submit',
          isPrimary: true,
          onClick: async () => {
            await fetch(`/api/orders/markShipped`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Signature': signature!,
                'X-Account': account!
              },
              body: JSON.stringify({
                orderId: orderIdForShippingModal,
                shippingLabel,
              })
            })
            queryClient.invalidateQueries({
              queryKey: [ORDERS_CACHE_KEY]
            })
            setShippingLabel('')
            setOrderIdForShippingModal(undefined)
            close()
          }
        }]}
      >
        <TextInput
          label="Shipping Label"
          value={shippingLabel}
          onChange={setShippingLabel}
          sx={{
            width: '300px'
          }}
        />
      </Modal>
      <TopBar />
      <MaxWidth>
        <Group sx={{p: 4}}>
          <Column sx={{width: '400px'}}>
            <Heading size={HEADING_SIZE.SM}>Add New Product</Heading>
            <TextInput
              label="Product Name"
              value={productName}
              sx={{mt: 4}}
              onChange={setProductName}
            />
            <TextInput
              label="Product Description"
              sx={{mt: 4}}
              value={productDescription}
              onChange={setProductDescription}
            />
            <TextInput
              label="Image URL"
              value={imageUrl}
              sx={{mt: 4}}
              onChange={setImageUrl}
            />
            <TextInput
              label="Product Price"
              leftIcon={MoneyIcon}
              type="number"
              value={productPrice.toString()}
              sx={{mt: 4}}
              onChange={(value) => {
                setProductPrice(parseInt(value))
              }}
            />
            <Row align="center">
              <TextInput
                disabled
                size={INPUT_SIZE.LG}
                label="ChainId"
                sx={{
                  width: '100px',
                  mt: 4
                }}
                value={chainId || ''}
              />
              <Paragraph typography={TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL} sx={{ml: 2, pt: 2}}>
                To change the chainId, change your network in MetaMask
              </Paragraph>
            </Row>
            <Button
              sx={{mt: 2}}
              onClick={addProduct}
            >
              Add
            </Button>
          </Column>
        </Group>
        <Group
          type={GROUP_TYPE.REGION}
          sx={{
            mt: 5,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Heading size={HEADING_SIZE.SM}>Orders</Heading>
          {orders && orders.map((order) => {
            const summary = order.summary as any[]

            return (
              <Group key={order.id} type={GROUP_TYPE.REGION} sx={{width: '100%'}}>
                <Column
                  key={order.id}
                  sx={{
                    mt: 4,
                    p: 4,
                    border: '1px solid #eee',
                    borderRadius: '4px',
                    alignItems: 'flex-start'
                  }}
                >
                  <Row sx={{width: '100%'}} align='center'>
                    <Heading size={HEADING_SIZE.SM}>
                      {order.id} - {getOrderStatusLabel(order)}
                    </Heading>
                    <Column grow={1} />
                    <Column>
                      {!order.hasBeenShipped && (
                        <Button
                          type={BUTTON_TYPE.TEXT}
                          onClick={() => {
                            setOrderIdForShippingModal(order.id)
                            open()
                          }}
                        >
                          Attach Shipping Label
                        </Button>
                      )}
                    </Column>
                  </Row>
                  <Row>
                    <Group
                      type={GROUP_TYPE.GROUP}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '300px'
                      }}
                    >
                      <Label>Summary</Label>
                      {summary.map((item) => {
                        return (
                          <Paragraph
                            key={item.id}
                            typography={TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL}
                          >
                            {item.productId} x {item.quantity}
                          </Paragraph>
                        )
                      })}
                    </Group>

                    <Group
                      type={GROUP_TYPE.GROUP}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}
                    >
                      <Label>Address</Label>
                      <Paragraph typography={TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL}>
                        {order.address1}
                      </Paragraph>
                      { order.address2 && (
                        <Paragraph typography={TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL}>
                          {order.address2}
                        </Paragraph>
                      )}
                      <Paragraph typography={TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL}>
                        {order.city}, {order.state} {order.zip}
                      </Paragraph>
                    </Group>
                  </Row>
                </Column>
              </Group>
            )
          })}
        </Group>
      </MaxWidth>

    </Column>
  )
}