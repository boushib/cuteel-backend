import { Router } from 'express'
import { getUserById, updateUser } from '../controllers/user'
import { upload } from '../utils'

const router = Router()

router.get('/users/:id', getUserById)
router.put('/users/:id', upload.single('avatar'), updateUser)

export default router
