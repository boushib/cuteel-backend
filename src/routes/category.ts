import { Router } from 'express'
import { createCategory, getCategories } from '../controllers/category'

const router = Router()
router.post('/categories/create', createCategory)
router.get('/categories', getCategories)

export default router
