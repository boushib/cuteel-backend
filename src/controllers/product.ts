import { Request, Response } from 'express'
import { IncomingForm } from 'formidable'
import Product from '../models/product'
import { readFileSync } from 'fs'

export const createProduct = (req: Request, res: Response) => {
  const form = new IncomingForm({ keepExtensions: true })
  console.log('CREATE 1...')
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({ error })
    }

    const product = new Product(fields)
    const img: any = files.image

    if (img) {
      const type = img.type.split('/')[1]
      const allowedTypes = ['jpeg', 'png']

      if (!allowedTypes.includes(type)) {
        return res
          .status(400)
          .json({ error: 'Please upload a supported image!' })
      }

      if (img.size > 2000000) {
        return res
          .status(400)
          .json({ error: 'Image size should be less than 2mb' })
      }

      product.image.data = readFileSync(img.path)
      product.image.contentType = img.type
    }

    product.save((error: any, product: any) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(201).json({ product })
    })
  })
}

export const getProducts = (req: Request, res: Response) => {
  res.status(201).json({ products: [] })
}
