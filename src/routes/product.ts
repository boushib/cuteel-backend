import { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProductById,
} from '../controllers/product'

const router = Router()

router.post('/products/create', createProduct)
router.get('/products', getProducts)
router.get('/products/:id', getProductById)

export default router
