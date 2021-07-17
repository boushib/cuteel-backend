import { Router } from 'express'
import { sayHello } from '../controllers/users'

const router = Router()

router.get('/', sayHello)

export default router
