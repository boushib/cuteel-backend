import { Invoice } from '../types'

const shippingAddress = {
  name: 'El Hassane Boushib',
  address: '458 Haj Fateh',
  city: 'Casablanca',
  state: '',
  country: 'Morocco',
  postalCode: 22000,
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
  companyName: 'Cuteel',
  companyLogo: '../ig.png',
  companyAddress: 'Cuteel. 540 Gotham Street 34th floor LA, California',
}
const footer = {
  text: 'Cuteel LTD  •  https://cuteel.com/  •  contact@cuteel.com',
}
const date = {
  billingDate: '08 Sept 2021',
  dueDate: '08 Sept 2021',
}
export const INVOICE: Invoice = {
  shippingAddress,
  items,
  subtotal: 2335,
  total: 3125,
  orderNumber: 894,
  header,
  footer,
  currencySymbol: '$',
  date,
}
