import { Request, Response } from 'express'
import { IncomingForm } from 'formidable'
import Product from '../models/product'
import { readFileSync } from 'fs'

export const createProduct = (req: Request, res: Response) => {
  const form = new IncomingForm({ keepExtensions: true })
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({ error })
    }

    const product = new Product(fields)
    const img: any = files.image

    if (img) {
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
