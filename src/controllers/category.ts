import { Request, Response } from 'express'
import Category from '../models/category'

export const createCategory = (req: Request, res: Response) => {
  const category = new Category(req.body)
  category.save((error: any, category: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.status(201).json({ category })
  })
}

export const getCategories = (req: Request, res: Response) => {
  res.json({ data: 'Categories..' })
}
