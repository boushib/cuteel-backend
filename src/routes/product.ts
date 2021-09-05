import { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'
import { useAuth, upload } from '../utils'

const router = Router()

router.post('/products/create', useAuth, upload.single('image'), createProduct)
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.put('/products/:id', upload.single('image'), updateProduct)
router.delete('/products/:id', deleteProduct)

export default router
