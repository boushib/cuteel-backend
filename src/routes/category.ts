import { Router } from 'express'
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../controllers/category'
import { useAuth } from '../middlewares'

const router = Router()
router.post('/categories/create', useAuth, createCategory)
router.get('/categories', getCategories)
router.delete('/categories/:id', useAuth, deleteCategory)
router.put('/categories/:id', useAuth, updateCategory)

export default router
