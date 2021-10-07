import { Router } from 'express'
import {
  getUserById,
  getUsers,
  getCustomers,
  updateUser,
} from '../controllers/user'
import { uploadAvatarToS3, useAuth } from '../middlewares'

const router = Router()

router.get('/users', getUsers)
router.get('/customers', getCustomers)
router.get('/users/:id', getUserById)
router.put('/users/:id', useAuth, uploadAvatarToS3.single('avatar'), updateUser)

export default router
