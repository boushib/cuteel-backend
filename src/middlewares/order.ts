import { Order } from '../types'

type GenerateOrderProps = {
  userId: string
  currency?: string
  shipping: {
    name: string
    address: string
    city: string
    state?: string
    country: string
    postalCode: number
  }
  items: Array<{
    name: string
    description: string
    quantity: number
    price: number
    tax: number
  }>
}

type GenerateOrder = (props: GenerateOrderProps) => Order

export const generateOrder: GenerateOrder = ({
  userId,
  shipping,
  items,
  currency = '$',
}) => {
  const date = new Date().toISOString()
  let subtotal = 0
  let total = 0
  items.forEach((item) => {
    const { price, tax, quantity } = item
    subtotal += price * quantity
    total += price * quantity * (1 + tax)
  })

  const orderNumber = Math.floor(Math.random() * 1000000)

  return {
    userId,
    shipping,
    items,
    currency,
    subtotal,
    total,
    orderNumber,
    billingDate: date,
    dueDate: date,
    invoice: '',
  }
}
