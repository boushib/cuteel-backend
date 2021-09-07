type ShippingAddress = {
  name: string
  address: string
  city: string
  state: string
  country: string
  postal_code: number
}
export type InvoiceItem = {
  item: string
  description: string
  quantity: number
  price: number
  tax: string
}
type Header = {
  company_name: string
  company_logo: string
  company_address: string
}
type Footer = {
  text: string
}
type InvoiceDate = {
  billing_date: string
  due_date: string
}

export type Invoice = {
  shipping: ShippingAddress
  items: Array<InvoiceItem>
  subtotal: number
  total: number
  order_number: number
  header: Header
  footer: Footer
  currency_symbol: '$'
  date: InvoiceDate
}
