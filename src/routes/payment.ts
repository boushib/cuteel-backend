import { Router } from 'express'
import { generateSecret } from '../controllers/payment'
import { useAuth } from '../middlewares'

const router = Router()
router.post('/payment/create', useAuth, generateSecret)

export default router
