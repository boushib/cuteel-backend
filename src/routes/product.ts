import { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'
import { uploadToS3 } from '../middlewares'
import { useAuth } from '../middlewares'

const router = Router()

router.post(
  '/products/create',
  useAuth,
  uploadToS3.single('image'),
  createProduct
)
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.put('/products/:id', useAuth, uploadToS3.single('image'), updateProduct)
router.delete('/products/:id', useAuth, deleteProduct)

export default router
