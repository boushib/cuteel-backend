export type Order = {
  userId: string
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
  subtotal: number
  total: number
  orderNumber: number
  currency: string
  billingDate: string
  dueDate: string
  invoice: string
}
