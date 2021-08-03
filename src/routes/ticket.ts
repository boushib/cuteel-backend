import { Router } from 'express'
import {
  createTicket,
  closeTicket,
  getTicket,
  getUserTickets,
} from '../controllers/ticket'

const router = Router()

router.post('/tickets/create', createTicket)
router.get('/tickets/user/:userId', getUserTickets)
router.get('/tickets/:id', getTicket)
router.put('/tickets/:id/close', closeTicket)

export default router
