import { Router } from 'express'
import { signup, signin } from '../controllers/user'
import { signupValidator, signinValidator } from '../validators'

const router = Router()

router.post('/signup', signupValidator, signup)
router.post('/signin', signinValidator, signin)

export default router
