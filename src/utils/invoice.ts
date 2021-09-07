import { randomBytes } from 'crypto'
import { createWriteStream, existsSync } from 'fs'
import PDFKit from 'pdfkit'
import { Invoice } from '../types'

export const createInvoice = (invoice: Invoice, path?: string) => {
  const doc = new PDFKit({ size: 'A4', margin: 40 })

  header(doc, invoice)
  customerInformation(doc, invoice)
  invoiceTable(doc, invoice)
  footer(doc, invoice)

  doc.end()
  const filePath = path ?? `documents/${randomBytes(16).toString('hex')}.pdf`
  doc.pipe(createWriteStream(filePath))
}

const header = (doc: PDFKit.PDFDocument, invoice: Invoice) => {
  if (existsSync(invoice.header.company_logo)) {
    doc
      .image(invoice.header.company_logo, 50, 45, { width: 50 })
      .fontSize(20)
      .text(invoice.header.company_name, 110, 57)
      .moveDown()
  } else {
    doc.fontSize(20).text(invoice.header.company_name, 50, 45).moveDown()
  }

  if (invoice.header.company_address.length !== 0) {
    companyAddress(doc, invoice.header.company_address)
  }
}

const customerInformation = (doc: PDFKit.PDFDocument, invoice: Invoice) => {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160)

  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.order_number.toString(), 150, customerInformationTop)
    .font('Helvetica')
    .text('Billing Date:', 50, customerInformationTop + 15)
    .text(invoice.date.billing_date, 150, customerInformationTop + 15)
    .text('Due Date:', 50, customerInformationTop + 30)
    .text(invoice.date.due_date, 150, customerInformationTop + 30)

    .font('Helvetica-Bold')
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ', ' +
        invoice.shipping.state +
        ', ' +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown()

  generateHr(doc, 252)
}

const invoiceTable = (doc: PDFKit.PDFDocument, invoice: Invoice) => {
  let i
  const invoiceTableTop = 330
  const currencySymbol = invoice.currency_symbol

  doc.font('Helvetica-Bold')
  tableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Description',
    'Unit Cost',
    'Quantity',
    'Total',
    'Tax'
  )
  generateHr(doc, invoiceTableTop + 20)
  doc.font('Helvetica')

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i]
    const position = invoiceTableTop + (i + 1) * 30
    tableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.price, currencySymbol),
      item.quantity.toString(),
      formatCurrency(
        applyTaxIfAvailable(item.price, item.quantity, item.tax),
        currencySymbol
      ),
      checkIfTaxAvailable(item.tax)
    )

    generateHr(doc, position + 20)
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30
  doc.font('Helvetica-Bold')
  totalTable(
    doc,
    subtotalPosition,
    'Subtotal',
    formatCurrency(invoice.total, currencySymbol)
  )

  const paidToDatePosition = subtotalPosition + 20
  doc.font('Helvetica-Bold')
  totalTable(
    doc,
    paidToDatePosition,
    'Total',
    formatCurrency(invoice.total, currencySymbol)
  )
}

const footer = (doc: PDFKit.PDFDocument, invoice: Invoice) => {
  if (invoice.footer.text.length !== 0) {
    doc
      .fontSize(10)
      .text(invoice.footer.text, 50, 780, { align: 'center', width: 500 })
  }
}

const totalTable = (
  doc: PDFKit.PDFDocument,
  position: number,
  name: string,
  description: string
) => {
  doc
    .fontSize(10)
    .text(name, 400, position, { width: 90, align: 'right' })
    .text(description, 0, position, { align: 'right' })
}

const tableRow = (
  doc: PDFKit.PDFDocument,
  position: number,
  item: string,
  description: string,
  unitCost: string,
  quantity: string,
  lineTotal: string,
  tax: string
) => {
  doc
    .fontSize(10)
    .text(item, 50, position)
    .text(description, 130, position)
    .text(unitCost, 280, position, { width: 90, align: 'right' })
    .text(quantity, 335, position, { width: 90, align: 'right' })
    .text(lineTotal, 400, position, { width: 90, align: 'right' })
    .text(tax, 0, position, { align: 'right' })
}

const generateHr = (doc: PDFKit.PDFDocument, position: number) => {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, position)
    .lineTo(550, position)
    .stroke()
}

const formatCurrency = (amount: number, symbol: string) => {
  return symbol + amount.toFixed(2)
}

const getTaxFromString = (s: string) => {
  if (!s.length) return 0
  return +s.replace(/[^0-9]/g, '')
}

const checkIfTaxAvailable = (taxAsString: string) => {
  const tax = getTaxFromString(taxAsString)
  if (Number.isNaN(tax) === false && tax <= 100 && tax > 0) {
    return taxAsString
  }
  return '---'
}

const applyTaxIfAvailable = (
  price: number,
  quantity: number,
  taxAsString: string
) => {
  const tax = getTaxFromString(taxAsString)
  if (tax && tax <= 100) {
    return price * quantity * (1 + tax / 100)
  }
  return price * quantity
}

const companyAddress = (doc: PDFKit.PDFDocument, address: string) => {
  const str = address
  const chunks = str.match(/.{0,25}(\s|$)/g)
  let first = 50
  chunks?.forEach(function (i, x) {
    doc.fontSize(10).text(chunks[x], 200, first, { align: 'right' })
    first = +first + 15
  })
}
