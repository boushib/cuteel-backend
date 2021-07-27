import { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from '../controllers/product'

const router = Router()

router.post('/products/create', createProduct)
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.delete('/products/:id', deleteProduct)

export default router
