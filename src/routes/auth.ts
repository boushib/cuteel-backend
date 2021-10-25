import { Router } from 'express'
import { signup, signin, signout, adminSignin } from '../controllers/auth'
import { signupValidator, signinValidator } from '../validators'

const router = Router()

router.post('/signup', signupValidator, signup)
router.post('/signin', signinValidator, signin)
router.post('/admin-signin', signinValidator, adminSignin)
router.post('/signout', signout)

export default router
