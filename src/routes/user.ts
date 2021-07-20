import { Router } from 'express'
import { getUserById } from '../controllers/user'

const router = Router()

router.get('/users/:id', getUserById)

export default router
