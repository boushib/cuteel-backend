import { Request, Response } from 'express'
import Product from '../models/product'

export const createProduct = (req: Request, res: Response) => {
  const { name, description, price, category, quantity } = req.body
  const file = req.file as Express.MulterS3.File
  const image = file.location
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

export const updateProduct = (req: any, res: Response) => {
  const image = req.file?.location
  const fieldsToUpdate = { ...req.body }
  if (image) fieldsToUpdate.image = image
  console.log({ fieldsToUpdate })
  Object.keys(fieldsToUpdate).map((k) => {
    if (!fieldsToUpdate[k]) delete fieldsToUpdate[k]
  })
  Product.findOneAndUpdate(
    { _id: req.params.id },
    fieldsToUpdate,
    { new: true },
    (error, product) => {
      if (error) {
        return res.status(400).json({ error })
      }
      console.log({ product })
      return res.status(201).json({ product })
    }
  )
}

export const getProducts = (req: Request, res: Response) => {
  const { q, categ, minPrice, maxPrice } = req.query
  if (categ || minPrice || maxPrice) {
    let categories: Array<string> = []
    if (categ) {
      categories = categ.toString().split(',')
    }
    Product.find(
      {
        category: categories.length > 0 ? { $in: categories } : { $nin: [] },
        price: {
          $gte: minPrice ?? 0,
          $lt: maxPrice ?? 1000000,
        },
      },
      (error: any, products: any) => {
        if (error) {
          return res.status(400).json({ error })
        }
        return res.json({ products })
      }
    )
    return
  }
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
