import { Router } from 'express'
import { sayHello } from '../controllers/user'

const router = Router()

router.get('/', sayHello)

export default router
