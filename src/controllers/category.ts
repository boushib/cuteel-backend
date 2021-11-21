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

export const updateCategory = (req: any, res: Response) => {
  Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (error, category) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(201).json({ category })
    }
  )
}

export const getCategories = (req: Request, res: Response) => {
  Category.find((error, categories) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ categories })
  })
}

export const getCategory = (req: Request, res: Response) => {
  const { id } = req.params
  Category.findById(id, (error: any, category: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (!category) {
      return res.status(404).json({ error: 'This category might not exist!' })
    }
    res.json({ category })
  })
}

export const deleteCategory = (req: Request, res: Response) => {
  Category.remove({ _id: req.params.id }, (error: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ message: 'Category successfully deleted!' })
  })
}
