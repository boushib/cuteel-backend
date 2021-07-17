import { Router } from 'express'
import { signup } from '../controllers/user'
import { signupValidator } from '../validators'

const router = Router()

router.post('/', signupValidator, signup)

export default router
