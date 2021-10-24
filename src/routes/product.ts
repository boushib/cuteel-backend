import { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
} from '../controllers/product'
import { uploadImageToS3 } from '../middlewares'
import { useAuth } from '../middlewares'

const router = Router()

router.post(
  '/products/create',
  useAuth,
  uploadImageToS3.single('image'),
  createProduct
)
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.put(
  '/products/:id',
  useAuth,
  uploadImageToS3.single('image'),
  updateProduct
)
// router.put('/products/:id/rate', useAuth, rateProduct)
router.put('/products/:id/rate', rateProduct)
router.delete('/products/:id', useAuth, deleteProduct)

export default router
