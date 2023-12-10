'use client'

import { useState } from "react"
import MoneyIcon from '@mui/icons-material/AttachMoney'

import { Button, Column, Group, HEADING_SIZE, Heading, INPUT_SIZE, Paragraph, Row, TYPOGRAPHY_TYPE, TextInput } from "@/baseComponents"
import { useAuth } from "@/hooks/useAuth"
import { useSDK } from "@metamask/sdk-react"
import { DEFAULT_CHAIN_ID } from "@/constants"
import { onCreateProduct } from './onCreateProduct'

export const Main = () => {
  const {signature, account} = useAuth()
  const metamask = useSDK()

  const chainId = metamask.chainId || DEFAULT_CHAIN_ID

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)

  const [isProductSaving, setIsProductSaving] = useState(false)

  const addProduct = async () => {
    setIsProductSaving(true)

    try {
      const body = {
        name: productName,
        description: productDescription,
        price: productPrice,
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
  )
}