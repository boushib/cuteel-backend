import { Router } from 'express'
import {
  createTicket,
  closeTicket,
  getTicket,
  getTickets,
  getUserTickets,
} from '../controllers/ticket'
import { useAuth } from '../middlewares'

const router = Router()

router.post('/tickets/create', useAuth, createTicket)
router.get('/tickets', useAuth, getTickets)
router.get('/userTickets', useAuth, getUserTickets)
router.get('/tickets/:id', useAuth, getTicket)
router.put('/tickets/:id/close', useAuth, closeTicket)

export default router
