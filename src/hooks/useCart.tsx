import React, { useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { Product } from "@prisma/client"
import { Issue } from "next/dist/build/swc"

export type CartType = {
  product: Product,
  quantity: number
}[]

export type AddToCart = (order: {
  product: Product,
  quantity: number
}) => void

export type RemoveFromCart = (params: {
  productId: string,
  quantity: number
}) => void

export const CartContext = React.createContext<{
  cart: CartType,
  addToCart: AddToCart
  removeFromCart: RemoveFromCart
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}>({
  cart: [],
  isOpen: false,
  addToCart: () => { },
  removeFromCart: () => { },
  setIsOpen: () => { }
})

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    value: cart,
    setValue: setCart
  } = useLocalStorage<CartType>('cart', [])
  const [isOpen, setIsOpen] = React.useState(false)

  const addToCart = (order: {
    product: Product,
    quantity: number
  }) => {
    const newCart = [...cart]
    const existingIndex = newCart.findIndex((item) => item.product.id === order.product.id)

    if (existingIndex !== -1) {
      newCart[existingIndex].quantity += order.quantity
    } else {
      newCart.push(order)
    }

    setCart(newCart)
  }

  const removeFromCart = (params: {
    productId: string,
    quantity: number
  }) => {
    const newCart = [...cart]
    const existingIndex = newCart.findIndex((item) => item.product.id === params.productId)

    if (existingIndex !== -1) {
      newCart[existingIndex].quantity -= params.quantity

      if (newCart[existingIndex].quantity <= 0) {
        newCart.splice(existingIndex, 1)
      }
    }

    setCart(newCart)
  }

  const cartContext = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    isOpen,
    setIsOpen
  }), [cart, isOpen])

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return React.useContext(CartContext)
}