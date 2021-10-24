import { randomBytes } from 'crypto'
import { createWriteStream, existsSync } from 'fs'
import PDFKit from 'pdfkit'
import { uploadInvoiceToS3 } from '../middlewares'
import { Order } from '../types'

const INVOICE_FOOTER =
  'Cuteel LTD  •  https://cuteel.com/  •  contact@cuteel.com'

const COMPANY = {
  name: 'Cuteel',
  address: 'Cuteel. 540 Gotham Street 34th floor LA, California',
}

export const generateInvoice = async (order: Order, path?: string) => {
  try {
    const doc = new PDFKit({ size: 'A4', margin: 40 })

    createHeader(doc, order)
    createCustomerInfo(doc, order)
    createInvoiceTable(doc, order)
    createFooter(doc, INVOICE_FOOTER)
    const filePath = path ?? `invoices/${randomBytes(16).toString('hex')}.pdf`
    const tempFile = createWriteStream(filePath)
    doc.pipe(tempFile)
    doc.end()

    return new Promise((resolve, reject) => {
      tempFile.on('finish', async () => {
        try {
          const res = await uploadInvoiceToS3(filePath)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
      tempFile.on('error', (error) => {
        reject(error)
      })
    })
  } catch (error) {
    console.log('Error creating PDF: ', error)
  }
}

const createHeader = (doc: PDFKit.PDFDocument, order: Order) => {
  const { name, address } = COMPANY
  const companyLogo =
    __dirname.substring(0, __dirname.length - 9) + 'static/cuteel.png'
  if (existsSync(companyLogo)) {
    doc
      .image(companyLogo, 50, 45, { width: 50 })
      .fontSize(20)
      .text(name, 110, 57)
      .moveDown()
  } else {
    doc.fontSize(20).text(name, 50, 45).moveDown()
  }

  if (address.length !== 0) {
    createCompanyAddress(doc, address)
  }
}

const createCustomerInfo = (doc: PDFKit.PDFDocument, order: Order) => {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160)

  createHorizontalLine(doc, 185)

  const customerInformationTop = 200

  const { name, address, city, state, country, postalCode } = order.shipping
  const { billingDate, dueDate, orderNumber } = order

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(orderNumber.toString(), 150, customerInformationTop)
    .font('Helvetica')
    .text('Billing Date:', 50, customerInformationTop + 15)
    .text(billingDate, 150, customerInformationTop + 15)
    .text('Due Date:', 50, customerInformationTop + 30)
    .text(dueDate, 150, customerInformationTop + 30)

    .font('Helvetica-Bold')
    .text(name, 300, customerInformationTop)
    .font('Helvetica')
    .text(address, 300, customerInformationTop + 15)
    .text(
      `${city}, ${state ? state + ', ' : ''}${country}, ${postalCode}`,
      300,
      customerInformationTop + 30
    )
    .moveDown()

  createHorizontalLine(doc, 252)
}

const createInvoiceTable = (doc: PDFKit.PDFDocument, order: Order) => {
  let i
  const invoiceTableTop = 330

  doc.font('Helvetica-Bold')
  createTableRow(
    doc,
    invoiceTableTop,
    'Item',
    // 'Description',
    'Unit Cost',
    'Quantity',
    'Total',
    'Tax'
  )
  createHorizontalLine(doc, invoiceTableTop + 20)
  doc.font('Helvetica')

  const { items, currency, total, subtotal } = order

  for (i = 0; i < items.length; i++) {
    const item = items[i]
    const position = invoiceTableTop + (i + 1) * 30
    createTableRow(
      doc,
      position,
      item.name,
      // item.description,
      formatCurrency(item.price, currency),
      item.quantity.toString(),
      formatCurrency(
        applyTaxIfAvailable(item.price, item.quantity, item.tax),
        currency
      ),
      item.tax > 0 ? item.tax * 100 + '%' : '--'
    )

    createHorizontalLine(doc, position + 20)
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30
  doc.font('Helvetica-Bold')
  totalTable(
    doc,
    subtotalPosition,
    'Subtotal',
    formatCurrency(subtotal, currency)
  )

  const paidToDatePosition = subtotalPosition + 20
  doc.font('Helvetica-Bold')
  totalTable(doc, paidToDatePosition, 'Total', formatCurrency(total, currency))
}

const createFooter = (doc: PDFKit.PDFDocument, footer: string) => {
  if (footer.length !== 0) {
    doc.fontSize(10).text(footer, 50, 780, { align: 'center', width: 500 })
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

const createTableRow = (
  doc: PDFKit.PDFDocument,
  position: number,
  item: string,
  // description: string,
  unitCost: string,
  quantity: string,
  lineTotal: string,
  tax: string
) => {
  doc
    .fontSize(10)
    .text(item, 50, position, { width: 100 })
    // .text(description.substring(0, 30) + '..', 160, position, { width: 160 })
    .text(unitCost, 280, position, { width: 90, align: 'right' })
    .text(quantity, 335, position, { width: 90, align: 'right' })
    .text(lineTotal, 400, position, { width: 90, align: 'right' })
    .text(tax, 0, position, { align: 'right' })
}

const createHorizontalLine = (doc: PDFKit.PDFDocument, position: number) => {
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

const applyTaxIfAvailable = (price: number, quantity: number, tax: number) => {
  if (tax && tax <= 1) {
    return price * quantity * (1 + tax)
  }
  return price * quantity
}

const createCompanyAddress = (doc: PDFKit.PDFDocument, address: string) => {
  const str = address
  const chunks = str.match(/.{0,25}(\s|$)/g)
  let first = 50
  chunks?.forEach(function (i, x) {
    doc.fontSize(10).text(chunks[x], 200, first, { align: 'right' })
    first = +first + 15
  })
}
