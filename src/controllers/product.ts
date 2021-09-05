import { Request, Response } from 'express'
import Product from '../models/product'

export const createProduct = (req: Request, res: Response) => {
  const { name, description, price, category, quantity } = req.body
  const image = req.file?.path
  const product = new Product({
    name,
    description,
    price,
    category,
    quantity,
    image,
  })
  product.save((error: any, product: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.status(201).json({ product })
  })
}

export const updateProduct = (req: Request, res: Response) => {
  const image = req.file?.path
  const fieldsToUpdate = { ...req.body }
  if (image) fieldsToUpdate.image = image
  Object.keys(fieldsToUpdate).map((k) => {
    if (!k) delete fieldsToUpdate[k]
  })
  Product.findOneAndUpdate(
    { _id: req.params.id },
    fieldsToUpdate,
    { new: true },
    (error, product) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(201).json({ product })
    }
  )
}

export const getProducts = (req: Request, res: Response) => {
  const { q } = req.query
  console.log({ userId: req.user })
  if (q) {
    const regex = { $regex: q, $options: 'i' }
    Product.find(
      {
        $or: [{ name: regex }, { description: regex }],
      },
      (error: any, products: any) => {
        if (error) {
          return res.status(400).json({ error })
        }
        res.json({ products })
      }
    )
  } else {
    Product.find((error: any, products: any) => {
      if (error) {
        return res.status(400).json({ error })
      }
      res.json({ products })
    })
  }
}

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params
  Product.findById(id, (error: any, product: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (!product) {
      return res.status(404).json({ error: 'This product might not exist!' })
    }
    res.json({ product })
  })
}

export const deleteProduct = (req: Request, res: Response) => {
  Product.remove({ _id: req.params.id }, (error: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ message: 'Product successfully deleted!' })
  })
}
