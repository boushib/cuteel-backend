import { Invoice } from '../types'

const shipping = {
  name: 'El Hassane Boushib',
  address: '458 Haj Fateh',
  city: 'Casablanca',
  state: 'Casablanca',
  country: 'Morocco',
  postal_code: 22000,
}
const items = [
  {
    item: 'Laptop Dell XPS 15',
    description: 'Dell XPS 15 11th gen. 64Go of RAM & 2To SSD',
    quantity: 1,
    price: 2300.0,
    tax: '24%',
  },
  {
    item: 'Water Glass Set',
    description: 'Water glass set for office',
    quantity: 1,
    price: 35.0,
    tax: '',
  },
]
const header = {
  company_name: 'Cuteel',
  company_logo: 'logo.png',
  company_address: 'Cuteel. 540 Gotham Street 34th floor LA, California',
}
const footer = {
  text: 'Footer goes here',
}
const date = {
  billing_date: '08 Sept 2021',
  due_date: '08 Sept 2021',
}
export const INVOICE: Invoice = {
  shipping,
  items,
  subtotal: 2335,
  total: 3125,
  order_number: 894,
  header,
  footer,
  currency_symbol: '$',
  date,
}
