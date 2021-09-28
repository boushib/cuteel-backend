import { Router } from 'express'
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../controllers/category'
import { useAuth } from '../middlewares'

const router = Router()
router.post('/categories/create', useAuth, createCategory)
router.get('/categories', getCategories)
router.delete('/categories/:id', useAuth, deleteCategory)

export default router
