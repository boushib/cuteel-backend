import { Router } from 'express'
import { createCategory, getCategories } from '../controllers/category'
import { useAuth } from '../middlewares'

const router = Router()
router.post('/categories/create', useAuth, createCategory)
router.get('/categories', getCategories)

export default router
