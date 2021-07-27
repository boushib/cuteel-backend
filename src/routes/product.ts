import { Router } from 'express'
import { createProduct, getProducts } from '../controllers/product'

const router = Router()

router.post('/products/create', createProduct)
router.get('/products', getProducts)

export default router
