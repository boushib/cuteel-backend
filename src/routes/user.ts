import { Router } from 'express'
import { signup, signin, signout } from '../controllers/user'
import { signupValidator, signinValidator } from '../validators'

const router = Router()

router.post('/signup', signupValidator, signup)
router.post('/signin', signinValidator, signin)
router.post('/signout', signout)

export default router
