export type ShippingAddress = {
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: number
}
export type InvoiceItem = {
  item: string
  description: string
  quantity: number
  price: number
  tax: string
}
export type InvoiceHeader = {
  companyName: string
  companyLogo: string
  companyAddress: string
}
export type InvoiceFooter = {
  text: string
}
export type InvoiceDate = {
  billingDate: string
  dueDate: string
}

export type Invoice = {
  shippingAddress: ShippingAddress
  items: Array<InvoiceItem>
  subtotal: number
  total: number
  orderNumber: number
  header: InvoiceHeader
  footer: InvoiceFooter
  currencySymbol: '$'
  date: InvoiceDate
}
