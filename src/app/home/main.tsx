'use client'

import { Button, Column, Group, HEADING_SIZE, Heading, TextInput } from "@/baseComponents"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"

export const Main = () => {
  const {signature, account} = useAuth()

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
    } catch (error) {
      console.log(error)
    }
    setIsProductSaving(false)
  }

  return (
    <Group sx={{p: 4}}>
      <Column sx={{width: '300px'}}>
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
          value={productPrice.toString()}
          sx={{mt: 4}}
          onChange={(value) => {
            setProductPrice(parseInt(value))
          }}
        />
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