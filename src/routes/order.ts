import { Router } from 'express'
import {
  createOrder,
  getOrder,
  getOrders,
  getUserOrders,
} from '../controllers/order'
import { useAuth } from '../middlewares'

const router = Router()

router.post('/orders/create', useAuth, createOrder)
router.get('/orders', useAuth, getOrders)
router.get('/orders/:id', useAuth, getOrder)
router.get('/user-orders', useAuth, getUserOrders)

export default router
